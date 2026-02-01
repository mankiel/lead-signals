"use client"

import { useState, useEffect, useCallback } from 'react'

interface SavedSignal {
  id: string
  signalId: string
  companyName: string
  title?: string
  description?: string
  metadata?: any
  sourceUrl?: string
  notes?: string
  createdAt: string
}

const STORAGE_KEY = 'lead-signals-saved'

function getStoredSignals(): SavedSignal[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function setStoredSignals(signals: SavedSignal[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(signals))
  } catch {
    // Storage might be full or unavailable
  }
}

export function useSavedSignals() {
  const [savedSignals, setSavedSignals] = useState<SavedSignal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    setSavedSignals(getStoredSignals())
    setIsLoading(false)
  }, [])

  const savedSignalIds = new Set(savedSignals.map(s => s.signalId))

  const saveSignal = useCallback(async (signal: {
    signalId: string
    companyName: string
    title?: string
    description?: string
    metadata?: any
    sourceUrl?: string
    notes?: string
  }) => {
    const newSignal: SavedSignal = {
      id: crypto.randomUUID(),
      signalId: signal.signalId,
      companyName: signal.companyName,
      title: signal.title,
      description: signal.description,
      metadata: signal.metadata,
      sourceUrl: signal.sourceUrl,
      notes: signal.notes,
      createdAt: new Date().toISOString()
    }

    const updated = [...savedSignals, newSignal]
    setSavedSignals(updated)
    setStoredSignals(updated)
    return true
  }, [savedSignals])

  const unsaveSignal = useCallback(async (signalId: string) => {
    const updated = savedSignals.filter(s => s.signalId !== signalId)
    setSavedSignals(updated)
    setStoredSignals(updated)
    return true
  }, [savedSignals])

  const isSignalSaved = useCallback((signalId: string) => {
    return savedSignalIds.has(signalId)
  }, [savedSignalIds])

  return {
    savedSignals,
    savedSignalIds,
    isLoading,
    error: null,
    saveSignal,
    unsaveSignal,
    isSignalSaved,
    refresh: () => setSavedSignals(getStoredSignals())
  }
}

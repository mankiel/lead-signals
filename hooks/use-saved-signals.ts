"use client"

import useSWR from 'swr'

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

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useSavedSignals() {
  const { data, error, isLoading, mutate } = useSWR<{ savedSignals: SavedSignal[] }>(
    '/api/saved-signals',
    fetcher
  )

  const savedSignalIds = new Set(data?.savedSignals?.map(s => s.signalId) || [])

  const saveSignal = async (signal: {
    signalId: string
    companyName: string
    title?: string
    description?: string
    metadata?: any
    sourceUrl?: string
    notes?: string
  }) => {
    try {
      const res = await fetch('/api/saved-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signal)
      })
      
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save signal')
      }
      
      mutate()
      return true
    } catch (error) {
      console.error('Error saving signal:', error)
      return false
    }
  }

  const unsaveSignal = async (signalId: string) => {
    try {
      const res = await fetch(`/api/saved-signals?signalId=${signalId}`, {
        method: 'DELETE'
      })
      
      if (!res.ok) {
        throw new Error('Failed to unsave signal')
      }
      
      mutate()
      return true
    } catch (error) {
      console.error('Error unsaving signal:', error)
      return false
    }
  }

  const isSignalSaved = (signalId: string) => savedSignalIds.has(signalId)

  return {
    savedSignals: data?.savedSignals || [],
    savedSignalIds,
    isLoading,
    error,
    saveSignal,
    unsaveSignal,
    isSignalSaved,
    refresh: mutate
  }
}

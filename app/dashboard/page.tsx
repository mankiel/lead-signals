'use client'

import { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import OfficeChart from '../components/OfficeChart'
import SolicitationTimeline from '../components/SolicitationTimeline'
import DeadlineHistogram from '../components/DeadlineHistogram'
import AgencyBudgetChart from '../components/AgencyBudgetChart'
import Button from '../components/ui/Button'
import Card, { CardHeader, CardTitle } from '../components/ui/Card'
import Badge from '../components/ui/Badge'

interface LeadSignal {
  id: string
  companyName: string
  signalType: string
  description: string
  source: string
  sourceUrl?: string
  createdAt: string
  metadata?: any
}

interface Subscription {
  id: string
  signalType: string
  keywords: string[]
  isActive: boolean
}

const SIGNAL_TYPES = [
  { value: 'funding', label: 'Funding Announcements', icon: '💰' },
  { value: 'job_posting', label: 'New Job Postings', icon: '💼' },
  { value: 'tech_change', label: 'Technology Changes', icon: '⚙️' },
  { value: 'growth', label: 'Company Growth', icon: '📈' },
  { value: 'executive_change', label: 'Executive Changes', icon: '👔' },
  { value: 'government_contract', label: 'Government Contracts', icon: '🏛️' }
]

export default function Dashboard() {
  const [signals, setSignals] = useState<LeadSignal[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedSubtier, setSelectedSubtier] = useState<string>('all')
  const [availableSubtiers, setAvailableSubtiers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [sortBy, setSortBy] = useState<string>('newest')

  useEffect(() => {
    setCurrentPage(1) // Reset to first page when filter changes
    fetchSignals()
    fetchSubscriptions()
  }, [selectedType, selectedSubtier])

  const fetchSignals = async () => {
    try {
      const url = selectedType === 'all'
        ? '/api/signals'
        : `/api/signals?type=${selectedType}`
      const res = await fetch(url)
      const data = await res.json()
      let filteredSignals = data.signals || []
      
      // Extract unique subtiers from government contracts
      const subtiers = new Set<string>()
      filteredSignals.forEach((signal: LeadSignal) => {
        if (signal.signalType === 'government_contract' && signal.metadata?.subtier) {
          subtiers.add(signal.metadata.subtier)
        }
      })
      setAvailableSubtiers(Array.from(subtiers).sort())
      
      // Apply subtier filter
      if (selectedSubtier !== 'all') {
        filteredSignals = filteredSignals.filter((signal: LeadSignal) => {
          const metadata = signal.metadata as any
          return metadata?.subtier === selectedSubtier
        })
      }
      
      setSignals(filteredSignals)
    } catch (error) {
      console.error('Error fetching signals:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubscriptions = async () => {
    try {
      const res = await fetch('/api/subscriptions')
      const data = await res.json()
      setSubscriptions(data.subscriptions || [])
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
    }
  }

  const toggleSubscription = async (signalType: string) => {
    const existing = subscriptions.find(s => s.signalType === signalType)
    
    if (existing) {
      await fetch(`/api/subscriptions?id=${existing.id}`, { method: 'DELETE' })
    } else {
      await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signalType })
      })
    }
    
    fetchSubscriptions()
  }

  const isSubscribed = (type: string) => {
    return subscriptions.some(s => s.signalType === type && s.isActive)
  }

  const calculateElapsedPercentage = (signal: LeadSignal): number => {
    if (!signal.metadata?.postedDate || !signal.metadata?.responseDeadline) {
      return -1 // No timeline data
    }
    const posted = new Date(signal.metadata.postedDate)
    const deadline = new Date(signal.metadata.responseDeadline)
    const now = new Date()
    
    const totalDays = Math.ceil((deadline.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24))
    const elapsedDays = Math.ceil((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24))
    
    return Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100))
  }

  const getSortedSignals = () => {
    const signalsCopy = [...signals]
    
    switch (sortBy) {
      case 'most-elapsed':
        return signalsCopy.sort((a, b) => calculateElapsedPercentage(b) - calculateElapsedPercentage(a))
      case 'least-elapsed':
        return signalsCopy.sort((a, b) => {
          const aElapsed = calculateElapsedPercentage(a)
          const bElapsed = calculateElapsedPercentage(b)
          // Put items without timeline data at the end
          if (aElapsed === -1) return 1
          if (bElapsed === -1) return -1
          return aElapsed - bElapsed
        })
      case 'newest':
      default:
        return signalsCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Lead Signals</h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">Government Contract Opportunities Intelligence</p>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Active Opportunities</p>
            <p className="text-3xl font-bold text-gray-900">{signals.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Subscriptions</p>
            <p className="text-3xl font-bold text-gray-900">{subscriptions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Urgent Deadlines</p>
            <p className="text-3xl font-bold text-gray-900">{signals.filter(s => {
              if (s.metadata?.responseDeadline) {
                const deadline = new Date(s.metadata.responseDeadline)
                const now = new Date()
                const daysUntil = Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                return daysUntil <= 7
              }
              return false
            }).length}</p>
          </div>
        </div>

        {/* Chart Section - Full Width */}
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OfficeChart />
          <DeadlineHistogram />
        </div>
        
        {/* Agency Budget Chart */}
        <div className="mb-8">
          <AgencyBudgetChart />
        </div>

        {/* Subscriptions Section - Full Width */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="bg-gray-800 p-6">
              <h2 className="text-xl font-bold text-white">Your Subscriptions</h2>
              <p className="text-sm text-gray-300 mt-1">
                Get notified about new opportunities
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {SIGNAL_TYPES.map(({ value, label, icon }) => (
                  <button
                    key={value}
                    onClick={() => toggleSubscription(value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSubscribed(value)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-900">{label}</span>
                    {isSubscribed(value) && (
                      <div className="mt-2 text-blue-600 text-sm">✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Signals Feed - Full Width */}
        <div>
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="bg-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Recent Signals</h2>
                  <div className="flex gap-2 flex-wrap">
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="px-4 py-2 border border-gray-600 rounded-lg text-sm text-white bg-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="most-elapsed">Most Elapsed %</option>
                      <option value="least-elapsed">Least Elapsed %</option>
                    </select>
                    <select
                      value={selectedType}
                      onChange={(e) => {
                        setSelectedType(e.target.value)
                        setSelectedSubtier('all') // Reset subtier when type changes
                      }}
                      className="px-4 py-2 border border-gray-600 rounded-lg text-sm text-white bg-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      {SIGNAL_TYPES.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {(selectedType === 'government_contract' || selectedType === 'all') && availableSubtiers.length > 0 && (
                      <select
                        value={selectedSubtier}
                        onChange={(e) => setSelectedSubtier(e.target.value)}
                        className="px-4 py-2 border border-gray-600 rounded-lg text-sm text-white bg-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Subtiers</option>
                        {availableSubtiers.map((subtier) => (
                          <option key={subtier} value={subtier}>{subtier}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {loading ? (
                  <div className="p-8 text-center text-gray-700">Loading...</div>
                ) : signals.length === 0 ? (
                  <div className="p-8 text-center text-gray-700">
                    No signals found. Check back later!
                  </div>
                ) : (
                  <>
                    {/* Pagination Info & Controls */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-700 font-medium">
                          Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, signals.length)} of {signals.length} opportunities
                        </span>
                        <select
                          value={itemsPerPage}
                          onChange={(e) => {
                            setItemsPerPage(Number(e.target.value))
                            setCurrentPage(1)
                          }}
                          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={10}>10 per page</option>
                          <option value={20}>20 per page</option>
                          <option value={50}>50 per page</option>
                          <option value={100}>100 per page</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          variant="ghost"
                          size="sm"
                        >
                          Previous
                        </Button>
                        <span className="text-sm text-gray-600 px-3">
                          Page {currentPage} of {Math.ceil(signals.length / itemsPerPage)}
                        </span>
                        <Button
                          onClick={() => setCurrentPage(p => Math.min(Math.ceil(signals.length / itemsPerPage), p + 1))}
                          disabled={currentPage >= Math.ceil(signals.length / itemsPerPage)}
                          variant="ghost"
                          size="sm"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    {/* Paginated Signals */}
                    {getSortedSignals().slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    ).map((signal) => (
                      <div key={signal.id} className="p-6 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">
                              {SIGNAL_TYPES.find(t => t.value === signal.signalType)?.icon}
                            </span>
                            <h3 className="font-semibold text-lg text-gray-900">{signal.companyName}</h3>
                            <Badge variant="gray" size="sm">
                              {SIGNAL_TYPES.find(t => t.value === signal.signalType)?.label}
                            </Badge>
                          </div>
                          
                          {/* Show contract type and solicitation number for government contracts */}
                          {signal.signalType === 'government_contract' && signal.metadata?.contractType && (
                            <div className="mb-3 flex items-center gap-2">
                              <Badge variant="primary">
                                {signal.metadata.contractType}
                              </Badge>
                              {signal.metadata.solicitationNumber && (
                                <span className="text-xs text-gray-600">
                                  #{signal.metadata.solicitationNumber}
                                </span>
                              )}
                            </div>
                          )}
                          
                          <p className="text-gray-700 leading-relaxed mb-3">{signal.description}</p>
                          
                          {/* Timeline for government contracts */}
                          {signal.signalType === 'government_contract' && signal.metadata?.postedDate && signal.metadata?.responseDeadline && (
                            <SolicitationTimeline 
                              postedDate={signal.metadata.postedDate}
                              responseDeadline={signal.metadata.responseDeadline}
                            />
                          )}
                          
                          {/* Show document attachments for government contracts */}
                          {signal.signalType === 'government_contract' && signal.metadata?.resourceLinks && signal.metadata.resourceLinks.length > 0 && (
                            <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-700">📎 Contract Documents ({signal.metadata.resourceLinks.length})</span>
                                <span className="text-xs text-gray-500">- Contains detailed contract type (FFP, CPFF, T&M, etc.)</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {signal.metadata.resourceLinks.slice(0, 3).map((link: string, idx: number) => (
                                  <a
                                    key={idx}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-2 py-1 bg-white border border-gray-300 rounded text-xs text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                  >
                                    Document {idx + 1} ↗
                                  </a>
                                ))}
                                {signal.metadata.resourceLinks.length > 3 && (
                                  <span className="inline-flex items-center px-2 py-1 text-xs text-gray-500">
                                    +{signal.metadata.resourceLinks.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-gray-700">
                            <span>Source: {signal.source}</span>
                            {signal.sourceUrl && (
                              <a
                                href={signal.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                View full opportunity →
                              </a>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(signal.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Lead Signals</h1>
              <p className="text-sm text-gray-500 mt-0.5">Government contract opportunities tracker</p>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chart Section - Full Width */}
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OfficeChart />
          <DeadlineHistogram />
        </div>
        
        {/* Agency Budget Chart */}
        <div className="mb-6">
          <AgencyBudgetChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subscriptions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Subscriptions</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Subscribe to signal types to get notified
                </p>
              </CardHeader>
              
              <div className="space-y-2">
                {SIGNAL_TYPES.map(({ value, label, icon }) => (
                  <button
                    key={value}
                    onClick={() => toggleSubscription(value)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-150 ${
                      isSubscribed(value)
                        ? 'border-primary-500 bg-primary-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{icon}</span>
                      <span className="text-sm font-medium text-gray-900">{label}</span>
                    </span>
                    {isSubscribed(value) && (
                      <span className="text-primary-600 font-semibold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Signals Feed */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle>Recent Signals</CardTitle>
                  <div className="flex gap-2">
                    <select
                      value={selectedType}
                      onChange={(e) => {
                        setSelectedType(e.target.value)
                        setSelectedSubtier('all') // Reset subtier when type changes
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
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
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
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
                  <div className="p-8 text-center text-black">Loading...</div>
                ) : signals.length === 0 ? (
                  <div className="p-8 text-center text-black">
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
                          className="px-2 py-1 border border-gray-300 rounded text-sm text-black"
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
                    {signals.slice(
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
                          
                          <div className="flex items-center gap-4 text-sm text-black">
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
                    ))}
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

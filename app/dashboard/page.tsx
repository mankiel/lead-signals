'use client'

import { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import OfficeChart from '../components/OfficeChart'
import SolicitationTimeline from '../components/SolicitationTimeline'
import DeadlineHistogram from '../components/DeadlineHistogram'
import AgencyBudgetChart from '../components/AgencyBudgetChart'

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
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary/90 to-primary shadow-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-card p-3 rounded-lg shadow-md">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground tracking-tight">Lead Signals</h1>
                <p className="text-xs text-primary-foreground/80 font-medium">Government Contract Intelligence Platform</p>
              </div>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Active Opportunities</p>
            <p className="text-4xl font-bold text-foreground">{signals.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Total contracts available</p>
          </div>

          <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-primary/80 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Active Alerts</p>
            <p className="text-4xl font-bold text-foreground">{subscriptions.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Notification subscriptions</p>
          </div>

          <div className="bg-card rounded-lg shadow-md p-6 border-l-4 border-primary/60 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Closing This Week</p>
            <p className="text-4xl font-bold text-foreground">
              {signals.filter(s => {
                if (s.metadata?.responseDeadline) {
                  const deadline = new Date(s.metadata.responseDeadline)
                  const now = new Date()
                  const daysUntil = Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                  return daysUntil <= 7
                }
                return false
              }).length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Due within 7 days</p>
          </div>
        </div>

        {/* Chart Section - Full Width */}
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OfficeChart />
          <DeadlineHistogram />
        </div>
        
        {/* Agency Budget Chart */}
        <div className="mb-6">
          <AgencyBudgetChart />
        </div>

        {/* Subscriptions Section */}
        <div className="mb-6">
          <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
            <div className="bg-gradient-to-r from-primary/90 to-primary p-6">
              <h2 className="text-xl font-bold text-primary-foreground">Your Subscriptions</h2>
              <p className="text-sm text-primary-foreground/80 mt-1">Get instant alerts for opportunities that match your interests</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {SIGNAL_TYPES.map(({ value, label, icon }) => (
                  <button
                    key={value}
                    onClick={() => toggleSubscription(value)}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                      isSubscribed(value)
                        ? 'border-primary bg-primary/10 shadow-sm'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <div className="text-2xl mb-2">{icon}</div>
                    <span className="text-xs font-semibold text-foreground block text-center">{label}</span>
                    {isSubscribed(value) && (
                      <div className="mt-2 flex justify-center">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Signals Feed */}
        <div>
            <div className="bg-card rounded-lg shadow-md border border-border">
              <div className="bg-gradient-to-r from-primary/90 to-primary p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-primary-foreground">Recent Signals</h2>
                  <div className="flex gap-3 flex-wrap">
                    <select
                      value={selectedType}
                      onChange={(e) => {
                        setSelectedType(e.target.value)
                        setSelectedSubtier('all') // Reset subtier when type changes
                      }}
                      className="px-4 py-2 border border-primary/30 rounded-lg text-sm text-primary-foreground bg-primary/20 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 hover:bg-primary/30 transition-colors"
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
                        className="px-4 py-2 border border-primary/30 rounded-lg text-sm text-primary-foreground bg-primary/20 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 hover:bg-primary/30 transition-colors"
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
                  <div className="p-12">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
                      <p className="text-muted-foreground font-medium">Loading opportunities...</p>
                    </div>
                  </div>
                ) : signals.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">No signals found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or check back later for new opportunities</p>
                  </div>
                ) : (
                  <>
                    {/* Pagination Info & Controls */}
                    <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-foreground font-medium">
                          Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, signals.length)} of {signals.length} opportunities
                        </span>
                        <select
                          value={itemsPerPage}
                          onChange={(e) => {
                            setItemsPerPage(Number(e.target.value))
                            setCurrentPage(1)
                          }}
                          className="px-2 py-1 border border-border rounded text-sm text-foreground bg-background"
                        >
                          <option value={10}>10 per page</option>
                          <option value={20}>20 per page</option>
                          <option value={50}>50 per page</option>
                          <option value={100}>100 per page</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 border border-border rounded text-sm text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                        >
                          Previous
                        </button>
                        <span className="text-sm text-muted-foreground">
                          Page {currentPage} of {Math.ceil(signals.length / itemsPerPage)}
                        </span>
                        <button
                          onClick={() => setCurrentPage(p => Math.min(Math.ceil(signals.length / itemsPerPage), p + 1))}
                          disabled={currentPage >= Math.ceil(signals.length / itemsPerPage)}
                          className="px-3 py-1 border border-border rounded text-sm text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    {/* Paginated Signals */}
                    {signals.slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    ).map((signal) => (
                      <div key={signal.id} className="p-6 hover:bg-muted/30 transition-colors border-b border-border last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">
                              {SIGNAL_TYPES.find(t => t.value === signal.signalType)?.icon}
                            </span>
                            <h3 className="font-semibold text-lg text-foreground">{signal.companyName}</h3>
                            <span className="px-2 py-1 bg-muted text-foreground text-xs rounded-full">
                              {SIGNAL_TYPES.find(t => t.value === signal.signalType)?.label}
                            </span>
                          </div>
                          
                          {/* Show contract type and solicitation number for government contracts */}
                          {signal.signalType === 'government_contract' && signal.metadata?.contractType && (
                            <div className="mb-2 flex items-center gap-2">
                              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                                {signal.metadata.contractType}
                              </span>
                              {signal.metadata.solicitationNumber && (
                                <span className="text-xs text-muted-foreground">
                                  #{signal.metadata.solicitationNumber}
                                </span>
                              )}
                            </div>
                          )}
                          
                          <p className="text-foreground mb-2">{signal.description}</p>
                          
                          {/* Timeline for government contracts */}
                          {signal.signalType === 'government_contract' && signal.metadata?.postedDate && signal.metadata?.responseDeadline && (
                            <SolicitationTimeline 
                              postedDate={signal.metadata.postedDate}
                              responseDeadline={signal.metadata.responseDeadline}
                            />
                          )}
                          
                          {/* Show document attachments for government contracts */}
                          {signal.signalType === 'government_contract' && signal.metadata?.resourceLinks && signal.metadata.resourceLinks.length > 0 && (
                            <div className="mb-3 p-3 bg-muted/30 rounded-lg border border-border">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-foreground">📎 Contract Documents ({signal.metadata.resourceLinks.length})</span>
                                <span className="text-xs text-muted-foreground">- Contains detailed contract type (FFP, CPFF, T&M, etc.)</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {signal.metadata.resourceLinks.slice(0, 3).map((link: string, idx: number) => (
                                  <a
                                    key={idx}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-2 py-1 bg-background border border-border rounded text-xs text-primary hover:bg-primary/10 hover:border-primary transition-colors"
                                  >
                                    Document {idx + 1} ↗
                                  </a>
                                ))}
                                {signal.metadata.resourceLinks.length > 3 && (
                                  <span className="inline-flex items-center px-2 py-1 text-xs text-muted-foreground">
                                    +{signal.metadata.resourceLinks.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-foreground">
                            <span>Source: {signal.source}</span>
                            {signal.sourceUrl && (
                              <a
                                href={signal.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                View full opportunity →
                              </a>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
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
  );
}

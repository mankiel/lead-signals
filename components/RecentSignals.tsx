"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, ChevronLeft, ChevronRight, Clock, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Signal {
  id: string
  companyName: string
  description: string
  metadata: any
  sourceUrl?: string
}

const getDepartmentColor = (dept: string) => {
  const colors: Record<string, string> = {
    "DEFENSE": "bg-chart-1",
    "VETERANS AFFAIRS": "bg-chart-4",
    "VA": "bg-chart-4",
    "GENERAL SERVICES ADMINISTRATION": "bg-chart-2",
    "GSA": "bg-chart-2",
    "HOMELAND SECURITY": "bg-chart-3",
    "DHS": "bg-chart-3",
    "HEALTH AND HUMAN SERVICES": "bg-chart-4",
    "HHS": "bg-chart-4",
  }
  return colors[dept?.toUpperCase()] || "bg-chart-1"
}

const calculateDaysLeft = (deadline: string) => {
  if (!deadline) return null
  try {
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  } catch {
    return null
  }
}

interface RecentSignalsProps {
  selectedOffices?: string[]
  selectedSubtiers?: string[]
}

export function RecentSignals({ selectedOffices = [], selectedSubtiers = [] }: RecentSignalsProps) {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=20&agency=defense')
      .then(res => res.json())
      .then(data => {
        let filteredSignals = data.signals || []
        
        const officeMap: Record<string, string> = {
          "dla": "Defense Logistics Agency",
          "army": "The Army",
          "navy": "The Navy",
          "airforce": "The Air Force",
          "dodea": "Defense Education Activity",
          "nga": "National Geospatial-Intelligence Agency",
          "dha": "Defense Health Agency",
          "disa": "Defense Information Systems Agency"
        }
        
        const selectedOfficeNames = selectedOffices.map(id => officeMap[id] || id)
        
        if (selectedSubtiers.length > 0) {
          filteredSignals = filteredSignals.filter((s: any) => 
            (s.metadata?.subtier && selectedSubtiers.includes(s.metadata.subtier)) ||
            (s.metadata?.agency && selectedSubtiers.includes(s.metadata.agency))
          )
        }
        if (selectedOfficeNames.length > 0) {
          filteredSignals = filteredSignals.filter((s: any) => 
            (s.metadata?.office && selectedOfficeNames.includes(s.metadata.office)) ||
            (s.metadata?.agency && selectedOfficeNames.some(name => s.metadata?.agency?.includes(name)))
          )
        }
        
        filteredSignals.sort((a: any, b: any) => {
          const daysA = calculateDaysLeft(a.metadata?.responseDeadline)
          const daysB = calculateDaysLeft(b.metadata?.responseDeadline)
          
          if (daysA === null && daysB === null) return 0
          if (daysA === null) return 1
          if (daysB === null) return -1
          
          return daysA - daysB
        })
        
        setSignals(filteredSignals)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch signals:', err)
        setLoading(false)
      })
  }, [selectedOffices, selectedSubtiers])

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Recent Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">Loading opportunities...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 border-border/60">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-sm font-semibold text-foreground">Recent Opportunities</CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <Select defaultValue="20">
                <SelectTrigger className="w-full sm:w-24 h-7 text-[11px] bg-muted/50 border-border/60 rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10" className="text-xs">10 per page</SelectItem>
                  <SelectItem value="20" className="text-xs">20 per page</SelectItem>
                  <SelectItem value="50" className="text-xs">50 per page</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-24 h-7 text-[11px] bg-muted/50 border-border/60 rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All Types</SelectItem>
                  <SelectItem value="contracts" className="text-xs">Contracts</SelectItem>
                  <SelectItem value="grants" className="text-xs">Grants</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-0.5 self-end sm:self-auto">
              <Button variant="outline" size="icon" className="w-7 h-7 rounded-md border-border/60">
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
              <span className="text-[10px] text-muted-foreground px-2 whitespace-nowrap">1 of 1</span>
              <Button variant="outline" size="icon" className="w-7 h-7 rounded-md border-border/60">
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {signals.map((signal) => {
          const meta = signal.metadata || {}
          const daysLeft = calculateDaysLeft(meta.responseDeadline)
          const isUrgent = daysLeft !== null && daysLeft < 7
          const posted = meta.postedDate ? new Date(meta.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'
          const deadline = meta.responseDeadline ? new Date(meta.responseDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'
          
          return (
            <div
              key={signal.id}
              className="group border border-border/50 rounded-lg p-3 hover:bg-muted/30 hover:border-border transition-all cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <div
                  className={cn("hidden sm:block w-0.5 rounded-full self-stretch min-h-20", getDepartmentColor(signal.companyName))}
                />
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap flex-1">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium text-xs text-foreground">{signal.companyName}</span>
                      </div>
                      <Badge variant="secondary" className="text-[9px] font-medium rounded px-1.5 py-0">
                        {meta.contractType || 'Contract'}
                      </Badge>
                      {meta.value && (
                        <Badge variant="outline" className="text-[9px] font-medium border-chart-2/30 text-chart-2 rounded px-1.5 py-0">
                          {meta.value}
                        </Badge>
                      )}
                    </div>
                    <div className="sm:hidden shrink-0">
                      {daysLeft !== null && (
                        <Badge 
                          className={cn(
                            "text-[9px] font-semibold rounded px-1.5 py-0",
                            isUrgent 
                              ? "bg-chart-5/10 text-chart-5 border-chart-5/20" 
                              : "bg-muted text-muted-foreground"
                          )} 
                          variant="outline"
                        >
                          {daysLeft}d
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-medium text-foreground mb-1 line-clamp-1">{meta.title || 'Contract Opportunity'}</p>
                  <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2 leading-relaxed">{signal.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Posted: {posted}
                    </span>
                    {meta.naicsCode && (
                      <span className="hidden sm:inline-flex items-center gap-1">
                        NAICS: {meta.naicsCode}
                      </span>
                    )}
                    {meta.solicitationNumber && (
                      <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[9px]">
                        {meta.solicitationNumber}
                      </span>
                    )}
                    <a 
                      href={meta.detailUrl || signal.sourceUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:underline flex items-center gap-0.5 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on SAM.gov
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
                {daysLeft !== null && (
                  <div className="hidden sm:flex flex-col items-end gap-1 min-w-28">
                    <Badge 
                      className={cn(
                        "text-[10px] font-semibold rounded px-2 py-0.5",
                        isUrgent 
                          ? "bg-chart-5/10 text-chart-5 border-chart-5/20" 
                          : "bg-muted text-muted-foreground border-border/50"
                      )} 
                      variant="outline"
                    >
                      {daysLeft} days left
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">Due: {deadline}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
        {signals.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No opportunities found matching your filters.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

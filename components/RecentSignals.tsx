"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, ChevronLeft, ChevronRight, Clock } from "lucide-react"
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
    "HOMELAND SECURITY": "bg-chart-2",
    "DHS": "bg-chart-2",
    "HEALTH AND HUMAN SERVICES": "bg-chart-4",
    "HHS": "bg-chart-4",
  }
  return colors[dept?.toUpperCase()] || "bg-chart-3"
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

export function RecentSignals() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=20')
      .then(res => res.json())
      .then(data => {
        setSignals(data.signals || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch signals:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground">Recent Signals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Loading opportunities...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-sm font-medium text-foreground">Recent Signals</CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select defaultValue="20">
                <SelectTrigger className="w-full sm:w-32 h-8 text-xs bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-32 h-8 text-xs bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="contracts">Contracts</SelectItem>
                  <SelectItem value="grants">Grants</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs text-muted-foreground px-2 whitespace-nowrap">1 of 1</span>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronRight className="w-4 h-4" />
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
          const posted = meta.postedDate ? new Date(meta.postedDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'N/A'
          const deadline = meta.responseDeadline ? new Date(meta.responseDeadline).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'TBD'
          
          return (
            <div
              key={signal.id}
              className="group border border-border rounded-lg p-3 sm:p-4 hover:bg-secondary/30 hover:border-accent/30 transition-all cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div
                  className={cn("hidden sm:block w-1 rounded-full self-stretch min-h-20", getDepartmentColor(signal.companyName))}
                />
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap flex-1">
                      <span className="font-medium text-sm text-foreground line-clamp-1">{signal.companyName}</span>
                      <Badge variant="secondary" className="text-[10px] bg-secondary text-muted-foreground shrink-0">
                        {meta.contractType || 'Contract'}
                      </Badge>
                      {meta.value && (
                        <Badge variant="outline" className="text-[10px] border-accent/50 text-accent shrink-0">
                          {meta.value}
                        </Badge>
                      )}
                    </div>
                    <div className="sm:hidden shrink-0">
                      {daysLeft !== null && (
                        <Badge className={isUrgent ? "bg-chart-5/20 text-chart-5 border-0 text-[10px]" : "text-[10px] border-border text-muted-foreground"} variant={isUrgent ? "default" : "outline"}>
                          {daysLeft}d
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-foreground font-medium mb-1 line-clamp-1">{meta.title || 'Contract Opportunity'}</p>
                  <p className="text-xs text-foreground/70 mb-3 line-clamp-2">{signal.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Posted: {posted}
                    </span>
                    {meta.naicsCode && (
                      <span className="flex items-center gap-1">
                        NAICS: {meta.naicsCode}
                      </span>
                    )}
                    {meta.solicitationNumber && (
                      <span className="flex items-center gap-1">
                        Sol: {meta.solicitationNumber}
                      </span>
                    )}
                    <a href={meta.detailUrl || signal.sourceUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                      SAM.gov
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  {daysLeft !== null && (
                    <div className="sm:hidden mt-3">
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                        <span>Deadline: {deadline}</span>
                      </div>
                    </div>
                  )}
                </div>
                {daysLeft !== null && (
                  <div className="hidden sm:flex flex-col items-end gap-2 min-w-32">
                    <Badge className={isUrgent ? "bg-chart-5/20 text-chart-5 border-0 text-[10px]" : "text-[10px] border-border text-muted-foreground"} variant={isUrgent ? "default" : "outline"}>
                      {daysLeft} days left
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">Deadline: {deadline}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, Award } from "lucide-react"

interface InsightData {
  highValue: { count: number; total: string }
  urgent: { count: number; avgDays: number }
  setAside: { count: number; total: string }
}

export function OpportunityInsights() {
  const [data, setData] = useState<InsightData>({
    highValue: { count: 0, total: "$0" },
    urgent: { count: 0, avgDays: 0 },
    setAside: { count: 0, total: "$0" }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=500')
      .then(res => res.json())
      .then(result => {
        const signals = result.signals || []
        const now = new Date()
        
        let highValueCount = 0
        let highValueTotal = 0
        let urgentCount = 0
        let urgentDaysSum = 0
        let setAsideCount = 0
        let setAsideTotal = 0
        
        signals.forEach((s: any) => {
          const valueStr = s.metadata?.value || '0'
          let value = 0
          
          if (valueStr && valueStr !== 'Not specified') {
            const cleaned = valueStr.replace(/[$,]/g, '')
            const match = cleaned.match(/([\d.]+)\s*([MKB])?/)
            if (match) {
              value = parseFloat(match[1])
              const unit = match[2]
              if (unit === 'K') value /= 1000
              else if (unit === 'B') value *= 1000
            }
          }
          
          // High-value opportunities (>$10M)
          if (value >= 10) {
            highValueCount++
            highValueTotal += value
          }
          
          // Urgent opportunities (<30 days)
          if (s.metadata?.responseDeadline) {
            const deadline = new Date(s.metadata.responseDeadline)
            const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
            if (daysLeft < 30 && daysLeft >= 0) {
              urgentCount++
              urgentDaysSum += daysLeft
            }
          }
          
          // Set-aside opportunities
          if (s.metadata?.setAsideType && s.metadata.setAsideType !== 'None') {
            setAsideCount++
            setAsideTotal += value
          }
        })
        
        setData({
          highValue: {
            count: highValueCount,
            total: highValueTotal >= 1000 
              ? `$${(highValueTotal / 1000).toFixed(1)}B` 
              : `$${Math.round(highValueTotal)}M`
          },
          urgent: {
            count: urgentCount,
            avgDays: urgentCount > 0 ? Math.round(urgentDaysSum / urgentCount) : 0
          },
          setAside: {
            count: setAsideCount,
            total: setAsideTotal >= 1000 
              ? `$${(setAsideTotal / 1000).toFixed(1)}B` 
              : `$${Math.round(setAsideTotal)}M`
          }
        })
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch insights:', err)
        setLoading(false)
      })
  }, [])

  const insights = [
    {
      title: "High-Value Contracts",
      subtitle: ">$10M opportunities",
      value: data.highValue.count.toString(),
      detail: data.highValue.total + " total",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Urgent Opportunities",
      subtitle: "Closing within 30 days",
      value: data.urgent.count.toString(),
      detail: `~${data.urgent.avgDays} days avg`,
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      title: "Set-Aside Programs",
      subtitle: "Small business opportunities",
      value: data.setAside.count.toString(),
      detail: data.setAside.total + " total",
      icon: Award,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    }
  ]

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground">Opportunity Insights</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Key metrics and highlights</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {insights.map((insight) => (
              <div key={insight.title} className="text-center">
                <div className={`inline-flex p-3 rounded-lg ${insight.bgColor} mb-2`}>
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{insight.value}</p>
                <p className="text-xs font-medium text-foreground mt-1">{insight.title}</p>
                <p className="text-xs text-muted-foreground">{insight.detail}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

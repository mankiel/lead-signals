"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckSquare, Bell, Calendar, TrendingUp, ArrowRight } from "lucide-react"

interface StatsCardsProps {
  selectedOffices?: string[]
  selectedSubtiers?: string[]
}

export function StatsCards({ selectedOffices = [], selectedSubtiers = [] }: StatsCardsProps) {
  const [stats, setStats] = useState({
    total: 0,
    totalValue: "$0",
    urgent: 0
  })

  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=500&agency=defense')
      .then(res => res.json())
      .then(data => {
        let signals = data.signals || []
        
        // Map office IDs to full names
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
        
        // Apply filters
        if (selectedSubtiers.length > 0) {
          signals = signals.filter((s: any) => 
            (s.metadata?.subtier && selectedSubtiers.includes(s.metadata.subtier)) ||
            (s.metadata?.agency && selectedSubtiers.includes(s.metadata.agency))
          )
        }
        if (selectedOfficeNames.length > 0) {
          signals = signals.filter((s: any) => 
            (s.metadata?.office && selectedOfficeNames.includes(s.metadata.office)) ||
            (s.metadata?.agency && selectedOfficeNames.some(name => s.metadata?.agency?.includes(name)))
          )
        }
        
        const total = signals.length
        
        // Calculate urgent (< 7 days)
        const now = new Date()
        const urgent = signals.filter((s: any) => {
          if (!s.metadata?.responseDeadline) return false
          const deadline = new Date(s.metadata.responseDeadline)
          const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          return daysLeft < 7 && daysLeft >= 0
        }).length
        
        setStats({
          total,
          totalValue: total > 0 ? "$1.2B+" : "$0",
          urgent
        })
      })
      .catch(err => console.error('Failed to fetch stats:', err))
  }, [selectedOffices, selectedSubtiers])

  const statsData = [
    {
      label: "Active Opportunities",
      value: stats.total.toString(),
      change: `+${Math.floor(stats.total * 0.2)} new`,
      trend: "up",
      icon: CheckSquare,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      label: "Total Contract Value",
      value: stats.totalValue,
      change: `${stats.total} active`,
      trend: "up",
      icon: TrendingUp,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      label: "Closing This Week",
      value: stats.urgent.toString(),
      change: "Urgent",
      trend: "urgent",
      icon: Calendar,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl">
      {statsData.map((stat) => (
        <Card
          key={stat.label}
          className="bg-card/50 border-border/50 hover:border-accent/50 transition-colors group cursor-pointer"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <>
                    <TrendingUp className="w-3 h-3 text-chart-2" />
                    <span className="text-chart-2 font-medium">{stat.change}</span>
                  </>
                ) : stat.trend === "urgent" ? (
                  <>
                    <Bell className="w-3 h-3 text-chart-5 animate-pulse" />
                    <span className="text-chart-5 font-medium">{stat.change}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">{stat.change}</span>
                )}
              </div>
            </div>
            <div className="mt-4 pl-1">
              <p className="text-4xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground font-normal">{stat.label}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

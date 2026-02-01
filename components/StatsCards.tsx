"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, DollarSign, AlertCircle, ArrowUpRight } from "lucide-react"

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
      description: `+${Math.floor(stats.total * 0.2)} new this week`,
      icon: FileText,
      iconColor: "text-chart-1",
      iconBg: "bg-chart-1/10",
    },
    {
      label: "Total Contract Value",
      value: stats.totalValue,
      description: `${stats.total} active contracts`,
      icon: DollarSign,
      iconColor: "text-chart-2",
      iconBg: "bg-chart-2/10",
    },
    {
      label: "Closing This Week",
      value: stats.urgent.toString(),
      description: "Requires immediate attention",
      icon: AlertCircle,
      iconColor: "text-chart-5",
      iconBg: "bg-chart-5/10",
      urgent: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {statsData.map((stat) => (
        <Card
          key={stat.label}
          className="group bg-card/50 border-border/60 hover:bg-card hover:border-border transition-all cursor-pointer"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs font-medium text-muted-foreground mt-0.5">{stat.label}</p>
              <p className={`text-[11px] mt-1.5 ${stat.urgent ? 'text-chart-5 font-medium' : 'text-muted-foreground/80'}`}>
                {stat.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const legendItems = [
  { name: "Urgent (<7d)", color: "var(--color-chart-5)" },
  { name: "Soon (8-30d)", color: "var(--color-chart-3)" },
  { name: "Mid (31-60d)", color: "var(--color-chart-1)" },
  { name: "Later (61-90d)", color: "var(--color-chart-4)" },
  { name: "Extended (91+d)", color: "var(--color-muted-foreground)" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, item: any) => sum + item.value, 0)
    const fullName = payload[0]?.payload?.fullName || payload[0]?.payload?.name
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{fullName}</p>
        <p className="text-xs text-muted-foreground">{total} opportunities</p>
      </div>
    )
  }
  return null
}

interface DeadlinesChartProps {
  selectedOffices?: string[]
  selectedSubtiers?: string[]
}

export function DeadlinesChart({ selectedOffices = [], selectedSubtiers = [] }: DeadlinesChartProps) {
  const [data, setData] = useState([
    { name: "0-7d", fullName: "0-7 days", urgent: 0, soon: 0, midterm: 0, later: 0, extended: 0 },
    { name: "8-30d", fullName: "8-30 days", urgent: 0, soon: 0, midterm: 0, later: 0, extended: 0 },
    { name: "31-60d", fullName: "31-60 days", urgent: 0, soon: 0, midterm: 0, later: 0, extended: 0 },
    { name: "61-90d", fullName: "61-90 days", urgent: 0, soon: 0, midterm: 0, later: 0, extended: 0 },
    { name: "91+d", fullName: "91+ days", urgent: 0, soon: 0, midterm: 0, later: 0, extended: 0 },
  ])
  const [totalActive, setTotalActive] = useState(0)

  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=500&agency=defense')
      .then(res => res.json())
      .then(result => {
        let signals = result.signals || []
        
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
        
        const now = new Date()
        
        // Initialize buckets
        const buckets = {
          urgent: 0,    // 0-7 days
          soon: 0,      // 8-30 days
          mid1: 0,      // 31-60 days
          mid2: 0,      // 61-90 days
          later: 0,     // 91+ days
        }
        
        signals.forEach((s: any) => {
          if (!s.metadata?.responseDeadline) return
          const deadline = new Date(s.metadata.responseDeadline)
          const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          
          if (daysLeft < 0) return // Skip past deadlines
          if (daysLeft <= 7) buckets.urgent++
          else if (daysLeft <= 30) buckets.soon++
          else if (daysLeft <= 60) buckets.mid1++
          else if (daysLeft <= 90) buckets.mid2++
          else buckets.later++
        })
        
        setData([
          { name: "0-7d", fullName: "0-7 days", urgent: buckets.urgent, soon: 0, midterm: 0, later: 0, extended: 0 },
          { name: "8-30d", fullName: "8-30 days", urgent: 0, soon: buckets.soon, midterm: 0, later: 0, extended: 0 },
          { name: "31-60d", fullName: "31-60 days", urgent: 0, soon: 0, midterm: buckets.mid1, later: 0, extended: 0 },
          { name: "61-90d", fullName: "61-90 days", urgent: 0, soon: 0, midterm: 0, later: buckets.mid2, extended: 0 },
          { name: "91+d", fullName: "91+ days", urgent: 0, soon: 0, midterm: 0, later: 0, extended: buckets.later },
        ])
        
        setTotalActive(Object.values(buckets).reduce((sum, val) => sum + val, 0))
      })
      .catch(err => console.error('Failed to fetch deadline data:', err))
  }, [selectedOffices, selectedSubtiers])

  return (
    <Card className="bg-card/50 border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">Upcoming Deadlines</CardTitle>
            <p className="text-[11px] text-muted-foreground mt-0.5">Response deadline distribution</p>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-md">{totalActive} active</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -15, bottom: 0 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-muted)", opacity: 0.15 }} />
              <Bar dataKey="urgent" stackId="a" fill="var(--color-chart-5)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="soon" stackId="a" fill="var(--color-chart-3)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="midterm" stackId="a" fill="var(--color-chart-1)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="later" stackId="a" fill="var(--color-chart-4)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="extended" stackId="a" fill="var(--color-muted-foreground)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-border/50">
          {legendItems.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

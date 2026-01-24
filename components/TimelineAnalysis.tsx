"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

interface TimelineData {
  date: string
  count: number
  value: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        <p className="text-xs text-muted-foreground">{payload[0].value} opportunities</p>
        {payload[1] && <p className="text-xs text-muted-foreground">${payload[1].value}M total</p>}
      </div>
    )
  }
  return null
}

export function TimelineAnalysis() {
  const [data, setData] = useState<TimelineData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=500')
      .then(res => res.json())
      .then(result => {
        const signals = result.signals || []
        
        // Group by posted date
        const timeline: { [key: string]: { count: number; value: number } } = {}
        
        signals.forEach((s: any) => {
          const postedDate = s.metadata?.postedDate || s.createdAt
          if (!postedDate) return
          
          // Extract date (YYYY-MM-DD format or convert from ISO)
          let dateKey = postedDate
          if (postedDate.includes('T')) {
            dateKey = postedDate.split('T')[0]
          } else if (postedDate.includes('/')) {
            // Convert MM/DD/YYYY to YYYY-MM-DD
            const parts = postedDate.split('/')
            if (parts.length === 3) {
              dateKey = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`
            }
          }
          
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
          
          if (!timeline[dateKey]) {
            timeline[dateKey] = { count: 0, value: 0 }
          }
          timeline[dateKey].count += 1
          timeline[dateKey].value += value
        })
        
        // Convert to array and sort by date
        const sorted = Object.entries(timeline)
          .map(([date, data]) => ({
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            count: data.count,
            value: Math.round(data.value * 10) / 10
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(-14) // Last 14 days
        
        setData(sorted)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch timeline data:', err)
        setLoading(false)
      })
  }, [])

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Opportunity Timeline</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Posted opportunities over time</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
            Loading...
          </div>
        ) : data.length === 0 ? (
          <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
            No timeline data available
          </div>
        ) : (
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" stroke="var(--color-chart-1)" strokeWidth={2} dot={{ fill: "var(--color-chart-1)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

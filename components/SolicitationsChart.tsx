"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { ArrowUpRight } from "lucide-react"

interface AgencyData {
  name: string
  value: number
  fullName: string
  isHighlighted?: boolean
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-foreground">{payload[0].payload.fullName}</p>
        <p className="text-xs text-muted-foreground">{payload[0].value} solicitations</p>
      </div>
    )
  }
  return null
}

export function SolicitationsChart() {
  const [data, setData] = useState<AgencyData[]>([])

  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=500')
      .then(res => res.json())
      .then(result => {
        const signals = result.signals || []
        
        // Count by subtier
        const subtierCounts: { [key: string]: number } = {}
        signals.forEach((s: any) => {
          const subtier = s.metadata?.subtier || s.metadata?.office || s.metadata?.agency || 'Unknown Subtier'
          subtierCounts[subtier] = (subtierCounts[subtier] || 0) + 1
        })
        
        // Convert to array and sort
        const sorted = Object.entries(subtierCounts)
          .map(([name, value]) => ({
            name: name.length > 30 ? name.substring(0, 30) + '...' : name,
            fullName: name,
            value: value as number,
            isHighlighted: name.toLowerCase().includes('defense logistics') || 
                          name.toLowerCase().includes('maritime')
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10) // Top 10 to show Defense Logistics Agency and Maritime
        
        setData(sorted)
      })
      .catch(err => console.error('Failed to fetch agency data:', err))
  }, [])

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Active Solicitations by Subtier</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Top 10 subtier agencies including Defense Logistics & Maritime</p>
          </div>
          <button className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors">
            View all
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-muted)", opacity: 0.3 }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isHighlighted ? "var(--color-chart-3)" : "var(--color-chart-1)"}
                    fillOpacity={entry.isHighlighted ? 0.95 : (1 - index * 0.08)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

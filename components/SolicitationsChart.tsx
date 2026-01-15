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
  isSubItem?: boolean
  indent?: number
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

const CustomYAxisTick = ({ x, y, payload }: any) => {
  const entry = payload.value
  const isSubItem = entry.isSubItem || false
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={isSubItem ? 20 : 0}
        y={0}
        dy={4}
        textAnchor="start"
        fill="var(--color-muted-foreground)"
        fontSize={isSubItem ? 9 : 10}
        opacity={isSubItem ? 0.8 : 1}
      >
        {isSubItem ? '└ ' : ''}{entry}
      </text>
    </g>
  )
}

export function SolicitationsChart() {
  const [data, setData] = useState<AgencyData[]>([])

  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=500')
      .then(res => res.json())
      .then(result => {
        const signals = result.signals || []
        
        // Count by subtier and track DLA offices
        const subtierCounts: { [key: string]: number } = {}
        const dlaOfficeCounts: { [key: string]: number } = {}
        
        signals.forEach((s: any) => {
          const subtier = s.metadata?.subtier || s.metadata?.office || s.metadata?.agency || 'Unknown Subtier'
          subtierCounts[subtier] = (subtierCounts[subtier] || 0) + 1
          
          // Track DLA sub-offices
          if (subtier === 'Defense Logistics Agency') {
            const office = s.metadata?.office
            if (office && office !== 'Defense Logistics Agency') {
              dlaOfficeCounts[office] = (dlaOfficeCounts[office] || 0) + 1
            }
          }
        })
        
        // Get top subtiers excluding DLA (we'll add it specially)
        const topSubtiers = Object.entries(subtierCounts)
          .filter(([name]) => name !== 'Defense Logistics Agency')
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
        
        // Build hierarchical data
        const hierarchicalData: AgencyData[] = []
        
        // Add DLA total first if it exists
        const dlaTotal = subtierCounts['Defense Logistics Agency']
        if (dlaTotal) {
          hierarchicalData.push({
            name: 'Defense Logistics Agency',
            fullName: 'Defense Logistics Agency',
            value: dlaTotal,
            isHighlighted: true,
            isSubItem: false,
            indent: 0
          })
          
          // Add DLA sub-offices
          const dlaOffices = Object.entries(dlaOfficeCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
          
          dlaOffices.forEach(([office, count]) => {
            const displayName = office.replace('Defense Logistics Agency ', '')
              .replace('DLA ', '')
            hierarchicalData.push({
              name: displayName.length > 25 ? displayName.substring(0, 25) + '...' : displayName,
              fullName: `DLA - ${displayName}`,
              value: count,
              isSubItem: true,
              indent: 20
            })
          })
        }
        
        // Add other top agencies
        topSubtiers.forEach(([name, value]) => {
          hierarchicalData.push({
            name: name.length > 30 ? name.substring(0, 30) + '...' : name,
            fullName: name,
            value: value as number,
            isHighlighted: name.toLowerCase().includes('maritime'),
            isSubItem: false,
            indent: 0
          })
        })
        
        setData(hierarchicalData)
      })
      .catch(err => console.error('Failed to fetch agency data:', err))
  }, [])

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Active Solicitations by Subtier</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Defense Logistics Agency with Maritime, Aviation breakdown</p>
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
                width={150}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-muted)", opacity: 0.3 }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isHighlighted ? "var(--color-chart-3)" : 
                          entry.isSubItem ? "var(--color-chart-2)" : "var(--color-chart-1)"}
                    fillOpacity={entry.isSubItem ? 0.7 : (entry.isHighlighted ? 0.95 : 0.9)}
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

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts"

interface BranchData {
  name: string
  value: number
  count: number
}

const BRANCH_COLORS = [
  '#60a5fa', // Army - blue
  '#818cf8', // Navy - indigo
  '#c084fc', // Air Force - purple
  '#f472b6', // Marines - pink
  '#fb923c', // Space Force - orange
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{item.name}</p>
        <p className="text-xs text-muted-foreground">Total: ${item.value}M</p>
        <p className="text-xs text-muted-foreground">{item.count} opportunities</p>
      </div>
    )
  }
  return null
}

export function FundingBreakdown() {
  const [data, setData] = useState<BranchData[]>([])
  const [loading, setLoading] = useState(true)
  const [totalFunding, setTotalFunding] = useState("$0")

  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=500')
      .then(res => res.json())
      .then(result => {
        const signals = result.signals || []
        
        // Group by military branch/subtier
        const branchFunding: { [key: string]: { value: number; count: number } } = {}
        
        signals.forEach((s: any) => {
          const subtier = s.metadata?.subtier || s.metadata?.office || 'Other DoD'
          const valueStr = s.metadata?.value || '0'
          
          // Parse value
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
          
          if (!branchFunding[subtier]) {
            branchFunding[subtier] = { value: 0, count: 0 }
          }
          branchFunding[subtier].value += value
          branchFunding[subtier].count += 1
        })
        
        // Convert to array and sort
        const sorted = Object.entries(branchFunding)
          .map(([name, data]) => ({
            name: name.length > 20 ? name.substring(0, 20) + '...' : name,
            value: Math.round(data.value * 10) / 10,
            count: data.count
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5) // Top 5
        
        setData(sorted)
        
        const total = sorted.reduce((sum, item) => sum + item.value, 0)
        if (total >= 1000) {
          setTotalFunding(`$${(total / 1000).toFixed(2)}B`)
        } else {
          setTotalFunding(`$${Math.round(total)}M`)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch funding data:', err)
        setLoading(false)
      })
  }, [])

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Funding by Branch</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Total contract value by DoD component</p>
          </div>
          <span className="px-2 py-1 text-xs font-medium bg-chart-1/10 text-chart-1 rounded-md">{totalFunding}</span>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
            Loading...
          </div>
        ) : data.length === 0 ? (
          <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
            No funding data available
          </div>
        ) : (
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickFormatter={(value) => `$${value}M`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-muted)", opacity: 0.3 }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={BRANCH_COLORS[index % BRANCH_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

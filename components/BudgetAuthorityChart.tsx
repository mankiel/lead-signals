"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowUpRight } from "lucide-react"

interface BudgetData {
  name: string
  value: number
  count: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg min-w-40">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        <div className="flex items-center justify-between gap-4 text-xs">
          <span className="text-muted-foreground">Total Value</span>
          <span className="text-foreground font-medium">${item.value}M</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-xs mt-1">
          <span className="text-muted-foreground">Opportunities</span>
          <span className="text-foreground font-medium">{item.count}</span>
        </div>
      </div>
    )
  }
  return null
}

export function BudgetAuthorityChart() {
  const [data, setData] = useState<BudgetData[]>([])
  const [totalValue, setTotalValue] = useState("$0")

  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=500')
      .then(res => res.json())
      .then(result => {
        const signals = result.signals || []
        
        // Group by agency and sum values
        const agencyBudgets: { [key: string]: { value: number; count: number } } = {}
        
        signals.forEach((s: any) => {
          const agency = s.metadata?.agency || s.companyName || 'UNKNOWN'
          const valueStr = s.metadata?.value || '0'
          
          // Parse value (remove $ , M K etc)
          let value = 0
          if (valueStr) {
            const cleaned = valueStr.replace(/[$,]/g, '')
            const match = cleaned.match(/([\d.]+)\s*([MKB])?/)
            if (match) {
              value = parseFloat(match[1])
              const unit = match[2]
              if (unit === 'K') value /= 1000 // Convert to millions
              else if (unit === 'B') value *= 1000
              // M is already millions
            }
          }
          
          if (!agencyBudgets[agency]) {
            agencyBudgets[agency] = { value: 0, count: 0 }
          }
          agencyBudgets[agency].value += value
          agencyBudgets[agency].count += 1
        })
        
        // Convert to array and sort
        const sorted = Object.entries(agencyBudgets)
          .map(([name, data]) => ({
            name: name.length > 15 ? name.substring(0, 15) : name,
            value: Math.round(data.value * 10) / 10, // Round to 1 decimal
            count: data.count
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10) // Top 10
        
        setData(sorted)
        
        // Calculate total
        const total = sorted.reduce((sum, item) => sum + item.value, 0)
        if (total >= 1000) {
          setTotalValue(`$${(total / 1000).toFixed(2)}B`)
        } else {
          setTotalValue(`$${Math.round(total)}M`)
        }
      })
      .catch(err => console.error('Failed to fetch budget data:', err))
  }, [])

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Contract Value by Agency</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Total opportunity value distribution</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-chart-2/10 text-chart-2 rounded-md">{totalValue} Total</span>
            <button className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors">
              Details
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                tickFormatter={(value) => `$${value}M`}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-muted)", opacity: 0.3 }} />
              <Bar dataKey="value" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

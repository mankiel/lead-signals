"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowUpRight } from "lucide-react"

interface ContractData {
  name: string
  value: number
  fullTitle: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg min-w-60 max-w-xs">
        <p className="text-sm font-medium text-foreground mb-2">{item.fullTitle}</p>
        <div className="flex items-center justify-between gap-4 text-xs">
          <span className="text-muted-foreground">Funding Allocated</span>
          <span className="text-foreground font-medium">${item.value}M</span>
        </div>
      </div>
    )
  }
  return null
}

interface BudgetAuthorityChartProps {
  selectedOffices?: string[]
  selectedSubtiers?: string[]
}

export function BudgetAuthorityChart({ selectedOffices = [], selectedSubtiers = [] }: BudgetAuthorityChartProps) {
  const [data, setData] = useState<ContractData[]>([])
  const [totalValue, setTotalValue] = useState("$0")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('BudgetAuthorityChart: Starting fetch...')
    fetch('/api/signals?type=government_contract&limit=500')
      .then(res => {
        console.log('BudgetAuthorityChart: Response status:', res.status, res.ok)
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        return res.json()
      })
      .then(result => {
        console.log('BudgetAuthorityChart: Received data, signals count:', result.signals?.length || 0)
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
        
        // Get all contracts with values and sort by value
        const allContractsWithValues = signals.map((s: any) => {
          // Try to get value from metadata.value or extract from description
          let valueStr = s.metadata?.value || ''
          if (!valueStr && s.description) {
            // Extract value from description like "Value: $50M-$100M"
            const valueMatch = s.description.match(/Value:\s*\$?([\d.]+[MKB]?)(?:-\$?([\d.]+[MKB]?))?/i)
            if (valueMatch) {
              // If range, use the higher value
              valueStr = valueMatch[2] || valueMatch[1]
            }
          }
          
          const title = s.metadata?.title || s.description?.split('|')[0]?.trim() || 'Untitled'
          const agency = s.metadata?.agency || s.companyName || 'Unknown'
          
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
          
          return {
            name: title.length > 30 ? title.substring(0, 30) + '...' : title,
            fullTitle: `${title} (${agency})`,
            value: Math.round(value * 10) / 10, // Round to 1 decimal
            agency
          }
        })
        .filter((c: ContractData) => c.value > 0) // Only contracts with values
        .sort((a: ContractData, b: ContractData) => b.value - a.value)
        .slice(0, 3) // Top 3
        
        console.log('BudgetAuthorityChart: Top 3 contracts:', allContractsWithValues)
        setData(allContractsWithValues)
        
        // Calculate total
        const total = allContractsWithValues.reduce((sum: number, item: ContractData) => sum + item.value, 0)
        if (total >= 1000) {
          setTotalValue(`$${(total / 1000).toFixed(2)}B`)
        } else {
          setTotalValue(`$${Math.round(total)}M`)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('BudgetAuthorityChart: Error:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [selectedOffices, selectedSubtiers])

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Top 3 Contracts by Value</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Highest value contracts with funding allocated</p>
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
        {loading ? (
          <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
            Loading...
          </div>
        ) : error ? (
          <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
            {error === 'Failed to fetch data' ? 'Please sign in to view data' : 'Error loading data'}
          </div>
        ) : data.length === 0 ? (
          <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
            No contract data available
          </div>
        ) : (
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
                  width={120}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-muted)", opacity: 0.3 }} />
                <Bar dataKey="value" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

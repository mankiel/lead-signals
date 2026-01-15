"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, LabelList } from "recharts"
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AgencyData {
  name: string
  shortName: string
  value: number
  fullName: string
  maritime: number
  aviation: number
  other: number
  isHighlighted?: boolean
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  const item = payload[0].payload

  return (
    <div className="rounded-lg border border-border/50 bg-card p-3 shadow-xl">
      <p className="mb-2 font-medium text-card-foreground">{item.fullName}</p>
      <div className="space-y-1.5 text-sm">
        <div className="flex items-center justify-between gap-8">
          <span className="text-muted-foreground">Total Solicitations</span>
          <span className="font-mono font-semibold text-card-foreground">{item.value.toLocaleString()}</span>
        </div>
        <div className="my-2 h-px bg-border" />
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-[#22d3ee]" />
            <span className="text-muted-foreground">Maritime</span>
          </div>
          <span className="font-mono text-card-foreground">{item.maritime.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-[#a78bfa]" />
            <span className="text-muted-foreground">Aviation</span>
          </div>
          <span className="font-mono text-card-foreground">{item.aviation.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-[#64748b]" />
            <span className="text-muted-foreground">Other</span>
          </div>
          <span className="font-mono text-card-foreground">{item.other.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export function SolicitationsChart() {
  const [data, setData] = useState<AgencyData[]>([])
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=500')
      .then(res => res.json())
      .then(result => {
        const signals = result.signals || []
        
        // Count by subtier and track breakdown by office type
        const subtierData: { [key: string]: { total: number; maritime: number; aviation: number; other: number } } = {}
        
        signals.forEach((s: any) => {
          const subtier = s.metadata?.subtier || s.metadata?.office || s.metadata?.agency || 'Unknown Subtier'
          const office = (s.metadata?.office || '').toLowerCase()
          
          if (!subtierData[subtier]) {
            subtierData[subtier] = { total: 0, maritime: 0, aviation: 0, other: 0 }
          }
          
          subtierData[subtier].total += 1
          
          // Categorize by office type
          if (office.includes('maritime') || office.includes('navy')) {
            subtierData[subtier].maritime += 1
          } else if (office.includes('aviation') || office.includes('air')) {
            subtierData[subtier].aviation += 1
          } else {
            subtierData[subtier].other += 1
          }
        })
        
        // Convert to array and sort
        const formattedData = Object.entries(subtierData)
          .map(([name, counts]) => ({
            name: name.length > 30 ? name.substring(0, 30) + '...' : name,
            shortName: name.replace('Defense Logistics Agency', 'DLA')
              .replace('The Army', 'Army')
              .replace('The Navy', 'Navy')
              .replace('The Air Force', 'Air Force')
              .substring(0, 20),
            fullName: name,
            value: counts.total,
            maritime: counts.maritime,
            aviation: counts.aviation,
            other: counts.other,
            isHighlighted: name.toLowerCase().includes('defense logistics')
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10)
        
        setData(formattedData)
      })
      .catch(err => console.error('Failed to fetch agency data:', err))
  }, [])

  const maxValue = Math.max(...data.map((d) => d.value), 1)

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-foreground">Active Solicitations by Subtier</CardTitle>
          <CardDescription className="text-muted-foreground">
            Defense Logistics Agency with Maritime, Aviation breakdown
          </CardDescription>
        </div>
        <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
          View all
          <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showBreakdown ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            <span>{showBreakdown ? "Hide" : "Show"} breakdown</span>
          </button>
          {showBreakdown && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-[#22d3ee]" />
                <span className="text-muted-foreground">Maritime</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-[#a78bfa]" />
                <span className="text-muted-foreground">Aviation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-[#64748b]" />
                <span className="text-muted-foreground">Other</span>
              </div>
            </div>
          )}
        </div>

        <div className="h-[420px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, bottom: 0, left: 0 }} barCategoryGap="20%">
              <XAxis type="number" hide domain={[0, maxValue * 1.1]} />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                width={200}
                tick={({ x, y, payload }) => {
                  const item = data.find((d) => d.name === payload.value)
                  const index = data.findIndex((d) => d.name === payload.value)
                  const isHovered = hoveredIndex === index
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={-8}
                        y={0}
                        dy={4}
                        textAnchor="end"
                        className={`text-xs transition-colors ${isHovered ? "fill-foreground" : "fill-muted-foreground"}`}
                        style={{ fontSize: "11px" }}
                      >
                        {item?.shortName || payload.value}
                      </text>
                    </g>
                  )
                }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)", radius: 4 }} />

              {showBreakdown ? (
                <>
                  <Bar dataKey="maritime" stackId="a" fill="#22d3ee" radius={[4, 0, 0, 4]} onMouseEnter={(_, index) => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} />
                  <Bar dataKey="aviation" stackId="a" fill="#a78bfa" onMouseEnter={(_, index) => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} />
                  <Bar dataKey="other" stackId="a" fill="#64748b" radius={[0, 4, 4, 0]} onMouseEnter={(_, index) => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                    <LabelList dataKey="value" position="right" offset={8} className="fill-muted-foreground text-xs" formatter={(value: number) => value.toLocaleString()} />
                  </Bar>
                </>
              ) : (
                <Bar dataKey="value" radius={[4, 4, 4, 4]} onMouseEnter={(_, index) => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                  {data.map((entry, index) => {
                    const opacity = 1 - index * 0.08
                    const isHovered = hoveredIndex === index
                    return <Cell key={`cell-${index}`} fill={isHovered ? "#6ba3f8" : "#4f8ff7"} fillOpacity={isHovered ? 1 : opacity} style={{ transition: "all 0.2s ease" }} />
                  })}
                  <LabelList dataKey="value" position="right" offset={8} className="fill-muted-foreground text-xs" formatter={(value: number) => value.toLocaleString()} />
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4 text-xs">
          <span className="text-muted-foreground">
            Total: <span className="font-medium text-foreground">{data.reduce((acc, d) => acc + d.value, 0).toLocaleString()}</span> solicitations
          </span>
          <span className="text-muted-foreground">
            Across <span className="font-medium text-foreground">{data.length}</span> subtiers
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

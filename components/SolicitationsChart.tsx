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
  subtiers?: Array<{ name: string; count: number }>
  [key: string]: any // For dynamic subtier0, subtier1, etc.
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  const item = payload[0].payload

  return (
    <div className="rounded-lg border border-border/50 bg-card p-3 shadow-xl max-w-sm">
      <p className="mb-2 font-medium text-card-foreground">{item.fullName}</p>
      <div className="space-y-1.5 text-sm">
        <div className="flex items-center justify-between gap-8">
          <span className="text-muted-foreground">Total Solicitations</span>
          <span className="font-mono font-semibold text-card-foreground">{item.value.toLocaleString()}</span>
        </div>
        
        {item.subtiers && item.subtiers.length > 0 && (
          <>
            <div className="my-2 h-px bg-border" />
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Subtiers:</p>
              {item.subtiers.slice(0, 5).map((subtier: { name: string; count: number }, idx: number) => (
                <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-muted-foreground truncate">{subtier.name.length > 30 ? subtier.name.substring(0, 30) + '...' : subtier.name}</span>
                  <span className="font-mono text-card-foreground whitespace-nowrap">{subtier.count}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

interface SolicitationsChartProps {
  selectedOffices?: string[]
  selectedSubtiers?: string[]
}

export function SolicitationsChart({ selectedOffices = [], selectedSubtiers = [] }: SolicitationsChartProps) {
  const [data, setData] = useState<AgencyData[]>([])
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
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
        
        // Group by office (tier/agency) and track subtiers
        const officeData: { [key: string]: { 
          total: number;
          subtiers: { [key: string]: number }
        } } = {}
        
        signals.forEach((s: any) => {
          const office = s.metadata?.office || 'Unknown Office'
          const subtier = s.metadata?.subtier || 'Other'
          
          if (!officeData[office]) {
            officeData[office] = { total: 0, subtiers: {} }
          }
          
          officeData[office].total += 1
          officeData[office].subtiers[subtier] = (officeData[office].subtiers[subtier] || 0) + 1
        })
        
        // Convert to array and sort by total
        const allOffices = Object.entries(officeData)
          .map(([name, data]) => {
            // Get top 3 subtiers for this office
            const sortedSubtiers = Object.entries(data.subtiers)
              .sort((a, b) => b[1] - a[1])
            
            const top3Subtiers = sortedSubtiers.slice(0, 3)
            const remaining = sortedSubtiers.slice(3)
            
            // Create data structure for stacked bars
            const result: any = {
              name: name.length > 25 ? name.substring(0, 25) + '...' : name,
              shortName: name.replace('Defense Logistics Agency', 'DLA')
                .replace('The Army', 'Army')
                .replace('The Navy', 'Navy')
                .replace('The Air Force', 'Air Force')
                .replace('National Geospatial-Intelligence Agency', 'NGA')
                .replace('Defense Information Systems Agency', 'DISA')
                .replace('Defense Health Agency', 'DHA')
                .substring(0, 20),
              fullName: name,
              value: data.total,
              subtiers: Object.entries(data.subtiers).map(([n, c]) => ({ name: n, count: c }))
            }
            
            // Add each subtier as a separate bar segment
            top3Subtiers.forEach(([subtierName, count], idx) => {
              result[`subtier${idx}`] = count
              result[`subtierName${idx}`] = subtierName
            })
            
            // Add "other subtiers" if any
            if (remaining.length > 0) {
              const otherCount = remaining.reduce((sum, [, count]) => sum + count, 0)
              result.subtierOther = otherCount
            }
            
            return result
          })
          .sort((a, b) => b.value - a.value)
        
        setData(allOffices.slice(0, 5))
      })
      .catch(err => console.error('Failed to fetch agency data:', err))
  }, [selectedOffices, selectedSubtiers])

  const maxValue = Math.max(...data.map((d) => d.value), 1)

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-foreground">Active Solicitations by Agency</CardTitle>
          <CardDescription className="text-muted-foreground">
            Agencies with top subtier breakdown
          </CardDescription>
        </div>
        <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
          View all
          <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs border-b border-border/30 pb-3">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-foreground bg-muted/50 hover:bg-muted transition-colors border border-border/50"
          >
            {showBreakdown ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            <span>{showBreakdown ? "Hide" : "Show"} subtier breakdown</span>
          </button>
          
          {showBreakdown && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-[#4f8ff7]" />
                <span className="text-muted-foreground">Subtier 1</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-[#22d3ee]" />
                <span className="text-muted-foreground">Subtier 2</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-[#a78bfa]" />
                <span className="text-muted-foreground">Subtier 3</span>
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
                  <Bar dataKey="subtier0" stackId="a" fill="#4f8ff7" radius={[4, 0, 0, 4]} onMouseEnter={(_, index) => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} />
                  <Bar dataKey="subtier1" stackId="a" fill="#22d3ee" onMouseEnter={(_, index) => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} />
                  <Bar dataKey="subtier2" stackId="a" fill="#a78bfa" onMouseEnter={(_, index) => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} />
                  <Bar dataKey="subtierOther" stackId="a" fill="#64748b" radius={[0, 4, 4, 0]} onMouseEnter={(_, index) => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                    <LabelList dataKey="value" position="right" offset={8} className="fill-muted-foreground text-xs" formatter={(value) => typeof value === 'number' ? value.toLocaleString() : ''} />
                  </Bar>
                </>
              ) : (
                <Bar dataKey="value" radius={[4, 4, 4, 4]} onMouseEnter={(_, index) => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                  {data.map((entry, index) => {
                    const opacity = 1 - index * 0.08
                    const isHovered = hoveredIndex === index
                    return <Cell key={`cell-${index}`} fill={isHovered ? "#6ba3f8" : "#4f8ff7"} fillOpacity={isHovered ? 1 : opacity} style={{ transition: "all 0.2s ease" }} />
                  })}
                  <LabelList dataKey="value" position="right" offset={8} className="fill-muted-foreground text-xs" formatter={(value) => typeof value === 'number' ? value.toLocaleString() : ''} />
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
            Across <span className="font-medium text-foreground">{data.length}</span> agencies
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

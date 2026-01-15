"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, LabelList } from "recharts"
import { ExternalLink, ChevronDown, ChevronUp, Filter, X } from "lucide-react"
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
  offices?: Array<{ name: string; count: number }>
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
        
        {item.offices && item.offices.length > 0 && (
          <>
            <div className="my-2 h-px bg-border" />
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Top Offices:</p>
              {item.offices.slice(0, 5).map((office: { name: string; count: number }, idx: number) => (
                <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-muted-foreground truncate">{office.name}</span>
                  <span className="font-mono text-card-foreground whitespace-nowrap">{office.count}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function SolicitationsChart() {
  const [data, setData] = useState<AgencyData[]>([])
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSubtier, setSelectedSubtier] = useState<string>('')
  const [selectedOffice, setSelectedOffice] = useState<string>('')
  const [allSubtiers, setAllSubtiers] = useState<string[]>([])
  const [allOffices, setAllOffices] = useState<string[]>([])
  
  useEffect(() => {
    fetch('/api/signals?type=government_contract&limit=500')
      .then(res => res.json())
      .then(result => {
        const signals = result.signals || []
        
        // Collect all unique subtiers and offices for filters
        const uniqueSubtiers = new Set<string>()
        const uniqueOffices = new Set<string>()
        
        signals.forEach((s: any) => {
          const subtier = s.metadata?.subtier || s.metadata?.office || s.metadata?.agency || 'Unknown Subtier'
          const office = s.metadata?.office || 'Unknown Office'
          uniqueSubtiers.add(subtier)
          uniqueOffices.add(office)
        })
        
        setAllSubtiers(Array.from(uniqueSubtiers).sort())
        setAllOffices(Array.from(uniqueOffices).sort())
        
        // Apply filters
        const filteredSignals = signals.filter((s: any) => {
          const subtier = s.metadata?.subtier || s.metadata?.office || s.metadata?.agency || 'Unknown Subtier'
          const office = s.metadata?.office || 'Unknown Office'
          
          if (selectedSubtier && subtier !== selectedSubtier) return false
          if (selectedOffice && office !== selectedOffice) return false
          
          return true
        })
        
        // Count by subtier and track breakdown by office type
        const subtierData: { [key: string]: { 
          total: number; 
          maritime: number; 
          aviation: number; 
          other: number;
          offices: { [key: string]: number }
        } } = {}
        
        filteredSignals.forEach((s: any) => {
          const subtier = s.metadata?.subtier || s.metadata?.office || s.metadata?.agency || 'Unknown Subtier'
          const office = s.metadata?.office || 'Unknown Office'
          const officeLower = office.toLowerCase()
          
          if (!subtierData[subtier]) {
            subtierData[subtier] = { total: 0, maritime: 0, aviation: 0, other: 0, offices: {} }
          }
          
          subtierData[subtier].total += 1
          
          // Track office counts
          subtierData[subtier].offices[office] = (subtierData[subtier].offices[office] || 0) + 1
          
          // Categorize by office type
          if (officeLower.includes('maritime') || officeLower.includes('navy')) {
            subtierData[subtier].maritime += 1
          } else if (officeLower.includes('aviation') || officeLower.includes('air')) {
            subtierData[subtier].aviation += 1
          } else {
            subtierData[subtier].other += 1
          }
        })
        
        // Convert to array and sort
        const allSubtiers = Object.entries(subtierData)
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
            isHighlighted: name.toLowerCase().includes('defense logistics'),
            offices: Object.entries(counts.offices)
              .map(([officeName, count]) => ({ name: officeName, count: count as number }))
              .sort((a, b) => b.count - a.count)
          }))
          .sort((a, b) => b.value - a.value)
        
        // Take top 4 and combine rest into "Other"
        const topSubtiers = allSubtiers.slice(0, 4)
        const remainingSubtiers = allSubtiers.slice(4)
        
        const formattedData = [...topSubtiers]
        
        // Add "Other" category if there are remaining subtiers
        if (remainingSubtiers.length > 0) {
          const otherTotal = remainingSubtiers.reduce((sum, s) => sum + s.value, 0)
          const otherMaritime = remainingSubtiers.reduce((sum, s) => sum + s.maritime, 0)
          const otherAviation = remainingSubtiers.reduce((sum, s) => sum + s.aviation, 0)
          const otherOther = remainingSubtiers.reduce((sum, s) => sum + s.other, 0)
          
          // Combine all offices from remaining subtiers
          const combinedOffices: { [key: string]: number } = {}
          remainingSubtiers.forEach(s => {
            s.offices?.forEach(office => {
              combinedOffices[office.name] = (combinedOffices[office.name] || 0) + office.count
            })
          })
          
          formattedData.push({
            name: 'Other',
            shortName: 'Other',
            fullName: `Other (${remainingSubtiers.length} subtiers)`,
            value: otherTotal,
            maritime: otherMaritime,
            aviation: otherAviation,
            other: otherOther,
            isHighlighted: false,
            offices: Object.entries(combinedOffices)
              .map(([name, count]) => ({ name, count }))
              .sort((a, b) => b.count - a.count)
          })
        }
        
        setData(formattedData)
      })
      .catch(err => console.error('Failed to fetch agency data:', err))
  }, [selectedSubtier, selectedOffice])

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
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs border-b border-border/30 pb-3">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-foreground bg-muted/50 hover:bg-muted transition-colors border border-border/50"
          >
            {showBreakdown ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            <span>{showBreakdown ? "Hide" : "Show"} breakdown</span>
          </button>
          
          <button
            onClick={() => {
              console.log('Filter button clicked, current state:', showFilters)
              setShowFilters(!showFilters)
            }}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-foreground bg-muted/50 hover:bg-muted transition-colors border border-border/50"
          >
            <Filter className="h-3.5 w-3.5" />
            <span>Filters</span>
            {(selectedSubtier || selectedOffice) && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                {(selectedSubtier ? 1 : 0) + (selectedOffice ? 1 : 0)}
              </span>
            )}
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

        {showFilters && (
          <div className="mb-4 space-y-3 rounded-lg border border-border/50 bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">Filter Signals</h4>
              {(selectedSubtier || selectedOffice) && (
                <button
                  onClick={() => {
                    setSelectedSubtier('')
                    setSelectedOffice('')
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              )}
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Subtier Agency</label>
                <div className="relative">
                  <select
                    value={selectedSubtier}
                    onChange={(e) => setSelectedSubtier(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">All Subtiers</option>
                    {allSubtiers.map(subtier => (
                      <option key={subtier} value={subtier}>{subtier}</option>
                    ))}
                  </select>
                  {selectedSubtier && (
                    <button
                      onClick={() => setSelectedSubtier('')}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Office</label>
                <div className="relative">
                  <select
                    value={selectedOffice}
                    onChange={(e) => setSelectedOffice(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">All Offices</option>
                    {allOffices.map(office => (
                      <option key={office} value={office}>{office}</option>
                    ))}
                  </select>
                  {selectedOffice && (
                    <button
                      onClick={() => setSelectedOffice('')}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {(selectedSubtier || selectedOffice) && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedSubtier && (
                  <div className="flex items-center gap-1 rounded-md bg-accent/10 px-2 py-1 text-xs">
                    <span className="text-muted-foreground">Subtier:</span>
                    <span className="font-medium text-foreground">{selectedSubtier}</span>
                    <button
                      onClick={() => setSelectedSubtier('')}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {selectedOffice && (
                  <div className="flex items-center gap-1 rounded-md bg-accent/10 px-2 py-1 text-xs">
                    <span className="text-muted-foreground">Office:</span>
                    <span className="font-medium text-foreground">{selectedOffice}</span>
                    <button
                      onClick={() => setSelectedOffice('')}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

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
            Across <span className="font-medium text-foreground">{data.length}</span> subtiers
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

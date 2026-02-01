"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell,
  LineChart, Line, CartesianGrid, Legend, ComposedChart, Area
} from "recharts"
import { TrendingUp, Building2, ChevronDown, Info, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AgencySpending {
  name: string
  code: string
  obligated: number
  budgetary_resources: number
}

interface YearlySpending {
  fiscal_year: number
  agency_budgetary_resources: number
  agency_total_obligated: number
  obligations_incurred: number
}

interface SubtierData {
  name: string
  abbreviation: string
  total_obligations: number
  transaction_count: number
  new_award_count: number
}

const formatCurrency = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(0)}K`
  return `$${value.toFixed(0)}`
}

const formatFullCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Defense-related agency codes
const DEFENSE_AGENCIES = [
  { code: '097', name: 'Department of Defense', shortName: 'DoD' },
  { code: '021', name: 'Department of the Army', shortName: 'Army' },
  { code: '017', name: 'Department of the Navy', shortName: 'Navy' },
  { code: '057', name: 'Department of the Air Force', shortName: 'Air Force' },
  { code: '096', name: 'U.S. Army Corps of Engineers', shortName: 'USACE' },
  { code: '097', name: 'Defense Logistics Agency', shortName: 'DLA' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-border/50 bg-card p-3 shadow-xl">
      <p className="font-medium text-card-foreground mb-2">FY {label}</p>
      <div className="space-y-1.5 text-sm">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-sm" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}</span>
            </div>
            <span className="font-mono font-medium text-card-foreground">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SubtierTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  const data = payload[0].payload

  return (
    <div className="rounded-lg border border-border/50 bg-card p-3 shadow-xl max-w-xs">
      <p className="font-medium text-card-foreground mb-2 text-sm">{data.name}</p>
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-6">
          <span className="text-muted-foreground">Total Obligations</span>
          <span className="font-mono font-medium text-card-foreground">
            {formatCurrency(data.total_obligations)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-muted-foreground">Transactions</span>
          <span className="font-mono font-medium text-card-foreground">
            {data.transaction_count?.toLocaleString() || 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-muted-foreground">New Awards</span>
          <span className="font-mono font-medium text-card-foreground">
            {data.new_award_count?.toLocaleString() || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  )
}

export function FederalSpendingChart() {
  const [yearlyData, setYearlyData] = useState<YearlySpending[]>([])
  const [subtierData, setSubtierData] = useState<SubtierData[]>([])
  const [selectedAgency, setSelectedAgency] = useState('097') // DoD by default
  const [fiscalYear, setFiscalYear] = useState('2024')
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [view, setView] = useState<'yearly' | 'subtiers'>('yearly')

  // Fetch yearly budgetary data for selected agency
  useEffect(() => {
    setLoading(true)
    fetch(`/api/spending?type=agency_budgetary&agency_code=${selectedAgency}`)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          // Sort by fiscal year and take last 5 years
          const sorted = data.results
            .sort((a: YearlySpending, b: YearlySpending) => a.fiscal_year - b.fiscal_year)
            .slice(-5)
          setYearlyData(sorted)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch yearly spending:', err)
        setLoading(false)
      })
  }, [selectedAgency])

  // Fetch subtier data when viewing subtiers
  useEffect(() => {
    if (view !== 'subtiers') return
    
    setLoading(true)
    fetch(`/api/spending?type=subtiers&agency_code=${selectedAgency}&fiscal_year=${fiscalYear}`)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          // Sort by obligations and take top 10
          const sorted = data.results
            .sort((a: SubtierData, b: SubtierData) => b.total_obligations - a.total_obligations)
            .slice(0, 10)
          setSubtierData(sorted)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch subtier data:', err)
        setLoading(false)
      })
  }, [selectedAgency, fiscalYear, view])

  const currentAgency = DEFENSE_AGENCIES.find(a => a.code === selectedAgency)
  const totalBudget = yearlyData.length > 0 
    ? yearlyData[yearlyData.length - 1]?.agency_budgetary_resources || 0 
    : 0
  const totalObligated = yearlyData.length > 0 
    ? yearlyData[yearlyData.length - 1]?.agency_total_obligated || 0 
    : 0

  return (
    <Card className="bg-card/50 border-border/60">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold text-foreground">
                Federal Spending Analysis
              </CardTitle>
              <TooltipProvider>
                <TooltipUI>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">
                      Data sourced from USAspending.gov. Shows budgetary resources and obligations 
                      to help identify agencies with the highest contract award potential.
                    </p>
                  </TooltipContent>
                </TooltipUI>
              </TooltipProvider>
            </div>
            <CardDescription className="text-[11px] text-muted-foreground">
              Budgetary resources and obligations by fiscal year
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedAgency} onValueChange={setSelectedAgency}>
              <SelectTrigger className="w-32 h-7 text-[11px] bg-muted/50 border-border/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEFENSE_AGENCIES.map(agency => (
                  <SelectItem key={agency.code} value={agency.code} className="text-xs">
                    {agency.shortName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex rounded-md border border-border/60 overflow-hidden">
              <button
                onClick={() => setView('yearly')}
                className={`px-2.5 py-1 text-[10px] font-medium transition-colors ${
                  view === 'yearly' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                }`}
              >
                Yearly Trend
              </button>
              <button
                onClick={() => setView('subtiers')}
                className={`px-2.5 py-1 text-[10px] font-medium transition-colors ${
                  view === 'subtiers' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                }`}
              >
                By Subtier
              </button>
            </div>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-border/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-chart-1/10">
              <DollarSign className="w-3.5 h-3.5 text-chart-1" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">FY{fiscalYear} Budget</p>
              <p className="text-sm font-semibold text-foreground">{formatCurrency(totalBudget)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-chart-2/10">
              <TrendingUp className="w-3.5 h-3.5 text-chart-2" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">FY{fiscalYear} Obligated</p>
              <p className="text-sm font-semibold text-foreground">{formatCurrency(totalObligated)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {loading ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground text-xs">
            Loading spending data...
          </div>
        ) : view === 'yearly' ? (
          <>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={yearlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                  <XAxis 
                    dataKey="fiscal_year" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                    tickFormatter={(value) => `FY${String(value).slice(-2)}`}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="agency_budgetary_resources"
                    name="Budgetary Resources"
                    fill="var(--color-chart-1)"
                    fillOpacity={0.1}
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="agency_total_obligated"
                    name="Total Obligated"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-2)", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-border/30">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-chart-1 rounded" />
                <span className="text-[10px] text-muted-foreground">Budgetary Resources</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-chart-2 rounded-full" />
                <span className="text-[10px] text-muted-foreground">Total Obligated</span>
              </div>
            </div>
          </>
        ) : (
          <>
            {view === 'subtiers' && (
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">Fiscal Year:</span>
                <Select value={fiscalYear} onValueChange={setFiscalYear}>
                  <SelectTrigger className="w-20 h-6 text-[10px] bg-muted/50 border-border/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['2024', '2023', '2022', '2021', '2020'].map(year => (
                      <SelectItem key={year} value={year} className="text-xs">
                        FY{year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={subtierData} 
                  layout="vertical" 
                  margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
                >
                  <XAxis 
                    type="number" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="abbreviation"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                    width={80}
                  />
                  <Tooltip content={<SubtierTooltip />} cursor={{ fill: "var(--color-muted)", opacity: 0.15 }} />
                  <Bar 
                    dataKey="total_obligations" 
                    radius={[0, 4, 4, 0]} 
                    barSize={20}
                    onMouseEnter={(_, index) => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {subtierData.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={hoveredIndex === index ? "var(--color-chart-1)" : "var(--color-primary)"}
                        fillOpacity={hoveredIndex === index ? 1 : 0.8 - index * 0.05}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border/30 text-center">
              <p className="text-[10px] text-muted-foreground">
                Showing top {subtierData.length} sub-agencies by FY{fiscalYear} obligations
              </p>
            </div>
          </>
        )}
        
        <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/30">
          <div className="flex items-start gap-2">
            <Building2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">Contract Opportunity Insight</p>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                {currentAgency?.shortName || 'This agency'} shows {yearlyData.length > 1 && yearlyData[yearlyData.length - 1]?.agency_budgetary_resources > yearlyData[yearlyData.length - 2]?.agency_budgetary_resources ? 'increasing' : 'stable'} budgetary resources. 
                Higher budgets indicate more contract opportunities. Focus on subtiers with the highest obligation rates for the best chance of winning awards.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

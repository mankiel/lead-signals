"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowUpRight } from "lucide-react"

// Real contract values from 20 SAM.gov opportunities (in millions)
// DHS Border: $156M, DoD UAS: $89M, GSA Cloud: $75M, GSA Energy: $67.5M, DOE: $52M, DOC: $46M
// VA EHR: $35M, SSA: $38.9M, HHS: $31.5M, NIH: $29.6M, DOT: $28M, NASA: $25M, Interior: $23.4M
// Education: $21.2M, EPA: $19.8M, DoD JAIRIA: $18.5M, Agriculture: $16.7M, VA Eyeglasses: $12.3M
const data = [
  { name: "DHS", value: 198, count: 2 }, // Border $156M + CSOC $42M
  { name: "DoD", value: 107.5, count: 2 }, // UAS $89M + JAIRIA $18.5M
  { name: "GSA", value: 142.5, count: 2 }, // Cloud $75M + Energy $67.5M
  { name: "DOE", value: 52, count: 1 },
  { name: "VA", value: 47.3, count: 2 }, // EHR $35M + Eyeglasses $12.3M
  { name: "DOC", value: 46, count: 1 },
  { name: "HHS", value: 31.5, count: 1 },
  { name: "SSA", value: 38.9, count: 1 },
  { name: "NIH", value: 29.6, count: 1 },
  { name: "STATE", value: 94.8, count: 1 },
]

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
  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Contract Value by Agency</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Total opportunity value distribution</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-chart-2/10 text-chart-2 rounded-md">$1.16B Total</span>
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

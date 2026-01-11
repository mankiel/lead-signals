"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowUpRight } from "lucide-react"

const data = [
  { name: "DEFENSE", budget: 280, obligated: 220, outlay: 180 },
  { name: "HHS", budget: 180, obligated: 150, outlay: 120 },
  { name: "VA", budget: 150, obligated: 120, outlay: 95 },
  { name: "TREASURY", budget: 120, obligated: 90, outlay: 70 },
  { name: "AGRICULTURE", budget: 95, obligated: 75, outlay: 60 },
  { name: "DHS", budget: 85, obligated: 68, outlay: 52 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg min-w-40">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="text-foreground font-medium">${item.value}B</span>
          </div>
        ))}
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
            <CardTitle className="text-sm font-medium text-foreground">Agency Budget Authority</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Federal spending by major agencies</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-chart-2/10 text-chart-2 rounded-md">FY 2025</span>
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
                tickFormatter={(value) => `$${value}B`}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-muted)", opacity: 0.3 }} />
              <Bar dataKey="budget" fill="var(--color-chart-1)" radius={[0, 2, 2, 0]} barSize={6} name="Budget" />
              <Bar dataKey="obligated" fill="var(--color-chart-2)" radius={[0, 2, 2, 0]} barSize={6} name="Obligated" />
              <Bar dataKey="outlay" fill="var(--color-chart-3)" radius={[0, 2, 2, 0]} barSize={6} name="Outlay" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-1" />
            <span className="text-xs text-muted-foreground">Budget Authority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-2" />
            <span className="text-xs text-muted-foreground">Obligated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-3" />
            <span className="text-xs text-muted-foreground">Outlay</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

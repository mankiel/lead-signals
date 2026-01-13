"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { ArrowUpRight } from "lucide-react"

// Real agency distribution from 20 SAM.gov opportunities
const data = [
  { name: "DEFENSE", value: 2, fullName: "Department of Defense" },
  { name: "VA", value: 2, fullName: "Department of Veterans Affairs" },
  { name: "GSA", value: 2, fullName: "General Services Administration" },
  { name: "DHS", value: 2, fullName: "Department of Homeland Security" },
  { name: "HHS", value: 1, fullName: "Health and Human Services" },
  { name: "NASA", value: 1, fullName: "National Aeronautics and Space Administration" },
  { name: "DOE", value: 1, fullName: "Department of Energy" },
  { name: "DOT", value: 1, fullName: "Department of Transportation" },
  { name: "NIH", value: 1, fullName: "National Institutes of Health" },
  { name: "EPA", value: 1, fullName: "Environmental Protection Agency" },
  { name: "OTHER", value: 6, fullName: "Other Agencies (Commerce, Interior, Agriculture, SSA, Education, State)" },
]

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

export function SolicitationsChart() {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Active Solicitations by Agency</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Top 11 agencies with active opportunities</p>
          </div>
          <button className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors">
            View all
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-muted)", opacity: 0.3 }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="var(--color-chart-1)"
                    fillOpacity={1 - index * 0.07}
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

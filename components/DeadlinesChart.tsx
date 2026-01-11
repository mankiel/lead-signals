"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "0-7 days", urgent: 45, soon: 25, midterm: 15, later: 10 },
  { name: "8-14 days", urgent: 0, soon: 65, midterm: 20, later: 12 },
  { name: "15-21 days", urgent: 0, soon: 0, midterm: 55, later: 18 },
  { name: "21-30 days", urgent: 0, soon: 0, midterm: 0, later: 42 },
]

const legendItems = [
  { name: "Urgent", color: "var(--color-chart-5)" },
  { name: "Soon", color: "var(--color-chart-3)" },
  { name: "Mid-term", color: "var(--color-chart-1)" },
  { name: "Later", color: "var(--color-muted-foreground)" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, item: any) => sum + item.value, 0)
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        <p className="text-xs text-muted-foreground">{total} total contracts</p>
      </div>
    )
  }
  return null
}

export function DeadlinesChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Upcoming Deadlines</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Contract response timeline distribution</p>
          </div>
          <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md">139 active</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-muted)", opacity: 0.3 }} />
              <Bar dataKey="urgent" stackId="a" fill="var(--color-chart-5)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="soon" stackId="a" fill="var(--color-chart-3)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="midterm" stackId="a" fill="var(--color-chart-1)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="later" stackId="a" fill="var(--color-muted-foreground)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
          {legendItems.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

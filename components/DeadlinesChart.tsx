"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

// Real deadline distribution from 20 SAM.gov opportunities
// 0-7 days: 3 urgent (2, 4, 4 days)
// 8-30 days: 3 (36, 39 days - NASA, VA Eyeglasses)
// 31-60 days: 4 (45, 49, 50, 56 days)
// 61-90 days: 5 (66, 68, 70, 79, 81, 85 days)
// 91+ days: 5 (93, 100, 102, 107, 122, 127 days)
const data = [
  { name: "0-7 days", urgent: 3, soon: 0, midterm: 0, later: 0 },
  { name: "8-30 days", urgent: 0, soon: 3, midterm: 0, later: 0 },
  { name: "31-60 days", urgent: 0, soon: 0, midterm: 4, later: 0 },
  { name: "61-90 days", urgent: 0, soon: 0, midterm: 5, later: 0 },
  { name: "91+ days", urgent: 0, soon: 0, midterm: 0, later: 5 },
]

const legendItems = [
  { name: "Urgent (<7d)", color: "var(--color-chart-5)" },
  { name: "Soon (8-30d)", color: "var(--color-chart-3)" },
  { name: "Mid-term (31-90d)", color: "var(--color-chart-1)" },
  { name: "Later (91+d)", color: "var(--color-muted-foreground)" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, item: any) => sum + item.value, 0)
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        <p className="text-xs text-muted-foreground">{total} opportunities</p>
      </div>
    )
  }
  return null
}

export function DeadlinesChart() {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Upcoming Deadlines</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Response deadline distribution</p>
          </div>
          <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md">20 active</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-45">
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

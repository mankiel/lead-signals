import { Card, CardContent } from "@/components/ui/card"
import { CheckSquare, Bell, Calendar, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"

const stats = [
  {
    label: "Active Opportunities",
    value: "50",
    change: "+12%",
    trend: "up",
    icon: CheckSquare,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    label: "Active Alerts",
    value: "0",
    change: "0%",
    trend: "neutral",
    icon: Bell,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
  {
    label: "Closing This Week",
    value: "27",
    change: "+5",
    trend: "up",
    icon: Calendar,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="bg-card/50 border-border/50 hover:border-accent/50 transition-colors group cursor-pointer"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <>
                    <TrendingUp className="w-3 h-3 text-chart-2" />
                    <span className="text-chart-2 font-medium">{stat.change}</span>
                  </>
                ) : stat.trend === "down" ? (
                  <>
                    <TrendingDown className="w-3 h-3 text-chart-5" />
                    <span className="text-chart-5 font-medium">{stat.change}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">{stat.change}</span>
                )}
              </div>
            </div>
            <div className="mt-4 pl-1">
              <p className="text-4xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground font-normal">{stat.label}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

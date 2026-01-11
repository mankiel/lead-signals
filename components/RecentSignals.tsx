"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const signals = [
  {
    id: 1,
    department: "Department of Veterans Affairs",
    type: "Government Contracts",
    title: "EHR Modernization Support | IDQ | NAICS: 541513 | Value: $30M-$45M",
    source: "SAM.gov",
    posted: "1/2/2025",
    deadline: "3/14/2026",
    daysLeft: 45,
    elapsed: 47,
    status: "active",
  },
  {
    id: 2,
    department: "General Services Administration",
    type: "Government Contracts",
    title: "Cloud Infrastructure Services IT Schedule 70 | NAICS: 541519 | Value: $50M-$100M",
    source: "SAM.gov",
    posted: "1/5/2025",
    deadline: "3/16/2026",
    daysLeft: 48,
    elapsed: 65,
    status: "active",
  },
  {
    id: 3,
    department: "Department of Defense",
    type: "Government Contracts",
    title: "JAIRIA - AI Research Initiative | Solicitation | NAICS: 541715 | Value: $15M-$25M",
    source: "SAM.gov",
    posted: "1/4/2026",
    deadline: "2/17/2026",
    daysLeft: 15,
    elapsed: 56,
    status: "active",
  },
  {
    id: 4,
    department: "DEFENSE",
    type: "Government Contracts",
    title: "SHEET, METAL | Type: Solicitation | Agency: DEFENSE | NAICS: 332999",
    source: "SAM.gov",
    posted: "1/5/2026",
    deadline: "1/10/2026",
    daysLeft: 0,
    elapsed: 100,
    status: "expired",
  },
  {
    id: 5,
    department: "VETERANS AFFAIRS",
    type: "Government Contracts",
    title: "5645--National Prescription Eyeglasses Manufacturing | Combined Synopsis",
    source: "SAM.gov",
    posted: "1/5/2025",
    deadline: "1/15/2026",
    daysLeft: 4,
    elapsed: 78,
    status: "urgent",
  },
]

const getDepartmentColor = (dept: string) => {
  const colors: Record<string, string> = {
    "Department of Veterans Affairs": "bg-chart-4",
    "General Services Administration": "bg-chart-2",
    "Department of Defense": "bg-chart-1",
    DEFENSE: "bg-chart-1",
    "VETERANS AFFAIRS": "bg-chart-4",
    "HOMELAND SECURITY": "bg-chart-2",
  }
  return colors[dept] || "bg-muted-foreground"
}

export function RecentSignals() {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-sm font-medium text-foreground">Recent Signals</CardTitle>
          <div className="flex items-center gap-2">
            <Select defaultValue="20">
              <SelectTrigger className="w-25 h-8 text-xs bg-secondary/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-25 h-8 text-xs bg-secondary/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="contracts">Contracts</SelectItem>
                <SelectItem value="grants">Grants</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs text-muted-foreground px-2">1 of 3</span>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="group border border-border rounded-lg p-4 hover:bg-secondary/30 hover:border-accent/30 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div
                className={cn("w-1 rounded-full self-stretch min-h-20", getDepartmentColor(signal.department))}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="font-medium text-sm text-foreground">{signal.department}</span>
                  <Badge variant="secondary" className="text-[10px] bg-secondary text-muted-foreground">
                    {signal.type}
                  </Badge>
                </div>
                <p className="text-sm text-foreground/80 mb-3 line-clamp-2">{signal.title}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Posted: {signal.posted}
                  </span>
                  <a href="#" className="text-accent hover:underline flex items-center gap-1">
                    {signal.source}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-accent group-hover:underline">View details →</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 min-w-32">
                {signal.status === "expired" ? (
                  <Badge className="bg-chart-5/20 text-chart-5 border-0 text-[10px]">EXPIRED</Badge>
                ) : signal.status === "urgent" ? (
                  <Badge className="bg-chart-3/20 text-chart-3 border-0 text-[10px]">{signal.daysLeft} days left</Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                    {signal.daysLeft} days left
                  </Badge>
                )}
                <span className="text-[10px] text-muted-foreground">Deadline: {signal.deadline}</span>
                <div className="w-full mt-1">
                  <div className="w-full bg-secondary rounded-full h-1">
                    <div
                      className={cn(
                        "h-1 rounded-full transition-all",
                        signal.status === "expired"
                          ? "bg-chart-5"
                          : signal.status === "urgent"
                            ? "bg-chart-3"
                            : "bg-chart-1",
                      )}
                      style={{ width: `${signal.elapsed}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{signal.elapsed}% elapsed</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Megaphone, Briefcase, Cpu, TrendingUp, UserCog, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const filters = [
  { id: "funding", label: "Funding", icon: Megaphone },
  { id: "jobs", label: "Job Postings", icon: Briefcase },
  { id: "tech", label: "Technology", icon: Cpu },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "executive", label: "Executive", icon: UserCog },
  { id: "contracts", label: "Contracts", icon: FileText, active: true },
]

export function SubscriptionFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["contracts"])

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground">Your Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilters.includes(filter.id)
            return (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all border",
                  isActive
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "bg-secondary/50 border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <filter.icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Header } from "@/components/Header"
import { StatsCards } from "@/components/StatsCards"
import { DeadlinesChart } from "@/components/DeadlinesChart"
import { BudgetAuthorityChart } from "@/components/BudgetAuthorityChart"
import { SolicitationsChart } from "@/components/SolicitationsChart"
import { FederalSpendingChart } from "@/components/FederalSpendingChart"
import { RecentSignals } from "@/components/RecentSignals"
import { InstallPWA } from "@/components/InstallPWA"
import { Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* Page Title */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-2 border-b border-border/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Overview</span>
                <span className="flex items-center gap-1.5 text-xs text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Live
                </span>
              </div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1.5">Track and manage DoD contract opportunities in real-time</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="w-3.5 h-3.5" />
              <span>Last updated: Just now</span>
            </div>
          </div>

          {/* Stats Overview */}
          <section>
            <StatsCards />
          </section>

          {/* Charts Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DeadlinesChart />
            <BudgetAuthorityChart />
          </section>

          {/* Federal Spending Analysis */}
          <section>
            <FederalSpendingChart />
          </section>

          {/* Solicitations Breakdown */}
          <section>
            <SolicitationsChart />
          </section>

          {/* Recent Signals Feed */}
          <section>
            <RecentSignals />
          </section>
        </div>
      </main>
      
      {/* PWA Install Prompt */}
      <InstallPWA />
    </div>
  )
}

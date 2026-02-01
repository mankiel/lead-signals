"use client"

import { Header } from "@/components/Header"
import { StatsCards } from "@/components/StatsCards"
import { DeadlinesChart } from "@/components/DeadlinesChart"
import { BudgetAuthorityChart } from "@/components/BudgetAuthorityChart"
import { SolicitationsChart } from "@/components/SolicitationsChart"
import { RecentSignals } from "@/components/RecentSignals"
import { InstallPWA } from "@/components/InstallPWA"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Page Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Track and manage DoD contract opportunities</p>
            </div>
          </div>

          {/* Stats Overview */}
          <StatsCards />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DeadlinesChart />
            <BudgetAuthorityChart />
          </div>

          {/* Solicitations Breakdown */}
          <SolicitationsChart />

          {/* Recent Signals Feed */}
          <RecentSignals />
        </div>
      </main>
      
      {/* PWA Install Prompt */}
      <InstallPWA />
    </div>
  )
}

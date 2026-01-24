"use client"

import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { StatsCards } from "@/components/StatsCards"
import { FundingBreakdown } from "@/components/FundingBreakdown"
import { TimelineAnalysis } from "@/components/TimelineAnalysis"
import { OpportunityInsights } from "@/components/OpportunityInsights"
import { DeadlinesChart } from "@/components/DeadlinesChart"
import { BudgetAuthorityChart } from "@/components/BudgetAuthorityChart"
import { SolicitationsChart } from "@/components/SolicitationsChart"
import { RecentSignals } from "@/components/RecentSignals"
import { InstallPWA } from "@/components/InstallPWA"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <Header />
        
        <div className="p-6 space-y-4">
          {/* Stats Overview */}
          <StatsCards />

          {/* Opportunity Insights */}
          <OpportunityInsights />

          {/* Funding & Timeline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FundingBreakdown />
            <TimelineAnalysis />
          </div>

          {/* Deadlines & Budget Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DeadlinesChart />
            <BudgetAuthorityChart />
          </div>

          {/* Agency & Office Breakdown */}
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

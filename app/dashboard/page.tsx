"use client"

import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { StatsCards } from "@/components/StatsCards"
import { SolicitationsChart } from "@/components/SolicitationsChart"
import { DeadlinesChart } from "@/components/DeadlinesChart"
import { BudgetAuthorityChart } from "@/components/BudgetAuthorityChart"
import { SubscriptionFilters } from "@/components/SubscriptionFilters"
import { RecentSignals } from "@/components/RecentSignals"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <Header />
        
        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <StatsCards />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SolicitationsChart />
            <DeadlinesChart />
          </div>

          {/* Budget Chart */}
          <BudgetAuthorityChart />

          {/* Subscription Filters */}
          <SubscriptionFilters />

          {/* Recent Signals Feed */}
          <RecentSignals />
        </div>
      </main>
    </div>
  )
}

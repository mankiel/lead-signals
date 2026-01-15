"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { StatsCards } from "@/components/StatsCards"
import { DeadlinesChart } from "@/components/DeadlinesChart"
import { BudgetAuthorityChart } from "@/components/BudgetAuthorityChart"
import { SolicitationsChart } from "@/components/SolicitationsChart"
import { RecentSignals } from "@/components/RecentSignals"
import { InstallPWA } from "@/components/InstallPWA"

export default function DashboardPage() {
  const [selectedOffices, setSelectedOffices] = useState<string[]>([])
  const [selectedSubtiers, setSelectedSubtiers] = useState<string[]>([])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        selectedOffices={selectedOffices}
        selectedSubtiers={selectedSubtiers}
        onOfficeChange={setSelectedOffices}
        onSubtierChange={setSelectedSubtiers}
      />
      
      <main className="flex-1 overflow-auto">
        <Header />
        
        <div className="p-6 space-y-4">
          {/* Stats Overview */}
          <StatsCards 
            selectedOffices={selectedOffices}
            selectedSubtiers={selectedSubtiers}
          />

          {/* Deadlines & Budget Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DeadlinesChart 
              selectedOffices={selectedOffices}
              selectedSubtiers={selectedSubtiers}
            />
            <BudgetAuthorityChart 
              selectedOffices={selectedOffices}
              selectedSubtiers={selectedSubtiers}
            />
          </div>

          {/* Agency & Office Breakdown */}
          <SolicitationsChart 
            selectedOffices={selectedOffices}
            selectedSubtiers={selectedSubtiers}
          />

          {/* Recent Signals Feed */}
          <RecentSignals 
            selectedOffices={selectedOffices}
            selectedSubtiers={selectedSubtiers}
          />
        </div>
      </main>
      
      {/* PWA Install Prompt */}
      <InstallPWA />
    </div>
  )
}

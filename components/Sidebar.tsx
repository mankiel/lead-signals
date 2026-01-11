"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Zap,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Building2,
  Bookmark,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: FileText, label: "Contracts", badge: 50 },
  { icon: Zap, label: "Signals" },
  { icon: Building2, label: "Agencies" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Bookmark, label: "Saved" },
]

const bottomNavItems = [
  { icon: Bell, label: "Notifications", badge: 3 },
  { icon: HelpCircle, label: "Help" },
  { icon: Settings, label: "Settings" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 h-screen sticky top-0",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
          <Zap className="w-4 h-4 text-accent-foreground" />
        </div>
        {!collapsed && <span className="font-semibold text-sidebar-foreground tracking-tight">Lead Signals</span>}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 bg-secondary/50 border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground rounded">
              ⌘K
            </kbd>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto">
        <div className="mb-2 px-3">
          {!collapsed && <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Menu</p>}
        </div>
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all",
                  item.active
                    ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-accent/20 text-accent text-[10px] font-medium">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-2 py-3 border-t border-sidebar-border">
        <ul className="space-y-0.5">
          {bottomNavItems.map((item) => (
            <li key={item.label}>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all">
                <div className="relative">
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {item.badge && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-chart-5" />}
                </div>
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full border border-border bg-card hover:bg-secondary z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </Button>
    </aside>
  )
}

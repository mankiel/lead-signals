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
  Filter,
  X,
  ChevronDown,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { icon: Zap, label: "Signals" },
  { icon: Bookmark, label: "Saved" },
]

const bottomNavItems = [
  { icon: Bell, label: "Notifications", badge: 3 },
  { icon: HelpCircle, label: "Help" },
  { icon: Settings, label: "Settings" },
]

const officeData = [
  { id: "dla", name: "Defense Logistics Agency", shortName: "DLA", subtiers: ["Maritime", "Aviation", "Land", "Troop Support"] },
  { id: "army", name: "The Army", shortName: "Army", subtiers: ["Contracting Command", "Corps of Engineers", "Medical Command"] },
  { id: "navy", name: "The Navy", shortName: "Navy", subtiers: ["Naval Sea Systems", "Naval Air Systems", "Fleet Forces"] },
  { id: "airforce", name: "The Air Force", shortName: "Air Force", subtiers: ["Air Force Materiel", "Space Command", "Global Strike"] },
  { id: "dodea", name: "Defense Education Activity", shortName: "DoDEA", subtiers: ["Americas", "Europe", "Pacific"] },
  { id: "nga", name: "National Geospatial-Intelligence Agency", shortName: "NGA", subtiers: ["Analysis", "Source Operations", "Technology"] },
  { id: "dha", name: "Defense Health Agency", shortName: "DHA", subtiers: ["Healthcare Operations", "Research & Development", "Support Services"] },
  { id: "disa", name: "Defense Information Systems Agency", shortName: "DISA", subtiers: ["Cloud Services", "Cybersecurity", "Network Services"] },
]

interface SidebarProps {
  selectedOffices?: string[]
  selectedSubtiers?: string[]
  onOfficeChange?: (offices: string[]) => void
  onSubtierChange?: (subtiers: string[]) => void
}

export function Sidebar({ selectedOffices = [], selectedSubtiers = [], onOfficeChange, onSubtierChange }: SidebarProps = {}) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("Signals")
  const [officeSearch, setOfficeSearch] = useState("")
  const [subtierSearch, setSubtierSearch] = useState("")
  const [officesExpanded, setOfficesExpanded] = useState(false)
  const [subtiersExpanded, setSubtiersExpanded] = useState(false)

  const handleNavClick = (label: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveItem(label)
  }

  const showFilters = true

  const availableSubtiers = selectedOffices.length > 0
    ? officeData.filter((o) => selectedOffices.includes(o.id)).flatMap((o) => o.subtiers)
    : officeData.flatMap((o) => o.subtiers)

  const uniqueSubtiers = [...new Set(availableSubtiers)]

  const filteredOffices = officeData.filter((o) =>
    o.name.toLowerCase().includes(officeSearch.toLowerCase()) ||
    o.shortName.toLowerCase().includes(officeSearch.toLowerCase())
  )

  const filteredSubtiers = uniqueSubtiers.filter((s) => s.toLowerCase().includes(subtierSearch.toLowerCase()))

  const handleOfficeToggle = (officeId: string) => {
    if (!onOfficeChange) return
    if (selectedOffices.includes(officeId)) {
      onOfficeChange(selectedOffices.filter((id) => id !== officeId))
    } else {
      onOfficeChange([...selectedOffices, officeId])
    }
  }

  const handleSubtierToggle = (subtier: string) => {
    if (!onSubtierChange) return
    if (selectedSubtiers.includes(subtier)) {
      onSubtierChange(selectedSubtiers.filter((s) => s !== subtier))
    } else {
      onSubtierChange([...selectedSubtiers, subtier])
    }
  }

  const clearAllFilters = () => {
    if (onOfficeChange) onOfficeChange([])
    if (onSubtierChange) onSubtierChange([])
  }

  const totalFilters = selectedOffices.length + selectedSubtiers.length

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 h-screen sticky top-0",
        collapsed ? "w-16" : "w-80",
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
                onClick={(e) => handleNavClick(item.label, e)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all",
                  activeItem === item.label
                    ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>

        {/* Filters Section */}
        {showFilters && !collapsed && (
          <div className="mt-4 pt-4 border-t border-sidebar-border">
            <div className="flex items-center justify-between px-3 mb-3">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Filters</span>
                {totalFilters > 0 && (
                  <Badge variant="secondary" className="h-4 text-[10px]">{totalFilters}</Badge>
                )}
              </div>
              {totalFilters > 0 && (
                <button onClick={clearAllFilters} className="text-[10px] text-muted-foreground hover:text-foreground">
                  Clear all
                </button>
              )}
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-3 px-2">
                <Collapsible open={officesExpanded} onOpenChange={setOfficesExpanded}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium hover:bg-sidebar-accent/50">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Office</span>
                      {selectedOffices.length > 0 && (
                        <Badge variant="outline" className="h-4 text-[10px]">{selectedOffices.length}</Badge>
                      )}
                    </div>
                    <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", officesExpanded && "rotate-180")} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2">
                    <div className="relative px-2">
                      <Search className="absolute left-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        value={officeSearch}
                        onChange={(e) => setOfficeSearch(e.target.value)}
                        className="h-7 pl-7 text-xs"
                      />
                      {officeSearch && (
                        <button onClick={() => setOfficeSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-1 px-2">
                      {filteredOffices.map((office) => (
                        <label key={office.id} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent/50 text-xs">
                          <Checkbox
                            checked={selectedOffices.includes(office.id)}
                            onCheckedChange={() => handleOfficeToggle(office.id)}
                          />
                          <span className="flex-1">{office.shortName}</span>
                        </label>
                      ))}
                      {filteredOffices.length === 0 && <p className="px-2 py-3 text-center text-[10px] text-muted-foreground">No offices found</p>}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible open={subtiersExpanded} onOpenChange={setSubtiersExpanded}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium hover:bg-sidebar-accent/50">
                    <div className="flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Subtier</span>
                      {selectedSubtiers.length > 0 && (
                        <Badge variant="outline" className="h-4 text-[10px]">{selectedSubtiers.length}</Badge>
                      )}
                    </div>
                    <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", subtiersExpanded && "rotate-180")} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2">
                    <div className="relative px-2">
                      <Search className="absolute left-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        value={subtierSearch}
                        onChange={(e) => setSubtierSearch(e.target.value)}
                        className="h-7 pl-7 text-xs"
                      />
                      {subtierSearch && (
                        <button onClick={() => setSubtierSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-1 px-2">
                      {filteredSubtiers.map((subtier) => (
                        <label key={subtier} className="flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent/50 text-xs">
                          <Checkbox
                            checked={selectedSubtiers.includes(subtier)}
                            onCheckedChange={() => handleSubtierToggle(subtier)}
                            className="mt-0.5"
                          />
                          <span className="flex-1 break-words whitespace-normal leading-tight">{subtier}</span>
                        </label>
                      ))}
                      {filteredSubtiers.length === 0 && <p className="px-2 py-3 text-center text-[10px] text-muted-foreground">No subtiers found</p>}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </ScrollArea>
          </div>
        )}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-2 py-3 border-t border-sidebar-border">
        <ul className="space-y-0.5">
          {bottomNavItems.map((item) => (
            <li key={item.label}>
              <button 
                onClick={(e) => e.preventDefault()}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all"
              >
                <div className="relative">
                  <item.icon className="w-4 h-4 shrink-0" />
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

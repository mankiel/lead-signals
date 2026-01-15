"use client"

import { useState } from "react"
import { Search, X, ChevronDown, ChevronRight, Filter, Building2, Layers } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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

interface FilterSidebarProps {
  selectedOffices: string[]
  selectedSubtiers: string[]
  onOfficeChange: (offices: string[]) => void
  onSubtierChange: (subtiers: string[]) => void
}

export function SolicitationsFilterSidebar({ selectedOffices, selectedSubtiers, onOfficeChange, onSubtierChange }: FilterSidebarProps) {
  const [officeSearch, setOfficeSearch] = useState("")
  const [subtierSearch, setSubtierSearch] = useState("")
  const [officesExpanded, setOfficesExpanded] = useState(true)
  const [subtiersExpanded, setSubtiersExpanded] = useState(true)

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
    if (selectedOffices.includes(officeId)) {
      onOfficeChange(selectedOffices.filter((id) => id !== officeId))
    } else {
      onOfficeChange([...selectedOffices, officeId])
    }
  }

  const handleSubtierToggle = (subtier: string) => {
    if (selectedSubtiers.includes(subtier)) {
      onSubtierChange(selectedSubtiers.filter((s) => s !== subtier))
    } else {
      onSubtierChange([...selectedSubtiers, subtier])
    }
  }

  const clearAllFilters = () => {
    onOfficeChange([])
    onSubtierChange([])
  }

  const totalFilters = selectedOffices.length + selectedSubtiers.length

  return (
    <div className="flex h-full w-72 flex-col border-r border-[#30363d] bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-[#30363d] px-4 py-3">
        <div className="flex items-center gap-2 text-[#e6edf3]">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters</span>
          {totalFilters > 0 && (
            <Badge variant="secondary" className="h-5 bg-[#1f6feb] text-xs text-white">{totalFilters}</Badge>
          )}
        </div>
        {totalFilters > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-auto px-2 py-1 text-xs text-[#8b949e] hover:bg-[#21262d] hover:text-white">
            Clear all
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <Collapsible open={officesExpanded} onOpenChange={setOfficesExpanded}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-[#e6edf3] hover:bg-[#21262d]">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#8b949e]" />
                <span>Office</span>
                {selectedOffices.length > 0 && (
                  <Badge variant="outline" className="h-5 border-[#30363d] text-xs text-[#8b949e]">{selectedOffices.length}</Badge>
                )}
              </div>
              {officesExpanded ? <ChevronDown className="h-4 w-4 text-[#8b949e]" /> : <ChevronRight className="h-4 w-4 text-[#8b949e]" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b949e]" />
                <Input
                  placeholder="Search offices..."
                  value={officeSearch}
                  onChange={(e) => setOfficeSearch(e.target.value)}
                  className="h-8 border-[#30363d] bg-[#0d1117] pl-8 text-xs text-[#e6edf3] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                />
                {officeSearch && (
                  <button onClick={() => setOfficeSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-white">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {filteredOffices.map((office) => (
                  <label key={office.id} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[#21262d]">
                    <Checkbox
                      checked={selectedOffices.includes(office.id)}
                      onCheckedChange={() => handleOfficeToggle(office.id)}
                      className="border-[#30363d] data-[state=checked]:border-[#1f6feb] data-[state=checked]:bg-[#1f6feb]"
                    />
                    <span className="text-xs text-[#e6edf3]">{office.shortName}</span>
                    <span className="text-xs text-[#8b949e] truncate">({office.name})</span>
                  </label>
                ))}
                {filteredOffices.length === 0 && <p className="px-2 py-4 text-center text-xs text-[#8b949e]">No offices found</p>}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={subtiersExpanded} onOpenChange={setSubtiersExpanded}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-[#e6edf3] hover:bg-[#21262d]">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#8b949e]" />
                <span>Subtier</span>
                {selectedSubtiers.length > 0 && (
                  <Badge variant="outline" className="h-5 border-[#30363d] text-xs text-[#8b949e]">{selectedSubtiers.length}</Badge>
                )}
              </div>
              {subtiersExpanded ? <ChevronDown className="h-4 w-4 text-[#8b949e]" /> : <ChevronRight className="h-4 w-4 text-[#8b949e]" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b949e]" />
                <Input
                  placeholder="Search subtiers..."
                  value={subtierSearch}
                  onChange={(e) => setSubtierSearch(e.target.value)}
                  className="h-8 border-[#30363d] bg-[#0d1117] pl-8 text-xs text-[#e6edf3] placeholder:text-[#8b949e] focus-visible:ring-[#1f6feb]"
                />
                {subtierSearch && (
                  <button onClick={() => setSubtierSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-white">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {filteredSubtiers.map((subtier) => (
                  <label key={subtier} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[#21262d]">
                    <Checkbox
                      checked={selectedSubtiers.includes(subtier)}
                      onCheckedChange={() => handleSubtierToggle(subtier)}
                      className="border-[#30363d] data-[state=checked]:border-[#1f6feb] data-[state=checked]:bg-[#1f6feb]"
                    />
                    <span className="text-xs text-[#e6edf3]">{subtier}</span>
                  </label>
                ))}
                {filteredSubtiers.length === 0 && <p className="px-2 py-4 text-center text-xs text-[#8b949e]">No subtiers found</p>}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>

      {totalFilters > 0 && (
        <div className="border-t border-[#30363d] px-4 py-3">
          <p className="mb-2 text-xs font-medium text-[#8b949e]">Active filters:</p>
          <div className="flex flex-wrap gap-1.5">
            {selectedOffices.map((officeId) => {
              const office = officeData.find((o) => o.id === officeId)
              return (
                <Badge key={officeId} variant="secondary" className="h-6 gap-1 bg-[#21262d] text-xs text-[#e6edf3] hover:bg-[#30363d]">
                  {office?.shortName}
                  <button onClick={() => handleOfficeToggle(officeId)} className="ml-0.5 hover:text-white"><X className="h-3 w-3" /></button>
                </Badge>
              )
            })}
            {selectedSubtiers.map((subtier) => (
              <Badge key={subtier} variant="secondary" className="h-6 gap-1 bg-[#1f6feb]/20 text-xs text-[#58a6ff] hover:bg-[#1f6feb]/30">
                {subtier}
                <button onClick={() => handleSubtierToggle(subtier)} className="ml-0.5 hover:text-white"><X className="h-3 w-3" /></button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

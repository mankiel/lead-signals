"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Search, Building2, Layers, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const officeData = [
  { id: "dla", name: "Defense Logistics Agency", shortName: "DLA" },
  { id: "army", name: "The Army", shortName: "Army" },
  { id: "navy", name: "The Navy", shortName: "Navy" },
  { id: "airforce", name: "The Air Force", shortName: "Air Force" },
  { id: "dodea", name: "Defense Education Activity", shortName: "DoDEA" },
  { id: "nga", name: "National Geospatial-Intelligence Agency", shortName: "NGA" },
  { id: "dha", name: "Defense Health Agency", shortName: "DHA" },
  { id: "disa", name: "Defense Information Systems Agency", shortName: "DISA" },
]

const subtierData = [
  "Maritime",
  "Aviation",
  "Land",
  "Troop Support",
  "Contracting Command",
  "Corps of Engineers",
  "Medical Command",
  "Naval Sea Systems",
  "Naval Air Systems",
  "Fleet Forces",
  "Air Force Materiel",
  "Space Command",
  "Global Strike",
]

interface FilterBarProps {
  selectedOffices: string[]
  selectedSubtiers: string[]
  onOfficeChange: (offices: string[]) => void
  onSubtierChange: (subtiers: string[]) => void
}

export function FilterBar({
  selectedOffices,
  selectedSubtiers,
  onOfficeChange,
  onSubtierChange,
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [officesExpanded, setOfficesExpanded] = useState(false)
  const [subtiersExpanded, setSubtiersExpanded] = useState(false)

  const filteredOffices = officeData.filter((o) =>
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSubtiers = subtierData.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const clearFilters = () => {
    onOfficeChange([])
    onSubtierChange([])
  }

  return (
    <div className="w-full border-b bg-card sticky top-0 z-10">
      <div className="flex items-center gap-4 px-6 py-3">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search filters..."
            className="pl-9 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Office Dropdown */}
        <div className="relative">
          <Collapsible open={officesExpanded} onOpenChange={setOfficesExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Building2 className="h-4 w-4 mr-2" />
                Offices
                {selectedOffices.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedOffices.length}
                  </Badge>
                )}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 ml-2 transition-transform",
                    officesExpanded && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute top-full left-0 mt-1 bg-card border rounded-md shadow-lg z-50 w-72 max-h-96 overflow-y-auto">
              <div className="p-2 space-y-1">
                {filteredOffices.map((office) => (
                  <label
                    key={office.id}
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedOffices.includes(office.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onOfficeChange([...selectedOffices, office.id])
                        } else {
                          onOfficeChange(selectedOffices.filter((id) => id !== office.id))
                        }
                      }}
                    />
                    <span className="text-sm">{office.name}</span>
                  </label>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Subtier Dropdown */}
        <div className="relative">
          <Collapsible open={subtiersExpanded} onOpenChange={setSubtiersExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Layers className="h-4 w-4 mr-2" />
                Subtiers
                {selectedSubtiers.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedSubtiers.length}
                  </Badge>
                )}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 ml-2 transition-transform",
                    subtiersExpanded && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute top-full left-0 mt-1 bg-card border rounded-md shadow-lg z-50 w-72 max-h-96 overflow-y-auto">
              <div className="p-2 space-y-1">
                {filteredSubtiers.map((subtier) => (
                  <label
                    key={subtier}
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedSubtiers.includes(subtier)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onSubtierChange([...selectedSubtiers, subtier])
                        } else {
                          onSubtierChange(selectedSubtiers.filter((s) => s !== subtier))
                        }
                      }}
                    />
                    <span className="text-sm">{subtier}</span>
                  </label>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Clear Filters */}
        {(selectedOffices.length > 0 || selectedSubtiers.length > 0) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9">
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}

        {/* Filter Count */}
        <div className="ml-auto text-sm text-muted-foreground">
          {selectedOffices.length + selectedSubtiers.length > 0 && (
            <span>
              {selectedOffices.length + selectedSubtiers.length} filter
              {selectedOffices.length + selectedSubtiers.length !== 1 && "s"} active
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

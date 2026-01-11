"use client"

import { Bell, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 h-14 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
        <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
          <span>/</span>
          <span>Overview</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Search className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-chart-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-chart-4 flex items-center justify-center">
                <span className="text-xs font-medium text-accent-foreground">JD</span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

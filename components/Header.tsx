"use client"

import { Bell, ChevronDown, Search, Zap, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-border/60 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-semibold text-sm text-foreground">Lead Signals</span>
        </Link>
        <div className="hidden md:flex items-center text-muted-foreground">
          <span className="mx-2 text-border">/</span>
          <span className="text-xs font-medium">DoD Opportunities</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="hidden sm:flex relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <input
            type="text"
            placeholder="Search opportunities..."
            className="w-56 pl-8 pr-16 py-1.5 bg-muted/50 border border-border/60 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:bg-background transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-background text-muted-foreground rounded border border-border/60 flex items-center gap-0.5">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="sm:hidden w-8 h-8 text-muted-foreground hover:text-foreground">
          <Search className="w-4 h-4" />
        </Button>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-chart-5 ring-2 ring-card" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1.5 px-1.5 h-8 ml-0.5 hover:bg-muted/50">
              <div className="w-6 h-6 rounded-full bg-primary/20 ring-1 ring-primary/30 flex items-center justify-center">
                <span className="text-[10px] font-semibold text-primary">JD</span>
              </div>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

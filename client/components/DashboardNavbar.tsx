"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Plus, Upload, Download } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface DashboardNavbarProps {
  onNewPrompt: () => void
  onImport: () => void
  onExport: () => void
}

export function DashboardNavbar({
  onNewPrompt,
  onImport,
  onExport,
}: DashboardNavbarProps) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-2 md:hidden" />
          <Link href="/" className="font-heading font-bold text-lg tracking-tight">
            Prompt Library
          </Link>
        </div>        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger render={
              <Button variant="outline" size="sm" onClick={onImport} className="gap-2">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </Button>
            } />
            <TooltipContent>Import prompts from JSON</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger render={
              <Button variant="outline" size="sm" onClick={onExport} className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            } />
            <TooltipContent>Export all prompts as JSON</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger render={
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            } />
            <TooltipContent>Toggle theme (D)</TooltipContent>
          </Tooltip>

          <Button onClick={onNewPrompt} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Prompt</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

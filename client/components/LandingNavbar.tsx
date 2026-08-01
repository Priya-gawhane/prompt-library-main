"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function LandingNavbar() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight">
          Prompt Library
        </Link>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
          <Link href="/dashboard">
            <Button className="rounded-full px-6">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

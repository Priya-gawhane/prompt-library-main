"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Star, LayoutGrid, Clock } from "lucide-react"
import type { Prompt } from "@/types/prompt"

interface DashboardStatsProps {
  prompts: Prompt[]
}

export function DashboardStats({ prompts }: DashboardStatsProps) {
  const stats = useMemo(() => {
    const categories = new Set(prompts.map((p) => p.category)).size
    const favorites = prompts.filter((p) => p.favorite).length
    const recent = [...prompts]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5)

    return { total: prompts.length, favorites, categories, recent }
  }, [prompts])

  const cards = [
    {
      label: "Total Prompts",
      value: stats.total,
      icon: BookOpen,
      desc: "All prompts in library",
    },
    {
      label: "Favorites",
      value: stats.favorites,
      icon: Star,
      desc: "Marked as favorite",
    },
    {
      label: "Categories",
      value: stats.categories,
      icon: LayoutGrid,
      desc: "Unique categories used",
    },
    {
      label: "Recently Added",
      value: stats.recent.length,
      icon: Clock,
      desc: "Last 5 prompts added",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, desc }) => (
        <Card key={label}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

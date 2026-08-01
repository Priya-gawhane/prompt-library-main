"use client"

import { useEffect, useRef } from "react"
import { animate, stagger } from "animejs"
import { BookOpen, Star, LayoutGrid, Clock } from "lucide-react"

const FEATURES = [
  {
    title: "Total Prompts",
    value: "18",
    description: "All prompts in library",
    icon: BookOpen,
  },
  {
    title: "Favorites",
    value: "9",
    description: "Marked as favorite",
    icon: Star,
  },
  {
    title: "Categories",
    value: "8",
    description: "Unique categories used",
    icon: LayoutGrid,
  },
  {
    title: "Recently Added",
    value: "5",
    description: "Last 5 prompts added",
    icon: Clock,
  },
]

export function Features() {
  const containerRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardsRef.current) {
            const cards = cardsRef.current.children
            animate(Array.from(cards), {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 800,
              delay: stagger(100),
              easing: "easeOutExpo",
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground">
            Everything you need
          </h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            A powerful set of features designed to make managing your AI prompts as seamless as possible.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="opacity-0 bg-card border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-40"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <h3 className="font-sans text-sm font-medium">
                  {feature.title}
                </h3>
                <feature.icon className="w-4 h-4" />
              </div>

              <div className="space-y-1 mt-4">
                <div className="text-3xl font-heading font-bold text-foreground">
                  {feature.value}
                </div>
                <p className="text-xs text-muted-foreground font-sans">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

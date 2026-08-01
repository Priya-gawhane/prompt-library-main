"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Pin, MoreVertical, GripVertical } from "lucide-react"

export function Hero() {
  const promptCode = `Draft a personalized cold email introducing a software development agency to potential clients.`

  const [displayedText, setDisplayedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let charIndex = 0

    // Initial delay before typing
    timeout = setTimeout(() => {
      const typeNext = () => {
        if (charIndex < promptCode.length) {
          setDisplayedText(promptCode.slice(0, charIndex + 1))
          charIndex++
          timeout = setTimeout(typeNext, 30) // Typing speed
        }
      }
      typeNext()
    }, 800)

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 400)

    return () => {
      clearTimeout(timeout)
      clearInterval(cursorInterval)
    }
  }, [promptCode])

  return (
    <section className="min-h-[90vh] pt-24 pb-16 flex flex-col lg:flex-row items-center justify-center gap-12 container mx-auto px-6 max-w-6xl">

      {/* Left Column: Copy & CTAs */}
      <div className="flex-1 space-y-8 text-center lg:text-left z-10 pt-10 lg:pt-0">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1]">
          Prompt <br className="hidden lg:block" />
          <span className="text-muted-foreground">Engineering,</span> <br className="hidden lg:block" />
          Codified.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
          A persistent, versioned library for the prompts that drive your LLMs.
          Stop losing your best work in ephemeral chat histories.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
          <Link href="/dashboard">
            <Button size="lg" className="rounded-full px-8 text-base gap-2 w-full sm:w-auto h-12">
              Enter Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="https://github.com/dainwi/prompt-library" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base w-full sm:w-auto h-12">
              View Source
            </Button>
          </a>
        </div>
      </div>

      {/* Right Column: Floating Dashboard Card */}
      <div className="flex-1 w-full max-w-xl lg:max-w-none relative perspective-1000">
        <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-3xl -z-10 transform rotate-3" />

        <div className="bg-card border border-border/60 shadow-2xl rounded-2xl p-6 flex flex-col gap-4 transform transition-transform hover:scale-[1.02] duration-500 relative overflow-hidden">

          {/* Card Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="w-5 h-5 text-muted-foreground/50 cursor-grab active:cursor-grabbing shrink-0" />
              <h3 className="font-heading font-semibold text-base truncate max-w-50">
                Cold Outreach Email
              </h3>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground shrink-0">
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                <Pin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-sans">
            Cold email template.
          </p>

          {/* Typing Animation Body */}
          <div className="mt-2 bg-muted/30 border border-border/50 rounded-xl p-4 font-mono text-sm leading-relaxed text-foreground h-30 overflow-hidden">
            <div className="wrap-break-word whitespace-pre-wrap">
              {displayedText}
              <span
                className="inline-block w-2.5 h-4 bg-muted-foreground ml-1 align-middle transition-opacity duration-100"
                style={{ opacity: cursorVisible ? 1 : 0 }}
              />
            </div>
          </div>

          {/* Card Footer */}
          <div className="flex flex-wrap gap-2 mt-2">
            {["Email", "Sales", "Outreach"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-muted/50 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <Button variant="outline" className="w-full rounded-full mt-4 gap-2 border-border/60 hover:bg-muted/50">
            Copy Prompt
          </Button>

        </div>
      </div>

    </section>
  )
}

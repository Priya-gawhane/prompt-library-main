"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border/40">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="font-heading font-bold text-lg tracking-tight">
          Prompt Library
        </Link>
        
        <div className="flex gap-6 font-sans text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <a
            href="https://github.com/Priya-gawhane/prompt-library-main.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
        
        <div className="font-sans text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Prompt Library
        </div>
      </div>
    </footer>
  )
}

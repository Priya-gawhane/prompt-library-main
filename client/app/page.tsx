import { LandingNavbar } from "@/components/LandingNavbar"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { Footer } from "@/components/Footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <LandingNavbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}

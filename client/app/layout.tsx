import { DM_Sans, Outfit } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ReduxProvider } from "@/store/ReduxProvider"

const outfitHeading = Outfit({ subsets: ["latin"], variable: "--font-heading" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        dmSans.variable,
        outfitHeading.variable
      )}
    >
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

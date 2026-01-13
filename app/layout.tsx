import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Lead Signals | Real-time Lead Intelligence",
  description: "Track and analyze lead engagement signals in real-time to close more deals faster.",
}

export const viewport: Viewport = {
  themeColor: "#1a1625",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                } catch (e) {}
              `,
            }}
          />
        </head>
        <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

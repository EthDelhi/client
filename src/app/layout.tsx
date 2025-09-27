import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EthNewDelhi",
}

const Loader = () => (
  <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
      </div>
      <span className="text-gray-300 font-medium ml-4">Loading...</span>
    </div>
  </div>
)


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Styrene+B:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

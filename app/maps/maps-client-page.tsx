"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import MapsClient from "./maps-client"

interface MapsPageClientProps {
  apiKey: string
}

export default function MapsPageClient({ apiKey }: MapsPageClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold text-white">MDRRMO Pio Duran Maps</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <MapsClient apiKey={apiKey} />
    </div>
  )
}

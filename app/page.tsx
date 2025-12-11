import Link from "next/link"
import { ShoppingCart, Calendar, Users, FileText, ImageIcon, Map } from "lucide-react"

export const metadata = {
  title: "MDRRMO PIO DURAN - File Inventory Management System",
  description: "Emergency management file inventory and coordination system",
}

interface Module {
  id: string
  title: string
  description: string
  icon: string
  color: string
  href: string
}

const modules: Module[] = [
  {
    id: "supply",
    title: "Supply Inventory",
    description: "Track emergency equipment, supplies, and assets in real-time with advanced monitoring capabilities.",
    icon: "ShoppingCart",
    color: "from-blue-600 to-blue-900",
    href: "/supply",
  },
  {
    id: "calendar",
    title: "Calendar of Activities",
    description: "Stay updated with scheduled drills, meetings, and disaster preparation events across all barangays.",
    icon: "Calendar",
    color: "from-green-600 to-green-900",
    href: "/calendar",
  },
  {
    id: "contact",
    title: "Contact List",
    description: "Access key personnel and emergency contacts instantly during critical situations.",
    icon: "Users",
    color: "from-purple-600 to-purple-900",
    href: "/contacts",
  },
  {
    id: "document",
    title: "Document",
    description: "Generate official MDRRMO forms and reports with standardized templates for efficiency.",
    icon: "FileText",
    color: "from-amber-600 to-amber-900",
    href: "/documents",
  },
  {
    id: "gallery",
    title: "Photo Gallery",
    description: "Browse visual documentation of operations, training sessions, and community events.",
    icon: "ImageIcon",
    color: "from-red-600 to-red-900",
    href: "/gallery",
  },
  {
    id: "maps",
    title: "Maps",
    description: "The Dynamic Map Gallery, featuring Google Drive integration, requires an internet connection.",
    icon: "Map",
    color: "from-pink-600 to-pink-900",
    href: "/maps",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dedcmctqk/image/upload/v1753255299/PIODURAN_SEAL_riahyf.webp"
                  alt="MDRRMO Seal"
                  className="h-16 w-auto"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  MDRRMO PIO DURAN
                </h1>
                <p className="text-yellow-200/80 text-sm">File Inventory and Management System</p>
              </div>
            </div>
            <img
              src="https://res.cloudinary.com/dedcmctqk/image/upload/v1758626523/drrlogo-120px_ylsofh.png"
              alt="DRR Logo"
              className="h-16 w-auto hidden md:block"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Intro Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Emergency Management Hub</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Centralized file inventory and coordination system for Pio Duran municipality disaster risk reduction and
            management operations.
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <Link key={module.id} href={module.href}>
              <div className="group h-full">
                {/* Card */}
                <div
                  className={`relative h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br ${module.color} bg-opacity-20 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer`}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col justify-between">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm">
                        <div className="text-white/80 group-hover:text-white transition-colors">
                          {module.icon === "ShoppingCart" && <ShoppingCart size={32} />}
                          {module.icon === "Calendar" && <Calendar size={32} />}
                          {module.icon === "Users" && <Users size={32} />}
                          {module.icon === "FileText" && <FileText size={32} />}
                          {module.icon === "ImageIcon" && <ImageIcon size={32} />}
                          {module.icon === "Map" && <Map size={32} />}
                        </div>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-white mb-3">{module.title}</h3>
                      <p className="text-slate-200 text-sm leading-relaxed">{module.description}</p>
                    </div>

                    {/* Button */}
                    <div className="mt-6">
                      <button
                        className={`w-full py-3 px-6 rounded-lg font-bold text-white bg-gradient-to-r ${module.color} group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        <span>PROCEED</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-20 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
          <p>&copy; 2025 MDRRMO Pio Duran. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

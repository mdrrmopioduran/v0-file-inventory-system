"use client"

import Link from "next/link"
import { ArrowLeft, Search, FolderOpen } from "lucide-react"
import { useState } from "react"
import { GALLERY_CATEGORIES } from "@/lib/drive-client"

interface GalleryImage {
  id: string
  title: string
  date: string
  src: string
  tags?: string[]
}

interface GalleryFolder {
  id: string
  name: string
  isActive: boolean
  description?: string
  folderId?: string
}

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("accident-response")
  const [images, setImages] = useState<GalleryImage[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const categories: GalleryFolder[] = GALLERY_CATEGORIES

  const currentCategory = categories.find((c) => c.id === selectedCategory)

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
            <h1 className="text-2xl font-bold text-white">Photo Documentation</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-80px)]">
        <div className="w-56 bg-slate-900/50 border-r border-slate-700/50 p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium text-left ${
                  selectedCategory === category.id
                    ? "bg-orange-500/30 text-orange-300 border border-orange-500/50"
                    : "text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <FolderOpen size={16} />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Content */}
        <div className="flex-1 p-8 max-w-6xl mx-auto">
          {/* Category Header */}
          {currentCategory && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">{currentCategory.name}</h2>
              <p className="text-slate-300">{currentCategory.description || "Browse photos in this category."}</p>
            </div>
          )}

          {/* Search */}
          <div className="mb-6 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.length > 0 ? (
              images.map((image) => (
                <div key={image.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg bg-slate-800 aspect-square mb-3">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-semibold text-sm">{image.title}</h3>
                        <p className="text-xs text-slate-300">{image.date}</p>
                        {image.tags && <p className="text-xs text-orange-300 mt-2">{image.tags.join(", ")}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400">
                Photos will be loaded from Google Drive folder: {currentCategory?.folderId}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

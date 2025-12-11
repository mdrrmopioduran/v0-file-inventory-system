"use client"

import Link from "next/link"
import { ArrowLeft, FileText, FolderIcon, Download, FolderOpen } from "lucide-react"
import { useState } from "react"
import { DOCUMENT_FOLDERS } from "@/lib/drive-client"

interface Document {
  id: string
  name: string
  type: string
  size: string
  modified: string
  description?: string
}

interface Folder {
  id: string
  name: string
  isActive: boolean
  subfolders?: Folder[]
}

export default function DocumentManagement() {
  const [selectedFolder, setSelectedFolder] = useState("root")
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const folders = DOCUMENT_FOLDERS

  const getFileIcon = (type: string) => {
    const typeColors: Record<string, { bg: string; text: string }> = {
      PDF: { bg: "bg-red-500/20", text: "text-red-400" },
      DOCX: { bg: "bg-blue-500/20", text: "text-blue-400" },
      XLSX: { bg: "bg-green-500/20", text: "text-green-400" },
    }
    return typeColors[type] || { bg: "bg-slate-500/20", text: "text-slate-400" }
  }

  const filteredDocs = documents.filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
            <h1 className="text-2xl font-bold text-white">Document Management</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-80px)]">
        <div className="w-64 bg-slate-900/50 border-r border-slate-700/50 p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-4">Folders</h3>
          <div className="space-y-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  selectedFolder === folder.id
                    ? "bg-teal-500/30 text-teal-300 border border-teal-500/50"
                    : "text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <FolderOpen size={18} />
                {folder.name}
              </button>
            ))}
            {folders[0]?.subfolders && (
              <div className="ml-2 space-y-1 border-l border-slate-700/50 pl-2">
                {folders[0].subfolders.map((subfolder) => (
                  <button
                    key={subfolder.id}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-medium text-slate-400 hover:text-slate-300 hover:bg-slate-800/30 transition-colors"
                  >
                    <FolderOpen size={14} />
                    {subfolder.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 px-4 py-3 bg-slate-800/30 rounded-lg border border-slate-700">
            <FolderIcon size={18} className="text-amber-400" />
            <span className="text-white text-sm">
              Google Drive / MDRRMO Documents / {folders.find((f) => f.id === selectedFolder)?.name}
            </span>
          </div>

          {/* Search and Sort */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <select className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors">
              <option>Sort by Name</option>
              <option>Sort by Date</option>
              <option>Sort by Type</option>
            </select>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.length > 0 ? (
              documents.map((doc) => {
                const fileStyle = getFileIcon(doc.type)
                return (
                  <div
                    key={doc.id}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800 hover:border-slate-600 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-3 ${fileStyle.bg} rounded-lg`}>
                        <FileText size={24} className={fileStyle.text} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-700">
                      <span>{doc.modified}</span>
                      <Download size={16} className="text-slate-400 group-hover:text-amber-300 transition-colors" />
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400">
                Documents will be fetched from Google Drive folder: {selectedFolder}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

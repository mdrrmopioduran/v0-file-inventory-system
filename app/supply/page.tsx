"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  Printer as Print,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import { fetchInventoryData } from "@/lib/google-sheets"

interface InventoryItem {
  id: string
  name: string
  description: string
  category: string
  location: string
  stock: number
  unit: string
  status: "In Stock" | "Low Stock" | "Out of Stock"
}

export default function SupplyInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadInventory() {
      try {
        setLoading(true)
        const data = await fetchInventoryData()
        setItems(data)
      } catch (error) {
        console.error("[v0] Error loading inventory:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInventory()
  }, [])

  const filteredItems = items
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "stock") return b.stock - a.stock
      if (sortBy === "status") return a.status.localeCompare(b.status)
      return 0
    })

  const stats = {
    total: items.length,
    inStock: items.filter((i) => i.status === "In Stock").length,
    lowStock: items.filter((i) => i.status === "Low Stock").length,
    outOfStock: items.filter((i) => i.status === "Out of Stock").length,
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock":
        return <CheckCircle size={16} className="text-green-400" />
      case "Low Stock":
        return <AlertCircle size={16} className="text-yellow-400" />
      case "Out of Stock":
        return <XCircle size={16} className="text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/30 text-green-200 border border-green-500/50"
      case "Low Stock":
        return "bg-yellow-500/30 text-yellow-200 border border-yellow-500/50"
      case "Out of Stock":
        return "bg-red-500/30 text-red-200 border border-red-500/50"
      default:
        return "bg-slate-500/20 text-slate-300"
    }
  }

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
            <h1 className="text-2xl font-bold text-white">Supply Inventory</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Inventory Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600/40 to-blue-900/40 rounded-lg p-6 backdrop-blur-sm border border-blue-500/30">
            <p className="text-sm font-semibold text-blue-200 mb-2">Total Items</p>
            <p className="text-4xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600/40 to-green-900/40 rounded-lg p-6 backdrop-blur-sm border border-green-500/30">
            <p className="text-sm font-semibold text-green-200 mb-2">In Stock</p>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-white">{stats.inStock}</p>
              <CheckCircle size={20} className="text-green-400" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-600/40 to-yellow-900/40 rounded-lg p-6 backdrop-blur-sm border border-yellow-500/30">
            <p className="text-sm font-semibold text-yellow-200 mb-2">Low Stock</p>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-white">{stats.lowStock}</p>
              <AlertCircle size={20} className="text-yellow-400" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-600/40 to-red-900/40 rounded-lg p-6 backdrop-blur-sm border border-red-500/30">
            <p className="text-sm font-semibold text-red-200 mb-2">Out of Stock</p>
            <p className="text-4xl font-bold text-white">{stats.outOfStock}</p>
          </div>
        </div>

        {/* Search and Tools */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search items, category, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="name">Sort by Name</option>
            <option value="stock">Sort by Stock</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors shadow-lg">
            <Print size={18} />
            Print
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-white border border-slate-600 font-semibold transition-colors">
            <Download size={18} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-white border border-slate-600 font-semibold transition-colors">
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {/* Inventory Table */}
        <div className="rounded-lg border border-slate-700/50 overflow-hidden backdrop-blur-sm bg-slate-900/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/80">
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Item Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Category</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Location</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Stock</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Loading inventory from Google Sheets...
                    </td>
                  </tr>
                ) : filteredItems.length > 0 ? (
                  filteredItems.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors ${idx % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/50"}`}
                    >
                      <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-slate-300">{item.category}</td>
                      <td className="px-6 py-4 text-slate-300">{item.location}</td>
                      <td className="px-6 py-4 text-slate-300">
                        {item.stock} {item.unit}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 w-fit ${getStatusColor(item.status)}`}
                        >
                          {getStatusIcon(item.status)}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      No inventory items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

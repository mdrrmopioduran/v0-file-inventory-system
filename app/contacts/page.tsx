"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Phone, Mail, Users, Building2, AlertCircle } from "lucide-react"
import { fetchContactsData } from "@/lib/google-sheets"

interface Contact {
  id: string
  name: string
  agency: string
  role: string
  phone: string
  email: string
  status: "Active" | "On Leave" | "Emergency"
  priority: "Critical" | "Support"
}

export default function ContactDirectory() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("")
  const [filterPriority, setFilterPriority] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContacts() {
      try {
        setLoading(true)
        const data = await fetchContactsData()
        setContacts(data)
      } catch (error) {
        console.error("[v0] Error loading contacts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContacts()
  }, [])

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterRole || contact.role === filterRole) &&
      (!filterPriority || contact.priority === filterPriority),
  )

  const stats = {
    total: contacts.length,
    agencies: new Set(contacts.map((c) => c.agency)).size,
    phones: contacts.filter((c) => c.phone).length,
    emails: contacts.filter((c) => c.email).length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-300 border border-green-500/30"
      case "Emergency":
        return "bg-red-500/20 text-red-300 border border-red-500/30"
      case "On Leave":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
      default:
        return "bg-slate-500/20 text-slate-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
      case "Emergency":
        return <AlertCircle size={14} className="inline mr-2 text-red-500" />
      default:
        return null
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
            <h1 className="text-2xl font-bold text-white">Contact Directory</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-600/40 to-purple-900/40 rounded-lg p-6 backdrop-blur-sm border border-purple-500/30">
            <p className="text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
              <Users size={16} />
              Total Contacts
            </p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/40 to-blue-900/40 rounded-lg p-6 backdrop-blur-sm border border-blue-500/30">
            <p className="text-sm font-semibold text-blue-200 mb-2 flex items-center gap-2">
              <Building2 size={16} />
              Agencies
            </p>
            <p className="text-3xl font-bold text-white">{stats.agencies}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600/40 to-green-900/40 rounded-lg p-6 backdrop-blur-sm border border-green-500/30">
            <p className="text-sm font-semibold text-green-200 mb-2 flex items-center gap-2">
              <Phone size={16} />
              Phone Numbers
            </p>
            <p className="text-3xl font-bold text-white">{stats.phones}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-600/40 to-orange-900/40 rounded-lg p-6 backdrop-blur-sm border border-orange-500/30">
            <p className="text-sm font-semibold text-orange-200 mb-2 flex items-center gap-2">
              <Mail size={16} />
              Emails
            </p>
            <p className="text-3xl font-bold text-white">{stats.emails}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts by name, agency, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="">All Roles</option>
            <option value="Director">Director</option>
            <option value="Chief">Chief</option>
            <option value="Officer">Officer</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="">All Priority Levels</option>
            <option value="Critical">Critical</option>
            <option value="Support">Support</option>
          </select>
        </div>

        {/* Contacts List */}
        <div className="rounded-lg border border-slate-700/50 overflow-hidden backdrop-blur-sm bg-slate-900/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/80">
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Role</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Agency</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Phone</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Email</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      Loading contacts from Google Sheets...
                    </td>
                  </tr>
                ) : filteredContacts.length > 0 ? (
                  filteredContacts.map((contact, idx) => (
                    <tr
                      key={contact.id}
                      className={`border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors ${
                        contact.priority === "Critical" ? "border-l-2 border-l-red-500" : ""
                      } ${idx % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/50"}`}
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${getStatusColor(contact.status)}`}
                        >
                          {getStatusIcon(contact.status)}
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{contact.name}</td>
                      <td className="px-6 py-4 text-slate-300">{contact.role}</td>
                      <td className="px-6 py-4 text-slate-300">{contact.agency}</td>
                      <td className="px-6 py-4 text-slate-300">{contact.phone}</td>
                      <td className="px-6 py-4 text-slate-300 truncate">{contact.email}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm mr-4">
                          Call
                        </button>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm">Email</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      No contacts found.
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

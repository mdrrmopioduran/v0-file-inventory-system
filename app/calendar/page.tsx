"use client"

import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { fetchCalendarData } from "@/lib/google-sheets"

interface CalendarEvent {
  id: string
  name: string
  date: string
  time: string
  location: string
  notes: string
  priority: "High" | "Medium" | "Low"
  type: "Event" | "Task"
}

export default function CalendarEvents() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 1))
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCalendar() {
      try {
        setLoading(true)
        const data = await fetchCalendarData()
        setEvents(data)
      } catch (error) {
        console.error("[v0] Error loading calendar:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCalendar()
  }, [])

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "before:bg-red-500"
      case "Medium":
        return "before:bg-orange-500"
      case "Low":
        return "before:bg-blue-500"
      default:
        return "before:bg-slate-500"
    }
  }

  const getEventTypeColor = (type: string) => {
    if (type === "Task") {
      return "bg-purple-500/20 text-purple-200 border border-purple-500/30"
    }
    return "bg-slate-700/30 text-slate-200 border border-slate-600/30"
  }

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const days = Array.from({ length: daysInMonth(currentMonth) }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => null)

  const filteredEvents = selectedDate ? events.filter((e) => e.date.includes(selectedDate)) : events

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
            <h1 className="text-2xl font-bold text-white">Calendar of Activities</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Widget */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold">{monthName}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">
                  {day}
                </div>
              ))}
              {[...emptyDays, ...days].map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => day && setSelectedDate(`2025-02-${String(day).padStart(2, "0")}`)}
                  className={`aspect-square rounded flex items-center justify-center text-sm font-medium transition-colors ${
                    day
                      ? "bg-slate-700/50 text-white hover:bg-teal-500/30 hover:border-teal-500/50 border border-transparent"
                      : "text-transparent"
                  } ${
                    selectedDate === `2025-02-${String(day).padStart(2, "0")}`
                      ? "ring-2 ring-teal-500 bg-teal-500/20"
                      : ""
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6">
              {selectedDate ? `Events for ${selectedDate}` : "Upcoming Events & Tasks"}
            </h3>

            {/* Events Table */}
            <div className="space-y-4">
              {loading ? (
                <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-12 text-center text-slate-400">
                  Loading calendar from Google Sheets...
                </div>
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 before:inline-block before:w-3 before:h-3 before:rounded-full ${getPriorityColor(event.priority)}`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold mb-2">{event.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-xs text-slate-400">Date</p>
                            <p className="text-slate-200">{new Date(event.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Time</p>
                            <p className="text-slate-200">{event.time}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Location</p>
                            <p className="text-slate-200">{event.location}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Type</p>
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold inline-block ${getEventTypeColor(event.type)}`}
                            >
                              {event.type}
                            </span>
                          </div>
                        </div>
                        {event.notes && <p className="text-sm text-slate-300">{event.notes}</p>}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-12 text-center text-slate-400">
                  No events found for the selected date.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { X, Menu, Maximize2, Download, Navigation } from "lucide-react"
import { MAP_LAYERS, CUSTOM_MAPS } from "@/lib/drive-client"

interface MapsClientProps {
  apiKey: string
}

export default function MapsClient({ apiKey }: MapsClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedLayer, setSelectedLayer] = useState("interactive")
  const [selectedCustomMap, setSelectedCustomMap] = useState<string | null>(null)

  const layers = MAP_LAYERS

  // Determine what to display based on selected layer
  const getMapDisplay = () => {
    // If a custom Google Map is selected, display it
    if (selectedLayer === "google-maps" && selectedCustomMap) {
      const customMap = CUSTOM_MAPS.find((m) => m.id === selectedCustomMap)
      if (customMap) {
        return (
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={customMap.src}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )
      }
    }

    // Default to Google Maps embed for other layers
    let mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Pio+Duran,+Camarines+Sur,+Philippines`

    // Customize map type based on selected layer
    switch (selectedLayer) {
      case "administrative":
        mapUrl += "&maptype=roadmap"
        break
      case "topographic":
        mapUrl += "&maptype=terrain"
        break
      case "land-use":
        mapUrl += "&maptype=satellite"
        break
      case "hazards":
        mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Pio+Duran+Emergency+Services`
        break
      default:
        break
    }

    return (
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    )
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)]">
      {sidebarOpen && (
        <div className="w-64 bg-slate-900/80 border-r border-slate-700/50 p-4 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-300 uppercase">Map Layers</h3>
            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="space-y-2">
            {layers.map((layer) => (
              <div key={layer.id}>
                <button
                  onClick={() => {
                    setSelectedLayer(layer.id)
                    if (layer.id !== "google-maps") {
                      setSelectedCustomMap(null)
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium text-left ${
                    selectedLayer === layer.id
                      ? "bg-teal-500/30 text-teal-300 border border-teal-500/50 shadow-lg"
                      : "text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <span>{layer.icon}</span>
                  <span className="flex-1">{layer.name}</span>
                </button>

                {layer.id === "google-maps" && selectedLayer === "google-maps" && (
                  <div className="ml-4 mt-2 space-y-1 border-l border-teal-500/30 pl-3">
                    {CUSTOM_MAPS.map((map) => (
                      <button
                        key={map.id}
                        onClick={() => setSelectedCustomMap(map.id)}
                        className={`w-full text-left px-3 py-2 text-xs rounded transition-colors ${
                          selectedCustomMap === map.id
                            ? "bg-teal-500/20 text-teal-300"
                            : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/30"
                        }`}
                      >
                        {map.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map Information */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-400 mb-3">
              <strong>Active Layer:</strong> {layers.find((l) => l.id === selectedLayer)?.name}
            </p>
            {selectedLayer === "google-maps" && selectedCustomMap && (
              <p className="text-xs text-slate-400">
                <strong>Map:</strong> {CUSTOM_MAPS.find((m) => m.id === selectedCustomMap)?.name}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Map Area */}
      <div className="flex-1 relative flex flex-col">
        {/* Toggle Sidebar Button */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-40 p-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-colors backdrop-blur-sm"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Map Container */}
        <div className="flex-1 bg-slate-800/30">{getMapDisplay()}</div>

        {/* Floating Toolbar */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            className="p-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-colors backdrop-blur-sm"
            title="Measure Distance"
          >
            <Maximize2 size={20} />
          </button>
          <button
            className="p-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-colors backdrop-blur-sm"
            title="Export Map"
          >
            <Download size={20} />
          </button>
          <button
            className="p-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-colors backdrop-blur-sm"
            title="My Location"
          >
            <Navigation size={20} />
          </button>
        </div>

        {/* Status Bar */}
        <div className="bg-slate-900/90 border-t border-slate-700/50 px-4 py-2 text-xs text-slate-400 flex justify-between">
          <span>Coordinates: ---, --- | Data Source: Google Maps, MDRRMO</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>
    </main>
  )
}

// Client-side Google Drive integration using public embeds
// Since real-time folder listing requires authentication, we'll use structured data

export interface GalleryCategory {
  id: string
  name: string
  description: string
  folderId: string
}

export interface DocumentFolder {
  id: string
  name: string
  folderId: string
  subfolders?: DocumentFolder[]
}

// Photo gallery categories - these would be fetched from Google Drive in production
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: "accident-response",
    name: "Accident Response",
    description: "Responders assisting victims and securing the scene.",
    folderId: "1O1WlCjMvZ5lVcrOIGNMlBY4ZuQ-zEarg",
  },
  {
    id: "awareness-seminar",
    name: "Awareness Seminar",
    description: "Educational sessions and training programs.",
    folderId: "1O1WlCjMvZ5lVcrOIGNMlBY4ZuQ-zEarg",
  },
  {
    id: "bls-first-aid",
    name: "BLS/First Aid",
    description: "Basic Life Support and First Aid training.",
    folderId: "1O1WlCjMvZ5lVcrOIGNMlBY4ZuQ-zEarg",
  },
  {
    id: "clearing-operations",
    name: "Clearing Operations",
    description: "Road and area clearing activities.",
    folderId: "1O1WlCjMvZ5lVcrOIGNMlBY4ZuQ-zEarg",
  },
  {
    id: "coastal-cleanup",
    name: "Coastal Cleanup",
    description: "Beach and coastal area cleanup efforts.",
    folderId: "1O1WlCjMvZ5lVcrOIGNMlBY4ZuQ-zEarg",
  },
  {
    id: "community-cleanup",
    name: "Community Cleanup",
    description: "Community-wide cleanup initiatives.",
    folderId: "1O1WlCjMvZ5lVcrOIGNMlBY4ZuQ-zEarg",
  },
  {
    id: "damage-assessment",
    name: "Damage Assessment",
    description: "Post-incident damage evaluation.",
    folderId: "1O1WlCjMvZ5lVcrOIGNMlBY4ZuQ-zEarg",
  },
]

// Document folder structure - would be fetched from Google Drive in production
export const DOCUMENT_FOLDERS: DocumentFolder[] = [
  {
    id: "root",
    name: "MDRRMO Documents",
    folderId: "15_xiFeXu_vdIe2CYrjGaRCAho2OqhGvo",
    subfolders: [
      { id: "plans", name: "Emergency Plans", folderId: "15_xiFeXu_vdIe2CYrjGaRCAho2OqhGvo" },
      { id: "reports", name: "Reports", folderId: "15_xiFeXu_vdIe2CYrjGaRCAho2OqhGvo" },
      { id: "policies", name: "Policies", folderId: "15_xiFeXu_vdIe2CYrjGaRCAho2OqhGvo" },
      { id: "training", name: "Training Materials", folderId: "15_xiFeXu_vdIe2CYrjGaRCAho2OqhGvo" },
    ],
  },
]

// Map layer configurations
export const MAP_LAYERS = [
  { id: "interactive", name: "Interactive Map", icon: "🗺️", active: true },
  { id: "administrative", name: "Administrative Map", icon: "🏛️", active: false },
  { id: "topographic", name: "Topographic Map", icon: "⛰️", active: false },
  { id: "land-use", name: "Land Use Map", icon: "🌍", active: false },
  { id: "hazards", name: "Hazards Maps", icon: "⚠️", active: false },
  { id: "other", name: "Other Maps", icon: "📍", active: false },
  { id: "google-maps", name: "Google Open Map", icon: "🔗", active: false },
]

export const CUSTOM_MAPS = [
  {
    id: "map-1",
    name: "Municipality Overview",
    src: "https://www.google.com/maps/d/embed?mid=1mjXfpYAmLEhG2U2Gu9VWjRdcuI9H4kw&ehbc=2E312F",
  },
  {
    id: "map-2",
    name: "Disaster Zones",
    src: "https://www.google.com/maps/d/embed?mid=17JUWx271jjwJNBN2yVStmAPY_Y_iQOg&ehbc=2E312F",
  },
  {
    id: "map-3",
    name: "Emergency Response Routes",
    src: "https://www.google.com/maps/d/embed?mid=1WqlvA465RCv29U-MyWi-1qU1MljXgAU&ehbc=2E312F",
  },
]

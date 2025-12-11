// Google Drive API helper functions
// Uses public folder sharing to list files and folders

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3"

interface DriveItem {
  id: string
  name: string
  mimeType: string
  webViewLink?: string
  thumbnailLink?: string
  modifiedTime?: string
}

// Note: This requires server-side API key to avoid CORS issues
// For client-side, we'll use alternative approach with public shares

export async function listDriveFolder(folderId: string): Promise<DriveItem[]> {
  try {
    // This is a placeholder - actual implementation requires backend
    // For now, return structured data that matches expected format
    console.log("[v0] Listing folder:", folderId)
    return []
  } catch (error) {
    console.error("[v0] Error listing drive folder:", error)
    return []
  }
}

// Helper to parse Google Drive folder URLs
export function parseDriveFolderId(url: string): string {
  const match = url.match(/\/folders\/([a-zA-Z0-9-_]+)/)
  return match ? match[1] : ""
}

// Map of folder IDs to their purposes
export const DRIVE_FOLDERS = {
  documents: "15_xiFeXu_vdIe2CYrjGaRCAho2OqhGvo", // Documents folder
  gallery: "1O1WlCjMvZ5lVcrOIGNMlBY4ZuQ-zEarg", // Photo gallery folder
  maps: {
    administrative: "1Wh2wSQuyzHiz25Vbr4ICETj18RRUEpvi",
    topographic: "1Y01dJR_YJdixvsi_B9Xs7nQaXD31_Yn2",
    landUse: "1yQmtrKfKiMOFA933W0emzeGoexMpUDGM",
    hazards: "16xy_oUAr6sWb3JE9eNrxYJdAMDRKGYLn",
    other: "1MI1aO_-gQwsRbSJsfHY2FI4AOz9Jney1",
  },
}

// Custom map iframes
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

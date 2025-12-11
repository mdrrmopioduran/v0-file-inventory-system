// Google Sheets API helper functions
// Uses public sheet sharing to fetch data without authentication

const SHEETS_API_BASE = "https://docs.google.com/spreadsheets/d"

// Convert sheet data to JSON format
function parseSheetData(values: string[][]): Record<string, string>[] {
  if (!values || values.length < 2) return []

  const headers = values[0]
  return values.slice(1).map((row) => {
    const obj: Record<string, string> = {}
    headers.forEach((header, index) => {
      obj[header.trim()] = row[index] || ""
    })
    return obj
  })
}

// Fetch data from public Google Sheet
export async function fetchSheetData(spreadsheetId: string, sheetName: string) {
  try {
    // Export sheet as CSV and parse
    const url = `${SHEETS_API_BASE}/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`

    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch sheet")

    const csv = await response.text()
    const lines = csv.split("\n")
    const values = lines.map((line) => line.split(",").map((cell) => cell.replace(/^"|"$/g, "").trim()))

    return parseSheetData(values)
  } catch (error) {
    console.error("[v0] Error fetching sheet data:", error)
    return []
  }
}

// Inventory sheet mapping
export async function fetchInventoryData() {
  const spreadsheetId = "11uutE9iZ2BjddbFkeX9cQVFOouphdvyP000vh1lGOo4"
  const data = await fetchSheetData(spreadsheetId, "Sheet1")

  return data.map((row: Record<string, string>, idx) => ({
    id: `inv-${idx}`,
    name: row["Item-Name"] || "",
    description: row["Item-Description"] || "",
    category: row["Item-Category"] || "",
    location: row["Item-Location"] || "",
    stock: Number.parseInt(row["Current-Stock"] || "0"),
    unit: row["Item-Unit"] || "",
    status: row["Item-Status"] || "In Stock",
  }))
}

// Calendar events sheet mapping
export async function fetchCalendarData() {
  const spreadsheetId = "11uutE9iZ2BjddbFkeX9cQVFOouphdvyP000vh1lGOo4"

  // Fetch events (Sheet2)
  const eventData = await fetchSheetData(spreadsheetId, "Sheet2")

  const events = eventData.map((row: Record<string, string>, idx) => ({
    id: `event-${idx}`,
    name: row["Event Name"] || "",
    date: row["Date"] || "",
    time: row["Time"] || "",
    location: row["Location"] || "",
    notes: row["Notes"] || "",
    priority: (row["Priority"] || "Medium") as "High" | "Medium" | "Low",
    type: "Event" as const,
  }))

  // Fetch tasks - they would be on same or different sheet
  const tasks = eventData
    .filter((row: Record<string, string>) => row["Task Name"])
    .map((row: Record<string, string>, idx) => ({
      id: `task-${idx}`,
      name: row["Task Name"] || "",
      date: row["Date & Time"] || "",
      time: row["Date & Time"]?.split(" ")[1] || "",
      location: row["Deadline Date & Time"] || "",
      notes: row["Description"] || "",
      priority: "Medium" as const,
      type: "Task" as const,
    }))

  return [...events, ...tasks]
}

// Contacts sheet mapping
export async function fetchContactsData() {
  const spreadsheetId = "11uutE9iZ2BjddbFkeX9cQVFOouphdvyP000vh1lGOo4"
  const data = await fetchSheetData(spreadsheetId, "Sheet3")

  return data.map((row: Record<string, string>, idx) => ({
    id: `contact-${idx}`,
    name: row["Contact Name"] || "",
    agency: row["Agency"] || "",
    role: row["Role/Title"] || "",
    phone: row["Primary Phone"] || "",
    email: row["Email"] || "",
    status: (row["Status Indicator"] || "Active") as "Active" | "On Leave" | "Emergency",
    priority: row["Priority"] === "Critical" ? "Critical" : "Support",
  }))
}

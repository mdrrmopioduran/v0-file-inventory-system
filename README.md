# MDRRMO PIO DURAN - File Inventory and Management System

A modern, responsive web application for disaster risk reduction and management operations in Pio Duran municipality. Built with Next.js 16, TypeScript, and Tailwind CSS, featuring real-time integration with Google Sheets and Google Drive.

## 🎯 Overview

The MDRRMO Pio Duran File Inventory and Management System is a centralized platform designed to streamline emergency management operations, file organization, and coordination for disaster risk reduction initiatives. The system provides six core modules for managing supplies, activities, contacts, documents, photos, and geographic data.

## ✨ Key Features

### 6 Core Modules

1. **Supply Inventory**
   - Real-time tracking of emergency equipment and supplies
   - Stock status indicators (In Stock, Low Stock, Out of Stock)
   - Search and filtering capabilities
   - Inventory summary statistics
   - Export and print functionality
   - Data sourced from Google Sheets

2. **Calendar of Activities**
   - Event and task scheduling
   - Priority-based color coding
   - Monthly calendar view
   - Activity filtering and management
   - Google Sheets integration for event data

3. **Contact Directory**
   - Emergency personnel database
   - Status indicators (Active, On Leave, Emergency)
   - Critical contact highlighting
   - Agency and role information
   - Phone and email contacts

4. **Document Management**
    - sidebar navigation (Google Drive folder integration)
   - Document categorization
   - File type indicators (PDF, DOCX, XLSX)
   - Breadcrumb navigation
   - Real-time document browser

5. **Photo Gallery**
6. - sidebar navigation (Google Drive folder integration)
   - Category-based photo organization
   - panorama and 360° image support for WEBP file
   - Metadata display
   - Search and filtering

7. **Maps & Geographic Data**
   - Interactive Google Maps embed
   - Interactive Map (Municipality Overview)
     - Administrative Map (Google Drive folder structure)
     - Topographic Map (Google Drive folder structure)
     - Land Use Map (Google Drive folder structure)
     - Hazard Map (Google Drive folder structure)
     - Evacuation Map (Google Drive folder structure)
     - Satellite Map (Google Drive folder structure)
     - Other Map (Google Drive folder structure)
   - Collapsible sidebar for layer selection
   - Floating toolbar with measurement tools

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Data Sources**: Google Sheets API, Google Drive API
- **Analytics**: Vercel Analytics

### Project Structure

\`\`\`
project/
├── app/
│   ├── page.tsx              # Main dashboard
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── supply/               # Supply inventory module
│   ├── calendar/             # Calendar of activities module
│   ├── contacts/             # Contact directory module
│   ├── documents/            # Document management module
│   ├── gallery/              # Photo gallery module
│   └── maps/                 # Maps & geographic data module
├── lib/
│   ├── google-sheets.ts      # Google Sheets API integration
│   ├── google-drive.ts       # Google Drive configuration
│   ├── drive-client.ts       # Drive client utilities
│   ├── google-maps.ts        # Google Maps utilities
│   └── utils.ts              # Helper functions
├── components/
│   └── ui/                   # shadcn/ui components
├── public/                   # Static assets
└── styles/                   # Additional styles
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Google Drive account (for data integration)

### Installation

1. **Clone or download the project**
   \`\`\`bash
   # If using GitHub
   git clone https://github.com/yourusername/mdrrmo-pioduran.git
   cd mdrrmo-pioduran
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📊 Data Integration

### Google Sheets Setup

The Supply Inventory, Calendar, and Contact modules pull data from a Google Sheet with the following structure:

**Spreadsheet ID**: `11uutE9iZ2BjddbFkeX9cQVFOouphdvyP000vh1lGOo4`

#### Sheet1 - Supply Inventory
| Item-Name | Item-Description | Item-Category | Item-Location | Current-Stock | Item-Unit | Item-Status |
|-----------|------------------|---------------|---------------|----------------|-----------|-------------|
| Water Tanks | Emergency water supply | Supplies | Warehouse A | 50 | units | In Stock |

#### Sheet2 - Calendar Events
| Event Name | Date | Time | Location | Notes | Priority |
|-----------|------|------|----------|-------|----------|
| Typhoon Drill | 2025-01-15 | 09:00 | Town Hall | Monthly drill | High |

#### Sheet3 - Contacts
| Contact Name | Agency | Role/Title | Primary Phone | Email | Status Indicator | Priority |
|-------------|--------|-----------|----------------|-------|-----------------|----------|
| John Doe | MDRRMO | Coordinator | +63-9XX-XXX-XXXX | john@example.com | Active | Critical |

**To use your own Google Sheet:**
1. Create a publicly shared Google Sheet
2. Copy the spreadsheet ID from the URL
3. Update the `spreadsheetId` in `lib/google-sheets.ts`
4. Ensure column headers match the expected format

### Google Drive Setup

The Documents, Gallery, and Maps modules integrate with Google Drive folders. Update folder IDs in `lib/drive-client.ts`:

\`\`\`typescript
export const DRIVE_FOLDERS = {
  documents: "YOUR_FOLDER_ID",
  gallery: "YOUR_FOLDER_ID",
  maps: {
    administrative: "YOUR_FOLDER_ID",
    topographic: "YOUR_FOLDER_ID",
    // ... more folders
  },
}
\`\`\`

## 🎨 Design System

### Color Palette

- **Primary**: Slate/Blue (#1e293b, #0f172a)
- **Accents**: Yellow (#fbbf24), Green (#22c55e), Red (#ef4444), Pink (#ec4899)
- **Backgrounds**: Dark slate gradients with glassmorphism effects

### Typography

- **Display Font**: Geist (sans-serif)
- **Monospace**: Geist Mono
- **Line Height**: 1.5-1.6 for body text

### Layout

- Mobile-first responsive design
- Flexbox-based layouts
- Glassmorphism cards with backdrop blur
- Smooth animations and transitions

## 🔧 Configuration

### Environment Variables

\`\`\`
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY    # Google Maps API key (required for Maps module)
\`\`\`

### Google API Keys

1. **Google Maps API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Maps JavaScript API
   - Create an API key
   - Restrict it to your domain for security

## 📱 Features & Functionality

### Dashboard
- Beautiful hero section with module cards
- Gradient backgrounds with animated blobs
- Quick access to all modules
- Responsive grid layout (1, 2, or 3 columns)

### Supply Inventory
- Stats dashboard (Total, In Stock, Low Stock, Out of Stock)
- Advanced search and filtering
- Sort by name, stock level, or status
- Print and export functionality
- Status badges with icons

### Calendar
- Monthly calendar view
- Event and task listings
- Priority indicators
- Date filtering
- Event type categorization

### Contacts
- Personnel directory
- Status indicators
- Agency grouping
- Contact information display
- Critical contact highlighting

### Documents
- Folder navigation
- File type icons
- Breadcrumb trails
- Search functionality
- Real-time file listing

### Photo Gallery
- Category-based organization
- Image grid with hover effects
- 360° panorama support
- Metadata display
- Search and filtering

### Maps
- Interactive Google Maps embed
- Multiple map layer selections
- Floating toolbar
- Layer toggling
- Custom map iframes

## 🐛 Known Issues & Troubleshooting

### Common Issues

1. **Google Sheets not loading**
   - Ensure the sheet is publicly shared
   - Verify the spreadsheet ID is correct
   - Check browser console for CORS errors
   - The CSV export endpoint may fail if sheets have many rows

2. **Google Maps not displaying**
   - Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
   - Check API key restrictions in Google Cloud Console
   - Ensure Maps JavaScript API is enabled
   - Clear browser cache and reload

3. **Images not loading**
   - Check image URLs are accessible
   - Verify Google Drive links are publicly shared
   - Ensure proper CORS headers for external images

4. **Slow performance**
   - Google Sheets API calls can be slow with large datasets
   - Consider implementing caching or server-side fetching
   - Use pagination for large lists

### Debug Mode

Add console.log statements in any module to debug:
\`\`\`typescript
console.log("[v0] Data loaded:", data)
\`\`\`

## 🚀 Deployment

### Deploy to Vercel

1. **Connect your GitHub repository**
   - Push code to GitHub
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Select your repository

2. **Set environment variables**
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

### Deploy to Other Platforms

\`\`\`bash
# Build the project
npm run build

# Start production server
npm start
\`\`\`

## 📖 API Documentation

### Google Sheets Functions

\`\`\`typescript
// Fetch inventory data from Sheet1
fetchInventoryData(): Promise<InventoryItem[]>

// Fetch calendar events from Sheet2
fetchCalendarData(): Promise<CalendarEvent[]>

// Fetch contacts from Sheet3
fetchContactsData(): Promise<Contact[]>

// Generic sheet fetcher
fetchSheetData(spreadsheetId, sheetName): Promise<Record[]>
\`\`\`

### Custom Hooks

\`\`\`typescript
// Built-in shadcn hooks
use-mobile()      # Detect mobile viewport
use-toast()       # Toast notifications
\`\`\`

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@mdrrmo.gov.ph
- Visit: https://www.pioduran.gov.ph

## 🙏 Acknowledgments

- MDRRMO Pio Duran for project specifications
- Next.js team for the framework
- shadcn/ui for UI components
- Google for Maps and Sheets API
- Vercel for hosting and analytics

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Status**: Production Ready

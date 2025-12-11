import MapsPageClient from "./maps-client-page"

export const metadata = {
  title: "Maps - MDRRMO PIO DURAN",
  description: "Interactive maps and GIS interface for emergency management",
}

export default function MapsPage() {
  // Users can configure their own API key via Google Cloud Console
  const mapsApiKey = "AIzaSyCDcthLGNPlbMr4AFzuK5tl0CMTzsQI9EI"

  return <MapsPageClient apiKey={mapsApiKey} />
}

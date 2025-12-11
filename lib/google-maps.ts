// Google Maps API helper for loading scripts

export const loadGoogleMapsScript = (apiKey: string) => {
  if (typeof window === "undefined") return

  // Check if script already exists
  if (window.google?.maps) return

  if (!apiKey) {
    console.warn("Google Maps API key is required to load the Maps script")
    return
  }

  const script = document.createElement("script")
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

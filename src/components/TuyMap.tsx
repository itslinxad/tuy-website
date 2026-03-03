import { useState, useEffect, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import MapFilterPills from "./MapFilterPills";
import { TUY_CENTER, tuyMarkers, fetchMapPins, computeMarkerCounts } from "../data/tuyLocations";
import type { MarkerCategory, MapMarker } from "../types/map.types";

/**
 * TuyMap Component
 *
 * Interactive Google Maps component showing points of interest in Tuy, Batangas.
 * Features:
 * - Filter by category (Halls, Barangays, Offices)
 * - AdvancedMarker with Pin for category-specific colors
 * - Info windows on marker click
 * - Fetches pins from API with hardcoded fallback
 */

function TuyMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

  // Markers from API (or fallback)
  const [markers, setMarkers] = useState<MapMarker[]>(tuyMarkers);

  // Filter state - all categories active by default
  const [activeFilters, setActiveFilters] = useState<Set<MarkerCategory>>(
    new Set(["halls", "barangays", "offices"]),
  );

  // Selected marker for info window
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  // Fetch pins from API on mount
  useEffect(() => {
    fetchMapPins().then(setMarkers);
  }, []);

  // Filter markers based on active filters
  const filteredMarkers = useMemo(() => {
    return markers.filter((marker) => activeFilters.has(marker.category));
  }, [markers, activeFilters]);

  // Compute counts dynamically from fetched data
  const markerCounts = useMemo(() => computeMarkerCounts(markers), [markers]);

  // Handle filter toggle - exclusive selection (only one category shown at a time)
  const handleFilterToggle = (category: MarkerCategory) => {
    setActiveFilters((prev) => {
      // If this category is already the only one selected, show all
      if (prev.size === 1 && prev.has(category)) {
        return new Set(["halls", "barangays", "offices"]);
      }
      // Otherwise, show only this category
      return new Set([category]);
    });
  };

  // Get category colors for Pin component
  const getCategoryColors = (category: MarkerCategory) => {
    switch (category) {
      case "halls":
        return { background: "#01377d", borderColor: "#00306e", glyphColor: "#ffffff" };
      case "barangays":
        return { background: "#2e7d32", borderColor: "#1b5e20", glyphColor: "#ffffff" };
      case "offices":
        return { background: "#ed6c02", borderColor: "#e65100", glyphColor: "#ffffff" };
      default:
        return { background: "#01377d", borderColor: "#00306e", glyphColor: "#ffffff" };
    }
  };

  // Get category label for info window
  const getCategoryLabel = (category: MarkerCategory): string => {
    switch (category) {
      case "halls":
        return "Municipal Facility";
      case "barangays":
        return "Barangay";
      case "offices":
        return "Government Office";
      default:
        return "";
    }
  };

  // Custom map styles - muted colors
  const mapStyles = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ saturation: -30 }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#a8c5dc" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [{ color: "#f0f0f0" }],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#d0d0d0" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffa500" }, { lightness: 50 }],
    },
  ];

  // Handle API key error
  if (!apiKey) {
    console.log("Google Maps API Key Required");
    return (
      <div className="w-full h-[500px] md:h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">&#x1F5FA;&#xFE0F;</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Something went wrong.
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={TUY_CENTER}
          defaultZoom={14}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={true}
          zoomControl={true}
          styles={mapStyles}
          mapId="DEMO_MAP_ID"
          className="w-full h-full"
        >
          {/* Render filtered markers */}
          {filteredMarkers.map((marker) => {
            const colors = getCategoryColors(marker.category);
            return (
              <AdvancedMarker
                key={marker.id}
                position={marker.position}
                onClick={() => setSelectedMarker(marker)}
                title={marker.title}
              >
                <Pin
                  background={colors.background}
                  borderColor={colors.borderColor}
                  glyphColor={colors.glyphColor}
                />
              </AdvancedMarker>
            );
          })}

          {/* Info window for selected marker */}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
              maxWidth={300}
            >
              <div className="p-2">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {selectedMarker.title}
                </h3>
                {selectedMarker.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedMarker.description}
                  </p>
                )}
                {selectedMarker.address && (
                  <p className="text-xs text-gray-500 mb-1">
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    {selectedMarker.address}
                  </p>
                )}
                <div className="text-xs text-gray-500 capitalize">
                  {getCategoryLabel(selectedMarker.category)}
                </div>
              </div>
            </InfoWindow>
          )}

          {/* Filter pills overlay - positioned center top */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <MapFilterPills
              activeFilters={activeFilters}
              onFilterToggle={handleFilterToggle}
              markerCounts={markerCounts}
            />
          </div>
        </Map>
      </APIProvider>
    </div>
  );
}

export default TuyMap;

import { useState, useEffect, useRef, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

/**
 * ContactMap Component with Integrated Directions
 *
 * Full-featured directions component for the Contact Us page
 * Shows the Tuy Municipal Hall location with integrated turn-by-turn directions
 *
 * Features:
 * - GPS or manual address entry
 * - Places Autocomplete for origin search
 * - Multiple travel modes (Driving, Transit, Walking)
 * - Real-time traffic conditions
 * - Turn-by-turn directions
 * - Route visualization on map
 * - Responsive side panel layout
 */

interface ContactMapProps {
  lat?: number;
  lng?: number;
  title?: string;
  address?: string;
  phone?: string;
  hours?: string;
}

// Custom map styles
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

/**
 * Inner component that renders inside <APIProvider>.
 * This is necessary because hooks like useMap() and useMapsLibrary()
 * must be called inside a child of <APIProvider>, not in the same
 * component that renders it.
 */
function ContactMapInner({
  destination,
  title,
  address,
}: {
  destination: google.maps.LatLngLiteral;
  title: string;
  address: string;
}) {
  const map = useMap();
  const places = useMapsLibrary("places");

  // Map and directions state
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [originAddress, setOriginAddress] = useState<string>("");
  const [directionsResult, setDirectionsResult] =
    useState<google.maps.DirectionsResult | null>(null);
  const [travelMode, setTravelMode] = useState<google.maps.TravelMode>(
    "DRIVING" as google.maps.TravelMode
  );
  const [showTraffic, setShowTraffic] = useState(true);
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);
  const [directionsError, setDirectionsError] = useState<string | null>(null);
  const [userLocationDetected, setUserLocationDetected] = useState(false);
  const [showDirectionsPanel, setShowDirectionsPanel] = useState(false);
  const [locationMode, setLocationMode] = useState<"gps" | "manual" | null>(
    null
  );
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // Autocomplete state
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Refs
  const originInputRef = useRef<HTMLInputElement>(null);
  const predictionsRef = useRef<HTMLDivElement>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null
  );
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  );
  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null);

  // Initialize Places API services
  useEffect(() => {
    if (!places) return;

    setAutocompleteService(new places.AutocompleteService());

    // PlacesService needs a map or a div, but AutocompleteService does not
    if (map) {
      setPlacesService(new places.PlacesService(map));
    }
  }, [places, map]);

  // Click outside to dismiss predictions dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        predictionsRef.current &&
        !predictionsRef.current.contains(e.target as Node) &&
        originInputRef.current &&
        !originInputRef.current.contains(e.target as Node)
      ) {
        setShowPredictions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize Directions Service and Renderer
  useEffect(() => {
    if (!map) return;

    directionsServiceRef.current = new google.maps.DirectionsService();

    directionsRendererRef.current = new google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: "#01377d",
        strokeWeight: 5,
        strokeOpacity: 0.8,
      },
      markerOptions: {
        label: {
          text: "A",
          color: "white",
        },
      },
    });

    // Initialize traffic layer
    trafficLayerRef.current = new google.maps.TrafficLayer();
    if (showTraffic) {
      trafficLayerRef.current.setMap(map);
    }

    return () => {
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }
      if (trafficLayerRef.current) {
        trafficLayerRef.current.setMap(null);
      }
    };
  }, [map]);

  // Toggle traffic layer
  useEffect(() => {
    if (!trafficLayerRef.current || !map) return;

    if (showTraffic) {
      trafficLayerRef.current.setMap(map);
    } else {
      trafficLayerRef.current.setMap(null);
    }
  }, [showTraffic, map]);

  // Handle origin input change with search results
  const handleOriginInputChange = useCallback(
    async (value: string) => {
      setOriginAddress(value);

      if (!autocompleteService || value.length < 3) {
        setPredictions([]);
        setShowPredictions(false);
        setSearchAttempted(false);
        return;
      }

      setIsSearchingPlaces(true);
      setSearchAttempted(true);

      try {
        const result = await autocompleteService.getPlacePredictions({
          input: value,
          componentRestrictions: { country: "ph" },
          // Bias results toward Tuy, Batangas area
          locationBias: {
            center: { lat: destination.lat, lng: destination.lng },
            radius: 50000, // 50km radius
          } as any,
        });

        setPredictions(result?.predictions || []);
        setShowPredictions(true);
        setIsSearchingPlaces(false);
      } catch (error) {
        console.error("Autocomplete error:", error);
        setPredictions([]);
        setIsSearchingPlaces(false);
        setShowPredictions(true); // Still show dropdown with "no results" state
      }
    },
    [autocompleteService, destination]
  );

  // Handle prediction selection
  const handleSelectPrediction = useCallback(
    (prediction: google.maps.places.AutocompletePrediction) => {
      if (!placesService) return;

      placesService.getDetails(
        {
          placeId: prediction.place_id,
          fields: ["geometry", "formatted_address"],
        },
        (place, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            const location = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            setOrigin(location);
            setOriginAddress(place.formatted_address || prediction.description);
            setShowPredictions(false);
          }
        }
      );
    },
    [placesService]
  );

  // Use current location via GPS
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsDetectingGps(true);
      setDirectionsError(null);
      setLocationMode("gps");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setOrigin(userLocation);
          setUserLocationDetected(true);
          setOriginAddress("Your current location");
          setShowPredictions(false);
          setIsDetectingGps(false);
        },
        () => {
          setDirectionsError(
            "Unable to get your location. Please allow location access or enter an address manually."
          );
          setIsDetectingGps(false);
          setLocationMode(null);
        }
      );
    } else {
      setDirectionsError(
        "GPS is not supported by your browser. Please enter an address manually."
      );
    }
  };

  // Switch to manual entry mode
  const handleSwitchToManual = () => {
    setLocationMode("manual");
    setOrigin(null);
    setOriginAddress("");
    setUserLocationDetected(false);
    setDirectionsResult(null);
    setDirectionsError(null);
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setDirections({ routes: [] } as any);
    }
    // Focus the input after mode switch
    setTimeout(() => originInputRef.current?.focus(), 100);
  };

  // Calculate directions
  const calculateDirections = useCallback(async () => {
    if (!origin || !directionsServiceRef.current) {
      setDirectionsError("Please enter a starting location");
      return;
    }

    setIsLoadingDirections(true);
    setDirectionsError(null);
    setShowDirectionsPanel(true);

    try {
      const request: google.maps.DirectionsRequest = {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        region: "ph",
        unitSystem: google.maps.UnitSystem.METRIC,
      };

      // Add driving options if travel mode is DRIVING and traffic is enabled
      if (travelMode === "DRIVING" && showTraffic) {
        request.drivingOptions = {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS,
        };
      }

      const result = await directionsServiceRef.current.route(request);

      if (result.routes.length === 0) {
        throw new Error("No routes found");
      }

      setDirectionsResult(result);
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setDirections(result);
      }

      // Adjust map to fit route
      if (map && result.routes[0].bounds) {
        map.fitBounds(result.routes[0].bounds);
      }

      setIsLoadingDirections(false);
    } catch (error: any) {
      console.error("Directions error:", error);

      let errorMessage = "Could not calculate directions. Please try again.";

      if (error.code === "ZERO_RESULTS") {
        if (travelMode === "TRANSIT") {
          errorMessage =
            "No transit routes available for this area. Try driving or walking instead.";
        } else {
          errorMessage = "No routes found between these locations.";
        }
      } else if (error.code === "NOT_FOUND") {
        errorMessage = "One or both locations could not be found.";
      }

      setDirectionsError(errorMessage);
      setDirectionsResult(null);
      setIsLoadingDirections(false);
    }
  }, [origin, destination, travelMode, showTraffic, map]);

  // Recalculate when travel mode changes
  useEffect(() => {
    if (directionsResult && origin) {
      calculateDirections();
    }
  }, [travelMode]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Map Area - 60% on desktop */}
      <div className="flex-1 lg:w-3/5 h-[500px] lg:h-full relative">
        <Map
          defaultCenter={destination}
          defaultZoom={14}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          mapTypeControl={false}
          streetViewControl={true}
          fullscreenControl={true}
          zoomControl={true}
          styles={mapStyles}
          mapId="tuy-contact-map"
          className="w-full h-full rounded-lg"
        >
          {/* Destination Marker - only show if no directions */}
          {!directionsResult && (
            <AdvancedMarker position={destination} title={title}>
              <Pin
                background="#ef4444"
                borderColor="#ffffff"
                glyphColor="#ffffff"
                scale={1.3}
              />
            </AdvancedMarker>
          )}
        </Map>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setShowDirectionsPanel(!showDirectionsPanel)}
          className="lg:hidden fixed bottom-6 right-6 bg-primary text-white px-6 py-3 rounded-full shadow-2xl z-30 flex items-center gap-2 font-semibold"
        >
          <i className="fas fa-directions"></i>
          {showDirectionsPanel ? "Hide" : "Show"} Directions
        </button>
      </div>

      {/* Directions Panel - 40% on desktop */}
      <div
        className={`
        lg:w-2/5 lg:static lg:block
        fixed bottom-0 left-0 right-0 lg:relative
        transform transition-transform duration-300 ease-in-out
        ${showDirectionsPanel ? "translate-y-0" : "translate-y-full lg:translate-y-0"}
        max-h-[70vh] lg:max-h-full overflow-y-auto
        bg-white rounded-t-2xl lg:rounded-lg shadow-2xl
        z-20
      `}
      >
        <div className="p-6">
          {/* Header with close button on mobile */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="font-bold text-2xl text-gray-900">
              Get Directions
            </h3>
            <button
              onClick={() => setShowDirectionsPanel(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <i className="fas fa-times text-gray-600"></i>
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-6">
            <h3 className="font-bold text-2xl text-gray-900">
              Get Directions
            </h3>
          </div>

          {/* Origin Input */}
          <div className="mb-3 relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              From
            </label>

            {/* GPS / Manual Toggle Buttons */}
            {!locationMode && (
              <div className="flex gap-3">
                <button
                  onClick={handleUseCurrentLocation}
                  className="flex-1 py-3 px-4 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <i className="fas fa-location-crosshairs"></i>
                  Use GPS
                </button>
                <button
                  onClick={handleSwitchToManual}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-800 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border border-gray-300"
                >
                  <i className="fas fa-keyboard"></i>
                  Enter Address
                </button>
              </div>
            )}

            {/* GPS Detecting State */}
            {locationMode === "gps" && isDetectingGps && (
              <div className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-center gap-3">
                <i className="fas fa-spinner fa-spin text-primary"></i>
                <span className="text-sm text-gray-700 font-medium">
                  Detecting your location...
                </span>
              </div>
            )}

            {/* GPS Detected Successfully */}
            {locationMode === "gps" &&
              !isDetectingGps &&
              userLocationDetected && (
                <div className="space-y-2">
                  <div className="w-full px-4 py-3 bg-green-50 border-2 border-green-300 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-location-crosshairs text-green-600"></i>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          GPS Location Detected
                        </div>
                        <div className="text-xs text-gray-600">
                          Your current location will be used
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSwitchToManual}
                      className="text-xs text-primary hover:text-primary-hover font-semibold underline"
                    >
                      Enter address instead
                    </button>
                  </div>
                </div>
              )}

            {/* Manual Entry Mode */}
            {locationMode === "manual" && (
              <div className="space-y-2">
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                  <input
                    ref={originInputRef}
                    type="text"
                    value={originAddress}
                    onChange={(e) => handleOriginInputChange(e.target.value)}
                    onFocus={() => {
                      if (
                        predictions.length > 0 ||
                        (searchAttempted && originAddress.length >= 3)
                      )
                        setShowPredictions(true);
                    }}
                    placeholder="Search for a place or address"
                    className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  />
                  {isSearchingPlaces ? (
                    <i className="fas fa-spinner fa-spin absolute right-3 top-1/2 -translate-y-1/2 text-primary"></i>
                  ) : originAddress.length > 0 ? (
                    <button
                      onClick={() => {
                        setOriginAddress("");
                        setPredictions([]);
                        setShowPredictions(false);
                        setSearchAttempted(false);
                        setOrigin(null);
                        originInputRef.current?.focus();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <i className="fas fa-times-circle"></i>
                    </button>
                  ) : (
                    <i className="fas fa-map-marker-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  )}
                </div>

                {/* Helper text */}
                {!showPredictions && originAddress.length === 0 && (
                  <p className="text-xs text-gray-500 px-1">
                    Type at least 3 characters to search for places in the
                    Philippines
                  </p>
                )}

                <button
                  onClick={handleUseCurrentLocation}
                  className="text-xs text-primary hover:text-primary-hover font-semibold flex items-center gap-1"
                >
                  <i className="fas fa-location-crosshairs text-[10px]"></i>
                  Use GPS instead
                </button>
              </div>
            )}

            {/* Search Results Dropdown */}
            {locationMode === "manual" && showPredictions && (
              <div
                ref={predictionsRef}
                className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-72 overflow-y-auto"
              >
                {/* Searching State */}
                {isSearchingPlaces && (
                  <div className="px-4 py-4 flex items-center gap-3 text-gray-500">
                    <i className="fas fa-spinner fa-spin text-primary"></i>
                    <span className="text-sm">Searching places...</span>
                  </div>
                )}

                {/* Results */}
                {!isSearchingPlaces && predictions.length > 0 && (
                  <>
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Search Results ({predictions.length})
                      </span>
                    </div>
                    {predictions.map((prediction, index) => (
                      <button
                        key={prediction.place_id}
                        onClick={() => handleSelectPrediction(prediction)}
                        className={`w-full px-4 py-3 text-left hover:bg-blue-50 flex items-start gap-3 transition-colors ${
                          index < predictions.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                          <i className="fas fa-map-marker-alt text-primary text-sm"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate text-sm">
                            {prediction.structured_formatting.main_text}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {prediction.structured_formatting.secondary_text}
                          </div>
                        </div>
                      </button>
                    ))}
                  </>
                )}

                {/* No Results */}
                {!isSearchingPlaces &&
                  predictions.length === 0 &&
                  searchAttempted && (
                    <div className="px-4 py-5 text-center">
                      <i className="fas fa-search text-gray-300 text-2xl mb-2"></i>
                      <p className="text-sm text-gray-600 font-medium">
                        No places found
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Try a different search term or a more specific address
                      </p>
                    </div>
                  )}

                {/* Google Attribution */}
                {(predictions.length > 0 || isSearchingPlaces) && (
                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-end">
                    <span className="text-[10px] text-gray-400">
                      Powered by Google
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Destination (Read-only) */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              To
            </label>
            <div className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-800 flex items-center gap-2">
              <i className="fas fa-landmark text-primary"></i>
              <span className="font-medium">{title}</span>
            </div>
          </div>

          {/* Get Directions Button */}
          <button
            onClick={calculateDirections}
            disabled={!origin || isLoadingDirections}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mb-6"
          >
            {isLoadingDirections ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Calculating...
              </>
            ) : (
              <>
                <i className="fas fa-route"></i>
                Get Directions
              </>
            )}
          </button>

          {/* Travel Mode Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() =>
                setTravelMode("DRIVING" as google.maps.TravelMode)
              }
              className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                travelMode === "DRIVING"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <i className="fas fa-car mr-2"></i>
              Driving
            </button>
            <button
              onClick={() =>
                setTravelMode("TRANSIT" as google.maps.TravelMode)
              }
              className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                travelMode === "TRANSIT"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <i className="fas fa-bus mr-2"></i>
              Transit
            </button>
            <button
              onClick={() =>
                setTravelMode("WALKING" as google.maps.TravelMode)
              }
              className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                travelMode === "WALKING"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <i className="fas fa-walking mr-2"></i>
              Walking
            </button>
          </div>

          {/* Traffic Toggle (only for driving) */}
          {travelMode === "DRIVING" && (
            <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <i className="fas fa-traffic-light text-primary"></i>
                <span className="text-sm font-semibold text-gray-900">
                  Show Traffic Conditions
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTraffic}
                  onChange={(e) => setShowTraffic(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          )}

          {/* Error Message */}
          {directionsError && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start gap-3">
                <i className="fas fa-exclamation-circle text-red-500 mt-1"></i>
                <div>
                  <p className="font-semibold text-red-800 mb-1">
                    Unable to calculate directions
                  </p>
                  <p className="text-sm text-red-700">{directionsError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoadingDirections && (
            <div className="space-y-3 mb-6">
              <div className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
              <div className="animate-pulse bg-gray-200 h-16 rounded-lg"></div>
              <div className="animate-pulse bg-gray-200 h-16 rounded-lg"></div>
            </div>
          )}

          {/* Route Summary */}
          {directionsResult && !isLoadingDirections && (
            <>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 mb-6 border border-blue-200">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-600 uppercase mb-1">
                      Distance
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {directionsResult.routes[0].legs[0].distance?.text}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-600 uppercase mb-1">
                      {showTraffic && travelMode === "DRIVING"
                        ? "With Traffic"
                        : "Duration"}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {showTraffic &&
                      travelMode === "DRIVING" &&
                      directionsResult.routes[0].legs[0].duration_in_traffic
                        ? directionsResult.routes[0].legs[0].duration_in_traffic
                            .text
                        : directionsResult.routes[0].legs[0].duration?.text}
                    </div>
                  </div>
                </div>

                {/* Route info */}
                <div className="flex items-center gap-2 text-sm text-gray-700 bg-white/50 rounded px-3 py-2">
                  <i className="fas fa-route text-primary"></i>
                  <span>
                    via{" "}
                    <span className="font-semibold">
                      {directionsResult.routes[0].summary}
                    </span>
                  </span>
                </div>
              </div>

              {/* Turn-by-Turn Directions */}
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-list-ol text-primary"></i>
                  Step-by-step Directions
                </h4>

                <div className="space-y-3">
                  {directionsResult.routes[0].legs[0].steps.map(
                    (step, index) => (
                      <div
                        key={index}
                        className="flex gap-3 pb-3 border-b border-gray-200 last:border-0"
                      >
                        {/* Step Number */}
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0">
                          {/* Instruction */}
                          <div
                            className="text-gray-800 mb-1 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: step.instructions,
                            }}
                          />

                          {/* Distance and Duration */}
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <i className="fas fa-road text-xs"></i>
                              {step.distance?.text}
                            </span>
                            {step.duration && (
                              <span className="flex items-center gap-1">
                                <i className="fas fa-clock text-xs"></i>
                                {step.duration.text}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {/* Final Destination */}
                  <div className="flex gap-3 pt-2">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      <i className="fas fa-flag-checkered text-xs"></i>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">
                        Arrive at {title}
                      </div>
                      <div className="text-sm text-gray-600">{address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Initial State - No Directions Yet */}
          {!directionsResult && !isLoadingDirections && !directionsError && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-map-marked-alt text-4xl text-gray-400"></i>
              </div>
              <p className="text-gray-600 mb-2">
                Enter your starting location above
              </p>
              <p className="text-sm text-gray-500">
                Get turn-by-turn directions to Tuy Municipal Hall
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Outer wrapper component that provides the APIProvider context.
 * All Google Maps hooks must be used in children of this component.
 */
function ContactMap({
  lat = 14.019133820661795,
  lng = 120.73023066599163,
  title = "Tuy Municipal Hall",
  address = "Municipal Hall, Tuy, Batangas 4214",
}: ContactMapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const destination = { lat, lng };

  // Handle API key error
  if (!apiKey) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">
            <i className="fas fa-map-marked-alt text-gray-400"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Map Unavailable
          </h3>
          <p className="text-gray-600 text-sm">
            Google Maps API key is not configured.
            <br />
            Please contact the site administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <APIProvider apiKey={apiKey}>
        <ContactMapInner
          destination={destination}
          title={title}
          address={address}
        />
      </APIProvider>
    </div>
  );
}

export default ContactMap;

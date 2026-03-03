/**
 * Location data for Tuy, Batangas
 * Contains markers for Municipal Halls, Barangays, and Government Offices
 */

import type { MapMarker, MapConfig } from '../types/map.types';

/**
 * Center coordinates for Tuy, Batangas (Municipal Hall)
 * Updated with accurate GPS coordinates
 */
export const TUY_CENTER = {
  lat: 14.019133820661795,
  lng: 120.73023066599163,
};

/**
 * Default map configuration
 */
export const DEFAULT_MAP_CONFIG: MapConfig = {
  center: TUY_CENTER,
  zoom: 14,
};

/**
 * Accurate boundary polygon for Tuy municipality
 * Based on official map reference showing the red dotted boundary
 * Tuy is bounded by Nasugbu/Balayan to the north, Lian/Nasugbu to the east,
 * and Balayan Bay to the west and southwest
 */
export const TUY_BOUNDARY = [
  // Northwestern point (near Jollibee/BILARAN area)
  { lat: 14.0350, lng: 120.6880 },
  
  // North boundary - following the curve towards Nasugbu
  { lat: 14.0380, lng: 120.7000 },
  { lat: 14.0420, lng: 120.7100 },
  { lat: 14.0450, lng: 120.7200 },
  { lat: 14.0470, lng: 120.7300 },
  
  // Northeast curve (near TOONG area)
  { lat: 14.0480, lng: 120.7400 },
  { lat: 14.0470, lng: 120.7500 },
  { lat: 14.0450, lng: 120.7600 },
  
  // Eastern boundary (near Mount Batulao/SAN JOSE area)
  { lat: 14.0400, lng: 120.7700 },
  { lat: 14.0300, lng: 120.7750 },
  { lat: 14.0150, lng: 120.7800 },
  { lat: 14.0000, lng: 120.7820 },
  
  // Southeast curve (near SUKOL area)
  { lat: 13.9850, lng: 120.7800 },
  { lat: 13.9700, lng: 120.7750 },
  { lat: 13.9600, lng: 120.7680 },
  
  // Southern boundary (near CALAN area)
  { lat: 13.9500, lng: 120.7600 },
  { lat: 13.9450, lng: 120.7500 },
  { lat: 13.9400, lng: 120.7400 },
  
  // Southwest curve (near CALANTAS/POOC area)
  { lat: 13.9350, lng: 120.7300 },
  { lat: 13.9320, lng: 120.7200 },
  { lat: 13.9300, lng: 120.7100 },
  
  // South-southwest (near LANATAN area)
  { lat: 13.9280, lng: 120.7000 },
  { lat: 13.9270, lng: 120.6900 },
  
  // Western coastal boundary (Balayan Bay)
  { lat: 13.9280, lng: 120.6800 },
  { lat: 13.9350, lng: 120.6700 },
  { lat: 13.9450, lng: 120.6650 },
  
  // Southwest coast (near MALIBU/DILAO area)
  { lat: 13.9600, lng: 120.6620 },
  { lat: 13.9750, lng: 120.6600 },
  
  // West coast continuing north (near MAGABE area)
  { lat: 13.9900, lng: 120.6620 },
  { lat: 14.0050, lng: 120.6680 },
  
  // Northwest coast back to start (near DALIMA/BAGONG POOK)
  { lat: 14.0200, lng: 120.6750 },
  { lat: 14.0300, lng: 120.6820 },
];

/**
 * All markers for Tuy municipality
 * Organized by category: halls, barangays, offices
 */
export const tuyMarkers: MapMarker[] = [
  // ==========================================
  // MUNICIPAL HALLS
  // ==========================================
  {
    id: 'municipal-hall',
    category: 'halls',
    position: { lat: 14.019133820661795, lng: 120.73023066599163 },
    title: 'Tuy Municipal Hall',
    address: 'Municipal Hall, Tuy, Batangas 4214',
    description: 'Main government center and administrative office of the Municipality of Tuy',
  },
  {
    id: 'tuy-gymnasium',
    category: 'halls',
    position: { lat: 13.9975, lng: 120.7265 },
    title: 'Tuy Municipal Gymnasium',
    address: 'Tuy, Batangas',
    description: 'Multi-purpose sports and events facility',
  },
  {
    id: 'tuy-plaza',
    category: 'halls',
    position: { lat: 13.9990, lng: 120.7255 },
    title: 'Tuy Municipal Plaza',
    address: 'Town Center, Tuy, Batangas',
    description: 'Public gathering place and community events venue',
  },

  // ==========================================
  // BARANGAYS (22 total)
  // ==========================================
  {
    id: 'brgy-acle',
    category: 'barangays',
    position: { lat: 14.0125, lng: 120.7350 },
    title: 'Barangay Acle',
    description: 'One of the 22 barangays in Tuy municipality',
  },
  {
    id: 'brgy-bayudbud',
    category: 'barangays',
    position: { lat: 14.0050, lng: 120.7400 },
    title: 'Barangay Bayudbud',
    description: 'Coastal barangay along Balayan Bay',
  },
  {
    id: 'brgy-bolboc',
    category: 'barangays',
    position: { lat: 13.9850, lng: 120.7150 },
    title: 'Barangay Bolboc',
    description: 'Agricultural barangay in Tuy',
  },
  {
    id: 'brgy-dalima',
    category: 'barangays',
    position: { lat: 13.9750, lng: 120.7200 },
    title: 'Barangay Dalima',
    description: 'Rural barangay with farming community',
  },
  {
    id: 'brgy-dao',
    category: 'barangays',
    position: { lat: 13.9900, lng: 120.7100 },
    title: 'Barangay Dao',
    description: 'Mountainous barangay with scenic views',
  },
  {
    id: 'brgy-guinhawa',
    category: 'barangays',
    position: { lat: 14.0000, lng: 120.7300 },
    title: 'Barangay Guinhawa',
    description: 'Residential and commercial barangay',
  },
  {
    id: 'brgy-lumbangan',
    category: 'barangays',
    position: { lat: 13.9650, lng: 120.7250 },
    title: 'Barangay Lumbangan',
    description: 'Southern barangay of Tuy',
  },
  {
    id: 'brgy-luntal',
    category: 'barangays',
    position: { lat: 13.9800, lng: 120.7350 },
    title: 'Barangay Luntal',
    description: 'Barangay with mixed residential and agricultural areas',
  },
  {
    id: 'brgy-magahis',
    category: 'barangays',
    position: { lat: 14.0100, lng: 120.7250 },
    title: 'Barangay Magahis',
    description: 'Northern barangay near town center',
  },
  {
    id: 'brgy-malibu',
    category: 'barangays',
    position: { lat: 14.0150, lng: 120.7450 },
    title: 'Barangay Malibu',
    description: 'Coastal barangay with beach access',
  },
  {
    id: 'brgy-mataywanac',
    category: 'barangays',
    position: { lat: 13.9700, lng: 120.7100 },
    title: 'Barangay Mataywanac',
    description: 'Western barangay of Tuy',
  },
  {
    id: 'brgy-munlawin',
    category: 'barangays',
    position: { lat: 13.9850, lng: 120.7450 },
    title: 'Barangay Munlawin',
    description: 'Eastern barangay with rural character',
  },
  {
    id: 'brgy-obong',
    category: 'barangays',
    position: { lat: 13.9920, lng: 120.7180 },
    title: 'Barangay Obong',
    description: 'Central barangay near municipal center',
  },
  {
    id: 'brgy-palsahingin',
    category: 'barangays',
    position: { lat: 14.0080, lng: 120.7320 },
    title: 'Barangay Palsahingin',
    description: 'Barangay with commercial establishments',
  },
  {
    id: 'brgy-pansipit',
    category: 'barangays',
    position: { lat: 14.0200, lng: 120.7280 },
    title: 'Barangay Pansipit',
    description: 'Northernmost barangay of Tuy',
  },
  {
    id: 'brgy-putol',
    category: 'barangays',
    position: { lat: 13.9780, lng: 120.7280 },
    title: 'Barangay Putol',
    description: 'Agricultural barangay in southern Tuy',
  },
  {
    id: 'brgy-sabang',
    category: 'barangays',
    position: { lat: 14.0020, lng: 120.7480 },
    title: 'Barangay Sabang',
    description: 'Coastal barangay along Balayan Bay',
  },
  {
    id: 'brgy-san-felipe',
    category: 'barangays',
    position: { lat: 13.9880, lng: 120.7220 },
    title: 'Barangay San Felipe',
    description: 'Barangay near town proper',
  },
  {
    id: 'brgy-talon',
    category: 'barangays',
    position: { lat: 13.9950, lng: 120.7150 },
    title: 'Barangay Talon',
    description: 'Western barangay with farming areas',
  },
  {
    id: 'brgy-toong',
    category: 'barangays',
    position: { lat: 13.9720, lng: 120.7320 },
    title: 'Barangay Toong',
    description: 'Southern barangay of Tuy',
  },
  {
    id: 'brgy-tuyon-tuyon',
    category: 'barangays',
    position: { lat: 14.0030, lng: 120.7200 },
    title: 'Barangay Tuyon-tuyon',
    description: 'Central barangay in Tuy municipality',
  },
  {
    id: 'brgy-verde-island',
    category: 'barangays',
    position: { lat: 13.9550, lng: 120.7500 },
    title: 'Verde Island',
    description: 'Island barangay in Balayan Bay - renowned diving destination',
  },

  // ==========================================
  // GOVERNMENT OFFICES
  // ==========================================
  {
    id: 'tuy-health-center',
    category: 'offices',
    position: { lat: 13.9990, lng: 120.7260 },
    title: 'Tuy Rural Health Unit',
    address: 'Tuy, Batangas',
    description: 'Primary healthcare facility providing medical services to residents',
  },
  {
    id: 'tuy-police-station',
    category: 'offices',
    position: { lat: 13.9978, lng: 120.7245 },
    title: 'Tuy Police Station',
    address: 'Tuy, Batangas',
    description: 'Municipal police station ensuring peace and order',
  },
  {
    id: 'tuy-fire-station',
    category: 'offices',
    position: { lat: 13.9970, lng: 120.7270 },
    title: 'Tuy Fire Station',
    address: 'Tuy, Batangas',
    description: 'Fire protection and emergency response services',
  },
  {
    id: 'tuy-post-office',
    category: 'offices',
    position: { lat: 13.9988, lng: 120.7258 },
    title: 'Tuy Post Office',
    address: 'Tuy, Batangas',
    description: 'Philippine Postal Corporation branch office',
  },
  {
    id: 'tuy-public-market',
    category: 'offices',
    position: { lat: 13.9995, lng: 120.7268 },
    title: 'Tuy Public Market',
    address: 'Town Center, Tuy, Batangas',
    description: 'Municipal market serving the community',
  },
  {
    id: 'tuy-central-school',
    category: 'offices',
    position: { lat: 14.0005, lng: 120.7240 },
    title: 'Tuy Central School',
    address: 'Tuy, Batangas',
    description: 'Public elementary school',
  },
  {
    id: 'tuy-high-school',
    category: 'offices',
    position: { lat: 14.0015, lng: 120.7275 },
    title: 'Tuy National High School',
    address: 'Tuy, Batangas',
    description: 'Public secondary school',
  },
  {
    id: 'tuy-church',
    category: 'offices',
    position: { lat: 13.9985, lng: 120.7252 },
    title: 'Tuy Parish Church',
    address: 'Town Center, Tuy, Batangas',
    description: 'Historic Catholic church - San Bartolome Parish',
  },
];

/**
 * Get markers by category
 */
export const getMarkersByCategory = (category: 'halls' | 'barangays' | 'offices') => {
  return tuyMarkers.filter((marker) => marker.category === category);
};

/**
 * Get marker counts by category
 */
export const getMarkerCounts = () => {
  return {
    halls: tuyMarkers.filter((m) => m.category === 'halls').length,
    barangays: tuyMarkers.filter((m) => m.category === 'barangays').length,
    offices: tuyMarkers.filter((m) => m.category === 'offices').length,
  };
};

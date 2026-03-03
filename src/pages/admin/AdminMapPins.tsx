import { useState, useEffect, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import type { MapPin } from "../../services/api";
import {
  apiGetPins,
  apiAddPin,
  apiUpdatePin,
  apiDeletePin,
} from "../../services/api";
import { TUY_CENTER } from "../../data/tuyLocations";

type PinCategory = "halls" | "barangays" | "offices";

const CATEGORY_OPTIONS: { value: PinCategory; label: string }[] = [
  { value: "halls", label: "Halls / Municipal Facilities" },
  { value: "barangays", label: "Barangays" },
  { value: "offices", label: "Government Offices" },
];

const CATEGORY_COLORS: Record<
  PinCategory,
  { bg: string; text: string; pin: string; border: string }
> = {
  halls: { bg: "bg-blue-100", text: "text-blue-800", pin: "#01377d", border: "#00306e" },
  barangays: { bg: "bg-green-100", text: "text-green-800", pin: "#2e7d32", border: "#1b5e20" },
  offices: { bg: "bg-orange-100", text: "text-orange-800", pin: "#ed6c02", border: "#e65100" },
};

const FILTER_TABS: { value: PinCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "halls", label: "Halls" },
  { value: "barangays", label: "Barangays" },
  { value: "offices", label: "Offices" },
];

interface PinFormData {
  title: string;
  category: PinCategory;
  lat: string;
  lng: string;
  address: string;
  description: string;
  sort_order: string;
}

const EMPTY_FORM: PinFormData = {
  title: "",
  category: "barangays",
  lat: "",
  lng: "",
  address: "",
  description: "",
  sort_order: "0",
};

/* ────────────────────────────────────────────
   Click-to-place map preview component
   ──────────────────────────────────────────── */
function MapPicker({
  lat,
  lng,
  onPick,
}: {
  lat: number | null;
  lng: number | null;
  onPick: (lat: number, lng: number) => void;
}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const center =
    lat !== null && lng !== null ? { lat, lng } : TUY_CENTER;

  if (!apiKey) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500">
        Google Maps API key not configured
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-300" style={{ height: 500 }}>
      <APIProvider apiKey={apiKey}>
          <Map
          defaultCenter={center}
          defaultZoom={lat !== null ? 16 : 14}
          gestureHandling="greedy"
          disableDefaultUI={true}
          zoomControl={true}
          mapId="DEMO_MAP_ID"
          style={{ width: "100%", height: 500 }}
          onClick={(e) => {
            const pos = e.detail.latLng;
            if (pos) onPick(pos.lat, pos.lng);
          }}
        >
          {lat !== null && lng !== null && (
            <AdvancedMarker position={{ lat, lng }}>
              <Pin
                background="#ef4444"
                borderColor="#dc2626"
                glyphColor="#ffffff"
              />
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Admin Map Pins Page
   ──────────────────────────────────────────── */
const AdminMapPins = () => {
  const [pins, setPins] = useState<MapPin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState<PinCategory | "all">("all");

  // Form state (shared shape for add + edit)
  const [addForm, setAddForm] = useState<PinFormData>({ ...EMPTY_FORM });
  const [editForm, setEditForm] = useState<PinFormData>({ ...EMPTY_FORM });

  useEffect(() => {
    loadPins();
  }, []);

  const loadPins = useCallback(async () => {
    try {
      const res = await apiGetPins();
      const sorted = (res.data ?? []).sort((a, b) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.sort_order - b.sort_order;
      });
      setPins(sorted);
    } catch {
      setError("Failed to load map pins.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtered list
  const filteredPins =
    filterCategory === "all"
      ? pins
      : pins.filter((p) => p.category === filterCategory);

  // Category counts
  const counts = {
    all: pins.length,
    halls: pins.filter((p) => p.category === "halls").length,
    barangays: pins.filter((p) => p.category === "barangays").length,
    offices: pins.filter((p) => p.category === "offices").length,
  };

  /* ── Add ── */
  const resetAddForm = () => {
    setAddForm({ ...EMPTY_FORM });
    setShowAddForm(false);
  };

  const handleAdd = async () => {
    if (!addForm.title.trim()) {
      setError("Please enter a pin title.");
      return;
    }
    const lat = parseFloat(addForm.lat);
    const lng = parseFloat(addForm.lng);
    if (isNaN(lat) || isNaN(lng)) {
      setError("Please set valid latitude and longitude (click on the map or enter manually).");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await apiAddPin({
        category: addForm.category,
        title: addForm.title.trim(),
        lat,
        lng,
        address: addForm.address.trim() || undefined,
        description: addForm.description.trim() || undefined,
        sort_order: parseInt(addForm.sort_order, 10) || 0,
      });
      await loadPins();
      resetAddForm();
    } catch {
      setError("Failed to add pin.");
    } finally {
      setSaving(false);
    }
  };

  /* ── Edit ── */
  const startEdit = (pin: MapPin) => {
    setEditingId(pin.id);
    setEditForm({
      title: pin.title,
      category: pin.category,
      lat: String(pin.lat),
      lng: String(pin.lng),
      address: pin.address ?? "",
      description: pin.description ?? "",
      sort_order: String(pin.sort_order),
    });
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    const lat = parseFloat(editForm.lat);
    const lng = parseFloat(editForm.lng);
    if (isNaN(lat) || isNaN(lng)) {
      setError("Invalid coordinates.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await apiUpdatePin(editingId, {
        category: editForm.category,
        title: editForm.title.trim(),
        lat,
        lng,
        address: editForm.address.trim() || undefined,
        description: editForm.description.trim() || undefined,
        sort_order: parseInt(editForm.sort_order, 10) || 0,
      });
      await loadPins();
      setEditingId(null);
    } catch {
      setError("Failed to update pin.");
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete ── */
  const handleDelete = async (id: number) => {
    try {
      await apiDeletePin(id);
      setPins((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch {
      setError("Failed to delete pin.");
    }
  };

  /* ── Helpers ── */
  const truncate = (s: string | null, max = 40) => {
    if (!s) return "—";
    return s.length > max ? s.slice(0, max) + "..." : s;
  };

  /* ── Render form fields (reused for add and edit modal/inline) ── */
  const renderFormFields = (
    form: PinFormData,
    setForm: React.Dispatch<React.SetStateAction<PinFormData>>,
  ) => {
    const lat = parseFloat(form.lat);
    const lng = parseFloat(form.lng);
    const hasCoords = !isNaN(lat) && !isNaN(lng);

    return (
      <div className="space-y-4">
        {/* Row 1: Title + Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Barangay Hall — Sabang"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value as PinCategory }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Lat, Lng, Sort Order */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="any"
              value={form.lat}
              onChange={(e) => setForm((prev) => ({ ...prev, lat: e.target.value }))}
              placeholder="14.019"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="any"
              value={form.lng}
              onChange={(e) => setForm((prev) => ({ ...prev, lng: e.target.value }))}
              placeholder="120.730"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm((prev) => ({ ...prev, sort_order: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* Click-to-place map */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Click on the map to set coordinates
          </label>
          <MapPicker
            lat={hasCoords ? lat : null}
            lng={hasCoords ? lng : null}
            onPick={(newLat, newLng) =>
              setForm((prev) => ({
                ...prev,
                lat: newLat.toFixed(7),
                lng: newLng.toFixed(7),
              }))
            }
          />
        </div>

        {/* Row 3: Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="e.g. Poblacion, Tuy, Batangas"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
        </div>

        {/* Row 4: Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            rows={2}
            placeholder="Optional description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-y"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Map Pins</h3>
          <p className="text-sm text-gray-500">{pins.length} pins total</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <i className="fas fa-plus"></i>
          Add Pin
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-sm text-red-700">
          <i className="fas fa-exclamation-circle"></i>
          <span className="flex-1">{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-600 cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h4 className="font-semibold text-gray-800">Add New Pin</h4>
          {renderFormFields(addForm, setAddForm)}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAdd}
              disabled={saving || !addForm.title.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-plus"></i> Add Pin
                </>
              )}
            </button>
            <button
              onClick={resetAddForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterCategory(tab.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
              filterCategory === tab.value
                ? "bg-primary text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-75">
              ({counts[tab.value]})
            </span>
          </button>
        ))}
      </div>

      {/* Pins Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-100 rounded animate-pulse"
            ></div>
          ))}
        </div>
      ) : filteredPins.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <i className="fas fa-map-marker-alt text-4xl text-gray-300 mb-3"></i>
          <p className="text-gray-500">
            {filterCategory === "all"
              ? "No pins found"
              : `No ${filterCategory} pins found`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Coordinates</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Description</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPins.map((pin) =>
                  editingId === pin.id ? (
                    /* ── Inline edit row ── */
                    <tr key={pin.id} className="bg-blue-50/50">
                      <td colSpan={5} className="px-4 py-4">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-800 text-sm">
                            Editing: {pin.title}
                          </h4>
                          {renderFormFields(editForm, setEditForm)}
                          <div className="flex gap-2">
                            <button
                              onClick={saveEdit}
                              disabled={saving}
                              className="px-4 py-2 bg-primary text-white rounded-lg text-sm cursor-pointer hover:bg-primary-hover disabled:opacity-60"
                            >
                              {saving ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm cursor-pointer hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    /* ── Display row ── */
                    <tr key={pin.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {pin.title}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[pin.category].bg} ${CATEGORY_COLORS[pin.category].text}`}
                        >
                          {pin.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap font-mono text-xs">
                        {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                        {truncate(pin.description)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => startEdit(pin)}
                            className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          {deleteConfirm === pin.id ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDelete(pin.id)}
                                className="text-xs text-red-600 font-medium cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-xs text-gray-500 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(pin.id)}
                              className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMapPins;

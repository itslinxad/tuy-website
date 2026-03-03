import { useState, useEffect } from "react";
import type { CalendarEvent } from "../../services/api";
import {
  apiGetEvents,
  apiAddEvent,
  apiUpdateEvent,
  apiDeleteEvent,
} from "../../services/api";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const ICON_OPTIONS = [
  { value: "fa-star", label: "Star" },
  { value: "fa-flag", label: "Flag" },
  { value: "fa-heart", label: "Heart" },
  { value: "fa-cross", label: "Cross" },
  { value: "fa-church", label: "Church" },
  { value: "fa-pray", label: "Pray" },
  { value: "fa-calendar-check", label: "Calendar Check" },
  { value: "fa-calendar-day", label: "Calendar Day" },
  { value: "fa-gift", label: "Gift" },
  { value: "fa-birthday-cake", label: "Birthday Cake" },
  { value: "fa-tree", label: "Tree" },
  { value: "fa-music", label: "Music" },
  { value: "fa-users", label: "Users" },
  { value: "fa-hands-helping", label: "Helping Hands" },
  { value: "fa-award", label: "Award" },
  { value: "fa-trophy", label: "Trophy" },
  { value: "fa-fire", label: "Fire" },
  { value: "fa-sun", label: "Sun" },
  { value: "fa-moon", label: "Moon" },
  { value: "fa-leaf", label: "Leaf" },
  { value: "fa-seedling", label: "Seedling" },
  { value: "fa-dove", label: "Dove" },
  { value: "fa-book", label: "Book" },
  { value: "fa-graduation-cap", label: "Graduation" },
  { value: "fa-briefcase", label: "Briefcase" },
  { value: "fa-gavel", label: "Gavel" },
  { value: "fa-landmark", label: "Landmark" },
  { value: "fa-fist-raised", label: "Fist Raised" },
  { value: "fa-bullhorn", label: "Bullhorn" },
  { value: "fa-ribbon", label: "Ribbon" },
];

const COLOR_OPTIONS = [
  { value: "text-red-500", label: "Red" },
  { value: "text-red-600", label: "Dark Red" },
  { value: "text-blue-500", label: "Blue" },
  { value: "text-blue-600", label: "Dark Blue" },
  { value: "text-green-500", label: "Green" },
  { value: "text-green-600", label: "Dark Green" },
  { value: "text-yellow-500", label: "Yellow" },
  { value: "text-orange-500", label: "Orange" },
  { value: "text-purple-500", label: "Purple" },
  { value: "text-pink-500", label: "Pink" },
  { value: "text-primary", label: "Primary (Navy)" },
  { value: "text-amber-600", label: "Amber" },
  { value: "text-teal-500", label: "Teal" },
  { value: "text-indigo-500", label: "Indigo" },
  { value: "text-cyan-500", label: "Cyan" },
];

const AdminEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Add form state
  const [newMonth, setNewMonth] = useState("01");
  const [newDay, setNewDay] = useState("01");
  const [newTitle, setNewTitle] = useState("");
  const [newIcon, setNewIcon] = useState("fa-star");
  const [newColor, setNewColor] = useState("text-red-500");

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: "",
    month: "01",
    day: "01",
    icon: "fa-star",
    color: "text-red-500",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const res = await apiGetEvents();
      const sorted = (res.data ?? []).sort((a, b) =>
        a.event_date.localeCompare(b.event_date),
      );
      setEvents(sorted);
    } catch {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  }

  const resetAddForm = () => {
    setNewMonth("01");
    setNewDay("01");
    setNewTitle("");
    setNewIcon("fa-star");
    setNewColor("text-red-500");
    setShowAddForm(false);
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) {
      setError("Please enter an event title.");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const event_date = `${newMonth}-${newDay}`;
      await apiAddEvent({
        title: newTitle.trim(),
        event_date,
        icon: newIcon,
        color: newColor,
      });
      await loadEvents();
      resetAddForm();
    } catch {
      setError("Failed to add event.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (event: CalendarEvent) => {
    const [month, day] = event.event_date.split("-");
    setEditingId(event.id);
    setEditForm({
      title: event.title,
      month: month,
      day: day,
      icon: event.icon,
      color: event.color,
    });
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    setSaving(true);
    try {
      const event_date = `${editForm.month}-${editForm.day}`;
      await apiUpdateEvent(editingId, {
        title: editForm.title,
        event_date,
        icon: editForm.icon,
        color: editForm.color,
      });
      await loadEvents();
      setEditingId(null);
    } catch {
      setError("Failed to update event.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiDeleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setDeleteConfirm(null);
    } catch {
      setError("Failed to delete event.");
    }
  };

  const formatDate = (dateStr: string) => {
    const [month, day] = dateStr.split("-");
    const monthIdx = parseInt(month, 10) - 1;
    return `${MONTH_NAMES[monthIdx] ?? month} ${parseInt(day, 10)}`;
  };

  const dayOptions = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );
  const monthOptions = MONTH_NAMES.map((name, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: name,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Calendar Events
          </h3>
          <p className="text-sm text-gray-500">{events.length} events</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <i className="fas fa-plus"></i>
          Add Event
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
          <h4 className="font-semibold text-gray-800">Add New Event</h4>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. New Year's Day"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Month */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                value={newMonth}
                onChange={(e) => setNewMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              >
                {monthOptions.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day
              </label>
              <select
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              >
                {dayOptions.map((d) => (
                  <option key={d} value={d}>
                    {parseInt(d, 10)}
                  </option>
                ))}
              </select>
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <div className="relative">
                <select
                  value={newIcon}
                  onChange={(e) => setNewIcon(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none pl-8"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <i
                  className={`fas ${newIcon} absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none`}
                ></i>
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <div className="relative">
                <select
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none pl-8"
                >
                  {COLOR_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <i
                  className={`fas fa-circle absolute left-2.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none ${newColor}`}
                ></i>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-500">Preview:</span>
            <i className={`fas ${newIcon} ${newColor}`}></i>
            <span className="text-sm font-medium text-gray-800">
              {newTitle || "Event Title"} -{" "}
              {formatDate(`${newMonth}-${newDay}`)}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={saving || !newTitle.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-plus"></i> Add Event
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

      {/* Events Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-100 rounded animate-pulse"
            ></div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <i className="fas fa-calendar-alt text-4xl text-gray-300 mb-3"></i>
          <p className="text-gray-500">No events found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium w-10"></th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.map((event) =>
                  editingId === event.id ? (
                    <tr key={event.id} className="bg-blue-50/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={editForm.icon}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                icon: e.target.value,
                              }))
                            }
                            className="w-20 px-1 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                          >
                            {ICON_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <select
                            value={editForm.color}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                color: e.target.value,
                              }))
                            }
                            className="w-24 px-1 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                          >
                            {COLOR_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <select
                            value={editForm.month}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                month: e.target.value,
                              }))
                            }
                            className="w-24 px-1 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                          >
                            {monthOptions.map((m) => (
                              <option key={m.value} value={m.value}>
                                {m.label}
                              </option>
                            ))}
                          </select>
                          <select
                            value={editForm.day}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                day: e.target.value,
                              }))
                            }
                            className="w-16 px-1 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                          >
                            {dayOptions.map((d) => (
                              <option key={d} value={d}>
                                {parseInt(d, 10)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={saveEdit}
                            disabled={saving}
                            className="px-3 py-1 bg-primary text-white rounded text-xs cursor-pointer hover:bg-primary-hover disabled:opacity-60"
                          >
                            {saving ? "..." : "Save"}
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs cursor-pointer hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <i
                          className={`fas ${event.icon} ${event.color}`}
                        ></i>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {formatDate(event.event_date)}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {event.title}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => startEdit(event)}
                            className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          {deleteConfirm === event.id ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDelete(event.id)}
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
                              onClick={() => setDeleteConfirm(event.id)}
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

export default AdminEvents;

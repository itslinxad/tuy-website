import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiGetDashboardStats } from "../../services/api";

interface Stats {
  galleryCount: number;
  formsCount: number;
  ordinancesCount: number;
  eventsCount: number;
}

const statCards = [
  { key: "galleryCount" as const, label: "Gallery Images", icon: "fa-images", color: "bg-blue-500", link: "/admin/gallery" },
  { key: "formsCount" as const, label: "Downloadable Forms", icon: "fa-file-alt", color: "bg-green-500", link: "/admin/files" },
  { key: "ordinancesCount" as const, label: "Ordinances", icon: "fa-gavel", color: "bg-purple-500", link: "/admin/files" },
  { key: "eventsCount" as const, label: "Calendar Events", icon: "fa-calendar-alt", color: "bg-orange-500", link: "/admin/events" },
];

const quickActions = [
  { label: "Upload Image", icon: "fa-cloud-upload-alt", link: "/admin/gallery", color: "text-blue-600" },
  { label: "Add Form", icon: "fa-file-upload", link: "/admin/files", color: "text-green-600" },
  { label: "Add Event", icon: "fa-calendar-plus", link: "/admin/events", color: "text-orange-600" },
  { label: "Site Settings", icon: "fa-cog", link: "/admin/settings", color: "text-gray-600" },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await apiGetDashboardStats();
      setStats(data);
    } catch {
      setError("Failed to load dashboard stats.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.key}
            to={card.link}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex items-center gap-4"
          >
            <div
              className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <i className={`fas ${card.icon} text-white text-lg`}></i>
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-800">
                {loading ? (
                  <span className="inline-block w-8 h-6 bg-gray-200 rounded animate-pulse"></span>
                ) : error ? (
                  <span className="text-red-400 text-sm">--</span>
                ) : (
                  stats?.[card.key] ?? 0
                )}
              </p>
              <p className="text-sm text-gray-500 truncate">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.link}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
            >
              <i className={`fas ${action.icon} text-2xl ${action.color}`}></i>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-sm text-red-700">
          <i className="fas fa-exclamation-triangle"></i>
          <span>{error}</span>
          <button
            onClick={() => { setError(null); setLoading(true); loadStats(); }}
            className="ml-auto text-red-600 hover:text-red-800 font-medium cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

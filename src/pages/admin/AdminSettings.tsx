import { useState, useEffect } from "react";
import type { SiteSettings } from "../../services/api";
import { apiGetSettings, apiUpdateSettings } from "../../services/api";

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await apiGetSettings();
      setSettings(res.data ?? {});
    } catch {
      setError("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await apiUpdateSettings(settings);
      setSuccess("Settings saved successfully.");
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="max-w-2xl space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
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

      {/* Success */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-sm text-green-700">
          <i className="fas fa-check-circle"></i>
          <span>{success}</span>
        </div>
      )}

      {/* Facebook Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
          <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
            <i className="fab fa-facebook-f text-white text-lg"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Facebook Integration</h3>
            <p className="text-xs text-gray-500">
              Configure Facebook page connection for announcements
            </p>
          </div>
        </div>

        {/* Page ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facebook Page ID
          </label>
          <input
            type="text"
            value={settings.facebook_page_id ?? ""}
            onChange={(e) => updateField("facebook_page_id", e.target.value)}
            placeholder="e.g. 1169815403037944"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            Found in your Facebook page's About section or URL
          </p>
        </div>

        {/* Access Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Access Token
          </label>
          <div className="relative">
            <input
              type={showToken ? "text" : "password"}
              value={settings.facebook_access_token ?? ""}
              onChange={(e) =>
                updateField("facebook_access_token", e.target.value)
              }
              placeholder="EAAxxxxxxxx..."
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none font-mono"
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label={showToken ? "Hide token" : "Show token"}
            >
              <i
                className={`fas ${showToken ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Long-lived page access token from Facebook Developer Tools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Post Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post Limit
            </label>
            <input
              type="number"
              value={settings.facebook_post_limit ?? "30"}
              onChange={(e) =>
                updateField("facebook_post_limit", e.target.value)
              }
              min={1}
              max={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Number of posts to display (1-100)
            </p>
          </div>

          {/* Cache Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cache Duration (ms)
            </label>
            <input
              type="number"
              value={settings.facebook_cache_duration ?? "900000"}
              onChange={(e) =>
                updateField("facebook_cache_duration", e.target.value)
              }
              min={60000}
              step={60000}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              {(() => {
                const ms = Number(settings.facebook_cache_duration) || 900000;
                const min = Math.floor(ms / 60000);
                return `${min} minute${min !== 1 ? "s" : ""}`;
              })()}
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Saving...
            </>
          ) : (
            <>
              <i className="fas fa-save"></i> Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "fa-tachometer-alt" },
  { path: "/admin/gallery", label: "Gallery", icon: "fa-images" },
  { path: "/admin/files", label: "Files", icon: "fa-file-pdf" },
  { path: "/admin/events", label: "Events", icon: "fa-calendar-alt" },
  { path: "/admin/map-pins", label: "Map Pins", icon: "fa-map-marker-alt" },
  { path: "/admin/settings", label: "Settings", icon: "fa-cog" },
];

const AdminLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAdminAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#01377d] text-white transform transition-transform duration-200 lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Header */}
          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.VITE_BASE_PATH || ""}/logo.png`}
                alt="Tuy Logo"
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-lg font-bold leading-tight">Tuy Admin</h1>
                <p className="text-xs text-white/60">Content Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-6 py-3 text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-white/15 text-white border-r-3 border-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <i className={`fas ${item.icon} w-5 text-center`}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-white/10 p-4 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-2 py-2 text-sm text-white/70 hover:text-white transition-colors duration-150"
            >
              <i className="fas fa-external-link-alt w-5 text-center"></i>
              <span>View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-2 py-2 text-sm text-red-300 hover:text-red-200 transition-colors duration-150 w-full cursor-pointer"
            >
              <i className="fas fa-sign-out-alt w-5 text-center"></i>
              <span>Logout</span>
            </button>
          </div>

          {/* Admin info */}
          <div className="px-6 py-3 bg-white/5 text-xs text-white/50">
            <p className="truncate">{admin?.name}</p>
            <p className="truncate">{admin?.email}</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-800 cursor-pointer"
            aria-label="Open sidebar"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>

          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            {navItems.find((item) => item.path === location.pathname)?.label ||
              "Admin"}
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:inline">
              {admin?.name}
            </span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
              {admin?.name?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

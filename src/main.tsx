import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/index.css";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

// Lazy-loaded page components
const Home = lazy(() => import("./pages/Home.tsx"));
const About = lazy(() => import("./pages/profile/About.tsx"));
const History = lazy(() => import("./pages/profile/History.tsx"));
const Demography = lazy(() => import("./pages/profile/Demography.tsx"));
const Maps = lazy(() => import("./pages/profile/Maps.tsx"));
const SocioEconomic = lazy(() => import("./pages/profile/SocioEconomic.tsx"));
const Officials = lazy(() => import("./pages/government/Officials.tsx"));
const DepartmentHeads = lazy(() => import("./pages/government/DepartmentHeads.tsx"));
const BarangayOfficials = lazy(() => import("./pages/government/BarangayOfficials.tsx"));
const Forms = lazy(() => import("./pages/downloadables/Forms.tsx"));
const Ordinances = lazy(() => import("./pages/downloadables/Ordinances.tsx"));
const Gallery = lazy(() => import("./pages/Gallery.tsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.tsx"));

// Lazy-loaded admin components
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery.tsx"));
const AdminFiles = lazy(() => import("./pages/admin/AdminFiles.tsx"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents.tsx"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings.tsx"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout.tsx"));
const AdminProtectedRoute = lazy(() => import("./components/admin/AdminProtectedRoute.tsx"));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
      <p className="text-gray-500">Loading...</p>
    </div>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
      <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/profile/about" element={<About />} />
        <Route path="/profile/history" element={<History />} />
        <Route path="/profile/demography" element={<Demography />} />
        <Route path="/profile/maps" element={<Maps />} />
        <Route path="/profile/socio-economic" element={<SocioEconomic />} />
        <Route path="/government/officials" element={<Officials />} />
        <Route path="/government/department-heads" element={<DepartmentHeads />} />
        <Route path="/government/barangay-officials" element={<BarangayOfficials />} />
        <Route path="/downloadables/forms" element={<Forms />} />
        <Route path="/downloadables/ordinances" element={<Ordinances />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminAuthProvider><AdminLogin /></AdminAuthProvider>} />
        <Route path="/admin/dashboard" element={<AdminAuthProvider><AdminProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminProtectedRoute></AdminAuthProvider>} />
        <Route path="/admin/gallery" element={<AdminAuthProvider><AdminProtectedRoute><AdminLayout><AdminGallery /></AdminLayout></AdminProtectedRoute></AdminAuthProvider>} />
        <Route path="/admin/files" element={<AdminAuthProvider><AdminProtectedRoute><AdminLayout><AdminFiles /></AdminLayout></AdminProtectedRoute></AdminAuthProvider>} />
        <Route path="/admin/events" element={<AdminAuthProvider><AdminProtectedRoute><AdminLayout><AdminEvents /></AdminLayout></AdminProtectedRoute></AdminAuthProvider>} />
        <Route path="/admin/settings" element={<AdminAuthProvider><AdminProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></AdminProtectedRoute></AdminAuthProvider>} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);

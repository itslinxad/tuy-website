import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

// Lazy-loaded page components
const Login = lazy(() => import("./pages/Login.tsx"));
const Home = lazy(() => import("./pages/Home.tsx"));
const About = lazy(() => import("./pages/profile/About.tsx"));
const History = lazy(() => import("./pages/profile/History.tsx"));
const Demography = lazy(() => import("./pages/profile/Demography.tsx"));
const Maps = lazy(() => import("./pages/profile/Maps.tsx"));
const SocioEconomic = lazy(() => import("./pages/profile/SocioEconomic.tsx"));
const Officials = lazy(() => import("./pages/government/Officials.tsx"));
const DepartmentHeads = lazy(() => import("./pages/government/DepartmentHeads.tsx"));
const BarangayOfficials = lazy(() => import("./pages/government/BarangayOfficials.tsx"));
const AccomplishmentReports = lazy(() => import("./pages/transparencies/AccomplishmentReports.tsx"));
const CitizensCharter = lazy(() => import("./pages/transparencies/CitizensCharter.tsx"));
const FinancialStatements = lazy(() => import("./pages/transparencies/FinancialStatements.tsx"));
const InvitationToBid = lazy(() => import("./pages/transparencies/InvitationToBid.tsx"));
const Forms = lazy(() => import("./pages/downloadables/Forms.tsx"));
const Resolutions = lazy(() => import("./pages/downloadables/Resolutions.tsx"));
const Ordinances = lazy(() => import("./pages/downloadables/Ordinances.tsx"));
const Gallery = lazy(() => import("./pages/Gallery.tsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
                <p className="text-gray-500">Loading...</p>
              </div>
            </div>
          }
        >
        <Routes>
          {/* Public Route - Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          {/* Profile Routes */}
          <Route
            path="/profile/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/demography"
            element={
              <ProtectedRoute>
                <Demography />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/maps"
            element={
              <ProtectedRoute>
                <Maps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/socio-economic"
            element={
              <ProtectedRoute>
                <SocioEconomic />
              </ProtectedRoute>
            }
          />

          {/* Local Government Routes */}
          <Route
            path="/government/officials"
            element={
              <ProtectedRoute>
                <Officials />
              </ProtectedRoute>
            }
          />
          <Route
            path="/government/department-heads"
            element={
              <ProtectedRoute>
                <DepartmentHeads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/government/barangay-officials"
            element={
              <ProtectedRoute>
                <BarangayOfficials />
              </ProtectedRoute>
            }
          />

          {/* Transparencies Routes */}
          <Route
            path="/transparencies/accomplishment-reports"
            element={
              <ProtectedRoute>
                <AccomplishmentReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transparencies/citizens-charter"
            element={
              <ProtectedRoute>
                <CitizensCharter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transparencies/financial-statements"
            element={
              <ProtectedRoute>
                <FinancialStatements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transparencies/invitation-to-bid"
            element={
              <ProtectedRoute>
                <InvitationToBid />
              </ProtectedRoute>
            }
          />

          {/* Downloadables Routes */}
          <Route
            path="/downloadables/forms"
            element={
              <ProtectedRoute>
                <Forms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/downloadables/resolutions"
            element={
              <ProtectedRoute>
                <Resolutions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/downloadables/ordinances"
            element={
              <ProtectedRoute>
                <Ordinances />
              </ProtectedRoute>
            }
          />

          {/* Other Routes */}
          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            }
          />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);

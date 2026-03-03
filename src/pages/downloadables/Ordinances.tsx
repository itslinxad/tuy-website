import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const basePath = import.meta.env.VITE_BASE_PATH || "";

interface Ordinance {
  resolutionNo: string;
  ordinanceNo: string;
  title: string;
  year: number;
  category: string;
  fileName: string;
  icon: string;
}

const ordinancesData: Ordinance[] = [
  // Public Safety
  {
    resolutionNo: "2023-025",
    ordinanceNo: "Blg. 005",
    title: "Batas Trapiko (Traffic Law)",
    year: 2023,
    category: "Public Safety",
    fileName: "2023-025 Ord. Blg. 005 Batas Trapiko.pdf",
    icon: "fa-car",
  },
  {
    resolutionNo: "2024-068",
    ordinanceNo: "No. 008",
    title: "Fire Hydrant Ordinance",
    year: 2024,
    category: "Public Safety",
    fileName: "2024-068 Ord. No. 008 Fire Hydrant Ordinance.pdf",
    icon: "fa-fire-extinguisher",
  },
  {
    resolutionNo: "2024-093",
    ordinanceNo: "Blg. 013",
    title: "Ilegal na Sugal (Illegal Gambling)",
    year: 2024,
    category: "Public Safety",
    fileName: "2024-093 Ord. Blg. 013 Ilegal na Sugal.pdf",
    icon: "fa-ban",
  },
  {
    resolutionNo: "2024-134",
    ordinanceNo: "Blg. 020",
    title: "Helmet Ordinance (Motorcycle Helmet)",
    year: 2024,
    category: "Public Safety",
    fileName: "2024-134 Ord. Blg. 020 - Helmet.pdf",
    icon: "fa-hard-hat",
  },
  {
    resolutionNo: "2025-016",
    ordinanceNo: "Blg. 039",
    title: "Preemptive and Forced Evacuation",
    year: 2025,
    category: "Public Safety",
    fileName: "2025-016 Ord. Blg. 039 Preemptive and Forced Evacuation.pdf",
    icon: "fa-people-arrows",
  },

  // Social Welfare
  {
    resolutionNo: "2023-074",
    ordinanceNo: "Blg. 018",
    title: "Prohibiting Child Marriage",
    year: 2023,
    category: "Social Welfare",
    fileName: "2023-074 Ord. Blg. 018 Prohibiting Child Marriage.pdf",
    icon: "fa-child",
  },
  {
    resolutionNo: "2023-075",
    ordinanceNo: "Blg. 019",
    title: "4Ps Anti-Pawning Ordinance",
    year: 2023,
    category: "Social Welfare",
    fileName: "2023-075 Ord. Blg. 019 4Ps Anti-Pawning Ordinance.pdf",
    icon: "fa-hand-holding-heart",
  },
  {
    resolutionNo: "2023-130",
    ordinanceNo: "No. 028",
    title: "Adopting GAD Resolution, Anti-Human Trafficking",
    year: 2023,
    category: "Social Welfare",
    fileName: "2023-130 Ord. No. 028 - Adopting GAD Resolution, Anti-Human Trafficking.pdf",
    icon: "fa-shield-alt",
  },
  {
    resolutionNo: "2025-045",
    ordinanceNo: "No. 042",
    title: "Aftercare - 4Ps",
    year: 2025,
    category: "Social Welfare",
    fileName: "2025-045 Ord. No. 042 Aftercare - 4Ps.pdf",
    icon: "fa-hands-helping",
  },

  // Health & Sanitation
  {
    resolutionNo: "2024-109",
    ordinanceNo: "Blg. 017",
    title: "Tuy Health and Sanitation Ordinance",
    year: 2024,
    category: "Health & Sanitation",
    fileName: "2024-109 Ord. Blg. 017 - Tuy Health and Sanitation Ordinance.pdf",
    icon: "fa-clinic-medical",
  },
  {
    resolutionNo: "2024-092",
    ordinanceNo: "Blg. 012",
    title: "Magkakarne - Hot Meat",
    year: 2024,
    category: "Health & Sanitation",
    fileName: "2024-092 Ord. Blg. 012 Magkakarne - Hot Meat.pdf",
    icon: "fa-drumstick-bite",
  },

  // Environment
  {
    resolutionNo: "2022-139",
    ordinanceNo: "Blg. 032",
    title: "Magtatabas o MSWs (Municipal Solid Waste Workers)",
    year: 2022,
    category: "Environment",
    fileName: "2022-139 Ord. Blg. 032 - Magtatabas o MSWs (Fil).pdf",
    icon: "fa-recycle",
  },
  {
    resolutionNo: "2023-035",
    ordinanceNo: "Blg. 007",
    title: "Pagtatabon o Pagtatambak sa Daluyan ng Tubig (Waterway Protection)",
    year: 2023,
    category: "Environment",
    fileName: "2023-035 Ord. Blg. 007 - Pagtatabon o Pagtatambak sa Daluyan ng Tubig.pdf",
    icon: "fa-water",
  },

  // Agriculture & Livestock
  {
    resolutionNo: "2023-002",
    ordinanceNo: "Blg. 001",
    title: "Malakihang Manukan (Large-scale Poultry)",
    year: 2023,
    category: "Agriculture & Livestock",
    fileName: "2023-002 Ord. Blg. 001 - Malakihang Manukan.pdf",
    icon: "fa-egg",
  },
  {
    resolutionNo: "2024-083",
    ordinanceNo: "Blg. 010",
    title: "Babuyan (Piggery Regulation)",
    year: 2024,
    category: "Agriculture & Livestock",
    fileName: "2024-083 Ord. Blg. 010 Babuyan.pdf",
    icon: "fa-piggy-bank",
  },

  // Public Order
  {
    resolutionNo: "2024-020",
    ordinanceNo: "No. 001",
    title: "Adopting EO No. 297 s. 2000 - PNP Uniform",
    year: 2024,
    category: "Public Order",
    fileName: "2024-020 Ord. No. 001 Adopting EO No. 297 s. 2000 - PNP Uniform.pdf",
    icon: "fa-user-shield",
  },
  {
    resolutionNo: "2024-137",
    ordinanceNo: "Blg. 021",
    title: "Liquor Ban",
    year: 2024,
    category: "Public Order",
    fileName: "2024-137 Ord. Blg. 021 Liquor Ban.pdf",
    icon: "fa-wine-bottle",
  },
  {
    resolutionNo: "2024-138",
    ordinanceNo: "Blg. 022",
    title: "Pagtitipon (Assembly / Gatherings Regulation)",
    year: 2024,
    category: "Public Order",
    fileName: "2024-138 Ord. Blg. 022 Pagtitipon.pdf",
    icon: "fa-users",
  },

  // Revenue
  {
    resolutionNo: "2025-061",
    ordinanceNo: "No. 045",
    title: "Addendum to Revised Revenue Code of Tuy - Covered Court Fee",
    year: 2025,
    category: "Revenue",
    fileName: "2025-061 Ord. No.  045 Addendum to Revised Revenue Code of Tuy - Covered Court Fee.pdf",
    icon: "fa-coins",
  },
];

const categories = [
  "All",
  "Public Safety",
  "Social Welfare",
  "Health & Sanitation",
  "Environment",
  "Agriculture & Livestock",
  "Public Order",
  "Revenue",
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Public Safety": { bg: "bg-red-100", text: "text-red-700" },
  "Social Welfare": { bg: "bg-purple-100", text: "text-purple-700" },
  "Health & Sanitation": { bg: "bg-green-100", text: "text-green-700" },
  "Environment": { bg: "bg-teal-100", text: "text-teal-700" },
  "Agriculture & Livestock": { bg: "bg-yellow-100", text: "text-yellow-700" },
  "Public Order": { bg: "bg-blue-100", text: "text-blue-700" },
  "Revenue": { bg: "bg-orange-100", text: "text-orange-700" },
};

const Ordinances = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const browseRef = useScrollAnimation();
  const infoRef = useScrollAnimation();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const filteredOrdinances = useMemo(() => {
    let results = ordinancesData.filter((ord) => {
      const matchesCategory =
        selectedCategory === "All" || ord.category === selectedCategory;
      const matchesSearch =
        ord.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.ordinanceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.resolutionNo.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    results.sort((a, b) =>
      sortBy === "newest"
        ? b.resolutionNo.localeCompare(a.resolutionNo)
        : a.resolutionNo.localeCompare(b.resolutionNo)
    );

    return results;
  }, [selectedCategory, searchTerm, sortBy]);

  const filePath = (fileName: string) =>
    `${basePath}/Tuy_Data/Resolution and Ordinance/${encodeURIComponent(fileName)}`;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <div
          className="parallax-bg"
          style={{
            transform: `translateY(${offset}px)`,
            backgroundImage: `url('${basePath}/hero-image.jpg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>

        <div
          className="absolute top-4 left-48 z-20 animate-fadeIn hidden md:block"
          style={{ animationDelay: "0.2s" }}
        >
          <nav className="text-sm text-white/70 flex items-center">
            <Link to="/">
              <span className="hover:text-white/90 transition-colors cursor-pointer">
                Home
              </span>
            </Link>
            <i className="fas fa-chevron-right mx-2 text-xs"></i>
            <span className="text-white/90">Municipal Ordinances</span>
          </nav>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Municipal Ordinances
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Official Legislative Acts of the Sangguniang Bayan
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">
        {/* Introduction */}
        <section
          ref={introRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            introRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              About Municipal Ordinances
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Municipal ordinances are legislative acts enacted by the Sangguniang
              Bayan (Municipal Council) to regulate local affairs and promote the
              general welfare of the municipality. These ordinances have the force
              of law within the territorial jurisdiction of Tuy, Batangas.
            </p>
            <p>
              The power to enact ordinances is granted by the Local Government Code
              of 1991 (Republic Act No. 7160). Below are the ordinances currently
              available for public access.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {ordinancesData.length}
              </p>
              <p className="text-sm text-gray-600">Total Ordinances</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {categories.length - 1}
              </p>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">2022</p>
              <p className="text-sm text-gray-600">Earliest</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">2025</p>
              <p className="text-sm text-gray-600">Latest</p>
            </div>
          </div>
        </section>

        {/* Browse Ordinances */}
        <section
          ref={browseRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            browseRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Browse Ordinances
            </h2>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, ordinance number, or resolution number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Category Filter + Sort */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort:</span>
              <button
                onClick={() =>
                  setSortBy(sortBy === "newest" ? "oldest" : "newest")
                }
                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
              >
                <i
                  className={`fas fa-arrow-${sortBy === "newest" ? "down" : "up"} mr-1`}
                ></i>
                {sortBy === "newest" ? "Newest First" : "Oldest First"}
              </button>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredOrdinances.length} of {ordinancesData.length}{" "}
            ordinances
          </p>

          {/* Ordinances Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrdinances.map((ord, index) => {
              const colors = categoryColors[ord.category];
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex-1">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <i
                        className={`fas ${ord.icon} text-primary text-2xl`}
                      ></i>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-primary mb-2 leading-snug">
                      {ord.title}
                    </h3>

                    {/* Category Badge */}
                    <span
                      className={`inline-block px-3 py-1 ${colors.bg} ${colors.text} text-xs font-semibold rounded-full mb-3`}
                    >
                      {ord.category}
                    </span>

                    {/* Meta Info */}
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <i className="fas fa-gavel mr-2 text-gray-400"></i>
                        Ordinance {ord.ordinanceNo}
                      </p>
                      <p>
                        <i className="fas fa-file-alt mr-2 text-gray-400"></i>
                        Resolution No. {ord.resolutionNo}
                      </p>
                      <p>
                        <i className="fas fa-calendar mr-2 text-gray-400"></i>
                        Year {ord.year}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0 flex gap-2">
                    <a
                      href={filePath(ord.fileName)}
                      download
                      className="flex-1 bg-primary text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-center text-sm"
                    >
                      <i className="fas fa-download mr-2"></i>
                      Download
                    </a>
                    <a
                      href={filePath(ord.fileName)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                      title="Preview in new tab"
                    >
                      <i className="fas fa-eye"></i>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredOrdinances.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">
                No ordinances found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-primary hover:underline font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Need Assistance */}
        <section
          ref={infoRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            infoRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Need Assistance?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-question-circle text-primary mr-3"></i>
                Request Copies
              </h3>
              <p className="text-gray-700 mb-4">
                For questions about specific ordinances or to request certified
                copies, please visit or contact the Office of the Sangguniang
                Bayan:
              </p>
              <div className="space-y-2 text-gray-700">
                <p className="font-bold">
                  Office of the Sangguniang Bayan
                </p>
                <p>
                  <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                  Municipal Hall, Poblacion, Tuy, Batangas 4214
                </p>
                <p>
                  <i className="fas fa-phone mr-2 text-primary"></i>
                  (043) 276-0121
                </p>
                <p className="mt-4 text-sm">
                  <i className="fas fa-clock mr-2 text-primary"></i>
                  Office Hours: Monday to Friday, 8:00 AM - 5:00 PM
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-info-circle text-primary mr-3"></i>
                Important Notes
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>
                    All ordinances are official legislative acts of the
                    Sangguniang Bayan
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>
                    For legal purposes, verify ordinance status with the SB
                    office
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>
                    Ordinances have the force of law within Tuy's jurisdiction
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>
                    Certified copies can be obtained at the SB office
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ordinances;

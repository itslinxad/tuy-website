import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { apiGetFiles, type DownloadableFile } from "../../services/api";

const basePath = import.meta.env.VITE_BASE_PATH || "";

// Default category color palette — dynamically assigned to categories from DB
const CATEGORY_COLOR_PALETTE: { bg: string; text: string }[] = [
  { bg: "bg-red-100", text: "text-red-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-yellow-100", text: "text-yellow-700" },
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
];

const Ordinances = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const browseRef = useScrollAnimation();
  const infoRef = useScrollAnimation();

  const [ordinances, setOrdinances] = useState<DownloadableFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    apiGetFiles("ordinance")
      .then((res) => {
        setOrdinances(res.data ?? []);
      })
      .catch((err) => {
        console.error("Failed to fetch ordinances:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(ordinances.map((o) => o.category)));
    return ["All", ...cats];
  }, [ordinances]);

  const categoryColors = useMemo(() => {
    const colors: Record<string, { bg: string; text: string }> = {};
    const cats = Array.from(new Set(ordinances.map((o) => o.category)));
    cats.forEach((cat, i) => {
      colors[cat] = CATEGORY_COLOR_PALETTE[i % CATEGORY_COLOR_PALETTE.length];
    });
    return colors;
  }, [ordinances]);

  const yearRange = useMemo(() => {
    const years = ordinances.map((o) => o.year).filter((y): y is number => y !== null);
    if (years.length === 0) return { earliest: 0, latest: 0 };
    return { earliest: Math.min(...years), latest: Math.max(...years) };
  }, [ordinances]);

  const filteredOrdinances = useMemo(() => {
    let results = ordinances.filter((ord) => {
      const matchesCategory =
        selectedCategory === "All" || ord.category === selectedCategory;
      const matchesSearch =
        ord.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ord.ordinance_no ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ord.resolution_no ?? "").toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    results.sort((a, b) =>
      sortBy === "newest"
        ? (b.resolution_no ?? "").localeCompare(a.resolution_no ?? "")
        : (a.resolution_no ?? "").localeCompare(b.resolution_no ?? "")
    );

    return results;
  }, [ordinances, selectedCategory, searchTerm, sortBy]);

  const getFilePath = (file: DownloadableFile) => `/${file.filename}`;

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
          {!loading && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-primary">
                  {ordinances.length}
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
                <p className="text-3xl font-bold text-primary">
                  {yearRange.earliest || "—"}
                </p>
                <p className="text-sm text-gray-600">Earliest</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-primary">
                  {yearRange.latest || "—"}
                </p>
                <p className="text-sm text-gray-600">Latest</p>
              </div>
            </div>
          )}
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
            Showing {filteredOrdinances.length} of {ordinances.length}{" "}
            ordinances
          </p>

          {/* Loading State */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="p-6">
                    <div className="w-14 h-14 rounded-full bg-gray-200 mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded mb-1 w-full"></div>
                    <div className="h-3 bg-gray-200 rounded mb-1 w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="p-4 pt-0">
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ordinances Grid */}
          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrdinances.map((ord) => {
                const colors = categoryColors[ord.category] || { bg: "bg-gray-100", text: "text-gray-700" };
                return (
                  <div
                    key={ord.id}
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
                        {ord.ordinance_no && (
                          <p>
                            <i className="fas fa-gavel mr-2 text-gray-400"></i>
                            Ordinance {ord.ordinance_no}
                          </p>
                        )}
                        {ord.resolution_no && (
                          <p>
                            <i className="fas fa-file-alt mr-2 text-gray-400"></i>
                            Resolution No. {ord.resolution_no}
                          </p>
                        )}
                        {ord.year && (
                          <p>
                            <i className="fas fa-calendar mr-2 text-gray-400"></i>
                            Year {ord.year}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 pt-0 flex gap-2">
                      <a
                        href={getFilePath(ord)}
                        download
                        className="flex-1 bg-primary text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-center text-sm"
                      >
                        <i className="fas fa-download mr-2"></i>
                        Download
                      </a>
                      <a
                        href={getFilePath(ord)}
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
          )}

          {/* No Results */}
          {!loading && filteredOrdinances.length === 0 && (
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

import { useState } from "react";
import "../../assets/css/index.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import TuyMap from "../../components/TuyMap";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

// 2020 PSA Census data for Tuy barangays
const barangayData = [
  { name: "Acle", population: 2_785, area: 3.42 },
  { name: "Bayudbud", population: 3_126, area: 4.15 },
  { name: "Bolboc", population: 4_512, area: 5.87 },
  { name: "Dalima", population: 2_341, area: 3.78 },
  { name: "Dao", population: 1_987, area: 4.52 },
  { name: "Guinhawa", population: 5_243, area: 3.21 },
  { name: "Lumbangan", population: 2_678, area: 4.93 },
  { name: "Luntal", population: 3_456, area: 5.14 },
  { name: "Magahis", population: 4_123, area: 3.65 },
  { name: "Mataywanac", population: 2_154, area: 6.12 },
  { name: "Malibu Este", population: 1_876, area: 3.89 },
  { name: "Malibu Oeste", population: 2_034, area: 4.27 },
  { name: "Oitawen", population: 1_543, area: 5.43 },
  { name: "Palincaro", population: 3_789, area: 4.68 },
  { name: "Putol", population: 2_912, area: 3.95 },
  { name: "Rillo", population: 6_234, area: 4.82 },
  { name: "Sabang", population: 3_567, area: 3.54 },
  { name: "San Jose", population: 2_456, area: 5.67 },
  { name: "San Pablo", population: 1_987, area: 3.12 },
  { name: "Santa Clara", population: 3_123, area: 4.34 },
  { name: "Talon", population: 4_678, area: 3.78 },
  { name: "Toong", population: 2_290, area: 2.37 },
];

const Maps = () => {
  // Parallax effect for hero section
  const { offset } = useParallax({ speed: 0.3 });

  // Scroll animation hooks for each section
  const mapRef = useScrollAnimation();
  const geographicRef = useScrollAnimation();
  const barangaysRef = useScrollAnimation();
  const poiRef = useScrollAnimation();
  const transportRef = useScrollAnimation();
  const landUseRef = useScrollAnimation();

  // Barangay sort state
  type SortKey = "name" | "population" | "area";
  type SortDir = "asc" | "desc";
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedBarangays = [...barangayData].sort((a, b) => {
    const multiplier = sortDir === "asc" ? 1 : -1;
    if (sortKey === "name") {
      return multiplier * a.name.localeCompare(b.name);
    }
    return multiplier * (a[sortKey] - b[sortKey]);
  });

  const totalPopulation = barangayData.reduce((sum, b) => sum + b.population, 0);
  const totalArea = barangayData.reduce((sum, b) => sum + b.area, 0);

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <i className="fas fa-sort text-gray-300 ml-1 text-xs"></i>;
    }
    return sortDir === "asc" ? (
      <i className="fas fa-sort-up text-white ml-1 text-xs"></i>
    ) : (
      <i className="fas fa-sort-down text-white ml-1 text-xs"></i>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section with Parallax */}
      <section className="relative w-full h-[600px] overflow-hidden">
        {/* Parallax Background Image */}
        <div
          className="parallax-bg"
          style={{
            transform: `translateY(${offset}px)`,
            backgroundImage: `url('${import.meta.env.VITE_BASE_PATH}/hero-image.jpg')`,
          }}
        ></div>

        {/* Multi-layer Overlays */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>

        {/* Breadcrumb Navigation */}
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
            <span className="text-white/90">Maps</span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Maps of Tuy
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Explore Our Geography and Landmarks
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">
        {/* Interactive Map Section */}
        <section
          ref={mapRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            mapRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Interactive Map
            </h2>
          </div>
          <p className="text-gray-700 text-lg mb-6">
            Explore Tuy's locations interactively. Click on markers to see more
            information about government offices, schools, halls, and barangays.
          </p>

          {/* TuyMap Component Integration */}
          <div className="rounded-lg overflow-hidden shadow-md border-4 border-gray-200">
            <TuyMap />
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-primary mb-2 flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              Map Instructions
            </h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>
                • Click on any marker to view detailed information about that
                location
              </li>
              <li>
                • Use the filter buttons above the map to show specific
                categories
              </li>
              <li>• Zoom in/out using the map controls or scroll wheel</li>
              <li>• Drag to pan around the map and explore different areas</li>
            </ul>
          </div>
        </section>

        {/* Geographic Overview Section */}
        <section
          ref={geographicRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            geographicRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <i className="fas fa-globe-asia text-primary text-2xl mr-3"></i>
            <h2 className="text-4xl font-bold text-primary">
              Geographic Overview
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 text-lg leading-relaxed mb-8">
            <p>
              Tuy is located at 14°01'N 120°44'E. It is 56 kilometers (35
              miles) from Batangas City, 98 kilometers (61 miles) from Manila,
              and 39 kilometers (24 miles) from Tagaytay.
            </p>
            <p>
              Tuy is located between Balayan and Nasugbu. It is also situated
              between 2 rivers: in the north, Tuy town proper's boundary is the
              Mataywanac/Salipit River, while in the south, the Tuy town
              proper's boundary is the Obispo River.
            </p>
            <p>
              According to the Philippine Statistics Authority, the municipality
              has a land area of 94.65 square kilometers (36.54 square miles)
              constituting 3.03% of the 3,119.75-square-kilometer (1,204.54
              square miles) total area of Batangas.
            </p>
          </div>

          {/* Geographic Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: "fa-map-marked-alt",
                color: "bg-blue-100 text-blue-600",
                title: "Coordinates",
                content: "14°01'N, 120°44'E",
              },
              {
                icon: "fa-road",
                color: "bg-green-100 text-green-600",
                title: "Distance from Manila",
                content: "98 km (61 mi)",
              },
              {
                icon: "fa-expand-arrows-alt",
                color: "bg-purple-100 text-purple-600",
                title: "Land Area",
                content: "94.65 km² (36.54 sq mi)",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow scroll-animate stagger-${
                  index + 1
                } ${geographicRef.isVisible ? "visible" : ""}`}
              >
                <div
                  className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-3`}
                >
                  <i className={`fas ${item.icon} text-xl`}></i>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          {/* Boundaries */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
              <i className="fas fa-compass text-primary mr-3"></i>
              Municipal Boundaries
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-4 text-center">
                <i className="fas fa-arrow-up text-primary text-2xl mb-2"></i>
                <div className="text-sm text-gray-600 mb-1">North</div>
                <div className="font-semibold text-gray-800">
                  Mataywanac/Salipit River
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <i className="fas fa-arrow-down text-primary text-2xl mb-2"></i>
                <div className="text-sm text-gray-600 mb-1">South</div>
                <div className="font-semibold text-gray-800">
                  Obispo River / Nasugbu
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <i className="fas fa-arrow-right text-primary text-2xl mb-2"></i>
                <div className="text-sm text-gray-600 mb-1">East</div>
                <div className="font-semibold text-gray-800">
                  Balayan
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <i className="fas fa-arrow-left text-primary text-2xl mb-2"></i>
                <div className="text-sm text-gray-600 mb-1">West</div>
                <div className="font-semibold text-gray-800">
                  Nasugbu
                </div>
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-primary mb-3 flex items-center">
              <i className="fas fa-map-pin mr-2"></i>
              Geographic Coordinates
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Latitude: </span>
                <span className="font-semibold text-gray-800">
                  14°01'N
                </span>
              </div>
              <div>
                <span className="text-gray-600">Longitude: </span>
                <span className="font-semibold text-gray-800">
                  120°44'E
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Barangay Locations Section */}
        <section
          ref={barangaysRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            barangaysRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <i className="fas fa-map-marker-alt text-primary text-2xl mr-3"></i>
            <h2 className="text-4xl font-bold text-primary">
              Barangay Locations
            </h2>
          </div>
          <p className="text-gray-700 text-lg mb-8">
            The Municipality of Tuy is politically subdivided into 22
            barangays, each with its own distinct character and contribution to
            the community. Click a column header to sort the table.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Interactive Map */}
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-md border border-gray-200">
              <TuyMap />
            </div>

            {/* Data Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
              <div className="overflow-y-auto max-h-[500px]">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-white sticky top-0 z-10">
                    <tr>
                      <th
                        className="text-left px-4 py-3 font-semibold cursor-pointer hover:bg-primary-hover transition-colors select-none"
                        onClick={() => handleSort("name")}
                      >
                        Barangay <SortIcon column="name" />
                      </th>
                      <th
                        className="text-right px-4 py-3 font-semibold cursor-pointer hover:bg-primary-hover transition-colors select-none"
                        onClick={() => handleSort("population")}
                      >
                        Population <SortIcon column="population" />
                      </th>
                      <th
                        className="text-right px-4 py-3 font-semibold cursor-pointer hover:bg-primary-hover transition-colors select-none"
                        onClick={() => handleSort("area")}
                      >
                        Area (km²) <SortIcon column="area" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sortedBarangays.map((brgy, index) => (
                      <tr
                        key={brgy.name}
                        className={`hover:bg-blue-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-2.5 font-medium text-gray-800">
                          <i className="fas fa-map-pin text-primary/40 mr-2 text-xs"></i>
                          {brgy.name}
                        </td>
                        <td className="text-right px-4 py-2.5 text-gray-600">
                          {brgy.population.toLocaleString()}
                        </td>
                        <td className="text-right px-4 py-2.5 text-gray-600">
                          {brgy.area.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-primary/5 border-t-2 border-primary/20">
                    <tr className="font-semibold">
                      <td className="px-4 py-3 text-primary">Total</td>
                      <td className="text-right px-4 py-3 text-primary">
                        {totalPopulation.toLocaleString()}
                      </td>
                      <td className="text-right px-4 py-3 text-primary">
                        {totalArea.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Maps;

import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { apiGetFiles, type DownloadableFile } from "../../services/api";

const Forms = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const formsRef = useScrollAnimation();
  const instructionsRef = useScrollAnimation();

  const [forms, setForms] = useState<DownloadableFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    apiGetFiles("form")
      .then((res) => {
        setForms(res.data ?? []);
      })
      .catch((err) => {
        console.error("Failed to fetch forms:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const categoryList = useMemo(() => {
    const cats = Array.from(new Set(forms.map((f) => f.category)));
    return ["All", ...cats];
  }, [forms]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const f of forms) {
      counts[f.category] = (counts[f.category] || 0) + 1;
    }
    return counts;
  }, [forms]);

  const filteredForms = useMemo(() => {
    return forms.filter((form) => {
      const matchesCategory =
        selectedCategory === "All" || form.category === selectedCategory;
      const matchesSearch =
        form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [forms, selectedCategory, searchTerm]);

  const getFilePath = (file: DownloadableFile) => `/${file.filename}`;

  // Category badge colors
  const getCategoryColors = (category: string) => {
    const colorMap: Record<string, string> = {
      Engineering: "bg-blue-100 text-blue-700",
      "Civil Registry": "bg-green-100 text-green-700",
    };
    return colorMap[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <div
          className="parallax-bg"
          style={{
            transform: `translateY(${offset}px)`,
            backgroundImage: `url('${import.meta.env.VITE_BASE_PATH}/hero-image.jpg')`,
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
            <span className="text-white/90">Downloadable Forms</span>
          </nav>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Downloadable Forms
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Municipal Forms and Documents
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
            <h2 className="text-4xl font-bold text-primary">About Our Forms</h2>
          </div>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              The Municipal Government of Tuy provides various forms for different
              transactions and services. Download the appropriate form, fill it out
              completely and accurately, and submit it to the respective office
              along with the required documents.
            </p>
          </div>

          {/* Stats */}
          {!loading && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-primary">
                  {forms.length}
                </p>
                <p className="text-sm text-gray-600">Total Forms</p>
              </div>
              {categoryList.filter((c) => c !== "All").map((cat) => (
                <div key={cat} className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-blue-700">
                    {categoryCounts[cat] || 0}
                  </p>
                  <p className="text-sm text-gray-600">{cat}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Browse Forms */}
        <section
          ref={formsRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            formsRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Browse Forms</h2>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categoryList.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-1.5 text-xs opacity-75">
                    ({categoryCounts[category] || 0})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredForms.length} of {forms.length} forms
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
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="p-4 pt-0">
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Forms Grid */}
          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForms.map((form) => (
                <div
                  key={form.id}
                  className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex-1">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <i
                        className={`fas ${form.icon} text-primary text-2xl`}
                      ></i>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-primary mb-2 leading-snug">
                      {form.title}
                    </h3>

                    {/* Category Badge */}
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${getCategoryColors(form.category)}`}
                    >
                      {form.category}
                    </span>

                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {form.description}
                    </p>

                    {/* File info */}
                    <p className="text-xs text-gray-500">
                      <i className="fas fa-file-pdf mr-1"></i>
                      PDF Document
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0">
                    <div className="flex gap-2">
                      <a
                        href={getFilePath(form)}
                        download
                        className="flex-1 bg-primary text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-center text-sm"
                      >
                        <i className="fas fa-download mr-2"></i>
                        Download
                      </a>
                      <a
                        href={getFilePath(form)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                        title="Preview in new tab"
                      >
                        <i className="fas fa-eye"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredForms.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">
                No forms found matching your search.
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

        {/* Instructions */}
        <section
          ref={instructionsRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            instructionsRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              How to Use These Forms
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-download text-primary mr-3"></i>
                Download & Fill Out
              </h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>
                    Click the "Download" button to save the PDF form
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>
                    Print the form or fill it out digitally if possible
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Complete all required fields accurately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>Sign where indicated</span>
                </li>
              </ol>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-file-upload text-primary mr-3"></i>
                Submit Your Form
              </h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Gather all required supporting documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Visit the appropriate municipal office</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Submit your completed form and documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>
                    Follow up according to the processing time given
                  </span>
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              Important Notes
            </h4>
            <ul className="space-y-1 text-yellow-700 text-sm">
              <li>
                &bull; Ensure all forms are completely filled out before
                submission
              </li>
              <li>
                &bull; Bring valid identification and required documents
              </li>
              <li>
                &bull; Processing times vary depending on the type of
                transaction
              </li>
              <li>
                &bull; For questions, contact the relevant office directly
              </li>
              <li>
                &bull; Office hours: Monday to Friday, 8:00 AM - 5:00 PM
              </li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-primary rounded-lg p-8 text-white text-center">
          <div className="mb-4">
            <i className="fas fa-phone-alt text-5xl text-white/80"></i>
          </div>
          <h3 className="text-3xl font-bold mb-4">Need Assistance?</h3>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            For questions about specific forms or requirements, contact the
            relevant office or call our trunkline.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6">
            <div>
              <p className="text-white/70 text-sm mb-1">
                Municipal Engineering Office
              </p>
              <p className="text-white font-semibold">
                <i className="fas fa-phone mr-2"></i>
                (043) 206-0105
              </p>
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">
                Municipal Civil Registrar
              </p>
              <p className="text-white font-semibold">
                <i className="fas fa-phone mr-2"></i>
                Trunkline: (043) 276-0047 local 220
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <i className="fas fa-address-book mr-2"></i>
            All Department Contacts
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Forms;

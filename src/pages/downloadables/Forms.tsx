import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const basePath = import.meta.env.VITE_BASE_PATH || "";

interface FormEntry {
  title: string;
  category: string;
  description: string;
  icon: string;
  path: string;
}

const formsData: FormEntry[] = [
  // ===== Engineering / Building Permits =====
  {
    title: "Unified Application Form for Building Permit",
    category: "Engineering",
    description:
      "Standard unified application form required for all building permit applications in the municipality.",
    icon: "fa-building",
    path: `${basePath}/Tuy_Data/engineering/unified_application_form_for_building_permit/unified_application_form_for_building_permit.pdf`,
  },
  {
    title: "Building Permit Application Procedures & Requirements",
    category: "Engineering",
    description:
      "Complete list of procedures, requirements, and supporting documents needed for a building permit application.",
    icon: "fa-clipboard-list",
    path: `${basePath}/Tuy_Data/engineering/building_permit_application_procedures_and_requirments.pdf`,
  },
  {
    title: "Architectural Permit",
    category: "Engineering",
    description:
      "Application form for architectural permit, required for building design and architectural plans.",
    icon: "fa-drafting-compass",
    path: `${basePath}/Tuy_Data/engineering/architectural_permit/architectural_permit.pdf`,
  },
  {
    title: "Civil / Structural Permit",
    category: "Engineering",
    description:
      "Application form for civil and structural permit, required for structural engineering plans.",
    icon: "fa-hard-hat",
    path: `${basePath}/Tuy_Data/engineering/civil_structural_permit/civil_structural_permit.pdf`,
  },
  {
    title: "Electrical Permit",
    category: "Engineering",
    description:
      "Permit application for electrical installations, wiring, and electrical system plans.",
    icon: "fa-bolt",
    path: `${basePath}/Tuy_Data/engineering/electrical_permit/electrical_permit.pdf`,
  },
  {
    title: "Plumbing Permit",
    category: "Engineering",
    description:
      "Permit application for plumbing work, water supply systems, and sanitary drainage.",
    icon: "fa-wrench",
    path: `${basePath}/Tuy_Data/engineering/plumbing_permit/plumbing_permit.pdf`,
  },
  {
    title: "Sanitary Permit",
    category: "Engineering",
    description:
      "Permit application for sanitary and sewerage systems, including waste disposal facilities.",
    icon: "fa-pump-soap",
    path: `${basePath}/Tuy_Data/engineering/sanitary_permit/sanitary_permit.pdf`,
  },
  {
    title: "Certificate of Completion",
    category: "Engineering",
    description:
      "Application form for certificate of completion, issued upon finishing a construction project.",
    icon: "fa-check-circle",
    path: `${basePath}/Tuy_Data/engineering/certificate_of_completion/certificate_of_completion.pdf`,
  },
  {
    title: "Certificate of Occupancy",
    category: "Engineering",
    description:
      "Unified application form for certificate of occupancy, required before a building can be occupied.",
    icon: "fa-home",
    path: `${basePath}/Tuy_Data/engineering/unified_application_form_for_certicate_of_occupancy20250811_13112102.pdf`,
  },
  {
    title: "Certificate of Final Electrical Inspection",
    category: "Engineering",
    description:
      "Application for final electrical inspection certificate, required for energization of a building.",
    icon: "fa-plug",
    path: `${basePath}/Tuy_Data/engineering/certificate_of_final_electrical_inspection.pdf`,
  },

  // ===== Civil Registry (LCR) =====
  {
    title: "Requirements for Delayed Registration of Birth",
    category: "Civil Registry",
    description:
      "List of requirements for delayed registration of birth at the Local Civil Registrar's Office.",
    icon: "fa-baby",
    path: `${basePath}/Tuy_Data/LCR/requirements_for_delay_registration_of_Birth20250811_12264691.pdf`,
  },
  {
    title: "Mandatory Requirements for Delayed Registration",
    category: "Civil Registry",
    description:
      "Mandatory documentary requirements for all types of delayed civil registration.",
    icon: "fa-file-contract",
    path: `${basePath}/Tuy_Data/LCR/mandatory_requirments_for_delay_registration20250811_12341438.pdf`,
  },
  {
    title: "Requirements for Marriage License",
    category: "Civil Registry",
    description:
      "Complete list of requirements for obtaining a marriage license from the Municipal Civil Registrar.",
    icon: "fa-ring",
    path: `${basePath}/Tuy_Data/LCR/requirments_for_marriage_license20250811_12370786.pdf`,
  },
  {
    title: "Requirements for Correction of Clerical / Typographical Error",
    category: "Civil Registry",
    description:
      "Requirements for filing a petition to correct clerical or typographical errors in civil registry documents (RA 9048).",
    icon: "fa-pen",
    path: `${basePath}/Tuy_Data/LCR/requirments_for_correction_of_clerical_or_typographical_error20250811_12394373.pdf`,
  },
];

const categoryList = ["All", "Engineering", "Civil Registry"];

const Forms = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const formsRef = useScrollAnimation();
  const instructionsRef = useScrollAnimation();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredForms = useMemo(() => {
    return formsData.filter((form) => {
      const matchesCategory =
        selectedCategory === "All" || form.category === selectedCategory;
      const matchesSearch =
        form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const engineeringCount = formsData.filter(
    (f) => f.category === "Engineering"
  ).length;
  const lcrCount = formsData.filter(
    (f) => f.category === "Civil Registry"
  ).length;

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
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {formsData.length}
              </p>
              <p className="text-sm text-gray-600">Total Forms</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-700">
                {engineeringCount}
              </p>
              <p className="text-sm text-gray-600">Engineering / Building</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-700">{lcrCount}</p>
              <p className="text-sm text-gray-600">Civil Registry</p>
            </div>
          </div>
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
                    (
                    {category === "Engineering"
                      ? engineeringCount
                      : lcrCount}
                    )
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredForms.length} of {formsData.length} forms
          </p>

          {/* Forms Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form, index) => (
              <div
                key={index}
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
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
                      form.category === "Engineering"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
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
                      href={form.path}
                      download
                      className="flex-1 bg-primary text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-center text-sm"
                    >
                      <i className="fas fa-download mr-2"></i>
                      Download
                    </a>
                    <a
                      href={form.path}
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

          {/* No Results */}
          {filteredForms.length === 0 && (
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

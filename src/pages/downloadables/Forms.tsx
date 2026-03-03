import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Forms = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const formsRef = useScrollAnimation();
  const instructionsRef = useScrollAnimation();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // ============================================
  // CONTENT NEEDED: Downloadable Forms
  // ============================================
  // Add actual forms data here. For each form provide:
  // - title: Form name
  // - category: Category it belongs to
  // - description: Brief description of the form
  // - fileSize: File size (e.g., "125 KB")
  // - lastUpdated: Date last updated
  // - filePath: Path to PDF in /public/documents/forms/
  
  const formsData = [
    // Business & Permits
    {
      title: "Business Permit Application Form",
      category: "Business & Permits",
      description: "Application form for new business permit registration",
      fileSize: "150 KB",
      lastUpdated: "2024-01-15",
      filePath: "/documents/forms/business-permit-application.pdf",
      icon: "fa-store",
    },
    {
      title: "Business Permit Renewal Form",
      category: "Business & Permits",
      description: "Renewal form for existing business permits",
      fileSize: "145 KB",
      lastUpdated: "2024-01-15",
      filePath: "/documents/forms/business-permit-renewal.pdf",
      icon: "fa-redo",
    },
    {
      title: "Mayor's Permit Application",
      category: "Business & Permits",
      description: "Application for Mayor's permit for business operations",
      fileSize: "140 KB",
      lastUpdated: "2024-01-10",
      filePath: "/documents/forms/mayors-permit-application.pdf",
      icon: "fa-certificate",
    },
    
    // Clearances & Certifications
    {
      title: "Barangay Clearance Application",
      category: "Clearances & Certifications",
      description: "Request form for barangay clearance certificate",
      fileSize: "120 KB",
      lastUpdated: "2024-01-20",
      filePath: "/documents/forms/barangay-clearance.pdf",
      icon: "fa-file-contract",
    },
    {
      title: "Municipal Clearance Application",
      category: "Clearances & Certifications",
      description: "Request form for municipal clearance certificate",
      fileSize: "125 KB",
      lastUpdated: "2024-01-20",
      filePath: "/documents/forms/municipal-clearance.pdf",
      icon: "fa-file-alt",
    },
    {
      title: "Certificate of Indigency Request",
      category: "Clearances & Certifications",
      description: "Application for certificate of indigency",
      fileSize: "115 KB",
      lastUpdated: "2024-01-18",
      filePath: "/documents/forms/certificate-indigency.pdf",
      icon: "fa-hands-helping",
    },
    {
      title: "Certificate of Residency Request",
      category: "Clearances & Certifications",
      description: "Application for certificate of residency",
      fileSize: "115 KB",
      lastUpdated: "2024-01-18",
      filePath: "/documents/forms/certificate-residency.pdf",
      icon: "fa-home",
    },
    
    // Building & Construction
    {
      title: "Building Permit Application",
      category: "Building & Construction",
      description: "Application form for building permit and construction",
      fileSize: "200 KB",
      lastUpdated: "2024-01-12",
      filePath: "/documents/forms/building-permit.pdf",
      icon: "fa-building",
    },
    {
      title: "Electrical Permit Application",
      category: "Building & Construction",
      description: "Permit application for electrical installations",
      fileSize: "180 KB",
      lastUpdated: "2024-01-12",
      filePath: "/documents/forms/electrical-permit.pdf",
      icon: "fa-bolt",
    },
    {
      title: "Plumbing Permit Application",
      category: "Building & Construction",
      description: "Permit application for plumbing work",
      fileSize: "175 KB",
      lastUpdated: "2024-01-12",
      filePath: "/documents/forms/plumbing-permit.pdf",
      icon: "fa-wrench",
    },
    {
      title: "Fencing Permit Application",
      category: "Building & Construction",
      description: "Application for fencing construction permit",
      fileSize: "160 KB",
      lastUpdated: "2024-01-10",
      filePath: "/documents/forms/fencing-permit.pdf",
      icon: "fa-border-style",
    },
    
    // Tax & Financial
    {
      title: "Real Property Tax Declaration",
      category: "Tax & Financial",
      description: "Declaration form for real property tax assessment",
      fileSize: "190 KB",
      lastUpdated: "2024-01-08",
      filePath: "/documents/forms/property-tax-declaration.pdf",
      icon: "fa-file-invoice",
    },
    {
      title: "Community Tax Certificate Application (Cedula)",
      category: "Tax & Financial",
      description: "Application form for community tax certificate",
      fileSize: "130 KB",
      lastUpdated: "2024-01-08",
      filePath: "/documents/forms/cedula-application.pdf",
      icon: "fa-id-card",
    },
    {
      title: "Tax Clearance Request",
      category: "Tax & Financial",
      description: "Request form for tax clearance certificate",
      fileSize: "125 KB",
      lastUpdated: "2024-01-05",
      filePath: "/documents/forms/tax-clearance.pdf",
      icon: "fa-coins",
    },
    
    // Civil Registry
    {
      title: "Birth Certificate Request Form",
      category: "Civil Registry",
      description: "Request form for certified copy of birth certificate",
      fileSize: "135 KB",
      lastUpdated: "2024-01-22",
      filePath: "/documents/forms/birth-certificate-request.pdf",
      icon: "fa-baby",
    },
    {
      title: "Marriage Certificate Request Form",
      category: "Civil Registry",
      description: "Request form for certified copy of marriage certificate",
      fileSize: "135 KB",
      lastUpdated: "2024-01-22",
      filePath: "/documents/forms/marriage-certificate-request.pdf",
      icon: "fa-ring",
    },
    {
      title: "Death Certificate Request Form",
      category: "Civil Registry",
      description: "Request form for certified copy of death certificate",
      fileSize: "135 KB",
      lastUpdated: "2024-01-22",
      filePath: "/documents/forms/death-certificate-request.pdf",
      icon: "fa-cross",
    },
    
    // Complaints & Requests
    {
      title: "Complaint Form",
      category: "Complaints & Requests",
      description: "General complaint form for municipal concerns",
      fileSize: "110 KB",
      lastUpdated: "2024-01-25",
      filePath: "/documents/forms/complaint-form.pdf",
      icon: "fa-exclamation-triangle",
    },
    {
      title: "Public Assistance Request",
      category: "Complaints & Requests",
      description: "Request form for public assistance and social services",
      fileSize: "120 KB",
      lastUpdated: "2024-01-20",
      filePath: "/documents/forms/public-assistance-request.pdf",
      icon: "fa-hand-holding-heart",
    },
    {
      title: "Freedom of Information Request",
      category: "Complaints & Requests",
      description: "FOI request form for government information access",
      fileSize: "115 KB",
      lastUpdated: "2024-01-15",
      filePath: "/documents/forms/foi-request.pdf",
      icon: "fa-info-circle",
    },
  ];

  const categories = ["All", ...Array.from(new Set(formsData.map(f => f.category)))];

  const filteredForms = formsData.filter(form => {
    const matchesCategory = selectedCategory === "All" || form.category === selectedCategory;
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          form.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              transactions and services. These forms are available for download to
              help expedite your transactions at our municipal offices.
            </p>
            <p>
              Please download the appropriate form, fill it out completely and
              accurately, and submit it to the respective office along with the
              required documents. For questions about specific forms or
              requirements, please contact the relevant department.
            </p>
          </div>
        </section>

        {/* Search and Filter */}
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
            {categories.map((category) => (
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
              </button>
            ))}
          </div>

          {/* Forms Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <i className={`fas ${form.icon} text-primary text-2xl`}></i>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {form.title}
                  </h3>

                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                    {form.category}
                  </span>

                  {/* Description */}
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {form.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>
                      <i className="fas fa-file-pdf mr-1"></i>
                      {form.fileSize}
                    </span>
                    <span>
                      <i className="fas fa-calendar mr-1"></i>
                      Updated: {form.lastUpdated}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <a
                      href={form.filePath}
                      download
                      className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-center"
                    >
                      <i className="fas fa-download mr-2"></i>
                      Download
                    </a>
                    <a
                      href={form.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
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
                  <span>Click the "Download" button to save the PDF form</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Print the form or fill it out digitally if possible</span>
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
                  <span>Follow up according to processing time given</span>
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
              <li>• Ensure all forms are completely filled out before submission</li>
              <li>• Bring valid identification and required documents</li>
              <li>• Processing times vary depending on the type of transaction</li>
              <li>• For questions, contact the relevant office directly</li>
              <li>• Office hours: Monday to Friday, 8:00 AM - 5:00 PM</li>
            </ul>
          </div>
        </section>

        {/* Note about adding forms */}
        <section className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
          <h3 className="text-lg font-bold text-blue-800 mb-2 flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            For Website Administrators
          </h3>
          <p className="text-blue-700 text-sm">
            To add forms to this page: Place PDF files in{" "}
            <code className="bg-blue-200 px-2 py-1 rounded">
              public/documents/forms/
            </code>{" "}
            and update the formsData array in this component with the file details.
            All forms should be in PDF format for easy downloading and printing.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Forms;

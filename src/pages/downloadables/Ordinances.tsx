import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Ordinances = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const ordinancesRef = useScrollAnimation();
  const infoRef = useScrollAnimation();

  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // ============================================
  // CONTENT NEEDED: Municipal Ordinances
  // ============================================
  // Add actual ordinances here. For each ordinance provide:
  // - number: Ordinance number (e.g., "Ordinance No. 2024-01")
  // - title: Title/description of the ordinance
  // - description: Full description
  // - category: Category it belongs to
  // - year: Year enacted
  // - dateEnacted: Date enacted
  // - effectivityDate: When it takes effect
  // - author: Author/committee
  // - status: "Active", "Amended", or "Repealed"
  // - fileSize: File size
  // - filePath: Path to PDF in /public/documents/ordinances/[year]/

  const ordinancesData = [
    {
      number: "Ordinance No. 2024-01",
      title: "Annual Investment Plan for Fiscal Year 2024",
      description:
        "REPLACE: An ordinance approving the Annual Investment Plan (AIP) of the Municipality of Tuy for the Fiscal Year 2024, appropriating funds therefor and for other purposes.",
      category: "Budget & Finance",
      year: "2024",
      dateEnacted: "January 15, 2024",
      effectivityDate: "January 22, 2024",
      author: "REPLACE: Hon. [Name], Sangguniang Bayan Member",
      status: "Active",
      fileSize: "2.4 MB",
      filePath: "/documents/ordinances/2024/ordinance-2024-01.pdf",
      icon: "fa-balance-scale",
    },
    {
      number: "Ordinance No. 2024-02",
      title: "Comprehensive Land Use Plan Amendment",
      description:
        "REPLACE: An ordinance amending certain provisions of the Comprehensive Land Use Plan (CLUP) of Tuy, reclassifying specific areas for mixed-use development, and providing guidelines for implementation.",
      category: "Land Use & Zoning",
      year: "2024",
      dateEnacted: "February 10, 2024",
      effectivityDate: "February 17, 2024",
      author: "REPLACE: Hon. [Name], Committee on Land Use",
      status: "Active",
      fileSize: "3.8 MB",
      filePath: "/documents/ordinances/2024/ordinance-2024-02.pdf",
      icon: "fa-building",
    },
    {
      number: "Ordinance No. 2024-03",
      title: "Environmental Protection and Solid Waste Management",
      description:
        "REPLACE: An ordinance strengthening solid waste management practices, prohibiting single-use plastics in commercial establishments, and imposing penalties for violations.",
      category: "Environment",
      year: "2024",
      dateEnacted: "March 5, 2024",
      effectivityDate: "April 1, 2024",
      author: "REPLACE: Hon. [Name], Committee on Environment",
      status: "Active",
      fileSize: "1.9 MB",
      filePath: "/documents/ordinances/2024/ordinance-2024-03.pdf",
      icon: "fa-leaf",
    },
    {
      number: "Ordinance No. 2024-04",
      title: "Business Permit and Licensing Requirements",
      description:
        "REPLACE: An ordinance updating the requirements and procedures for business permit applications, renewals, and licensing fees in the Municipality of Tuy.",
      category: "Business & Commerce",
      year: "2024",
      dateEnacted: "March 20, 2024",
      effectivityDate: "April 1, 2024",
      author: "REPLACE: Hon. [Name], Committee on Ways and Means",
      status: "Active",
      fileSize: "2.1 MB",
      filePath: "/documents/ordinances/2024/ordinance-2024-04.pdf",
      icon: "fa-store",
    },
    {
      number: "Ordinance No. 2024-05",
      title: "Traffic and Road Safety Regulations",
      description:
        "REPLACE: An ordinance establishing traffic rules and regulations, designating no-parking zones, and implementing speed limits in various roads within the municipality.",
      category: "Traffic & Transportation",
      year: "2024",
      dateEnacted: "April 12, 2024",
      effectivityDate: "May 1, 2024",
      author: "REPLACE: Hon. [Name], Committee on Transportation",
      status: "Active",
      fileSize: "2.6 MB",
      filePath: "/documents/ordinances/2024/ordinance-2024-05.pdf",
      icon: "fa-car",
    },
    {
      number: "Ordinance No. 2023-15",
      title: "Anti-Discrimination and Equal Opportunity",
      description:
        "REPLACE: An ordinance promoting equal opportunity and prohibiting discrimination on the basis of gender, age, religion, disability, or social status in all municipal offices and services.",
      category: "Social Welfare",
      year: "2023",
      dateEnacted: "November 8, 2023",
      effectivityDate: "November 15, 2023",
      author: "REPLACE: Hon. [Name], Committee on Social Services",
      status: "Active",
      fileSize: "1.7 MB",
      filePath: "/documents/ordinances/2023/ordinance-2023-15.pdf",
      icon: "fa-users",
    },
    {
      number: "Ordinance No. 2023-14",
      title: "Building Code Implementation and Safety Standards",
      description:
        "REPLACE: An ordinance adopting the National Building Code, establishing local building standards, and creating penalties for violations of construction safety requirements.",
      category: "Building & Construction",
      year: "2023",
      dateEnacted: "October 25, 2023",
      effectivityDate: "November 1, 2023",
      author: "REPLACE: Hon. [Name], Committee on Infrastructure",
      status: "Active",
      fileSize: "4.2 MB",
      filePath: "/documents/ordinances/2023/ordinance-2023-14.pdf",
      icon: "fa-building",
    },
    {
      number: "Ordinance No. 2023-13",
      title: "Animal Welfare and Control Ordinance",
      description:
        "REPLACE: An ordinance promoting responsible pet ownership, establishing animal welfare standards, creating an impounding facility, and regulating stray animals.",
      category: "Public Safety",
      year: "2023",
      dateEnacted: "September 14, 2023",
      effectivityDate: "October 1, 2023",
      author: "REPLACE: Hon. [Name], Committee on Public Safety",
      status: "Active",
      fileSize: "1.8 MB",
      filePath: "/documents/ordinances/2023/ordinance-2023-13.pdf",
      icon: "fa-shield-alt",
    },
    {
      number: "Ordinance No. 2023-12",
      title: "Tourism Development and Promotion",
      description:
        "REPLACE: An ordinance creating the Municipal Tourism Council, establishing guidelines for tourism development, and allocating funds for tourism promotion activities.",
      category: "Tourism & Culture",
      year: "2023",
      dateEnacted: "August 18, 2023",
      effectivityDate: "September 1, 2023",
      author: "REPLACE: Hon. [Name], Committee on Tourism",
      status: "Active",
      fileSize: "2.3 MB",
      filePath: "/documents/ordinances/2023/ordinance-2023-12.pdf",
      icon: "fa-map-marked-alt",
    },
    {
      number: "Ordinance No. 2023-11",
      title: "Public Health and Sanitation Standards",
      description:
        "REPLACE: An ordinance establishing public health and sanitation standards for food establishments, markets, and commercial areas, and imposing penalties for violations.",
      category: "Health & Sanitation",
      year: "2023",
      dateEnacted: "July 20, 2023",
      effectivityDate: "August 1, 2023",
      author: "REPLACE: Hon. [Name], Committee on Health",
      status: "Active",
      fileSize: "2.0 MB",
      filePath: "/documents/ordinances/2023/ordinance-2023-11.pdf",
      icon: "fa-clinic-medical",
    },
    {
      number: "Ordinance No. 2023-10",
      title: "Disaster Risk Reduction and Management Plan",
      description:
        "REPLACE: An ordinance adopting the Municipal Disaster Risk Reduction and Management Plan, allocating funds for DRRM activities, and establishing emergency response protocols.",
      category: "Disaster Management",
      year: "2023",
      dateEnacted: "June 15, 2023",
      effectivityDate: "July 1, 2023",
      author: "REPLACE: Hon. [Name], Committee on DRRM",
      status: "Active",
      fileSize: "5.1 MB",
      filePath: "/documents/ordinances/2023/ordinance-2023-10.pdf",
      icon: "fa-exclamation-triangle",
    },
    {
      number: "Ordinance No. 2023-09",
      title: "Local Revenue Code Amendment",
      description:
        "REPLACE: An ordinance amending certain provisions of the Local Revenue Code, adjusting tax rates and fees, and updating collection procedures.",
      category: "Budget & Finance",
      year: "2023",
      dateEnacted: "May 25, 2023",
      effectivityDate: "June 1, 2023",
      author: "REPLACE: Hon. [Name], Committee on Finance",
      status: "Amended",
      fileSize: "3.5 MB",
      filePath: "/documents/ordinances/2023/ordinance-2023-09.pdf",
      icon: "fa-file-invoice-dollar",
    },
    {
      number: "Ordinance No. 2022-08",
      title: "Coastal Resource Management and Protection",
      description:
        "REPLACE: An ordinance establishing coastal resource management areas, prohibiting destructive fishing methods, and promoting sustainable coastal development.",
      category: "Environment",
      year: "2022",
      dateEnacted: "November 10, 2022",
      effectivityDate: "December 1, 2022",
      author: "REPLACE: Hon. [Name], Committee on Agriculture and Fisheries",
      status: "Active",
      fileSize: "2.8 MB",
      filePath: "/documents/ordinances/2022/ordinance-2022-08.pdf",
      icon: "fa-water",
    },
    {
      number: "Ordinance No. 2022-07",
      title: "Curfew for Minors",
      description:
        "REPLACE: An ordinance imposing curfew hours for minors, establishing exemptions, and providing penalties for violations to ensure the safety and welfare of children.",
      category: "Public Safety",
      year: "2022",
      dateEnacted: "August 5, 2022",
      effectivityDate: "September 1, 2022",
      author: "REPLACE: Hon. [Name], Committee on Youth and Sports",
      status: "Active",
      fileSize: "1.5 MB",
      filePath: "/documents/ordinances/2022/ordinance-2022-07.pdf",
      icon: "fa-user-clock",
    },
    {
      number: "Ordinance No. 2022-06",
      title: "Anti-Littering and Clean Streets Campaign",
      description:
        "REPLACE: An ordinance prohibiting littering in public places, establishing cleaning responsibilities, and imposing fines and community service penalties for violations.",
      category: "Environment",
      year: "2022",
      dateEnacted: "June 18, 2022",
      effectivityDate: "July 1, 2022",
      author: "REPLACE: Hon. [Name], Committee on Environment",
      status: "Active",
      fileSize: "1.6 MB",
      filePath: "/documents/ordinances/2022/ordinance-2022-06.pdf",
      icon: "fa-trash-alt",
    },
  ];

  const years = ["All", ...Array.from(new Set(ordinancesData.map((o) => o.year))).sort().reverse()];
  const categories = [
    "All",
    ...Array.from(new Set(ordinancesData.map((o) => o.category))).sort(),
  ];
  const statuses = ["All", "Active", "Amended", "Repealed"];

  const filteredOrdinances = useMemo(() => {
    return ordinancesData.filter((ordinance) => {
      const matchesYear = selectedYear === "All" || ordinance.year === selectedYear;
      const matchesCategory =
        selectedCategory === "All" || ordinance.category === selectedCategory;
      const matchesStatus = selectedStatus === "All" || ordinance.status === selectedStatus;
      const matchesSearch =
        ordinance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ordinance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ordinance.number.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesYear && matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedYear, selectedCategory, selectedStatus, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Amended":
        return "bg-yellow-100 text-yellow-800";
      case "Repealed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: ordinancesData.length,
    active: ordinancesData.filter((o) => o.status === "Active").length,
    amended: ordinancesData.filter((o) => o.status === "Amended").length,
    categories: categories.length - 1, // Exclude "All"
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
            <h2 className="text-4xl font-bold text-primary">About Municipal Ordinances</h2>
          </div>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Municipal ordinances are legislative acts enacted by the Sangguniang Bayan
              (Municipal Council) to regulate local affairs and promote the general welfare of
              the municipality. These ordinances have the force of law within the territorial
              jurisdiction of Tuy, Batangas.
            </p>
            <p>
              The power to enact ordinances is granted by the Local Government Code of 1991
              (Republic Act No. 7160). Ordinances must be consistent with national laws and
              policies and are subject to review by higher authorities.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stats.total}</div>
              <div className="text-gray-700 font-semibold">Total Ordinances</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-700 mb-2">{stats.active}</div>
              <div className="text-gray-700 font-semibold">Active</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-yellow-700 mb-2">{stats.amended}</div>
              <div className="text-gray-700 font-semibold">Amended</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">{stats.categories}</div>
              <div className="text-gray-700 font-semibold">Categories</div>
            </div>
          </div>
        </section>

        {/* Browse Ordinances */}
        <section
          ref={ordinancesRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            ordinancesRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Browse Ordinances</h2>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search ordinances by title, number, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* Year Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-calendar mr-2"></i>
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-filter mr-2"></i>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-toggle-on mr-2"></i>
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-gray-600">
            Showing <span className="font-bold text-primary">{filteredOrdinances.length}</span>{" "}
            ordinance(s)
          </div>

          {/* Ordinances List */}
          {filteredOrdinances.length > 0 ? (
            <div className="space-y-6">
              {filteredOrdinances.map((ordinance, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <i className={`fas ${ordinance.icon} text-primary text-2xl`}></i>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-sm font-bold text-primary">
                            {ordinance.number}
                          </span>
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(
                              ordinance.status
                            )}`}
                          >
                            {ordinance.status}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                            {ordinance.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {ordinance.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {ordinance.description}
                        </p>

                        {/* Meta Information */}
                        <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                          <div>
                            <i className="fas fa-calendar mr-2 text-primary"></i>
                            <span className="font-semibold">Date Enacted:</span>{" "}
                            {ordinance.dateEnacted}
                          </div>
                          <div>
                            <i className="fas fa-calendar-check mr-2 text-primary"></i>
                            <span className="font-semibold">Effectivity:</span>{" "}
                            {ordinance.effectivityDate}
                          </div>
                          <div className="md:col-span-2">
                            <i className="fas fa-user mr-2 text-primary"></i>
                            <span className="font-semibold">Author:</span> {ordinance.author}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 lg:min-w-[140px]">
                        <a
                          href={ordinance.filePath}
                          download
                          className="bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-center"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Download
                        </a>
                        <a
                          href={ordinance.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
                        >
                          <i className="fas fa-eye mr-2"></i>
                          Preview
                        </a>
                        <div className="text-xs text-gray-500 text-center mt-1">
                          {ordinance.fileSize}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Ordinances Found
              </h3>
              <p className="text-gray-600 mb-6">
                No ordinances match your current search criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedYear("All");
                  setSelectedCategory("All");
                  setSelectedStatus("All");
                }}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors"
              >
                <i className="fas fa-redo mr-2"></i>
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* Information Section */}
        <section
          ref={infoRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            infoRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">How to Use These Documents</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-download text-primary mr-3"></i>
                Accessing Ordinances
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Click "Download" to save a copy to your device</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Click "Preview" to view the document in your browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Use search and filters to find specific ordinances</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>All documents are in PDF format</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-info-circle text-primary mr-3"></i>
                Need Assistance?
              </h3>
              <p className="text-gray-700 mb-4">
                For questions about specific ordinances or to request certified copies, please
                contact:
              </p>
              <div className="space-y-2 text-gray-700">
                <p className="font-bold">Office of the Sangguniang Bayan</p>
                <p>
                  <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                  Municipal Hall, Tuy, Batangas
                </p>
                <p>
                  <i className="fas fa-phone mr-2 text-primary"></i>
                  REPLACE: (043) XXX-XXXX
                </p>
                <p>
                  <i className="fas fa-envelope mr-2 text-primary"></i>
                  REPLACE: sb@tuy.gov.ph
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              Important Notes
            </h4>
            <ul className="space-y-1 text-yellow-700 text-sm">
              <li>
                • All ordinances are official legislative acts of the Sangguniang Bayan
              </li>
              <li>
                • Documents marked as "Amended" have been modified by subsequent ordinances
              </li>
              <li>• Documents marked as "Repealed" are no longer in effect</li>
              <li>
                • For legal purposes, please verify ordinance status with the Sangguniang
                Bayan office
              </li>
              <li>• Office hours: Monday to Friday, 8:00 AM - 5:00 PM</li>
            </ul>
          </div>
        </section>

        {/* Note for Administrators */}
        <section className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
          <h3 className="text-lg font-bold text-blue-800 mb-2 flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            For Website Administrators
          </h3>
          <p className="text-blue-700 text-sm">
            To add ordinances to this page: Place PDF files in{" "}
            <code className="bg-blue-200 px-2 py-1 rounded">
              public/documents/ordinances/[year]/
            </code>{" "}
            organized by year, and update the ordinancesData array in this component with the
            ordinance details. Include ordinance number, title, description, category, dates,
            author, status, and file information.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Ordinances;

import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Resolutions = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const resolutionsRef = useScrollAnimation();
  const infoRef = useScrollAnimation();

  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // ============================================
  // CONTENT NEEDED: Municipal Resolutions
  // ============================================
  // Add actual resolutions here. For each resolution provide:
  // - number: Resolution number (e.g., "Resolution No. 2024-001")
  // - title: Title/description of the resolution
  // - description: Full description
  // - category: Category it belongs to
  // - year: Year enacted
  // - dateApproved: Date approved
  // - author: Author/committee
  // - fileSize: File size
  // - filePath: Path to PDF in /public/documents/resolutions/[year]/

  const resolutionsData = [
    {
      number: "Resolution No. 2024-001",
      title: "Resolution Expressing Support for National Environmental Programs",
      description:
        "REPLACE: A resolution expressing the unwavering support of the Sangguniang Bayan of Tuy to national environmental protection programs and initiatives, and committing local resources for their implementation.",
      category: "Environment & Natural Resources",
      year: "2024",
      dateApproved: "January 18, 2024",
      author: "REPLACE: Hon. [Name], Committee on Environment",
      fileSize: "850 KB",
      filePath: "/documents/resolutions/2024/resolution-2024-001.pdf",
      icon: "fa-leaf",
    },
    {
      number: "Resolution No. 2024-002",
      title: "Resolution Honoring Outstanding Municipal Employees",
      description:
        "REPLACE: A resolution commending and recognizing outstanding municipal employees for their exemplary service and dedication to public service during the year 2023.",
      category: "Recognition & Awards",
      year: "2024",
      dateApproved: "January 22, 2024",
      author: "REPLACE: Hon. [Name], Committee on Personnel",
      fileSize: "720 KB",
      filePath: "/documents/resolutions/2024/resolution-2024-002.pdf",
      icon: "fa-award",
    },
    {
      number: "Resolution No. 2024-003",
      title: "Resolution Approving Municipal Scholarship Program",
      description:
        "REPLACE: A resolution approving the Municipal Scholarship Program for deserving students from low-income families, allocating funds, and establishing selection criteria and guidelines.",
      category: "Education & Youth",
      year: "2024",
      dateApproved: "February 5, 2024",
      author: "REPLACE: Hon. [Name], Committee on Education",
      fileSize: "1.2 MB",
      filePath: "/documents/resolutions/2024/resolution-2024-003.pdf",
      icon: "fa-graduation-cap",
    },
    {
      number: "Resolution No. 2024-004",
      title: "Resolution Authorizing Mayor to Enter into MOA with Provincial Government",
      description:
        "REPLACE: A resolution authorizing the Municipal Mayor to enter into a Memorandum of Agreement with the Provincial Government of Batangas for the implementation of joint infrastructure projects.",
      category: "Inter-Government Relations",
      year: "2024",
      dateApproved: "February 15, 2024",
      author: "REPLACE: Hon. [Name], Committee on Infrastructure",
      fileSize: "980 KB",
      filePath: "/documents/resolutions/2024/resolution-2024-004.pdf",
      icon: "fa-handshake",
    },
    {
      number: "Resolution No. 2024-005",
      title: "Resolution Declaring a Local State of Calamity",
      description:
        "REPLACE: A resolution declaring a local state of calamity in the Municipality of Tuy due to severe flooding and typhoon damage, enabling the release of calamity funds and price control measures.",
      category: "Disaster Management",
      year: "2024",
      dateApproved: "March 2, 2024",
      author: "REPLACE: Hon. [Name], Committee on DRRM",
      fileSize: "1.5 MB",
      filePath: "/documents/resolutions/2024/resolution-2024-005.pdf",
      icon: "fa-exclamation-triangle",
    },
    {
      number: "Resolution No. 2024-006",
      title: "Resolution Expressing Sympathy and Condolences",
      description:
        "REPLACE: A resolution expressing profound sympathy and condolences to the bereaved family of [Name], a respected community leader and former municipal official who passed away.",
      category: "Recognition & Awards",
      year: "2024",
      dateApproved: "March 10, 2024",
      author: "REPLACE: Sangguniang Bayan en banc",
      fileSize: "650 KB",
      filePath: "/documents/resolutions/2024/resolution-2024-006.pdf",
      icon: "fa-heart",
    },
    {
      number: "Resolution No. 2024-007",
      title: "Resolution Approving Tourism Development Plan",
      description:
        "REPLACE: A resolution approving the Municipal Tourism Development Plan 2024-2028, allocating budget for tourism promotion activities, and establishing the Municipal Tourism Office.",
      category: "Tourism & Culture",
      year: "2024",
      dateApproved: "March 25, 2024",
      author: "REPLACE: Hon. [Name], Committee on Tourism",
      fileSize: "2.1 MB",
      filePath: "/documents/resolutions/2024/resolution-2024-007.pdf",
      icon: "fa-map-marked-alt",
    },
    {
      number: "Resolution No. 2023-120",
      title: "Resolution Supporting Anti-Drug Campaign",
      description:
        "REPLACE: A resolution expressing strong support for the government's anti-illegal drug campaign and committing municipal resources for rehabilitation and prevention programs.",
      category: "Public Safety",
      year: "2023",
      dateApproved: "December 18, 2023",
      author: "REPLACE: Hon. [Name], Committee on Public Safety",
      fileSize: "890 KB",
      filePath: "/documents/resolutions/2023/resolution-2023-120.pdf",
      icon: "fa-shield-alt",
    },
    {
      number: "Resolution No. 2023-119",
      title: "Resolution Declaring Local Economic Emergency",
      description:
        "REPLACE: A resolution declaring a local economic emergency to address the impact of rising commodity prices on the local economy and implementing relief measures for affected residents.",
      category: "Economic Development",
      year: "2023",
      dateApproved: "December 5, 2023",
      author: "REPLACE: Hon. [Name], Committee on Trade and Commerce",
      fileSize: "1.1 MB",
      filePath: "/documents/resolutions/2023/resolution-2023-119.pdf",
      icon: "fa-chart-line",
    },
    {
      number: "Resolution No. 2023-118",
      title: "Resolution Creating Task Force on Solid Waste Management",
      description:
        "REPLACE: A resolution creating a special task force to oversee and enforce solid waste management regulations, designating members, and allocating operational funds.",
      category: "Environment & Natural Resources",
      year: "2023",
      dateApproved: "November 22, 2023",
      author: "REPLACE: Hon. [Name], Committee on Environment",
      fileSize: "1.0 MB",
      filePath: "/documents/resolutions/2023/resolution-2023-118.pdf",
      icon: "fa-recycle",
    },
    {
      number: "Resolution No. 2023-117",
      title: "Resolution Authorizing Acceptance of Donation",
      description:
        "REPLACE: A resolution authorizing the Municipal Mayor to accept a donation of medical equipment and supplies from [Donor Name] for the benefit of the Municipal Health Office.",
      category: "Health & Social Services",
      year: "2023",
      dateApproved: "November 10, 2023",
      author: "REPLACE: Hon. [Name], Committee on Health",
      fileSize: "780 KB",
      filePath: "/documents/resolutions/2023/resolution-2023-117.pdf",
      icon: "fa-clinic-medical",
    },
    {
      number: "Resolution No. 2023-116",
      title: "Resolution Commending Barangay Officials",
      description:
        "REPLACE: A resolution commending all Barangay Officials of Tuy for their exemplary performance in disaster preparedness and response during recent calamities.",
      category: "Recognition & Awards",
      year: "2023",
      dateApproved: "October 28, 2023",
      author: "REPLACE: Sangguniang Bayan en banc",
      fileSize: "820 KB",
      filePath: "/documents/resolutions/2023/resolution-2023-116.pdf",
      icon: "fa-trophy",
    },
    {
      number: "Resolution No. 2023-115",
      title: "Resolution Approving Participation in Regional Sports Festival",
      description:
        "REPLACE: A resolution approving the participation of the Municipality of Tuy in the Regional Sports Festival, allocating budget for team preparation, and designating team officials.",
      category: "Sports & Recreation",
      year: "2023",
      dateApproved: "October 15, 2023",
      author: "REPLACE: Hon. [Name], Committee on Youth and Sports",
      fileSize: "950 KB",
      filePath: "/documents/resolutions/2023/resolution-2023-115.pdf",
      icon: "fa-running",
    },
    {
      number: "Resolution No. 2023-114",
      title: "Resolution Supporting Local Farmers and Fisherfolk",
      description:
        "REPLACE: A resolution expressing support for local farmers and fisherfolk, creating livelihood assistance programs, and allocating funds for agricultural and fishery development.",
      category: "Agriculture & Fisheries",
      year: "2023",
      dateApproved: "September 30, 2023",
      author: "REPLACE: Hon. [Name], Committee on Agriculture",
      fileSize: "1.3 MB",
      filePath: "/documents/resolutions/2023/resolution-2023-114.pdf",
      icon: "fa-tractor",
    },
    {
      number: "Resolution No. 2023-113",
      title: "Resolution Endorsing Infrastructure Project to National Government",
      description:
        "REPLACE: A resolution endorsing the proposed construction of a new public market to the Department of Public Works and Highways for possible funding under national infrastructure programs.",
      category: "Infrastructure",
      year: "2023",
      dateApproved: "September 12, 2023",
      author: "REPLACE: Hon. [Name], Committee on Infrastructure",
      fileSize: "1.1 MB",
      filePath: "/documents/resolutions/2023/resolution-2023-113.pdf",
      icon: "fa-building",
    },
  ];

  const years = ["All", ...Array.from(new Set(resolutionsData.map((r) => r.year))).sort().reverse()];
  const categories = [
    "All",
    ...Array.from(new Set(resolutionsData.map((r) => r.category))).sort(),
  ];

  const filteredResolutions = useMemo(() => {
    return resolutionsData.filter((resolution) => {
      const matchesYear = selectedYear === "All" || resolution.year === selectedYear;
      const matchesCategory =
        selectedCategory === "All" || resolution.category === selectedCategory;
      const matchesSearch =
        resolution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resolution.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resolution.number.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesYear && matchesCategory && matchesSearch;
    });
  }, [selectedYear, selectedCategory, searchTerm]);

  const stats = {
    total: resolutionsData.length,
    thisYear: resolutionsData.filter((r) => r.year === "2024").length,
    lastYear: resolutionsData.filter((r) => r.year === "2023").length,
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
            <span className="text-white/90">Municipal Resolutions</span>
          </nav>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Municipal Resolutions
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Official Resolutions of the Sangguniang Bayan
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
            <h2 className="text-4xl font-bold text-primary">About Municipal Resolutions</h2>
          </div>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Municipal resolutions are formal expressions of opinion, will, or intent of the
              Sangguniang Bayan (Municipal Council). Unlike ordinances which have the force of
              law, resolutions typically address specific matters such as appointments,
              authorizations, commendations, or expressions of support.
            </p>
            <p>
              Resolutions are used to approve contracts, accept donations, authorize
              expenditures, create committees, express condolences or congratulations, and take
              positions on various issues affecting the municipality. They are an important part
              of municipal governance and decision-making.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stats.total}</div>
              <div className="text-gray-700 font-semibold">Total Resolutions</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">{stats.thisYear}</div>
              <div className="text-gray-700 font-semibold">2024</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-700 mb-2">{stats.lastYear}</div>
              <div className="text-gray-700 font-semibold">2023</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-700 mb-2">{stats.categories}</div>
              <div className="text-gray-700 font-semibold">Categories</div>
            </div>
          </div>
        </section>

        {/* Browse Resolutions */}
        <section
          ref={resolutionsRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            resolutionsRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Browse Resolutions</h2>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resolutions by title, number, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
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
          </div>

          {/* Results Count */}
          <div className="mb-4 text-gray-600">
            Showing <span className="font-bold text-primary">{filteredResolutions.length}</span>{" "}
            resolution(s)
          </div>

          {/* Resolutions List */}
          {filteredResolutions.length > 0 ? (
            <div className="space-y-6">
              {filteredResolutions.map((resolution, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <i className={`fas ${resolution.icon} text-primary text-2xl`}></i>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-sm font-bold text-primary">
                            {resolution.number}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                            {resolution.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {resolution.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {resolution.description}
                        </p>

                        {/* Meta Information */}
                        <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                          <div>
                            <i className="fas fa-calendar-check mr-2 text-primary"></i>
                            <span className="font-semibold">Date Approved:</span>{" "}
                            {resolution.dateApproved}
                          </div>
                          <div>
                            <i className="fas fa-user mr-2 text-primary"></i>
                            <span className="font-semibold">Author:</span> {resolution.author}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 lg:min-w-[140px]">
                        <a
                          href={resolution.filePath}
                          download
                          className="bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-center"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Download
                        </a>
                        <a
                          href={resolution.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
                        >
                          <i className="fas fa-eye mr-2"></i>
                          Preview
                        </a>
                        <div className="text-xs text-gray-500 text-center mt-1">
                          {resolution.fileSize}
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Resolutions Found</h3>
              <p className="text-gray-600 mb-6">
                No resolutions match your current search criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedYear("All");
                  setSelectedCategory("All");
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
            <h2 className="text-4xl font-bold text-primary">Difference: Resolutions vs Ordinances</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-file-alt text-primary mr-3"></i>
                Resolutions
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Express opinion, will, or intent of the Council</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Address specific matters or occasions</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Approve contracts, donations, expenditures</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Generally do not have penalties</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Commendations, condolences, recognitions</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-gavel text-primary mr-3"></i>
                Ordinances
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Have the force of law within the municipality</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Establish rules and regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Create policies and procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Include penalties for violations</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Continue in effect until amended or repealed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded mb-6">
            <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              How to Use These Documents
            </h4>
            <ul className="space-y-1 text-yellow-700 text-sm">
              <li>• Click "Download" to save a copy of the resolution to your device</li>
              <li>• Click "Preview" to view the document in your browser</li>
              <li>• Use the search and filter options to find specific resolutions</li>
              <li>• All documents are in PDF format and require a PDF reader</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-bold text-blue-800 mb-4 flex items-center">
              <i className="fas fa-question-circle mr-2"></i>
              Need Assistance?
            </h4>
            <p className="text-blue-700 mb-4">
              For questions about specific resolutions or to request certified copies, please
              contact:
            </p>
            <div className="space-y-2 text-blue-700">
              <p className="font-bold">Office of the Sangguniang Bayan</p>
              <p>
                <i className="fas fa-map-marker-alt mr-2"></i>
                Municipal Hall, Tuy, Batangas
              </p>
              <p>
                <i className="fas fa-phone mr-2"></i>
                REPLACE: (043) XXX-XXXX
              </p>
              <p>
                <i className="fas fa-envelope mr-2"></i>
                REPLACE: sb@tuy.gov.ph
              </p>
              <p className="mt-4 text-sm">
                <i className="fas fa-clock mr-2"></i>
                Office Hours: Monday to Friday, 8:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </section>

        {/* Note for Administrators */}
        <section className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
          <h3 className="text-lg font-bold text-blue-800 mb-2 flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            For Website Administrators
          </h3>
          <p className="text-blue-700 text-sm">
            To add resolutions to this page: Place PDF files in{" "}
            <code className="bg-blue-200 px-2 py-1 rounded">
              public/documents/resolutions/[year]/
            </code>{" "}
            organized by year, and update the resolutionsData array in this component with the
            resolution details. Include resolution number, title, description, category, date
            approved, author, and file information.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Resolutions;

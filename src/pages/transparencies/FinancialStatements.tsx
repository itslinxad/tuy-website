import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const FinancialStatements = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const whatToExpectRef = useScrollAnimation();
  const importanceRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const reportTypes = [
    {
      icon: "fa-chart-pie",
      title: "Annual Budget",
      color: "blue",
      description: "Detailed annual budget allocation and appropriations for all departments",
      items: [
        "Revenue Estimates",
        "Expenditure Allocations",
        "Development Fund",
        "Special Projects",
      ],
    },
    {
      icon: "fa-file-invoice-dollar",
      title: "Income Statements",
      color: "green",
      description: "Quarterly and annual income statements showing all revenue sources",
      items: [
        "Tax Collections",
        "Non-Tax Revenue",
        "IRA/NTA Allotments",
        "Other Income Sources",
      ],
    },
    {
      icon: "fa-wallet",
      title: "Statement of Assets",
      color: "purple",
      description: "Comprehensive listing of municipal properties, assets, and liabilities",
      items: [
        "Real Properties",
        "Equipment & Facilities",
        "Investments",
        "Outstanding Obligations",
      ],
    },
    {
      icon: "fa-receipt",
      title: "Cash Flow Statements",
      color: "yellow",
      description: "Monthly cash flow reports showing collections and disbursements",
      items: [
        "Cash Receipts",
        "Cash Disbursements",
        "Bank Balances",
        "Fund Transfers",
      ],
    },
    {
      icon: "fa-tasks",
      title: "Project Costs",
      color: "red",
      description: "Detailed financial reports for infrastructure and development projects",
      items: [
        "Project Budgets",
        "Actual Expenditures",
        "Variance Analysis",
        "Completion Reports",
      ],
    },
    {
      icon: "fa-search-dollar",
      title: "Audit Reports",
      color: "indigo",
      description: "Annual audit reports from the Commission on Audit (COA)",
      items: [
        "Financial Audit",
        "Compliance Audit",
        "Audit Observations",
        "Management Responses",
      ],
    },
  ];

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
            <span className="text-white/90">Financial Statements</span>
          </nav>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Financial Statements
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Fiscal Transparency and Accountability
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">
        {/* Coming Soon Banner */}
        <section
          ref={introRef.elementRef}
          className={`bg-gradient-to-r from-primary to-primary-hover text-white shadow-2xl rounded-lg p-12 text-center scroll-animate ${
            introRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="mb-6">
            <i className="fas fa-clock text-6xl text-white/80"></i>
          </div>
          <h2 className="text-5xl font-bold mb-4">Coming Soon</h2>
          <p className="text-2xl text-white/90 mb-6">
            We're preparing comprehensive financial reports for full transparency
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-lg">
              <i className="fas fa-calendar-alt mr-2"></i>
              Financial statements will be available starting Q3 2024
            </p>
          </div>
        </section>

        {/* What to Expect */}
        <section
          ref={whatToExpectRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            whatToExpectRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">What to Expect</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            This section will provide complete and transparent financial information about the
            Municipality of Tuy's fiscal operations, including budgets, revenues, expenditures,
            assets, liabilities, and audit reports.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTypes.map((report, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-${report.color}-50 to-${report.color}-100 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300`}
              >
                <div
                  className={`w-14 h-14 bg-${report.color}-600/20 rounded-full flex items-center justify-center mb-4`}
                >
                  <i className={`fas ${report.icon} text-${report.color}-600 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{report.description}</p>
                <ul className="space-y-1">
                  {report.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <i className="fas fa-check text-primary mt-1 text-xs"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <i className="fas fa-star text-primary mr-3"></i>
              Key Features
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-download text-white text-2xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Downloadable</h4>
                <p className="text-gray-700 text-sm">
                  All reports in PDF format for easy download
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-calendar-alt text-white text-2xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Regular Updates</h4>
                <p className="text-gray-700 text-sm">Quarterly and annual updates</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-chart-line text-white text-2xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Visual Data</h4>
                <p className="text-gray-700 text-sm">Charts and graphs for clarity</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-search text-white text-2xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Searchable</h4>
                <p className="text-gray-700 text-sm">Easy search and filter options</p>
              </div>
            </div>
          </div>
        </section>

        {/* Importance Section */}
        <section
          ref={importanceRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            importanceRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Why Financial Transparency Matters
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6 leading-relaxed">
              Financial transparency is a cornerstone of good governance. By publishing detailed
              financial statements, the Municipality of Tuy demonstrates its commitment to
              accountability and responsible stewardship of public funds.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-eye text-blue-600 mr-3"></i>
                  For Citizens
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                    <span>
                      <strong>Know How Your Taxes Are Used:</strong> See exactly where your tax
                      money goes
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                    <span>
                      <strong>Monitor Government Spending:</strong> Track municipal expenditures
                      and projects
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                    <span>
                      <strong>Hold Officials Accountable:</strong> Use financial data to assess
                      government performance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                    <span>
                      <strong>Make Informed Decisions:</strong> Better understand local fiscal
                      health
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-landmark text-green-600 mr-3"></i>
                  For Government
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-green-600 mt-1"></i>
                    <span>
                      <strong>Build Public Trust:</strong> Transparency increases citizen
                      confidence
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-green-600 mt-1"></i>
                    <span>
                      <strong>Improve Fiscal Management:</strong> Public scrutiny encourages
                      better spending
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-green-600 mt-1"></i>
                    <span>
                      <strong>Attract Investment:</strong> Transparency appeals to investors and
                      donors
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-green-600 mt-1"></i>
                    <span>
                      <strong>Prevent Corruption:</strong> Open books reduce opportunities for
                      misuse
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded mb-6">
              <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
                <i className="fas fa-gavel mr-2"></i>
                Legal Mandates for Financial Transparency
              </h4>
              <ul className="space-y-2 text-yellow-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-balance-scale mt-1"></i>
                  <span>
                    <strong>Local Government Code (RA 7160)</strong> - Requires publication of
                    annual budgets and financial statements
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-balance-scale mt-1"></i>
                  <span>
                    <strong>General Appropriations Act</strong> - Mandates posting of budget
                    execution documents
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-balance-scale mt-1"></i>
                  <span>
                    <strong>Full Disclosure Policy</strong> - Requires online posting of
                    financial documents
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-balance-scale mt-1"></i>
                  <span>
                    <strong>COA Circular</strong> - Requires posting of Annual Audit Reports
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-award text-primary mr-3"></i>
                Seal of Good Local Governance
              </h3>
              <p className="text-gray-700 mb-3">
                Financial transparency is one of the key indicators for the{" "}
                <strong>Seal of Good Local Governance (SGLG)</strong>, an award given by the
                Department of the Interior and Local Government (DILG) to local government units
                that demonstrate excellence in governance.
              </p>
              <p className="text-gray-700">
                By publishing comprehensive financial statements, Tuy demonstrates its commitment
                to meeting the highest standards of local governance.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            contactRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Request Financial Information</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            While we prepare our online financial transparency portal, you can request copies of
            financial reports through the following offices:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                  <i className="fas fa-calculator text-primary mr-2 text-xl"></i>
                  Municipal Budget Office (MBO)
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  For budget documents, appropriations, and expenditure reports
                </p>
                <div className="space-y-2 text-gray-600 text-sm">
                  <p>
                    <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                    Municipal Hall, 2nd Floor
                  </p>
                  <p>
                    <i className="fas fa-phone mr-2 text-primary"></i>
                    Trunkline: (043) 276-0047 local 203
                  </p>
                  <p>
                    <i className="fas fa-clock mr-2 text-primary"></i>
                    Mon-Fri, 8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                  <i className="fas fa-wallet text-green-600 mr-2 text-xl"></i>
                  Municipal Treasurer's Office (MTO)
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  For revenue collection reports, cash flow statements, and financial transactions
                </p>
                <div className="space-y-2 text-gray-600 text-sm">
                  <p>
                    <i className="fas fa-map-marker-alt mr-2 text-green-600"></i>
                    Municipal Hall, 1st Floor
                  </p>
                  <p>
                    <i className="fas fa-phone mr-2 text-green-600"></i>
                    Trunkline: (043) 276-0047 local 223-224
                  </p>
                  <p>
                    <i className="fas fa-clock mr-2 text-green-600"></i>
                    Mon-Fri, 8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-file-download text-primary mr-2"></i>
                How to Request Financial Reports
              </h3>
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold mb-1">Submit Request</h4>
                    <p className="text-sm">
                      Visit the office or send an email specifying which financial reports you
                      need
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold mb-1">Provide Details</h4>
                    <p className="text-sm">
                      Include the period covered (quarter/year) and specific documents needed
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold mb-1">State Purpose</h4>
                    <p className="text-sm">
                      Briefly explain why you need the information (optional but helpful)
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold mb-1">Receive Documents</h4>
                    <p className="text-sm">
                      Reports will be provided within 3-5 working days, free of charge
                    </p>
                  </div>
                </li>
              </ol>

              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <i className="fas fa-info-circle text-primary mr-2"></i>
                  <strong>Note:</strong> Some recent reports may not yet be available pending
                  audit approval
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-4">
            <i className="fas fa-bell text-5xl text-white/80"></i>
          </div>
          <h3 className="text-3xl font-bold mb-4">Stay Informed</h3>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            We'll announce when financial statements become available online. Follow our official
            channels for updates.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/MunicipalityOfTuy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FinancialStatements;

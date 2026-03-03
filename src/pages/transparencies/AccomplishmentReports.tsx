import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const AccomplishmentReports = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const whatToExpectRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

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
            <span className="text-white/90">Accomplishment Reports</span>
          </nav>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Accomplishment Reports
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Transparency in Public Service
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
            We're preparing comprehensive accomplishment reports for your review
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-lg">
              <i className="fas fa-calendar-alt mr-2"></i>
              Reports will be available starting Q2 2024
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
            Once available, this section will provide detailed accomplishment reports from various
            municipal departments and offices, showcasing the programs, projects, and activities
            implemented by the Municipal Government of Tuy.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Quarterly Reports */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-chart-bar text-primary text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Quarterly Reports</h3>
              <p className="text-gray-700 leading-relaxed">
                Comprehensive quarterly accomplishment reports detailing projects implemented,
                budget utilization, and performance indicators for each department and office.
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>First Quarter (Jan-Mar)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Second Quarter (Apr-Jun)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Third Quarter (Jul-Sep)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Fourth Quarter (Oct-Dec)</span>
                </li>
              </ul>
            </div>

            {/* Annual Reports */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <div className="w-14 h-14 bg-green-600/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-file-alt text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Annual Reports</h3>
              <p className="text-gray-700 leading-relaxed">
                Year-end accomplishment reports providing a comprehensive overview of the
                municipal government's achievements, challenges, and future plans.
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-1"></i>
                  <span>Executive Summary</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-1"></i>
                  <span>Department Highlights</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-1"></i>
                  <span>Financial Performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-1"></i>
                  <span>Future Directions</span>
                </li>
              </ul>
            </div>

            {/* Project Reports */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
              <div className="w-14 h-14 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-tasks text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Project Reports</h3>
              <p className="text-gray-700 leading-relaxed">
                Detailed reports on major infrastructure projects, social programs, and special
                initiatives undertaken by the municipal government.
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-purple-600 mt-1"></i>
                  <span>Infrastructure Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-purple-600 mt-1"></i>
                  <span>Social Services Programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-purple-600 mt-1"></i>
                  <span>Economic Development Initiatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-purple-600 mt-1"></i>
                  <span>Environmental Programs</span>
                </li>
              </ul>
            </div>

            {/* Special Reports */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
              <div className="w-14 h-14 bg-yellow-600/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-star text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Special Reports</h3>
              <p className="text-gray-700 leading-relaxed">
                Special accomplishment reports for significant events, calamity responses, and
                other notable activities requiring separate documentation.
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-yellow-600 mt-1"></i>
                  <span>Disaster Response Activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-yellow-600 mt-1"></i>
                  <span>Special Events and Celebrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-yellow-600 mt-1"></i>
                  <span>COVID-19 Response Reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-yellow-600 mt-1"></i>
                  <span>Grant-Funded Projects</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <i className="fas fa-lightbulb text-primary mr-3"></i>
              Key Features of Our Reports
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Comprehensive Data</h4>
                  <p className="text-gray-700 text-sm">
                    Detailed statistics and metrics on all municipal activities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Visual Presentations</h4>
                  <p className="text-gray-700 text-sm">
                    Charts, graphs, and photos illustrating achievements
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Easy Access</h4>
                  <p className="text-gray-700 text-sm">
                    Downloadable PDF format for offline viewing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Why This Matters</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4 leading-relaxed">
              Accomplishment reports are essential tools for transparency and accountability in
              local governance. They provide citizens with clear information about how their
              government is performing and how public resources are being utilized.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Benefits to Citizens:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                <i className="fas fa-eye text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Transparency</h4>
                  <p className="text-gray-700 text-sm">
                    Clear visibility into government activities and spending
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                <i className="fas fa-balance-scale text-green-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Accountability</h4>
                  <p className="text-gray-700 text-sm">
                    Hold officials accountable for their performance
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg">
                <i className="fas fa-users text-purple-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Participation</h4>
                  <p className="text-gray-700 text-sm">
                    Informed citizens can participate more effectively in governance
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
                <i className="fas fa-chart-line text-yellow-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Progress Tracking</h4>
                  <p className="text-gray-700 text-sm">
                    Monitor the progress of projects and programs over time
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Legal Basis for Transparency
            </h3>
            <p className="mb-4 leading-relaxed">
              The publication of accomplishment reports is mandated by various laws and policies:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <i className="fas fa-gavel text-primary mt-1"></i>
                <span>
                  <strong>Local Government Code of 1991 (RA 7160)</strong> - Requires local
                  governments to promote transparency in local affairs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-gavel text-primary mt-1"></i>
                <span>
                  <strong>Freedom of Information Executive Order No. 2 (2016)</strong> - Affirms
                  the right of citizens to information
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-gavel text-primary mt-1"></i>
                <span>
                  <strong>Full Disclosure Policy (FDP)</strong> - Requires posting of municipal
                  reports and documents online
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact for Information */}
        <section
          ref={contactRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            contactRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Request Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                While we prepare our online accomplishment reports, you can request copies or
                information about specific projects and activities through the following offices:
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">
                    <i className="fas fa-building text-primary mr-2"></i>
                    Municipal Planning and Development Office (MPDO)
                  </h3>
                  <p className="text-gray-700 text-sm mb-2">
                    For overall municipal development reports and project updates
                  </p>
                  <p className="text-gray-600 text-sm">
                    <i className="fas fa-phone mr-2"></i>
                    Trunkline: (043) 276-0047 local 206
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">
                    <i className="fas fa-user-tie text-green-600 mr-2"></i>
                    Office of the Municipal Mayor
                  </h3>
                  <p className="text-gray-700 text-sm mb-2">
                    For executive reports and major project accomplishments
                  </p>
                  <p className="text-gray-600 text-sm">
                    <i className="fas fa-phone mr-2"></i>
                    Trunkline: (043) 276-0047 local 200-201
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <i className="fas fa-info-circle text-primary mr-2"></i>
                How to Request Reports
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>
                    Visit the Municipal Hall or send an email to the appropriate office
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>
                    Specify which reports you need (department, quarter/year, type of report)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Provide your contact information and reason for the request</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </span>
                  <span>Reports will be provided free of charge within 3-5 working days</span>
                </li>
              </ol>

              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">
                  <i className="fas fa-clock text-primary mr-2"></i>
                  <strong>Office Hours:</strong> Monday to Friday, 8:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-4">
            <i className="fas fa-bell text-5xl text-white/80"></i>
          </div>
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Follow our official social media accounts or visit our website regularly to be
            notified when accomplishment reports become available.
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

export default AccomplishmentReports;

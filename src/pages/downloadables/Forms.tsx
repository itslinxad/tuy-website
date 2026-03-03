import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Forms = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const whatToExpectRef = useScrollAnimation();
  const instructionsRef = useScrollAnimation();

  const formCategories = [
    {
      icon: "fa-store",
      title: "Business & Permits",
      color: "blue",
      description:
        "Business permit applications, renewals, Mayor's permit, and other business-related forms.",
    },
    {
      icon: "fa-file-contract",
      title: "Clearances & Certifications",
      color: "green",
      description:
        "Barangay clearance, municipal clearance, certificate of indigency, certificate of residency.",
    },
    {
      icon: "fa-building",
      title: "Building & Construction",
      color: "teal",
      description:
        "Building permits, electrical permits, plumbing permits, and fencing permits.",
    },
    {
      icon: "fa-file-invoice",
      title: "Tax & Financial",
      color: "purple",
      description:
        "Real property tax declaration, community tax certificate (cedula), and tax clearance forms.",
    },
    {
      icon: "fa-baby",
      title: "Civil Registry",
      color: "red",
      description:
        "Request forms for birth, marriage, and death certificates from the Municipal Civil Registrar.",
    },
    {
      icon: "fa-hands-helping",
      title: "Complaints & Requests",
      color: "yellow",
      description:
        "General complaint forms, public assistance requests, and Freedom of Information (FOI) request forms.",
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
    blue: { bg: "bg-blue-50", text: "text-blue-700", icon: "text-blue-600" },
    green: { bg: "bg-green-50", text: "text-green-700", icon: "text-green-600" },
    teal: { bg: "bg-teal-50", text: "text-teal-700", icon: "text-teal-600" },
    purple: { bg: "bg-purple-50", text: "text-purple-700", icon: "text-purple-600" },
    red: { bg: "bg-red-50", text: "text-red-700", icon: "text-red-600" },
    yellow: { bg: "bg-yellow-50", text: "text-yellow-700", icon: "text-yellow-600" },
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
              transactions and services. These forms are designed to help expedite
              your transactions at our municipal offices — from business permits
              and clearances to civil registry requests and public assistance.
            </p>
            <p>
              To process a transaction, visit the appropriate office at the
              Municipal Hall. Staff will provide the required forms and guide you
              through the requirements.
            </p>
          </div>

          {/* Coming Soon Banner */}
          <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-hard-hat text-amber-600 text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-amber-800 mb-2">
              Online Downloads Coming Soon
            </h3>
            <p className="text-amber-700 max-w-2xl mx-auto">
              We are working on making downloadable PDF forms available on this page.
              In the meantime, please visit the relevant municipal office to obtain
              the forms you need.
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
            <h2 className="text-4xl font-bold text-primary">
              What to Expect
            </h2>
          </div>
          <p className="text-gray-700 text-lg mb-8">
            Once available, you will be able to download forms from the following
            categories:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formCategories.map((category, index) => {
              const colors = colorMap[category.color];
              return (
                <div
                  key={index}
                  className={`${colors.bg} rounded-lg p-6 scroll-animate stagger-${
                    (index % 3) + 1
                  } ${whatToExpectRef.isVisible ? "visible" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <i
                      className={`fas ${category.icon} text-2xl ${colors.icon}`}
                    ></i>
                    <h3 className={`text-lg font-bold ${colors.text}`}>
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How to Get Forms (in the meantime) */}
        <section
          ref={instructionsRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            instructionsRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              How to Obtain Forms
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-building text-primary mr-3"></i>
                Visit the Municipal Hall
              </h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Go to the appropriate office at the Municipal Hall</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Request the form you need from the staff</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Complete all required fields accurately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>Submit with the required supporting documents</span>
                </li>
              </ol>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-info-circle text-primary mr-3"></i>
                General Requirements
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-1"></i>
                  <span>Valid government-issued ID</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-1"></i>
                  <span>Completed application form</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-1"></i>
                  <span>Supporting documents as required per transaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-green-600 mt-1"></i>
                  <span>Applicable fees (varies by transaction)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
              <i className="fas fa-clock mr-2"></i>
              Office Hours
            </h4>
            <p className="text-yellow-700 text-sm">
              Monday to Friday, 8:00 AM - 5:00 PM (excluding holidays).
              Processing times vary depending on the type of transaction.
            </p>
          </div>
        </section>

        {/* Need Assistance */}
        <section className="bg-primary rounded-lg p-8 text-white text-center">
          <div className="mb-4">
            <i className="fas fa-phone-alt text-5xl text-white/80"></i>
          </div>
          <h3 className="text-3xl font-bold mb-4">Need Assistance?</h3>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            For questions about specific forms or requirements, contact the
            relevant office or call our trunkline.
          </p>
          <div className="flex flex-col items-center gap-2 mb-6">
            <p className="text-white/90">
              <i className="fas fa-phone mr-2"></i>
              Trunkline: (043) 276-0047
            </p>
            <p className="text-white/90">
              <i className="fas fa-map-marker-alt mr-2"></i>
              Municipal Hall, Poblacion, Tuy, Batangas 4214
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <i className="fas fa-envelope mr-2"></i>
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Forms;

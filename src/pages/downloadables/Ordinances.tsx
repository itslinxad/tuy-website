import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Ordinances = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const whatToExpectRef = useScrollAnimation();
  const infoRef = useScrollAnimation();

  const ordinanceCategories = [
    {
      icon: "fa-balance-scale",
      title: "Budget & Finance",
      color: "blue",
      description:
        "Annual investment plans, local revenue codes, tax rates, and budget appropriations.",
    },
    {
      icon: "fa-building",
      title: "Land Use & Zoning",
      color: "green",
      description:
        "Comprehensive Land Use Plan, zoning regulations, and area reclassifications.",
    },
    {
      icon: "fa-leaf",
      title: "Environment",
      color: "teal",
      description:
        "Solid waste management, coastal resource management, anti-littering, and environmental protection.",
    },
    {
      icon: "fa-store",
      title: "Business & Commerce",
      color: "purple",
      description:
        "Business permit requirements, licensing fees, and commercial regulations.",
    },
    {
      icon: "fa-shield-alt",
      title: "Public Safety",
      color: "red",
      description:
        "Traffic regulations, curfew for minors, animal welfare, and public order.",
    },
    {
      icon: "fa-clinic-medical",
      title: "Health & Sanitation",
      color: "orange",
      description:
        "Public health standards, sanitation requirements for food establishments and markets.",
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
        {/* Coming Soon Banner */}
        <section
          ref={introRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            introRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-gavel text-primary text-5xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-primary mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              We are currently digitizing and organizing municipal ordinances for public access.
              Once available, you will be able to search, browse, and download official
              ordinances enacted by the Sangguniang Bayan of Tuy, Batangas.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-6 py-3 rounded-lg">
              <i className="fas fa-clock"></i>
              <span className="font-semibold">Document digitization in progress</span>
            </div>
          </div>

          {/* About Ordinances */}
          <div className="mt-8 border-t pt-8">
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
            Once available, this page will feature ordinances organized by category, with search
            and filter capabilities. Typical categories include:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ordinanceCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all scroll-animate stagger-${
                  (index % 6) + 1
                } ${whatToExpectRef.isVisible ? "visible" : ""}`}
              >
                <div
                  className={`w-14 h-14 rounded-full bg-${category.color}-100 text-${category.color}-600 flex items-center justify-center mb-4`}
                >
                  <i className={`fas ${category.icon} text-2xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
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
            <h2 className="text-4xl font-bold text-primary">Need Assistance?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-question-circle text-primary mr-3"></i>
                Request Copies
              </h3>
              <p className="text-gray-700 mb-4">
                For questions about specific ordinances or to request certified copies, please
                visit or contact the Office of the Sangguniang Bayan:
              </p>
              <div className="space-y-2 text-gray-700">
                <p className="font-bold">Office of the Sangguniang Bayan</p>
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
                  <span>All ordinances are official legislative acts of the Sangguniang Bayan</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>For legal purposes, verify ordinance status with the SB office</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Ordinances have the force of law within Tuy's jurisdiction</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Certified copies can be obtained at the SB office</span>
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

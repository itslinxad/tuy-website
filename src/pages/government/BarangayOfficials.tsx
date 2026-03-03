import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const BarangayOfficials = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const officialsRef = useScrollAnimation();

  const basePath = import.meta.env.VITE_BASE_PATH || "";

  // Barangay Captains — Source: TUY_WEBSITE_DETAILS.xlsx ("Brgy Officials" sheet)
  const barangayCaptains = [
    { barangay: "Acle", captain: "Ariel R. Macalindong" },
    { barangay: "Bayudbud", captain: "Roberto P. Carandang" },
    { barangay: "Bolbok", captain: "Juanito U. Del Mundo" },
    { barangay: "Burgos", captain: "Caltos Medina" },
    { barangay: "Dalima", captain: "Virgilio Delos Reyes" },
    { barangay: "Dao", captain: "Melvin M. Manalo" },
    { barangay: "Guinhawa", captain: "Salvador F. De Guzman" },
    { barangay: "Lumbangan", captain: "Edralin Magno E. Camilon" },
    { barangay: "Luna", captain: "Arnel S. Hernandez" },
    { barangay: "Luntal", captain: "Jerome Basit" },
    { barangay: "Magahis", captain: "Narciso Villanueva" },
    { barangay: "Malibu", captain: "Nepomoceno A. Comia" },
    { barangay: "Mataywanac", captain: "Nelson Abiad" },
    { barangay: "Palincaro", captain: "Moises Ramirez" },
    { barangay: "Putol", captain: "Silvano C. Alajar" },
    { barangay: "Rillo", captain: "Vicente B. Bagui" },
    { barangay: "Rizal", captain: "Elmer C. Ikan" },
    { barangay: "Sabang", captain: "Alex Desacola" },
    { barangay: "San Jose", captain: "Roberto A. Mendoza" },
    { barangay: "Talon", captain: "Neil B. Bayaborda" },
    { barangay: "Toong", captain: "Adel S. Rodriguez" },
    { barangay: "Tuyon-Tuyon", captain: "Gerardo Bendicio" },
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
            backgroundImage: `url('${basePath}/hero-image.jpg')`,
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
            <span className="text-white/90">Barangay Officials</span>
          </nav>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Barangay Officials
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Leaders of Our 22 Barangays
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
            <h2 className="text-4xl font-bold text-primary">
              About Barangay Government
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              The barangay is the smallest administrative division in the
              Philippines and is the native Filipino term for a village, district,
              or ward. Each of Tuy's 22 barangays is governed by elected officials
              who serve the needs of their respective communities.
            </p>
            <p>
              Barangay officials work at the grassroots level to deliver basic
              services, maintain peace and order, and implement programs that
              directly benefit residents. They serve as the primary link between
              the municipal government and the people.
            </p>
          </div>
        </section>

        {/* Barangay Captains Grid */}
        <section
          ref={officialsRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            officialsRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Punong Barangay (Barangay Captains)
            </h2>
          </div>
          <p className="text-gray-700 text-lg mb-8">
            The elected barangay captains leading each of Tuy's 22 barangays.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {barangayCaptains.map((entry, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden scroll-animate stagger-${
                  (index % 4) + 1
                } ${officialsRef.isVisible ? "visible" : ""}`}
              >
                <div className="bg-gradient-to-r from-primary to-primary-hover p-3 text-white">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <i className="fas fa-map-marker-alt"></i>
                    Barangay {entry.barangay}
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user-tie text-primary text-lg"></i>
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm">
                        Hon. {entry.captain}
                      </p>
                      <p className="text-xs text-gray-500">Punong Barangay</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Information */}
        <section className="bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <i className="fas fa-info-circle text-primary mr-3"></i>
            Barangay Services & Functions
          </h3>
          <div className="space-y-3 text-gray-700">
            <p className="font-semibold">
              Barangay officials are responsible for:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <i className="fas fa-chevron-right text-primary mt-1"></i>
                <span>
                  Issuance of Barangay Clearances and Certifications
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-chevron-right text-primary mt-1"></i>
                <span>
                  Settlement of disputes through Lupong Tagapamayapa
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-chevron-right text-primary mt-1"></i>
                <span>
                  Implementation of barangay ordinances and resolutions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-chevron-right text-primary mt-1"></i>
                <span>Maintenance of peace and order in the barangay</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-chevron-right text-primary mt-1"></i>
                <span>
                  Delivery of basic services and implementation of community
                  programs
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BarangayOfficials;

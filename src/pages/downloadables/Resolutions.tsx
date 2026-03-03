import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Resolutions = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const differenceRef = useScrollAnimation();
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
        {/* Coming Soon Banner */}
        <section
          ref={introRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            introRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-file-alt text-primary text-5xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-primary mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              We are currently digitizing and organizing municipal resolutions for public access.
              Once available, you will be able to search, browse, and download official
              resolutions passed by the Sangguniang Bayan of Tuy, Batangas.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-6 py-3 rounded-lg">
              <i className="fas fa-clock"></i>
              <span className="font-semibold">Document digitization in progress</span>
            </div>
          </div>

          {/* About Resolutions */}
          <div className="mt-8 border-t pt-8">
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
          </div>
        </section>

        {/* Difference: Resolutions vs Ordinances */}
        <section
          ref={differenceRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            differenceRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Difference: Resolutions vs Ordinances
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
        </section>

        {/* Need Assistance */}
        <section
          ref={contactRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            contactRef.isVisible ? "visible" : ""
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
                For questions about specific resolutions or to request certified copies, please
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

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <i className="fas fa-info-circle text-primary mr-3"></i>
                How to Use These Documents
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Once available, click "Download" to save a copy to your device</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Click "Preview" to view the document in your browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>Use search and filters to find specific resolutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span>All documents will be in PDF format</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resolutions;

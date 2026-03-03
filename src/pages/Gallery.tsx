import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { useParallax } from "../hooks/useParallax";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Gallery = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const categoriesRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const upcomingCategories = [
    {
      icon: "fa-calendar-alt",
      title: "Events",
      color: "blue",
      description:
        "Photos from town fiestas, independence day celebrations, Christmas programs, sports festivals, and other municipal events.",
    },
    {
      icon: "fa-road",
      title: "Infrastructure",
      color: "green",
      description:
        "Documentation of road projects, bridge construction, school buildings, health centers, and other public infrastructure improvements.",
    },
    {
      icon: "fa-mountain",
      title: "Nature & Tourism",
      color: "teal",
      description:
        "Scenic views of Tuy's coastline, mountains, waterfalls, and other natural attractions that showcase the beauty of the municipality.",
    },
    {
      icon: "fa-landmark",
      title: "Culture & Heritage",
      color: "purple",
      description:
        "Images of historic landmarks, traditional dances, cultural performances, ancestral houses, and the parish church of Saint Vincent Ferrer.",
    },
    {
      icon: "fa-hands-helping",
      title: "Community Programs",
      color: "orange",
      description:
        "Photos from medical missions, livelihood training, feeding programs, disaster preparedness drills, and other community initiatives.",
    },
    {
      icon: "fa-users",
      title: "Officials & Meetings",
      color: "indigo",
      description:
        "Coverage of Sangguniang Bayan sessions, State of the Municipality addresses, barangay assemblies, and other official functions.",
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
            <span className="text-white/90">Gallery</span>
          </nav>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Photo Gallery
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Capturing the Beauty and Spirit of Tuy
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
              <i className="fas fa-images text-primary text-5xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-primary mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              We are currently collecting and organizing photos that showcase the vibrant life,
              natural beauty, infrastructure development, and cultural heritage of Tuy, Batangas.
              This gallery will be updated as photos become available.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-6 py-3 rounded-lg">
              <i className="fas fa-clock"></i>
              <span className="font-semibold">Photo collection in progress</span>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section
          ref={categoriesRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            categoriesRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">What to Expect</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Once available, our photo gallery will feature images organized into the following
            categories:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all scroll-animate stagger-${
                  (index % 6) + 1
                } ${categoriesRef.isVisible ? "visible" : ""}`}
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

        {/* Contact for Contributions */}
        <section
          ref={contactRef.elementRef}
          className={`bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg rounded-lg p-8 scroll-animate ${
            contactRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="text-center">
            <i className="fas fa-camera text-5xl text-white/80 mb-4"></i>
            <h3 className="text-3xl font-bold mb-4">
              Have Photos to Share?
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              If you have photos of Tuy events, landmarks, or community activities that you'd
              like to contribute to this gallery, please visit the Municipal Hall or contact us
              through our{" "}
              <Link to="/contact-us" className="underline hover:text-white transition-colors">
                Contact Us
              </Link>{" "}
              page.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                <i className="fas fa-envelope"></i>
                Contact Us
              </Link>
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-lg font-bold">
                <i className="fas fa-phone"></i>
                (043) 276-0047
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Gallery;

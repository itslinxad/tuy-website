import "../../assets/css/index.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const historyTimeline = [
  {
    year: "Pre-1866",
    title: "Part of Balayan",
    icon: "fa-map",
    content:
      "Tuy was historically part of the town of Balayan, the former capital of the eponymous province (now Batangas) from 1597 to 1732.",
  },
  {
    year: "1866",
    title: "Established as an Independent Town",
    icon: "fa-flag",
    content:
      "Tuy became an independent town on August 12, 1866, named by alcalde mayor Salvador Ellio after his birthplace of Tui in Pontevedra, Galicia, Spain.",
  },
  {
    year: "1903\u20131911",
    title: "Returned to Balayan",
    icon: "fa-exchange-alt",
    content:
      "Tuy was returned to Balayan under temporary governance from 1903 to 1911 during the American colonial period.",
  },
  {
    year: "2001",
    title: "Plaza Assassination",
    icon: "fa-landmark",
    content:
      "Cesar Platon, a Batangas gubernatorial candidate and then-mayor of Tanauan, was assassinated at Tuy\u2019s town plaza while campaigning. The assassination was allegedly ordered by then-Governor Armando Sanchez, who was later convicted for the crime in 2007.",
  },
];

const History = () => {
  const { offset } = useParallax({ speed: 0.3 });

  const etymologyRef = useScrollAnimation();
  const historyRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section with Parallax */}
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

        {/* Breadcrumb Navigation */}
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
            <span className="text-white/90">History</span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            History of Tuy
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Tracing Our Heritage Through Time
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">
        {/* Etymology Section */}
        <section
          ref={etymologyRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            etymologyRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <i className="fas fa-language text-primary text-2xl mr-3"></i>
            <h2 className="text-4xl font-bold text-primary">Etymology</h2>
          </div>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              The name{" "}
              <span className="text-primary font-medium">"Tuy"</span> was given
              by Salvador Ellio, the alcalde mayor of Batangas, in memory of his
              birthplace — Tui in the province of Pontevedra in Galicia, Spain.
              The name was adopted when Tuy was established as a separate
              municipality in 1866, reflecting the influence of Spanish colonial
              administration on local place names in the Philippines.
            </p>
          </div>
        </section>

        {/* History Timeline Section */}
        <section
          ref={historyRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            historyRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <i className="fas fa-landmark text-primary text-2xl mr-3"></i>
            <h2 className="text-4xl font-bold text-primary">History</h2>
          </div>

          {/* Vertical Timeline */}
          <div className="relative mt-12">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent"></div>

            <div className="space-y-12">
              {historyTimeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative pl-20 scroll-animate-left stagger-${
                    index + 1
                  } ${historyRef.isVisible ? "visible" : ""}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-5 w-7 h-7 rounded-full bg-primary border-4 border-white shadow-lg flex items-center justify-center">
                    <i
                      className={`fas ${item.icon} text-white text-xs`}
                    ></i>
                  </div>

                  {/* Content */}
                  <div>
                    <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-semibold text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default History;

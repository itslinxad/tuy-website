import { useState, useRef, useEffect } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useParallax } from "../hooks/useParallax";

import Navbar from "../components/Navbar.tsx";
import Button from "../components/Button.tsx";
import SkeletonCard from "../components/SkeletonCard";
import TuyMap from "../components/TuyMap";
import CalendarOfEvents from "../components/CalendarOfEvents";
import { formatDate } from "../utils/dateFormat";
import { useFacebookPosts } from "../hooks/useFacebookPosts";
import { useWeather } from "../hooks/useWeather";

function Home() {
  const { offset } = useParallax({ speed: 0.3 });
  const { posts, loading } = useFacebookPosts();
  const { weather } = useWeather();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.children;
    const card = cards[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const scrollPrev = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    scrollToCard(newIndex);
  };

  const scrollNext = () => {
    const newIndex = Math.min(posts.length - 1, activeIndex + 1);
    scrollToCard(newIndex);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || posts.length === 0) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.scrollWidth / posts.length;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, posts.length - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [posts.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, posts.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const firstCard = container.children[0] as HTMLElement;
      if (!firstCard) return;

      const containerWidth = container.clientWidth;
      const cardWidth = firstCard.offsetWidth;
      const cardOffsetLeft = firstCard.offsetLeft;

      const scrollPosition =
        cardOffsetLeft - containerWidth / 2 + cardWidth / 2;

      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const mayorRef = useScrollAnimation();
  const factsRef = useScrollAnimation();
  const announcementsRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const exploreRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section*/}
      <section className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
        {/* Parallax Background Image */}
        <div
          className="parallax-bg"
          style={{
            transform: `translateY(${offset}px)`,
            backgroundImage: `url('${import.meta.env.VITE_BASE_PATH}/hero-image.jpg')`,
          }}
        ></div>

        {/* Enhanced Multi-layer Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50"></div>

        {/* Breadcrumb Navigation */}
        <div
          className="absolute top-4 left-48 z-20 animate-fadeIn hidden md:block"
          style={{ animationDelay: "0.2s" }}
        >
          <nav className="text-sm text-white/70 flex items-center">
            <span className="hover:text-white/90 transition-colors cursor-pointer">
              Home
            </span>
            <i className="fas fa-chevron-right mx-2 text-xs"></i>
            <span className="text-white/90">Municipality of Tuy, Batangas</span>
          </nav>
        </div>

        {/* Main Content*/}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl mb-4 md:mb-6 tracking-tight animate-fadeInUp">
            Municipality of Tuy, Batangas
          </h1>
          <div
            className="w-1/2 sm:w-1/3 h-1 bg-yellow-400 mb-4 md:mb-6 rounded-full animate-scaleIn"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-lg mb-4 md:mb-6 italic font-light animate-fadeInUp"
            style={{ animationDelay: "0.5s" }}
          >
            Home of the Kambingan Festival
          </p>
          <p
            className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-lg font-light max-w-2xl px-4 animate-fadeIn"
            style={{ animationDelay: "0.7s" }}
          >
            Your Gateway to Quality Local Governance
          </p>
        </div>

        {/* Weather Widget Overlay */}
        {weather && (
          <div
            className="absolute bottom-20 left-4 sm:left-8 z-20 animate-fadeIn"
            style={{ animationDelay: "1s" }}
          >
            <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 border border-white/20 shadow-lg">
              <div className="flex items-center gap-3 text-white">
                <i className={`fas ${weather.icon} text-2xl sm:text-3xl drop-shadow-md`}></i>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold drop-shadow-md">
                      {weather.temperature}°C
                    </span>
                    <span className="text-sm sm:text-base text-white/90 font-medium">
                      {weather.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-white/80 mt-0.5">
                    <span>
                      <i className="fas fa-droplet mr-1"></i>
                      {weather.humidity}%
                    </span>
                    <span>
                      <i className="fas fa-wind mr-1"></i>
                      {weather.windSpeed} km/h
                    </span>
                    <span className="hidden sm:inline text-white/60">
                      Tuy, Batangas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
          <i className="fas fa-chevron-down text-white/70 text-xl"></i>
        </div>
      </section>

      {/* Mayor's Message Section */}
      <section
        ref={mayorRef.elementRef as React.RefObject<HTMLElement>}
        className="py-12 md:py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div
            className={`bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-12 scroll-animate ${mayorRef.isVisible ? "visible" : ""}`}
          >
            <div className="flex items-center mb-8 md:mb-12">
              <div className="w-2 h-10 sm:h-12 bg-primary mr-3 md:mr-4"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                Message of the Municipal Mayor
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div
                className={`flex flex-col items-center justify-center space-y-3 md:space-y-4 scroll-animate ${mayorRef.isVisible ? "visible" : ""}`}
              >
                <img
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full shrink-0 object-cover border-4 border-primary/20"
                  src={`${import.meta.env.VITE_BASE_PATH}/mayor-photo.jpg`}
                  alt="Municipal Mayor"
                />
                <div className="text-center">
                  <p className="font-bold text-primary text-sm sm:text-base">
                    Mayor Jose Jecerell "Jey" C. Cerrado
                  </p>
                  <p className="text-gray-600 italic text-sm">
                    Municipal Mayor
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-2">
                    January 2026
                  </p>
                </div>
              </div>
              <div className="flex-1 relative">
                {/* Opening Quotation Mark */}
                <div className="md:block hidden absolute -top-2 -left-2 md:-top-4 md:-left-4 text-primary opacity-20">
                  <i className="fas fa-quote-left text-6xl md:text-7xl"></i>
                </div>

                {/* Closing Quotation Mark */}
                <div className="md:block hidden absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 text-primary opacity-20">
                  <i className="fas fa-quote-right text-6xl md:text-7xl"></i>
                </div>

                <div className="md:ps-24 space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 leading-relaxed relative z-10">
                  <p>
                    This website serves as your gateway to the programs,
                    services, and accomplishments of our beloved town.
                  </p>
                  <p>
                    It is designed to keep our constituents informed and updated
                    on the latest developments, while also promoting
                    transparency in our local governance.
                  </p>
                  <p>
                    Here, you will also find downloadable forms for quick and
                    convenient transactions—helping us deliver fast, efficient,
                    and accessible public service.
                  </p>
                  <p>
                    I invite you to explore our site and discover more about
                    Tuy—our people, our culture, and the opportunities we have
                    to offer. May your visit be pleasant, informative, and even
                    more than what you expect.
                  </p>
                  <p className="font-semibold text-center md:text-left mt-4 md:mt-6">
                    Thank you, and it is always an honor to serve you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Tuy - Interactive Map */}
      <section
        ref={factsRef.elementRef as React.RefObject<HTMLElement>}
        className="pt-16 bg-white"
      >
        {/* Section Header - centered and improved */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12">
          <div
            className={`text-center scroll-animate ${factsRef.isVisible ? "visible" : ""}`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Discover Tuy, Batangas
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4">
              Explore our vibrant municipality through an interactive map
              featuring government offices, municipal halls, and barangays
              across our coastal community
            </p>
          </div>
        </div>

        {/* Map Container - full width */}
        <div
          className={`relative h-[500px] md:h-[700px] w-full scroll-animate ${factsRef.isVisible ? "visible" : ""}`}
        >
          <TuyMap />
        </div>
      </section>

      {/* Latest Announcements Section */}
      <section
        ref={announcementsRef.elementRef as React.RefObject<HTMLElement>}
        id="announcements"
        className="py-12 md:py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div
            className={`flex items-center mb-8 md:mb-12 scroll-animate ${announcementsRef.isVisible ? "visible" : ""}`}
          >
            <div className="w-1.5 sm:w-2 h-12 sm:h-16 md:h-20 bg-primary mr-2 sm:mr-3 md:mr-4"></div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                Latest Announcements
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Stay updated with the latest news and events
              </p>
            </div>
          </div>

          {/* Horizontal Scroll Carousel with Navigation */}
          <div className="relative">
            {/* Left gradient fade - positioned to not cover centered cards */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-10 lg:block hidden" />

            {/* Right gradient fade - positioned to not cover centered cards */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-10 lg:block hidden" />

            {/* Left arrow (desktop only) */}
            {!loading && posts.length > 1 && (
              <button
                onClick={scrollPrev}
                disabled={activeIndex === 0}
                className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-20 
                           bg-white shadow-lg rounded-full p-3 w-12 h-12
                           hover:bg-gray-50 hover:shadow-xl
                           disabled:opacity-30 disabled:cursor-not-allowed
                           transition-all duration-200 carousel-arrow cursor-pointer"
                aria-label="Previous announcement"
              >
                <i className="fas fa-chevron-left text-primary text-lg"></i>
              </button>
            )}

            {/* Right arrow (desktop only) */}
            {!loading && posts.length > 1 && (
              <button
                onClick={scrollNext}
                disabled={activeIndex === posts.length - 1}
                className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-20 
                           bg-white shadow-lg rounded-full p-3 w-12 h-12
                           hover:bg-gray-50 hover:shadow-xl
                           disabled:opacity-30 disabled:cursor-not-allowed
                           transition-all duration-200 carousel-arrow cursor-pointer"
                aria-label="Next announcement"
              >
                <i className="fas fa-chevron-right text-primary text-lg"></i>
              </button>
            )}

            {/* Horizontal scroll container - added scroll-padding for proper centering */}
            <div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
              style={{
                scrollPaddingLeft: "calc((100vw - min(80vw, 64rem)) / 2)",
                scrollPaddingRight: "calc((100vw - min(80vw, 64rem)) / 2)",
                paddingLeft: "calc((100vw - min(90vw, 64rem)) / 2)",
                paddingRight: "calc((100vw - min(90vw, 64rem)) / 2)",
              }}
            >
              {loading ? (
                // Show skeleton loaders while fetching
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : posts.length === 0 ? (
                // Show "No Posts Found" message when empty
                <div className="flex-shrink-0 my-8 w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-4xl snap-center flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-12 flex flex-col items-center justify-center text-center">
                    <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      No Posts Found
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      There are currently no announcements available. Please
                      check back later or visit our Facebook page for the latest
                      updates.
                    </p>
                  </div>
                </div>
              ) : (
                // Show actual posts
                posts.map((post, index) => (
                  <a
                    key={post.id}
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-shrink-0 my-8 w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-4xl snap-center flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow scroll-animate stagger-${index + 1} ${announcementsRef.isVisible ? "visible" : ""}`}
                  >
                    {/* Date header */}
                    <div className="bg-primary p-4">
                      <div className="flex items-center text-white">
                        <i className="fas fa-calendar-alt mr-3 text-xl"></i>
                        <span className="font-semibold">
                          {formatDate(post.date)}
                        </span>
                      </div>
                    </div>

                    {/* Optional post image */}
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    )}

                    {/* Content - flex-grow pushes the link to bottom */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      <span className="text-primary font-semibold hover:text-primary-hover inline-flex items-center mt-auto">
                        Read More on Facebook{" "}
                        <i className="fas fa-arrow-right ml-2"></i>
                      </span>
                    </div>
                  </a>
                ))
              )}
            </div>

            {/* Navigation dots */}
            {!loading && posts.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {posts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToCard(index)}
                    className={`h-2 rounded-full transition-all duration-300 nav-dot ${
                      activeIndex === index
                        ? "w-8 bg-primary"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to announcement ${index + 1}`}
                    aria-current={activeIndex === index ? "true" : "false"}
                  />
                ))}
              </div>
            )}
          </div>

          <div
            className={`text-center mt-12 scroll-animate stagger-4 ${announcementsRef.isVisible ? "visible" : ""}`}
          >
            <a
              href="https://www.facebook.com/MunicipalityOfTuy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
            >
              <i className="fa-brands fa-facebook mr-2"></i>
              Visit Our Page
            </a>
          </div>
        </div>
      </section>

      {/* Municipal Services Section */}
      <section
        ref={servicesRef.elementRef as React.RefObject<HTMLElement>}
        className="py-12 md:py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div
            className={`text-center mb-8 md:mb-12 scroll-animate ${servicesRef.isVisible ? "visible" : ""}`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">
              Municipal Services
            </h2>
            <p className="text-gray-600 text-base sm:text-lg px-4">
              Programs and services available to our residents
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {/* Health Services */}
            <div
              className={`bg-white border-2 border-gray-200 rounded-lg p-5 md:p-6 text-center hover:border-primary hover:shadow-xl transition-all scroll-animate stagger-1 ${servicesRef.isVisible ? "visible" : ""}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-clinic-medical text-3xl md:text-4xl text-primary"></i>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                Health Services
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Healthcare programs and medical facilities for all residents
              </p>
            </div>

            {/* Education */}
            <div
              className={`bg-white border-2 border-gray-200 rounded-lg p-5 md:p-6 text-center hover:border-primary hover:shadow-xl transition-all scroll-animate stagger-2 ${servicesRef.isVisible ? "visible" : ""}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-graduation-cap text-3xl md:text-4xl text-primary"></i>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                Education
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                School programs, scholarships, and learning initiatives
              </p>
            </div>

            {/* Business & Permits */}
            <div
              className={`bg-white border-2 border-gray-200 rounded-lg p-5 md:p-6 text-center hover:border-primary hover:shadow-xl transition-all scroll-animate stagger-3 ${servicesRef.isVisible ? "visible" : ""}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-briefcase text-3xl md:text-4xl text-primary"></i>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                Business & Permits
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Business registration, permits, and licenses
              </p>
            </div>

            {/* Social Welfare */}
            <div
              className={`bg-white border-2 border-gray-200 rounded-lg p-5 md:p-6 text-center hover:border-primary hover:shadow-xl transition-all scroll-animate stagger-4 ${servicesRef.isVisible ? "visible" : ""}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-hands-helping text-3xl md:text-4xl text-primary"></i>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                Social Welfare
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Assistance programs and support for residents in need
              </p>
            </div>

            {/* Infrastructure */}
            <div
              className={`bg-white border-2 border-gray-200 rounded-lg p-5 md:p-6 text-center hover:border-primary hover:shadow-xl transition-all scroll-animate stagger-5 ${servicesRef.isVisible ? "visible" : ""}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-road text-3xl md:text-4xl text-primary"></i>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                Infrastructure
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Development projects, roads, and public facilities
              </p>
            </div>

            {/* Environment */}
            <div
              className={`bg-white border-2 border-gray-200 rounded-lg p-5 md:p-6 text-center hover:border-primary hover:shadow-xl transition-all scroll-animate stagger-6 ${servicesRef.isVisible ? "visible" : ""}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-leaf text-3xl md:text-4xl text-primary"></i>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                Environment
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Sustainability initiatives and conservation programs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar of Events Section */}
      <CalendarOfEvents />

      {/* Explore Tuy Section */}
      <section
        ref={exploreRef.elementRef as React.RefObject<HTMLElement>}
        className="py-12 md:py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div
            className={`flex items-center mb-8 md:mb-12 scroll-animate ${exploreRef.isVisible ? "visible" : ""}`}
          >
            <div className="w-1.5 sm:w-2 h-12 sm:h-16 md:h-20 bg-primary mr-2 sm:mr-3 md:mr-4"></div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                Explore Tuy
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Discover the beauty and heritage of our town
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Gallery Preview */}
            <div
              className={`md:col-span-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 flex flex-col h-full scroll-animate ${exploreRef.isVisible ? "visible" : ""}`}
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <i className="fas fa-images text-primary mr-2 md:mr-3"></i>
                Photo Gallery
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6 flex-grow">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <i className="fas fa-image text-2xl md:text-4xl text-primary/40"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <i className="fas fa-image text-2xl md:text-4xl text-primary/40"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-primary/25 to-primary/15 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <i className="fas fa-image text-2xl md:text-4xl text-primary/40"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <i className="fas fa-image text-2xl md:text-4xl text-primary/40"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <i className="fas fa-image text-2xl md:text-4xl text-primary/40"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-primary/15 to-primary/25 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <i className="fas fa-image text-2xl md:text-4xl text-primary/40"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-primary/18 to-primary/12 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <i className="fas fa-image text-2xl md:text-4xl text-primary/40"></i>
                </div>
                <div className="aspect-square bg-gradient-to-br from-primary/22 to-primary/8 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <i className="fas fa-image text-2xl md:text-4xl text-primary/40"></i>
                </div>
              </div>
              <Button variant="primary" fullWidth={true} to="/gallery">
                <i className="fa-solid fa-image mr-2"></i>Explore Our Gallery
              </Button>
            </div>

            {/* Tourist Attractions */}
            <div
              className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 flex flex-col h-full scroll-animate ${exploreRef.isVisible ? "visible" : ""}`}
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <i className="fas fa-map-marked-alt text-primary mr-2 md:mr-3"></i>
                Tourist Attractions
              </h3>
              <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6 flex-grow">
                <li className="group flex items-start cursor-pointer hover:bg-primary/5 transition-all duration-300 rounded-lg p-2 md:p-3 -mx-2 md:-mx-3">
                  <i className="fas fa-water text-primary mt-1 mr-2 md:mr-3 text-lg md:text-xl group-hover:scale-110 transition-transform duration-300"></i>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-gray-800 group-hover:text-primary transition-colors">
                      Coastal Areas
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Beautiful beaches along Balayan Bay
                    </p>
                  </div>
                </li>
                <li className="group flex items-start cursor-pointer hover:bg-primary/5 transition-all duration-300 rounded-lg p-2 md:p-3 -mx-2 md:-mx-3">
                  <i className="fas fa-church text-primary mt-1 mr-2 md:mr-3 text-lg md:text-xl group-hover:scale-110 transition-transform duration-300"></i>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-gray-800 group-hover:text-primary transition-colors">
                      Historical Churches
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Spanish colonial era religious sites
                    </p>
                  </div>
                </li>
                <li className="group flex items-start cursor-pointer hover:bg-primary/5 transition-all duration-300 rounded-lg p-2 md:p-3 -mx-2 md:-mx-3">
                  <i className="fas fa-mountain text-primary mt-1 mr-2 md:mr-3 text-lg md:text-xl group-hover:scale-110 transition-transform duration-300"></i>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-gray-800 group-hover:text-primary transition-colors">
                      Natural Attractions
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Scenic landscapes and nature spots
                    </p>
                  </div>
                </li>
                <li className="group flex items-start cursor-pointer hover:bg-primary/5 transition-all duration-300 rounded-lg p-2 md:p-3 -mx-2 md:-mx-3">
                  <i className="fas fa-fish text-primary mt-1 mr-2 md:mr-3 text-lg md:text-xl group-hover:scale-110 transition-transform duration-300"></i>
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-gray-800 group-hover:text-primary transition-colors">
                      Fishing Villages
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Traditional coastal communities
                    </p>
                  </div>
                </li>
              </ul>
              <Button variant="outline" to="/about" fullWidth={true}>
                <i className="fa-solid fa-location-dot mr-2"></i>Visit Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef.elementRef as React.RefObject<HTMLElement>}
        className="py-12 md:py-20 bg-primary text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div
            className={`text-center mb-8 md:mb-12 scroll-animate ${contactRef.isVisible ? "visible" : ""}`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Get In Touch
            </h2>
            <p className="text-white/90 text-base sm:text-lg">
              We're here to serve you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Address */}
            <div
              className={`text-center scroll-animate stagger-1 ${contactRef.isVisible ? "visible" : ""}`}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-map-pin text-2xl md:text-3xl"></i>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Address</h3>
              <p className="text-sm md:text-base text-white/90">
                Municipal Hall, Tuy, Batangas
              </p>
              <p className="text-sm md:text-base text-white/90">
                Philippines 4214
              </p>
            </div>

            {/* Contact */}
            <div
              className={`text-center scroll-animate stagger-2 ${contactRef.isVisible ? "visible" : ""}`}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-phone text-2xl md:text-3xl"></i>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Contact</h3>
              <p className="text-sm md:text-base text-white/90">
                Trunkline: (043) 276-0047
              </p>
              <p className="text-sm md:text-base text-white/90">
                (043) 276-0100 / 276-0104
              </p>
            </div>

            {/* Office Hours */}
            <div
              className={`text-center scroll-animate stagger-3 ${contactRef.isVisible ? "visible" : ""}`}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-clock text-2xl md:text-3xl"></i>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Office Hours
              </h3>
              <p className="text-sm md:text-base text-white/90">
                Monday - Friday
              </p>
              <p className="text-sm md:text-base text-white/90">
                8:00 AM - 5:00 PM
              </p>
            </div>
          </div>

          <div
            className={`text-center scroll-animate stagger-4 ${contactRef.isVisible ? "visible" : ""}`}
          >
            <Button variant="secondary" size="lg" to="/contact" hasShadow>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

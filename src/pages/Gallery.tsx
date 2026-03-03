import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar.tsx";
import { useParallax } from "../hooks/useParallax";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { apiGetGallery } from "../services/api";
import type { GalleryImage } from "../services/api";

const CATEGORIES = [
  "All",
  "Events",
  "Infrastructure",
  "Nature & Tourism",
  "Culture & Heritage",
  "Community Programs",
  "Officials & Meetings",
];

const Gallery = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const galleryRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      const res = await apiGetGallery();
      setImages(res.data ?? []);
    } catch {
      setError("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  }

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  // Lightbox navigation
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1,
    );
  }, [lightboxIndex, filteredImages.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1,
    );
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goToPrev();
      else if (e.key === "ArrowRight") goToNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, goToPrev, goToNext]);

  const currentLightboxImage =
    lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  // Check if gallery has content or is still Coming Soon
  const hasImages = images.length > 0;

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
        {/* Gallery Section */}
        <section
          ref={galleryRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            galleryRef.isVisible ? "visible" : ""
          }`}
        >
          {loading ? (
            /* Loading Skeleton */
            <div>
              <div className="flex items-center mb-6">
                <div className="w-2 h-12 bg-primary mr-4"></div>
                <h2 className="text-4xl font-bold text-primary">
                  Photo Gallery
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          ) : error || !hasImages ? (
            /* Coming Soon / Error State */
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-images text-primary text-5xl"></i>
              </div>
              <h2 className="text-4xl font-bold text-primary mb-4">
                {error ? "Unable to Load Gallery" : "Coming Soon"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                {error
                  ? "We're having trouble loading the gallery images. Please try again later."
                  : "We are currently collecting and organizing photos that showcase the vibrant life, natural beauty, infrastructure development, and cultural heritage of Tuy, Batangas. This gallery will be updated as photos become available."}
              </p>
              {error ? (
                <button
                  onClick={() => {
                    setError(null);
                    setLoading(true);
                    loadImages();
                  }}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors cursor-pointer"
                >
                  <i className="fas fa-redo"></i>
                  Try Again
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-6 py-3 rounded-lg">
                  <i className="fas fa-clock"></i>
                  <span className="font-semibold">
                    Photo collection in progress
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Gallery with images */
            <div>
              <div className="flex items-center mb-6">
                <div className="w-2 h-12 bg-primary mr-4"></div>
                <h2 className="text-4xl font-bold text-primary">
                  Photo Gallery
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="mb-8 flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
                      selectedCategory === category
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category}
                    {category !== "All" && (
                      <span className="ml-1.5 text-xs opacity-75">
                        (
                        {
                          images.filter((img) => img.category === category)
                            .length
                        }
                        )
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <p className="text-sm text-gray-500 mb-4">
                Showing {filteredImages.length} of {images.length} photos
              </p>

              {/* Image Grid */}
              {filteredImages.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-images text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600 text-lg">
                    No photos found in this category.
                  </p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="mt-4 text-primary hover:underline font-semibold cursor-pointer"
                  >
                    View all photos
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredImages.map((img, index) => (
                    <div
                      key={img.id}
                      onClick={() => openLightbox(index)}
                      className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={`/uploads/gallery/${img.filename}`}
                        alt={img.caption || img.original_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                        <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          {img.caption && (
                            <p className="text-white text-sm font-medium truncate">
                              {img.caption}
                            </p>
                          )}
                          <p className="text-white/70 text-xs">
                            {img.category}
                          </p>
                        </div>
                      </div>
                      {/* Zoom icon */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                          <i className="fas fa-search-plus text-primary text-sm"></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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
            <h3 className="text-3xl font-bold mb-4">Have Photos to Share?</h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              If you have photos of Tuy events, landmarks, or community
              activities that you'd like to contribute to this gallery, please
              visit the Municipal Hall or contact us through our{" "}
              <Link
                to="/contact"
                className="underline hover:text-white transition-colors"
              >
                Contact Us
              </Link>{" "}
              page.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
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

      {/* Lightbox Modal */}
      {lightboxIndex !== null && currentLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl z-10 w-10 h-10 flex items-center justify-center cursor-pointer"
            aria-label="Close lightbox"
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Previous button */}
          {filteredImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10 w-12 h-12 flex items-center justify-center cursor-pointer"
              aria-label="Previous image"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/uploads/gallery/${currentLightboxImage.filename}`}
              alt={currentLightboxImage.caption || currentLightboxImage.original_name}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            {/* Caption */}
            <div className="mt-4 text-center">
              {currentLightboxImage.caption && (
                <p className="text-white text-lg font-medium">
                  {currentLightboxImage.caption}
                </p>
              )}
              <p className="text-white/50 text-sm mt-1">
                {currentLightboxImage.category} &middot;{" "}
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>

          {/* Next button */}
          {filteredImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10 w-12 h-12 flex items-center justify-center cursor-pointer"
              aria-label="Next image"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;

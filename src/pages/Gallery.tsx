import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import { useParallax } from "../hooks/useParallax";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  date: string;
  description: string;
}

const Gallery = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const galleryRef = useScrollAnimation();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // ============================================
  // CONTENT NEEDED: Gallery Images
  // ============================================
  // Replace these placeholder images with actual photos
  // Place images in /public/gallery/[category]/ folders
  // Example: /public/gallery/events/fiesta-2024.jpg

  const images: GalleryImage[] = [
    // Events
    {
      id: 1,
      src: "/gallery/events/town-fiesta-2024.jpg",
      title: "REPLACE: Town Fiesta 2024",
      category: "Events",
      date: "February 2024",
      description: "REPLACE: Annual town fiesta celebration with street dancing and cultural performances",
    },
    {
      id: 2,
      src: "/gallery/events/independence-day-2024.jpg",
      title: "REPLACE: Independence Day Celebration",
      category: "Events",
      date: "June 2024",
      description: "REPLACE: Flag raising ceremony and program for Independence Day",
    },
    {
      id: 3,
      src: "/gallery/events/christmas-lights-2023.jpg",
      title: "REPLACE: Christmas Lights Display",
      category: "Events",
      date: "December 2023",
      description: "REPLACE: Municipal hall Christmas lights and decorations",
    },
    {
      id: 4,
      src: "/gallery/events/sports-fest-2024.jpg",
      title: "REPLACE: Municipal Sports Festival",
      category: "Events",
      date: "March 2024",
      description: "REPLACE: Annual inter-barangay sports competition",
    },

    // Infrastructure
    {
      id: 5,
      src: "/gallery/infrastructure/road-project-2024.jpg",
      title: "REPLACE: Road Concreting Project",
      category: "Infrastructure",
      date: "January 2024",
      description: "REPLACE: Newly concreted barangay road improving accessibility",
    },
    {
      id: 6,
      src: "/gallery/infrastructure/bridge-construction.jpg",
      title: "REPLACE: Bridge Construction",
      category: "Infrastructure",
      date: "March 2024",
      description: "REPLACE: New bridge connecting two barangays",
    },
    {
      id: 7,
      src: "/gallery/infrastructure/school-building.jpg",
      title: "REPLACE: School Building Renovation",
      category: "Infrastructure",
      date: "April 2024",
      description: "REPLACE: Renovated elementary school building",
    },
    {
      id: 8,
      src: "/gallery/infrastructure/health-center.jpg",
      title: "REPLACE: Barangay Health Center",
      category: "Infrastructure",
      date: "February 2024",
      description: "REPLACE: Newly constructed barangay health center",
    },

    // Nature & Tourism
    {
      id: 9,
      src: "/gallery/nature/tuy-beach.jpg",
      title: "REPLACE: Tuy Beach",
      category: "Nature & Tourism",
      date: "May 2024",
      description: "REPLACE: Beautiful coastline of Tuy",
    },
    {
      id: 10,
      src: "/gallery/nature/mountains.jpg",
      title: "REPLACE: Mountain View",
      category: "Nature & Tourism",
      date: "April 2024",
      description: "REPLACE: Scenic mountain landscapes",
    },
    {
      id: 11,
      src: "/gallery/nature/waterfalls.jpg",
      title: "REPLACE: Local Waterfalls",
      category: "Nature & Tourism",
      date: "June 2024",
      description: "REPLACE: Hidden waterfalls in Tuy",
    },
    {
      id: 12,
      src: "/gallery/nature/sunset.jpg",
      title: "REPLACE: Sunset View",
      category: "Nature & Tourism",
      date: "March 2024",
      description: "REPLACE: Beautiful sunset by the coast",
    },

    // Culture & Heritage
    {
      id: 13,
      src: "/gallery/culture/tuy-church.jpg",
      title: "REPLACE: Tuy Catholic Church",
      category: "Culture & Heritage",
      date: "January 2024",
      description: "REPLACE: Historic Tuy Catholic Church",
    },
    {
      id: 14,
      src: "/gallery/culture/traditional-dance.jpg",
      title: "REPLACE: Traditional Dance Performance",
      category: "Culture & Heritage",
      date: "February 2024",
      description: "REPLACE: Cultural dance performance during town fiesta",
    },
    {
      id: 15,
      src: "/gallery/culture/heritage-house.jpg",
      title: "REPLACE: Heritage House",
      category: "Culture & Heritage",
      date: "March 2024",
      description: "REPLACE: Preserved ancestral house",
    },

    // Community Programs
    {
      id: 16,
      src: "/gallery/programs/medical-mission.jpg",
      title: "REPLACE: Medical Mission",
      category: "Community Programs",
      date: "April 2024",
      description: "REPLACE: Free medical mission for residents",
    },
    {
      id: 17,
      src: "/gallery/programs/livelihood-training.jpg",
      title: "REPLACE: Livelihood Training",
      category: "Community Programs",
      date: "May 2024",
      description: "REPLACE: Skills training program for residents",
    },
    {
      id: 18,
      src: "/gallery/programs/feeding-program.jpg",
      title: "REPLACE: Feeding Program",
      category: "Community Programs",
      date: "June 2024",
      description: "REPLACE: Nutrition program for children",
    },
    {
      id: 19,
      src: "/gallery/programs/disaster-drill.jpg",
      title: "REPLACE: Disaster Preparedness Drill",
      category: "Community Programs",
      date: "March 2024",
      description: "REPLACE: Community earthquake drill",
    },

    // Officials & Meetings
    {
      id: 20,
      src: "/gallery/officials/council-session.jpg",
      title: "REPLACE: Sangguniang Bayan Session",
      category: "Officials & Meetings",
      date: "February 2024",
      description: "REPLACE: Regular session of the municipal council",
    },
    {
      id: 21,
      src: "/gallery/officials/state-of-municipality.jpg",
      title: "REPLACE: State of the Municipality Address",
      category: "Officials & Meetings",
      date: "January 2024",
      description: "REPLACE: Mayor delivering the SOMA",
    },
    {
      id: 22,
      src: "/gallery/officials/barangay-assembly.jpg",
      title: "REPLACE: Barangay Assembly",
      category: "Officials & Meetings",
      date: "March 2024",
      description: "REPLACE: Community meeting with barangay officials",
    },
  ];

  const categories = ["All", ...Array.from(new Set(images.map((img) => img.category)))];

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedImage(filteredImages[newIndex]);
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
        {/* Introduction */}
        <section
          ref={introRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            introRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Explore Tuy Through Photos</h2>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Browse through our collection of photos showcasing the vibrant life, natural beauty,
            infrastructure development, and cultural heritage of Tuy, Batangas. These images tell
            the story of our municipality and its people.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{images.length}</div>
              <div className="text-gray-700 text-sm">Total Photos</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{categories.length - 1}</div>
              <div className="text-gray-700 text-sm">Categories</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">2024</div>
              <div className="text-gray-700 text-sm">Latest Updates</div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section
          ref={galleryRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            galleryRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Browse Photos</h2>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            Showing <span className="font-bold text-primary">{filteredImages.length}</span>{" "}
            photo(s)
          </div>

          {/* Gallery Grid - Masonry-style */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-200"
                  onClick={() => openLightbox(image)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Placeholder for actual image */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <i className="fas fa-image text-6xl mb-3"></i>
                      <p className="text-sm font-bold">Image Placeholder</p>
                      <p className="text-xs">Add image to: {image.src}</p>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                      <p className="text-sm text-white/80 mb-2">{image.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">
                          <i className="fas fa-calendar mr-1"></i>
                          {image.date}
                        </span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded">
                          <i className="fas fa-search-plus mr-1"></i>
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-images text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Photos Found</h3>
              <p className="text-gray-600">No photos match the selected category.</p>
            </div>
          )}
        </section>

        {/* Upload Info */}
        <section className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-400">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            For Website Administrators
          </h3>
          <div className="text-blue-700 space-y-2">
            <p>
              <strong>To add photos to the gallery:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>
                Place image files in{" "}
                <code className="bg-blue-200 px-2 py-1 rounded">public/gallery/[category]/</code>{" "}
                folders
              </li>
              <li>Update the images array in this component with photo details</li>
              <li>Recommended image size: 1200x800px for best quality</li>
              <li>Supported formats: JPG, PNG, WebP</li>
              <li>Optimize images before uploading to reduce file size</li>
            </ol>
            <p className="mt-4 text-sm">
              <strong>Suggested folder structure:</strong>
              <br />
              <code className="text-xs bg-blue-200 px-2 py-1 rounded">
                public/gallery/events/, public/gallery/infrastructure/,
                public/gallery/nature/, public/gallery/culture/, public/gallery/programs/,
                public/gallery/officials/
              </code>
            </p>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            <i className="fas fa-times"></i>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
            className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            aria-label="Previous"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
            className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            aria-label="Next"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          <div
            className="max-w-6xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Placeholder */}
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden mb-4 flex items-center justify-center min-h-[400px]">
              <div className="text-center text-gray-400">
                <i className="fas fa-image text-8xl mb-4"></i>
                <p className="text-lg font-bold">Image Placeholder</p>
                <p className="text-sm">Add image to: {selectedImage.src}</p>
              </div>
            </div>

            {/* Image Info */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedImage.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {selectedImage.category}
                    </span>
                    <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      <i className="fas fa-calendar mr-1"></i>
                      {selectedImage.date}
                    </span>
                  </div>
                  <p className="text-gray-700">{selectedImage.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                  <i className="fas fa-download mr-2"></i>
                  Download
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                  <i className="fas fa-share-alt mr-2"></i>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

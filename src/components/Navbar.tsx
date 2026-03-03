import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchableContent } from "../data/searchData";
import type { SearchItem } from "../data/searchData";

const Navbar = () => {
  // State management
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );

  // Refs
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  const navigate = useNavigate();

  // Search function
  const performSearch = (query: string): SearchItem[] => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();

    return searchableContent
      .filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.keywords.some((keyword) => keyword.includes(lowerQuery)),
      )
      .slice(0, 8); // Limit to 8 results in dropdown
  };

  // Debounced search: Update search results when query changes
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer with 300ms delay
    debounceTimerRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        const results = performSearch(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300);

    // Cleanup timer on unmount or query change
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Handle search toggle
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
      setSelectedResultIndex(-1);
    }
  };

  // Handle result click
  const handleResultClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedResultIndex(-1);
  };

  // Handle keyboard events for navigation
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
      setSelectedResultIndex(-1);
      return;
    }

    if (searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedResultIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedResultIndex >= 0) {
      e.preventDefault();
      const selectedResult = searchResults[selectedResultIndex];
      handleResultClick(selectedResult.path);
    }
  };

  // Reset selected index when search results change
  useEffect(() => {
    setSelectedResultIndex(-1);
  }, [searchResults]);

  // Get icon for result type
  const getResultIcon = (type: string) => {
    switch (type) {
      case "page":
        return "fas fa-file";
      case "document":
        return "fas fa-file-alt";
      case "official":
        return "fas fa-user";
      case "announcement":
        return "fas fa-bullhorn";
      case "content":
        return "fas fa-info-circle";
      default:
        return "fas fa-circle";
    }
  };

  // Toggle mobile dropdown
  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="sticky top-0 bg-primary w-full h-16 z-50 shadow-2xl">
        <div className="flex justify-between items-center h-full">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center h-full">
            {/* Logo */}
            <div className="h-full flex items-center">
              <img
                className="mt-2 h-28 w-28 ms-8 absolute top-0 left-0"
                src={`${import.meta.env.VITE_BASE_PATH}/logo.png`}
                alt="Tuy Logo"
              />
            </div>

            {/* Desktop Menu Items */}
            <ul
              className={`flex-row text-sm items-center justify-center text-white h-full ml-42 transition-opacity duration-100 ${
                isSearchOpen ? "hidden" : "hidden lg:flex"
              }`}
            >
              <li className="flex items-center h-full hover:bg-primary-hover transition-all duration-150 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10"></div>
                <Link
                  className="px-3 lg:px-4 xl:px-6 h-full flex items-center"
                  to="/"
                >
                  Home
                </Link>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10"></div>
              </li>

              {/* Profile Dropdown */}
              <li className="group relative flex items-center h-full hover:bg-primary-hover transition-all duration-150">
                <span className="px-3 lg:px-4 xl:px-6 h-full flex items-center cursor-pointer">
                  Profile{" "}
                  <i className="fas fa-chevron-down ml-2 text-xs transition-transform duration-150 group-hover:rotate-180"></i>
                </span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10"></div>
                <div className="hidden group-hover:block absolute top-full left-0 bg-white min-w-[250px] shadow-2xl z-[100] animate-fadeIn rounded-b-lg">
                  <Link
                    className="block px-6 py-3 text-black hover:bg-gray-100 transition-all duration-150"
                    to="/profile/history"
                  >
                    History
                  </Link>
                  <Link
                    className="block px-6 py-3 text-black hover:bg-gray-100 transition-all duration-150"
                    to="/profile/demography"
                  >
                    Demography
                  </Link>
                  <Link
                    className="block px-6 py-3 text-black hover:bg-gray-100 transition-all duration-150"
                    to="/profile/maps"
                  >
                    Maps
                  </Link>
                  <Link
                    className="block px-6 py-3 text-black hover:bg-gray-100 transition-all duration-150"
                    to="/profile/socio-economic"
                  >
                    Socio-Economic
                  </Link>
                  <Link
                    className="block px-6 py-3 text-black rounded-b-lg hover:bg-gray-100 transition-all duration-150"
                    to="/profile/about"
                  >
                    About
                  </Link>
                </div>
              </li>

              {/* Local Government Dropdown */}
              <li className="group relative flex items-center h-full hover:bg-primary-hover transition-all duration-150">
                <span className="px-3 lg:px-4 xl:px-6 h-full flex items-center cursor-pointer">
                  Local Government{" "}
                  <i className="fas fa-chevron-down ml-2 text-xs transition-transform duration-150 group-hover:rotate-180"></i>
                </span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10"></div>
                <div className="hidden group-hover:block absolute top-full left-0 bg-white min-w-[250px] shadow-2xl z-[100] animate-fadeIn rounded-b-lg">
                  <Link
                    className="block px-6 py-3 text-black hover:bg-gray-100 transition-all duration-150"
                    to="/government/officials"
                  >
                    Officials
                  </Link>
                  <Link
                    className="block px-6 py-3 text-black hover:bg-gray-100 transition-all duration-150"
                    to="/government/department-heads"
                  >
                    Department Heads
                  </Link>
                  <Link
                    className="block px-6 py-3 text-black rounded-b-lg hover:bg-gray-100 transition-all duration-150"
                    to="/government/barangay-officials"
                  >
                    Barangay Officials
                  </Link>
                </div>
              </li>

              {/* Downloadables Dropdown */}
              <li className="group relative flex items-center h-full hover:bg-primary-hover transition-all duration-150">
                <span className="px-3 lg:px-4 xl:px-6 h-full flex items-center cursor-pointer">
                  Downloadables{" "}
                  <i className="fas fa-chevron-down ml-2 text-xs transition-transform duration-150 group-hover:rotate-180"></i>
                </span>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10"></div>
                <div className="hidden group-hover:block absolute top-full left-0 bg-white min-w-[250px] shadow-2xl z-[100] animate-fadeIn rounded-b-lg">
                  <Link
                    className="block px-6 py-3 text-black hover:bg-gray-100 transition-all duration-150"
                    to="/downloadables/forms"
                  >
                    Forms
                  </Link>
                  <Link
                    className="block px-6 py-3 text-black rounded-b-lg hover:bg-gray-100 transition-all duration-150"
                    to="/downloadables/ordinances"
                  >
                    Ordinances
                  </Link>
                </div>
              </li>

              {/* Gallery */}
              <li className="flex items-center h-full hover:bg-primary-hover transition-all duration-150 relative">
                <Link
                  className="px-3 lg:px-4 xl:px-6 h-full flex items-center"
                  to="/gallery"
                >
                  Gallery
                </Link>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10"></div>
              </li>

              {/* Contact Us */}
              <li className="flex items-center h-full hover:bg-primary-hover transition-all duration-150 relative">
                <Link
                  className="px-3 lg:px-4 xl:px-6 h-full flex items-center"
                  to="/contact"
                >
                  Contact Us
                </Link>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10"></div>
              </li>
            </ul>
          </div>

          {/* Right: Dev Mode Indicator + Search + Mobile Toggle */}
          <div className="flex items-center h-full">
            {/* Search Component */}
            <div className="relative h-full" ref={searchRef}>
              {!isSearchOpen ? (
                // Search Icon Button (Collapsed)
                <button
                  onClick={handleSearchToggle}
                  className="px-4 xl:px-6 h-full flex items-center text-white hover:bg-primary-hover transition-all duration-150 cursor-pointer"
                  aria-label="Search website"
                >
                  <i className="fas fa-search text-lg transition-transform duration-150"></i>
                </button>
              ) : (
                // Expanded Search Bar
                <div className="flex items-center h-full bg-primary-hover overflow-hidden animate-expandSearch max-w-xs lg:max-w-md xl:max-w-lg">
                  <div className="flex items-center px-4 gap-2">
                    <i className="fas fa-search text-white text-lg animate-searchPulse"></i>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      className="w-32 md:w-40 lg:w-48 xl:w-64 h-10 px-3 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-150 animate-slideInRight"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyPress}
                      aria-label="Search query"
                    />
                    <button
                      onClick={handleSearchToggle}
                      className="text-white cursor-pointer hover:text-white/70 transition-all duration-150"
                      aria-label="Close search"
                    >
                      <i className="fas fa-times text-lg"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* Search Results Dropdown */}
              {isSearchOpen && searchQuery.trim() && (
                <div className="absolute cursor-pointer top-full right-0 mt-1 bg-white shadow-2xl rounded-lg w-80 md:w-96 max-h-96 overflow-y-auto z-[100] animate-slideDownFade">
                  {searchResults.length > 0 ? (
                    <>
                      {searchResults.map((result, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleResultClick(result.path)}
                          style={{ animationDelay: `${idx * 50}ms` }}
                          className={`group/result block px-6 py-3 border-b border-gray-100 transition-all duration-150 cursor-pointer animate-fadeInStagger ${
                            idx === selectedResultIndex
                              ? "bg-primary/10"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <i
                              className={`${getResultIcon(
                                result.type,
                              )} mt-1 text-primary transition-all duration-150 ${
                                idx === selectedResultIndex
                                  ? "scale-110"
                                  : "group-hover/result:scale-110 group-hover/result:rotate-6"
                              }`}
                            ></i>
                            <div className="flex-1">
                              <div
                                className={`font-semibold text-gray-800 transition-colors duration-150 ${
                                  idx === selectedResultIndex
                                    ? "text-primary"
                                    : "group-hover/result:text-primary"
                                }`}
                              >
                                {result.title}
                              </div>
                              <div className="text-xs text-gray-500 capitalize">
                                {result.type}
                              </div>
                            </div>
                            <i
                              className={`fas fa-arrow-right text-gray-400 mt-1 transition-all duration-150 ${
                                idx === selectedResultIndex
                                  ? "text-primary translate-x-2"
                                  : "group-hover/result:text-primary group-hover/result:translate-x-2"
                              }`}
                            ></i>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="px-6 py-8 text-center text-gray-500 animate-fadeInScale">
                      <i className="fas fa-search text-3xl mb-2 opacity-30 animate-bounce-slow"></i>
                      <p>No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden px-4 xl:px-6 h-full flex items-center text-white hover:bg-primary-hover transition-all duration-150"
              aria-label="Toggle mobile menu"
            >
              <i
                className={`fas ${
                  isMobileMenuOpen ? "fa-times" : "fa-bars"
                } text-xl`}
              ></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary-hover shadow-2xl text-end">
          {/* Home */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-8 py-4 text-white hover:bg-primary border-b border-white/10 transition-all duration-150"
          >
            <i className="fas fa-house mr-3"></i>Home
          </Link>

          {/* Profile */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleMobileDropdown("profile")}
              className="w-full px-8 py-4 text-white hover:bg-primary transition-all duration-150 flex justify-between items-center"
            >
              <i
                className={`fas fa-chevron-down text-xs transition-transform duration-150 ${
                  openMobileDropdown === "profile" ? "rotate-180" : ""
                }`}
              ></i>
              <span>
                <i className="fas fa-user mr-3"></i>Profile
              </span>
            </button>
            {openMobileDropdown === "profile" && (
              <div className="bg-primary">
                <Link
                  to="/profile/history"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-12 py-3 text-white hover:bg-primary-hover transition-all duration-150"
                >
                  History
                </Link>
                <Link
                  to="/profile/demography"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-12 py-3 text-white hover:bg-primary-hover transition-all duration-150"
                >
                  Demography
                </Link>
                <Link
                  to="/profile/maps"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-12 py-3 text-white hover:bg-primary-hover transition-all duration-150"
                >
                  Maps
                </Link>
                <Link
                  to="/profile/socio-economic"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-12 py-3 text-white hover:bg-primary-hover transition-all duration-150"
                >
                  Socio-Economic
                </Link>
              </div>
            )}
          </div>

          {/* Local Government */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleMobileDropdown("government")}
              className="w-full px-8 py-4 text-white hover:bg-primary transition-all duration-150 flex justify-between items-center"
            >
              <i
                className={`fas fa-chevron-down text-xs transition-transform duration-150 ${
                  openMobileDropdown === "government" ? "rotate-180" : ""
                }`}
              ></i>
              <span>
                <i className="fas fa-building mr-3"></i>Local Government
              </span>
            </button>
            {openMobileDropdown === "government" && (
              <div className="bg-primary">
                <Link
                  to="/government/officials"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-12 py-3 text-white hover:bg-primary-hover transition-all duration-150"
                >
                  Officials
                </Link>
                <Link
                  to="/government/department-heads"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-12 py-3 text-white hover:bg-primary-hover transition-all duration-150"
                >
                  Department Heads
                </Link>
                <Link
                  to="/government/barangay-officials"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-12 py-3 text-white hover:bg-primary-hover transition-all duration-150"
                >
                  Barangay Officials
                </Link>
              </div>
            )}
          </div>

          {/* Downloadables */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleMobileDropdown("downloadables")}
              className="w-full px-8 py-4 text-white hover:bg-primary transition-all duration-150 flex justify-between items-center"
            >
              <i
                className={`fas fa-chevron-down text-xs transition-transform duration-150 ${
                  openMobileDropdown === "downloadables" ? "rotate-180" : ""
                }`}
              ></i>
              <span>
                <i className="fas fa-download mr-3"></i>Downloadables
              </span>
            </button>
            {openMobileDropdown === "downloadables" && (
              <div className="bg-primary">
                <Link
                  to="/downloadables/forms"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-12 py-3 text-white hover:bg-primary-hover transition-all duration-150"
                >
                  Forms
                </Link>
                <Link
                  to="/downloadables/ordinances"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-12 py-3 text-white hover:bg-primary-hover transition-all duration-150"
                >
                  Ordinances
                </Link>
              </div>
            )}
          </div>

          {/* Gallery */}
          <Link
            to="/gallery"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-8 py-4 text-white hover:bg-primary border-b border-white/10 transition-all duration-150"
          >
            <i className="fas fa-image mr-3"></i>Gallery
          </Link>

          {/* Contact Us */}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-8 py-4 text-white hover:bg-primary border-b border-white/10 transition-all duration-150"
          >
            <i className="fas fa-phone mr-3"></i>Contact Us
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;

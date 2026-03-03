import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const CitizensCharter = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const benefitsRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  // Sample service categories that will be included in the charter
  const serviceCategories = [
    {
      icon: "fa-id-card",
      title: "Civil Registration Services",
      color: "blue",
      services: [
        "Birth Certificate Issuance",
        "Marriage Certificate Issuance",
        "Death Certificate Issuance",
        "CENOMAR (Certificate of No Marriage)",
      ],
    },
    {
      icon: "fa-store",
      title: "Business & Permits",
      color: "green",
      services: [
        "Business Permit Application",
        "Business Permit Renewal",
        "Mayor's Permit",
        "Barangay Clearance",
      ],
    },
    {
      icon: "fa-building",
      title: "Building & Construction",
      color: "yellow",
      services: [
        "Building Permit Application",
        "Electrical Permit",
        "Plumbing Permit",
        "Fencing Permit",
      ],
    },
    {
      icon: "fa-file-invoice-dollar",
      title: "Tax & Assessment",
      color: "purple",
      services: [
        "Real Property Tax Payment",
        "Business Tax Payment",
        "Community Tax Certificate",
        "Tax Clearance",
      ],
    },
    {
      icon: "fa-hand-holding-heart",
      title: "Social Services",
      color: "pink",
      services: [
        "Senior Citizen ID",
        "PWD ID Application",
        "Financial Assistance",
        "Medical Assistance",
      ],
    },
    {
      icon: "fa-briefcase",
      title: "Employment Services",
      color: "indigo",
      services: [
        "Job Placement Assistance",
        "Livelihood Program Registration",
        "Skills Training Information",
        "PESO Services",
      ],
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
            <span className="text-white/90">Citizens Charter</span>
          </nav>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Citizens Charter
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Your Guide to Government Services
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
          className={`bg-gradient-to-r from-primary to-primary-hover text-white shadow-2xl rounded-lg p-12 text-center scroll-animate ${
            introRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="mb-6">
            <i className="fas fa-clock text-6xl text-white/80"></i>
          </div>
          <h2 className="text-5xl font-bold mb-4">Coming Soon</h2>
          <p className="text-2xl text-white/90 mb-6">
            We're developing a comprehensive Citizens Charter for your convenience
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-lg">
              <i className="fas fa-clock mr-2"></i>
              The Citizens Charter is being prepared and will be available soon
            </p>
          </div>
        </section>

        {/* What is Citizens Charter */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">What is a Citizens Charter?</h2>
          </div>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              A <strong>Citizens Charter</strong> is an official document that describes the
              services provided by government offices, including the step-by-step procedures,
              required documents, processing time, fees, and the persons responsible for each
              service.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-bullseye text-primary mr-3"></i>
                Purpose of the Citizens Charter
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>
                    <strong>Transparency:</strong> Provide clear information about government
                    services and procedures
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>
                    <strong>Accountability:</strong> Set clear standards and timelines for
                    service delivery
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>
                    <strong>Efficiency:</strong> Help citizens prepare requirements and
                    complete transactions faster
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>
                    <strong>Quality Service:</strong> Establish citizen's rights and redress
                    mechanisms
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                <i className="fas fa-gavel mr-2"></i>
                Legal Basis
              </h4>
              <p className="text-yellow-700 mb-2">
                The Citizens Charter is mandated by the following laws and policies:
              </p>
              <ul className="space-y-1 text-yellow-700 text-sm">
                <li>
                  • <strong>Republic Act No. 9485</strong> - Anti-Red Tape Act of 2007
                </li>
                <li>
                  • <strong>Republic Act No. 11032</strong> - Ease of Doing Business and
                  Efficient Government Service Delivery Act of 2018
                </li>
                <li>
                  • <strong>CSC Memorandum Circular No. 39, s. 2023</strong> - Guidelines on the
                  Establishment of a Citizens Charter
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section
          ref={servicesRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            servicesRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Services to be Included</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            The Citizens Charter will provide detailed information for all municipal services,
            organized by department and category:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300`}
              >
                <div
                  className={`w-14 h-14 bg-${category.color}-600/20 rounded-full flex items-center justify-center mb-4`}
                >
                  <i
                    className={`fas ${category.icon} text-${category.color}-600 text-2xl`}
                  ></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.services.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <i className="fas fa-chevron-right text-primary mt-1 text-xs"></i>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <i className="fas fa-info-circle text-primary mr-2"></i>
              What Each Service Entry Will Include
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <i className="fas fa-clipboard-list text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Requirements</h4>
                  <p className="text-gray-700 text-sm">
                    Complete list of documents needed for the transaction
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-sitemap text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Procedures</h4>
                  <p className="text-gray-700 text-sm">
                    Step-by-step process from application to completion
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-clock text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Processing Time</h4>
                  <p className="text-gray-700 text-sm">
                    Expected duration for each step and overall completion
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-money-bill-wave text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Fees</h4>
                  <p className="text-gray-700 text-sm">
                    Detailed breakdown of all applicable fees and charges
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-user-tie text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Responsible Person</h4>
                  <p className="text-gray-700 text-sm">
                    Office and personnel in charge of the service
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-comments text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Feedback Mechanism</h4>
                  <p className="text-gray-700 text-sm">
                    How to report issues or provide feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          ref={benefitsRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            benefitsRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Benefits of the Citizens Charter
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-users text-green-600 mr-3"></i>
                For Citizens
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    <i className="fas fa-check-circle text-green-600 mr-2"></i>
                    Know What to Expect
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Clear information on requirements, procedures, fees, and timelines before
                    visiting the office
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    <i className="fas fa-check-circle text-green-600 mr-2"></i>
                    Save Time and Money
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Prepare complete requirements in advance, reducing return visits and wasted
                    trips
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    <i className="fas fa-check-circle text-green-600 mr-2"></i>
                    Assert Your Rights
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Know your rights as a client and have clear channels for complaints and
                    feedback
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    <i className="fas fa-check-circle text-green-600 mr-2"></i>
                    Better Service Quality
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Established service standards ensure consistent and quality service delivery
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-building text-blue-600 mr-3"></i>
                For Government
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                    Improved Efficiency
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Standardized procedures reduce processing time and minimize errors
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                    Enhanced Accountability
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Clear assignment of responsibilities makes personnel accountable for service
                    delivery
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                    Reduced Red Tape
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Streamlined procedures eliminate unnecessary steps and reduce bureaucracy
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                    Public Trust
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Transparency and accountability build citizen confidence in government
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback and Complaints */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Report Service Issues
            </h2>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Citizens Charter will include a comprehensive feedback and complaints mechanism.
            If you experience any issues with government services, you'll be able to report them
            through multiple channels:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-phone text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hotline</h3>
              <p className="text-gray-700 text-sm mb-3">
                Call our dedicated service hotline for immediate assistance
              </p>
              <p className="text-lg font-bold text-red-600">(043) 276-0047</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-comments text-orange-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-700 text-sm mb-3">
                Visit the Public Assistance and Complaints Desk at the Municipal Hall
              </p>
              <p className="text-sm font-bold text-orange-600">
                Municipal Hall, Ground Floor
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-comments text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">In Person</h3>
              <p className="text-gray-700 text-sm mb-3">
                Visit the Public Assistance and Complaints Desk
              </p>
              <p className="text-sm font-bold text-purple-600">Municipal Hall, Ground Floor</p>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
              <i className="fas fa-shield-alt mr-2"></i>
              Your Rights as a Citizen
            </h4>
            <ul className="space-y-1 text-yellow-700 text-sm">
              <li>• Right to receive timely and quality service</li>
              <li>• Right to be informed of requirements, procedures, and fees</li>
              <li>• Right to courteous and respectful treatment</li>
              <li>• Right to file complaints and receive response within 5 working days</li>
              <li>• Right to redress for service failures or violations</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            contactRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Need Information Now?</h2>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            While we prepare the comprehensive Citizens Charter, you can still inquire about
            specific services by contacting the relevant offices:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-phone text-primary mr-2"></i>
                Municipal Information Desk
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                For general inquiries about municipal services and procedures
              </p>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>
                  <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                  Municipal Hall, Ground Floor
                </p>
                 <p>
                   <i className="fas fa-phone mr-2 text-primary"></i>
                   (043) 276-0047
                 </p>
                <p>
                  <i className="fas fa-clock mr-2 text-primary"></i>
                  Monday to Friday, 8:00 AM - 5:00 PM
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-headset text-green-600 mr-2"></i>
                Action Center
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                For complaints, feedback, and assistance with service issues
              </p>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>
                  <i className="fas fa-map-marker-alt mr-2 text-green-600"></i>
                  Municipal Hall, 2nd Floor
                </p>
                 <p>
                   <i className="fas fa-phone mr-2 text-green-600"></i>
                   Trunkline: (043) 276-0047 local 200-201
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-4">
            <i className="fas fa-bell text-5xl text-white/80"></i>
          </div>
          <h3 className="text-3xl font-bold mb-4">Get Notified When It's Ready</h3>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            We'll announce the launch of the Citizens Charter through our official channels.
            Follow us to stay updated!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/MunicipalityOfTuy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CitizensCharter;

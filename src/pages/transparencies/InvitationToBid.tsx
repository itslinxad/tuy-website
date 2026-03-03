import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const InvitationToBid = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const introRef = useScrollAnimation();
  const processRef = useScrollAnimation();
  const categoriesRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const procurementCategories = [
    {
      icon: "fa-road",
      title: "Infrastructure Projects",
      color: "blue",
      description: "Construction and improvement of roads, bridges, buildings, and facilities",
      examples: [
        "Road Concreting & Rehabilitation",
        "Building Construction",
        "Bridge Construction & Repair",
        "Drainage Systems",
      ],
    },
    {
      icon: "fa-shopping-cart",
      title: "Goods & Supplies",
      color: "green",
      description: "Purchase of equipment, materials, and supplies for municipal operations",
      examples: [
        "Office Equipment & Supplies",
        "Medical Supplies",
        "IT Equipment",
        "Vehicles & Machinery",
      ],
    },
    {
      icon: "fa-tools",
      title: "Consulting Services",
      color: "purple",
      description: "Professional and technical services for various municipal needs",
      examples: [
        "Engineering Services",
        "Architectural Design",
        "IT Consultancy",
        "Training & Capacity Building",
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
            <span className="text-white/90">Invitation to Bid</span>
          </nav>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Invitation to Bid
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Public Procurement Opportunities
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
            We're setting up an online portal for procurement opportunities
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-lg">
              <i className="fas fa-calendar-alt mr-2"></i>
              Expected Launch: Q3 2024
            </p>
          </div>
        </section>

        {/* About Procurement */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">About Public Procurement</h2>
          </div>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              The Municipality of Tuy conducts public bidding for various projects, goods, and
              services in accordance with Republic Act No. 9184 (Government Procurement Reform
              Act) and its Revised Implementing Rules and Regulations (IRR).
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-bullseye text-primary mr-3"></i>
                Goals of Public Procurement
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Transparency</h4>
                    <p className="text-sm">Open and fair bidding process for all qualified parties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Competition</h4>
                    <p className="text-sm">Encourage competitive pricing and quality proposals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Efficiency</h4>
                    <p className="text-sm">Streamlined process for timely project implementation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Value for Money</h4>
                    <p className="text-sm">Best quality goods and services at reasonable prices</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                <i className="fas fa-gavel mr-2"></i>
                Legal Framework
              </h4>
              <ul className="space-y-1 text-yellow-700 text-sm">
                <li>
                  • <strong>Republic Act No. 9184</strong> - Government Procurement Reform Act
                </li>
                <li>
                  • <strong>2016 Revised IRR of RA 9184</strong> - Implementing Rules and
                  Regulations
                </li>
                <li>
                  • <strong>GPPB Resolutions and Circulars</strong> - Guidelines from the
                  Government Procurement Policy Board
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Procurement Categories */}
        <section
          ref={categoriesRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            categoriesRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Types of Procurement</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            The municipality conducts bidding for various categories of projects and services:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {procurementCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300`}
              >
                <div
                  className={`w-14 h-14 bg-${category.color}-600/20 rounded-full flex items-center justify-center mb-4`}
                >
                  <i className={`fas ${category.icon} text-${category.color}-600 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{category.description}</p>
                <h4 className="font-bold text-gray-900 text-sm mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {category.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <i className="fas fa-check text-primary mt-1 text-xs"></i>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Bidding Process */}
        <section
          ref={processRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            processRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">The Bidding Process</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Understanding the public bidding process helps potential bidders prepare and participate
            effectively:
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  1
                </div>
              </div>
              <div className="flex-1 bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <i className="fas fa-bullhorn text-primary mr-2"></i>
                  Advertisement / Posting
                </h3>
                <p className="text-gray-700 mb-3">
                  Invitation to Bid (ITB) is published in newspapers, PhilGEPS (Philippine
                  Government Electronic Procurement System), and the municipal website
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Timeline:</strong> At least 7 calendar days before pre-bid conference
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  2
                </div>
              </div>
              <div className="flex-1 bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <i className="fas fa-users text-green-600 mr-2"></i>
                  Pre-Bid Conference
                </h3>
                <p className="text-gray-700 mb-3">
                  Meeting where prospective bidders can ask questions and seek clarifications about
                  the project requirements and bidding documents
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Attendance:</strong> Optional but highly recommended
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  3
                </div>
              </div>
              <div className="flex-1 bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <i className="fas fa-file-alt text-purple-600 mr-2"></i>
                  Submission of Bids
                </h3>
                <p className="text-gray-700 mb-3">
                  Bidders submit their proposals in sealed envelopes containing eligibility
                  documents, technical proposals, and financial proposals
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Deadline:</strong> Specified in the ITB, usually 2-4 weeks after posting
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  4
                </div>
              </div>
              <div className="flex-1 bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <i className="fas fa-envelope-open text-yellow-600 mr-2"></i>
                  Opening of Bids
                </h3>
                <p className="text-gray-700 mb-3">
                  Public opening of bids where eligibility documents and technical proposals are
                  opened and evaluated by the Bids and Awards Committee (BAC)
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Transparency:</strong> Open to the public and all bidders
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  5
                </div>
              </div>
              <div className="flex-1 bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <i className="fas fa-clipboard-check text-red-600 mr-2"></i>
                  Evaluation & Post-Qualification
                </h3>
                <p className="text-gray-700 mb-3">
                  BAC evaluates all proposals based on eligibility, technical compliance, and
                  financial offer. The Lowest Calculated Responsive Bid (LCRB) undergoes
                  post-qualification
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> Varies depending on project complexity
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  6
                </div>
              </div>
              <div className="flex-1 bg-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <i className="fas fa-award text-indigo-600 mr-2"></i>
                  Award of Contract
                </h3>
                <p className="text-gray-700 mb-3">
                  Notice of Award is issued to the winning bidder, followed by signing of the
                  contract and issuance of Notice to Proceed
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Implementation:</strong> Project starts after contract signing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Bidders */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Information for Prospective Bidders</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-check-circle text-green-600 mr-3"></i>
                Eligibility Requirements
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Legal Documents</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Valid Business Registration Certificate</li>
                    <li>• Mayor's/Business Permit</li>
                    <li>• Tax Clearance</li>
                    <li>• PhilGEPS Registration Number</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Technical Documents</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Statement of All Ongoing/Completed Contracts</li>
                    <li>• PCAB License (for contractors)</li>
                    <li>• Financial Statements</li>
                    <li>• Organizational Chart</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Financial Requirements</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Audited Financial Statements (latest 2 years)</li>
                    <li>• Bid Security (cash, cashier's check, or surety bond)</li>
                    <li>• Computation of Net Financial Contracting Capacity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-lightbulb text-yellow-600 mr-3"></i>
                Tips for Successful Bidding
              </h3>
              <div className="space-y-3">
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-star text-yellow-600 mt-1"></i>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Register Early</h4>
                      <p className="text-gray-700 text-sm">
                        Register with PhilGEPS and the municipal BAC well before bidding
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-star text-blue-600 mt-1"></i>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Attend Pre-Bid</h4>
                      <p className="text-gray-700 text-sm">
                        Attend the pre-bid conference to clarify requirements
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-star text-green-600 mt-1"></i>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Read Documents Carefully</h4>
                      <p className="text-gray-700 text-sm">
                        Thoroughly review all bidding documents and technical specifications
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-star text-purple-600 mt-1"></i>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Submit Complete Documents</h4>
                      <p className="text-gray-700 text-sm">
                        Ensure all required documents are complete and properly organized
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-star text-red-600 mt-1"></i>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Meet Deadlines</h4>
                      <p className="text-gray-700 text-sm">
                        Submit bids before the deadline; late submissions are not accepted
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact BAC */}
        <section
          ref={contactRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            contactRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Contact the BAC Secretariat</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            For inquiries about ongoing or upcoming bidding opportunities, please contact the Bids
            and Awards Committee (BAC) Secretariat:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 text-xl mb-4 flex items-center">
                <i className="fas fa-building text-primary mr-2"></i>
                BAC Secretariat Office
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-3">
                  <i className="fas fa-map-marker-alt text-primary mt-1"></i>
                  <span>
                    <strong>Office Location:</strong>
                    <br />
                    Municipal Planning and Development Office
                    <br />
                    Municipal Hall, 2nd Floor
                    <br />
                    Tuy, Batangas
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <i className="fas fa-phone text-primary mt-1"></i>
                  <span>
                    <strong>Phone:</strong> Trunkline: (043) 276-0047 local 206
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <i className="fas fa-clock text-primary mt-1"></i>
                  <span>
                    <strong>Office Hours:</strong>
                    <br />
                    Monday to Friday, 8:00 AM - 5:00 PM
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-xl mb-4 flex items-center">
                <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                What You Can Inquire About
              </h3>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-4">
                  <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                  <span className="text-gray-700">
                    Current and upcoming bidding opportunities
                  </span>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <i className="fas fa-check-circle text-green-600 mr-2"></i>
                  <span className="text-gray-700">Procurement schedule and timelines</span>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <i className="fas fa-check-circle text-purple-600 mr-2"></i>
                  <span className="text-gray-700">
                    How to obtain bidding documents and specifications
                  </span>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <i className="fas fa-check-circle text-yellow-600 mr-2"></i>
                  <span className="text-gray-700">
                    Eligibility requirements and documentation
                  </span>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <i className="fas fa-check-circle text-red-600 mr-2"></i>
                  <span className="text-gray-700">
                    Pre-bid conference schedules and venues
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Important Reminder
            </h4>
            <p className="text-yellow-700 text-sm">
              All official announcements regarding bidding opportunities are posted on PhilGEPS
              (www.philgeps.gov.ph) and published in newspapers of general circulation. Be wary of
              fraudulent schemes and only transact with the official BAC Secretariat.
            </p>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-4">
            <i className="fas fa-bell text-5xl text-white/80"></i>
          </div>
          <h3 className="text-3xl font-bold mb-4">Stay Updated on Bidding Opportunities</h3>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Once our online portal is ready, you'll be able to view all current and upcoming
            bidding opportunities in one place. Follow us for updates!
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <a
              href="https://www.facebook.com/MunicipalityOfTuy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
          </div>
          <p className="text-sm text-white/80">
            Or visit PhilGEPS at{" "}
            <a
              href="https://www.philgeps.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              www.philgeps.gov.ph
            </a>{" "}
            for current opportunities
          </p>
        </section>
      </div>
    </div>
  );
};

export default InvitationToBid;

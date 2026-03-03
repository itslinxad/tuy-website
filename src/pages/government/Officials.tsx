import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Officials = () => {
  // Parallax effect for hero section
  const { offset } = useParallax({ speed: 0.3 });

  // Scroll animation hooks for each section
  const introRef = useScrollAnimation();
  const mayorRef = useScrollAnimation();
  const viceMayorRef = useScrollAnimation();
  const councilorsRef = useScrollAnimation();
  const exOfficioRef = useScrollAnimation();

  const basePath = import.meta.env.VITE_BASE_PATH || "";

  // Mayor Information — Source: TUY_WEBSITE_DETAILS.xlsx
  const mayorInfo = {
    name: "Hon. Jose Jecerell C. Cerrado",
    position: "Municipal Mayor",
    photoPath: `${basePath}/OfficialS_PIC/Jose Jecerell C. Cerrado.jpg`,
    phone: "(043) 276-0047 local 200-201",
  };

  // Vice Mayor Information
  const viceMayorInfo = {
    name: "Hon. Armando P. Afable",
    position: "Municipal Vice Mayor",
    photoPath: `${basePath}/OfficialS_PIC/Armando P. Afable.jpg`,
    phone: "(043) 276-0121",
  };

  // Sangguniang Bayan Members with Committee Assignments
  const sanggunianMembers = [
    {
      name: "Hon. Roselio F. Balbacal",
      position: "Sangguniang Bayan Member",
      photoPath: `${basePath}/OfficialS_PIC/Roselio F. Balbacal.jpg`,
      committees: [
        "Committee on Laws and Ordinances",
        "Committee on Ways and Means",
        "Committee on Market and Slaughterhouse",
      ],
    },
    {
      name: "Hon. Randoll I. Catapang",
      position: "Sangguniang Bayan Member",
      photoPath: `${basePath}/OfficialS_PIC/Randoll I. Catapang.jpg`,
      committees: [
        "Committee on Energy",
        "Committee on Peace, Order and Public Safety",
        "Committee on Transportation",
      ],
    },
    {
      name: "Hon. Rafael C. Bautista",
      position: "Sangguniang Bayan Member",
      photoPath: `${basePath}/OfficialS_PIC/Rafael C. Bautista.jpg`,
      committees: [
        "Committee on Internal Rules and Procedure",
        "Committee on Social Welfare",
        "Committee on Cooperatives and Non-Government Organizations",
      ],
    },
    {
      name: "Hon. Jerome B. Patulot",
      position: "Sangguniang Bayan Member",
      photoPath: `${basePath}/OfficialS_PIC/Jerome B. Patulot.jpg`,
      committees: [
        "Committee on Work, Labor and Employment",
        "Committee on Trade, Commerce, and Industry",
        "Committee on Public Information and Communication",
      ],
    },
    {
      name: "Hon. Eduardo P. Afable Jr.",
      position: "Sangguniang Bayan Member",
      photoPath: `${basePath}/OfficialS_PIC/Eduardo P. Afable Jr. .jpg`,
      committees: [
        "Committee on Budget and Appropriation",
        "Committee on Education and Culture",
        "Committee on Housing and Land Use",
      ],
    },
    {
      name: "Hon. Adrian C. Perez",
      position: "Sangguniang Bayan Member",
      photoPath: `${basePath}/OfficialS_PIC/Adrian C. Perez.jpg`,
      committees: [
        "Committee on Health",
        "Committee on Climate Change Adaptation and Disaster Risk Reduction",
      ],
    },
    {
      name: "Hon. Modesto P. Barangas",
      position: "Sangguniang Bayan Member",
      photoPath: `${basePath}/OfficialS_PIC/Modesto P. Barangas.jpg`,
      committees: [
        "Committee on Agriculture",
        "Committee on Barangay Works and Community Development",
        "Committee on Public Works and Public Use",
      ],
    },
    {
      name: "Hon. Kim Ysabelle C. Mercado",
      position: "Sangguniang Bayan Member",
      photoPath: `${basePath}/OfficialS_PIC/Kim Ysabelle C. Mercado.jpg`,
      committees: [
        "Committee on Women and Family",
        "Committee on Food Governance, Public Ethics, and Accountability",
        "Committee on Tourism",
      ],
    },
  ];

  // Ex-Officio Members
  const exOfficioMembers = [
    {
      name: "Hon. Roberto A. Mendoza",
      position: "ABC President",
      organization: "Association of Barangay Captains",
      photoPath: `${basePath}/OfficialS_PIC/Roberto A. Mendoza.jpg`,
      description:
        "Represents the barangay captains of Tuy's 22 barangays as an ex-officio member of the Sangguniang Bayan.",
      committees: [
        "Committee on Justice and Human Rights",
        "Committee on Illegal Drugs",
        "Committee on Games and Amusement",
        "Committee on Environmental Protection and Natural Resources",
      ],
    },
    {
      name: "Hon. Ly-anne Angeline D. Avena",
      position: "SK Federation President",
      organization: "Sangguniang Kabataan Federation",
      photoPath: `${basePath}/OfficialS_PIC/Ly-anne Angeline D. Avena.jpg`,
      description:
        "Represents the youth sector as an ex-officio member of the Sangguniang Bayan.",
      committees: ["Committee on Youth Development and Sports"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section with Parallax */}
      <section className="relative w-full h-[600px] overflow-hidden">
        {/* Parallax Background Image */}
        <div
          className="parallax-bg"
          style={{
            transform: `translateY(${offset}px)`,
            backgroundImage: `url('${basePath}/hero-image.jpg')`,
          }}
        ></div>

        {/* Multi-layer Overlays */}
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
            <span className="text-white/90">Municipal Officials</span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Municipal Officials
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Leadership Serving the People of Tuy
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">
        {/* Introduction Section */}
        <section
          ref={introRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            introRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Our Local Government
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              The Municipal Government of Tuy, Batangas is led by elected
              officials who serve the municipality's 22 barangays and over
              47,000 residents. The current administration is committed to
              transparent governance, efficient delivery of public services, and
              inclusive development for all sectors of the community.
            </p>
            <p>
              The Sangguniang Bayan (Municipal Council) is composed of eight
              elected councilors, together with ex-officio members representing
              the barangay captains and the youth sector. They enact ordinances,
              approve the municipal budget, and oversee the implementation of
              local policies and programs.
            </p>
          </div>
        </section>

        {/* Mayor Section */}
        <section
          ref={mayorRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            mayorRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-8">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Municipal Mayor</h2>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Photo */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                    <img
                      src={mayorInfo.photoPath}
                      alt={mayorInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-primary text-white text-center">
                    <h3 className="text-xl font-bold">{mayorInfo.name}</h3>
                    <p className="text-white/90">{mayorInfo.position}</p>
                  </div>
                </div>
              </div>

              {/* Information */}
              <div className="md:col-span-2">
                <div className="space-y-6">
                  {/* Role */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="text-xl font-bold text-primary mb-3 flex items-center">
                      <i className="fas fa-user-tie text-primary mr-3"></i>
                      Role & Responsibilities
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      As the chief executive of the municipality, the Municipal
                      Mayor is responsible for overall governance, policy
                      implementation, and the delivery of basic services to all
                      constituents of Tuy. The Mayor exercises general
                      supervision over all programs, projects, and activities of
                      the municipal government.
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="text-xl font-bold text-primary mb-4 flex items-center">
                      <i className="fas fa-address-card text-primary mr-3"></i>
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex items-center gap-3">
                        <i className="fas fa-phone text-primary w-5"></i>
                        <span>{mayorInfo.phone}</span>
                      </p>
                      <p className="flex items-center gap-3">
                        <i className="fas fa-map-marker-alt text-primary w-5"></i>
                        <span>
                          Office of the Municipal Mayor, Tuy Municipal Hall
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vice Mayor Section */}
        <section
          ref={viceMayorRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            viceMayorRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-8">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Municipal Vice Mayor
            </h2>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Photo */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                    <img
                      src={viceMayorInfo.photoPath}
                      alt={viceMayorInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-primary text-white text-center">
                    <h3 className="text-xl font-bold">{viceMayorInfo.name}</h3>
                    <p className="text-white/90">{viceMayorInfo.position}</p>
                  </div>
                </div>
              </div>

              {/* Information */}
              <div className="md:col-span-2">
                <div className="space-y-6">
                  {/* Role & Responsibilities */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="text-xl font-bold text-primary mb-3 flex items-center">
                      <i className="fas fa-tasks text-primary mr-3"></i>
                      Role & Responsibilities
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The Municipal Vice Mayor serves as the presiding officer
                      of the Sangguniang Bayan and performs the duties of the
                      Municipal Mayor in case of temporary absence or
                      incapacity.
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2 text-gray-700">
                        <i className="fas fa-chevron-right text-primary mt-1"></i>
                        <span>
                          Presides over the Sangguniang Bayan sessions
                        </span>
                      </p>
                      <p className="flex items-start gap-2 text-gray-700">
                        <i className="fas fa-chevron-right text-primary mt-1"></i>
                        <span>
                          Acts as Municipal Mayor in case of temporary absence
                        </span>
                      </p>
                      <p className="flex items-start gap-2 text-gray-700">
                        <i className="fas fa-chevron-right text-primary mt-1"></i>
                        <span>
                          Coordinates legislative matters and ordinances
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="text-xl font-bold text-primary mb-4 flex items-center">
                      <i className="fas fa-address-card text-primary mr-3"></i>
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex items-center gap-3">
                        <i className="fas fa-phone text-primary w-5"></i>
                        <span>{viceMayorInfo.phone}</span>
                      </p>
                      <p className="flex items-center gap-3">
                        <i className="fas fa-map-marker-alt text-primary w-5"></i>
                        <span>
                          Office of the Municipal Vice Mayor, Tuy Municipal Hall
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sangguniang Bayan Members Section */}
        <section
          ref={councilorsRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            councilorsRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-8">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Sangguniang Bayan Members
            </h2>
          </div>

          <p className="text-gray-700 text-lg mb-8">
            The legislative body of the Municipality of Tuy, responsible for
            enacting ordinances, approving resolutions, and appropriating funds
            for municipal programs and projects.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sanggunianMembers.map((member, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden scroll-animate stagger-${
                  (index % 4) + 1
                } ${councilorsRef.isVisible ? "visible" : ""}`}
              >
                {/* Photo */}
                <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                  <img
                    src={member.photoPath}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{member.position}</p>

                  {/* Committees */}
                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                      Committee Chairmanship:
                    </p>
                    <div className="space-y-1">
                      {member.committees.map((committee, cIndex) => (
                        <p key={cIndex} className="text-xs text-gray-700">
                          {"\u2022"} {committee}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ex-Officio Members Section */}
        <section
          ref={exOfficioRef.elementRef}
          className={`bg-gradient-to-br from-primary to-primary-hover py-12 rounded-lg shadow-xl scroll-animate ${
            exOfficioRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="px-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ex-Officio Members
            </h2>
            <p className="text-white/90 text-lg mb-10">
              Representatives from the barangays and youth sector serving as
              ex-officio members of the Sangguniang Bayan.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {exOfficioMembers.map((member, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all scroll-animate stagger-${
                    index + 1
                  } ${exOfficioRef.isVisible ? "visible" : ""}`}
                >
                  <div className="flex items-start gap-6">
                    {/* Photo */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                        <img
                          src={member.photoPath}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary font-semibold mb-1">
                        {member.position}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {member.organization}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {member.description}
                      </p>
                      {/* Committees */}
                      <div className="border-t border-gray-200 pt-3">
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                          Committee Chairmanship:
                        </p>
                        <div className="space-y-1">
                          {member.committees.map((committee, cIndex) => (
                            <p key={cIndex} className="text-xs text-gray-700">
                              {"\u2022"} {committee}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <i className="fas fa-info-circle text-primary mr-3"></i>
            How to Reach Your Officials
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              The municipal officials welcome feedback, concerns, and suggestions
              from the residents of Tuy. You may reach them through:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <i className="fas fa-chevron-right text-primary mt-1"></i>
                <span>
                  <strong>Trunkline:</strong> (043) 276-0047 / (043) 276-0100 /
                  (043) 276-0104 / (043) 276-0102
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-chevron-right text-primary mt-1"></i>
                <span>
                  <strong>Office Hours:</strong> Monday to Friday, 8:00 AM -
                  5:00 PM
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-chevron-right text-primary mt-1"></i>
                <span>
                  <strong>Walk-in:</strong> Visit the Tuy Municipal Hall during
                  office hours
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-chevron-right text-primary mt-1"></i>
                <span>
                  <strong>Sangguniang Bayan:</strong> (043) 276-0121
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Officials;

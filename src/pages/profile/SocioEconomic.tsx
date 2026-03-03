import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const SocioEconomic = () => {
  // Parallax effect for hero section
  const { offset } = useParallax({ speed: 0.3 });

  // Scroll animation hooks for each section
  const overviewRef = useScrollAnimation();
  const indicatorsRef = useScrollAnimation();
  const povertyRef = useScrollAnimation();
  const industriesRef = useScrollAnimation();
  const resourcesRef = useScrollAnimation();
  const infrastructureRef = useScrollAnimation();
  const educationRef = useScrollAnimation();

  // Economic Indicators — Source: PSA, DOF-BLGF
  const economicIndicators = [
    {
      icon: "fa-chart-line",
      value: "6.12",
      suffix: "%",
      label: "Poverty Incidence",
      description: "Among population, 2021 (PSA)",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: "fa-coins",
      value: "\u20B1226.8M",
      label: "Annual Revenue",
      description: "Total LGU revenue, 2022 (BLGF)",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: "fa-award",
      value: "3rd",
      label: "Income Class",
      description: "Municipal income classification",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: "fa-map-marked-alt",
      value: "22",
      label: "Barangays",
      description: "Administrative subdivisions",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  // Poverty Incidence Trend — Source: PSA Small Area Estimates
  const povertyTrend = [
    { year: "2000", rate: 51.09 },
    { year: "2003", rate: 37.36 },
    { year: "2006", rate: 26.6 },
    { year: "2009", rate: 18.03 },
    { year: "2012", rate: 19.77 },
    { year: "2015", rate: 12.44 },
    { year: "2018", rate: 11.88 },
    { year: "2021", rate: 6.12 },
  ];

  // Major Industries — Source: Wikipedia (Municipality of Tuy), local records
  const majorIndustries = [
    {
      title: "Sugarcane Farming",
      icon: "fa-seedling",
      color: "bg-green-100 text-green-600",
      description:
        "Sugarcane is the primary agricultural crop of Tuy, with production exceeding 30,000 metric tons per milling season. The harvested cane is transported to sugar centrals (mills) in the neighboring municipalities of Nasugbu and Balayan for processing. Sugarcane farming remains a major source of livelihood for farming households across the municipality.",
      keyActivities: [
        "Sugarcane cultivation and harvesting",
        "Transport to Nasugbu and Balayan mills",
        "Seasonal farm labor employment",
        "Muscovado and raw sugar production",
      ],
    },
    {
      title: "Mango & Fruit Cultivation",
      icon: "fa-apple-alt",
      color: "bg-yellow-100 text-yellow-600",
      description:
        "Tuy is known for its mango orchards, particularly the Indian mango variety. Mangoes from Tuy are sold in local markets and traded regionally. In addition to mangoes, cassava is also a significant crop, used both for food and as raw material for local food products.",
      keyActivities: [
        "Indian mango orchards",
        "Cassava cultivation",
        "Seasonal fruit trading",
        "Local market distribution",
      ],
    },
    {
      title: "Bakery & Food Products",
      icon: "fa-bread-slice",
      color: "bg-orange-100 text-orange-600",
      description:
        "Tuy has a longstanding bakery tradition dating back to the 1960s. The municipality is known for its jacobina biscuits and biscocho, which are produced by local bakeries and sold throughout Batangas province and beyond. These products are considered local delicacies and are a source of community pride.",
      keyActivities: [
        "Jacobina biscuit production",
        "Biscocho manufacturing",
        "Local bakery operations",
        "Regional distribution of baked goods",
      ],
    },
    {
      title: "Poultry & Livestock",
      icon: "fa-drumstick-bite",
      color: "bg-red-100 text-red-600",
      description:
        "Poultry and livestock raising supplements the agricultural economy of Tuy. Households and small-scale farms raise chickens, hogs, and cattle for both local consumption and commercial sale in nearby town markets.",
      keyActivities: [
        "Poultry raising (chickens, ducks)",
        "Hog and cattle farming",
        "Local meat supply",
        "Small-scale commercial operations",
      ],
    },
  ];

  // Natural Resources — Source: Wikipedia (Municipality of Tuy)
  const naturalResources = [
    {
      title: "Quarrying & Construction Materials",
      icon: "fa-mountain",
      color: "bg-gray-100 text-gray-600",
      description:
        "Sand, gravel, earth fill, and other construction materials are extracted from rivers and hilly areas within the municipality. Quarrying activities provide employment and supply materials for local and regional construction projects.",
    },
    {
      title: "Timber & Forest Products",
      icon: "fa-tree",
      color: "bg-green-100 text-green-600",
      description:
        "Timber resources are found in the forested barangays of Dalima, Talon, Palincaro, Malibu, Toong, Magahis, and San Jose. These areas contain trees and forest products that support small-scale lumber and wood-related livelihoods.",
    },
  ];

  // Infrastructure — Source: Wikipedia (Municipality of Tuy)
  const infrastructure = {
    power: {
      title: "Power & Electricity",
      icon: "fa-bolt",
      items: [
        "Electricity supplied by BATELEC I (Batangas I Electric Cooperative)",
        "Coverage extends to all 22 barangays",
      ],
    },
    bridges: {
      title: "Bridges",
      icon: "fa-archway",
      items: [
        "8 concrete bridges in the municipality",
        "6 along national roads",
        "2 along provincial roads",
      ],
    },
    transportation: {
      title: "Transportation",
      icon: "fa-bus",
      items: [
        "Jeepney routes: Balayan\u2013Tuy\u2013Nasugbu and local routes",
        "Tricycles for intra-municipal transport",
        "Bus services to Manila (via Tagaytay) and Batangas City",
        "Connected to national highway network",
      ],
    },
    telecommunications: {
      title: "Telecommunications",
      icon: "fa-wifi",
      items: [
        "Globe Telecom coverage",
        "PLDT landline and broadband services",
        "Smart Communications mobile coverage",
        "DITO Telecommunity services",
      ],
    },
  };

  // Education Facilities — Source: Wikipedia (Municipality of Tuy), DepEd records
  const elementarySchools = [
    "Acle Elementary School",
    "Bagong Silang Elementary School",
    "Bolbok Elementary School",
    "Burgos Elementary School",
    "Dalima Elementary School",
    "Dao Elementary School",
    "Guinhawa Elementary School",
    "Ipil Elementary School",
    "Lumbangan Elementary School",
    "Luntal Elementary School",
    "Magahis Elementary School",
    "Malibu Elementary School",
    "Palincaro Elementary School",
    "Putol Elementary School",
    "Rillo Elementary School",
    "Rizal Elementary School (Poblacion)",
    "Sabang Elementary School",
    "San Jose Elementary School",
    "Talon Elementary School",
  ];

  const secondarySchools = [
    "Tuy National High School (Poblacion)",
    "Dalima National High School",
    "Luntal National High School",
    "Rillo National High School",
    "Sabang National High School",
    "Toong National High School",
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
            backgroundImage: `url('${import.meta.env.VITE_BASE_PATH}/hero-image.jpg')`,
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
            <span className="text-white/90">Socio-Economic</span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Socio-Economic Profile
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Economy, Infrastructure, and Development
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">
        {/* Economic Overview Section */}
        <section
          ref={overviewRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            overviewRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Economic Overview
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Tuy is classified as a 3rd municipal income class municipality in
              the province of Batangas. Its economy is predominantly
              agricultural, anchored by sugarcane farming, mango cultivation,
              cassava production, and livestock raising. The municipality also
              has a notable local food products industry, particularly its
              heritage bakery tradition producing jacobina biscuits and biscocho
              since the 1960s.
            </p>
            <p>
              With a total annual LGU revenue of approximately {"\u20B1"}226.8
              million (2022, Bureau of Local Government Finance), Tuy has shown
              steady fiscal growth in recent years. The municipality's poverty
              incidence has declined significantly over two decades, dropping
              from 51.09% in 2000 to 6.12% in 2021 according to PSA Small Area
              Estimates, reflecting sustained improvements in the local standard
              of living.
            </p>
            <p>
              Natural resources including sand, gravel, and timber from forested
              barangays complement the agricultural economy. The municipality is
              well-connected through the national highway network, with
              transportation links to Nasugbu, Balayan, Batangas City, and
              Manila, supporting trade and commerce.
            </p>
          </div>
        </section>

        {/* Economic Indicators Dashboard */}
        <section
          ref={indicatorsRef.elementRef}
          className={`bg-gradient-to-br from-primary to-primary-hover py-12 rounded-lg shadow-xl scroll-animate ${
            indicatorsRef.isVisible ? "visible" : ""
          }`}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Economic Indicators
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            {economicIndicators.map((indicator, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-6 hover:shadow-xl transition-all scroll-animate stagger-${
                  index + 1
                } ${indicatorsRef.isVisible ? "visible" : ""}`}
              >
                <div
                  className={`w-14 h-14 rounded-full ${indicator.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <i className={`fas ${indicator.icon} text-2xl`}></i>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {indicator.value}
                    {indicator.suffix || ""}
                  </div>
                  <div className="text-gray-800 font-semibold mb-1">
                    {indicator.label}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {indicator.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Poverty Incidence Trend Section */}
        <section
          ref={povertyRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            povertyRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Poverty Incidence Trend
            </h2>
          </div>
          <p className="text-gray-700 text-lg mb-8">
            Poverty incidence among population based on PSA Small Area Estimates,
            showing a significant decline from 51.09% (2000) to 6.12% (2021).
          </p>

          {/* Bar Chart */}
          <div className="space-y-4">
            {povertyTrend.map((entry, index) => {
              const maxRate = 55; // scale max for visual
              const barWidth = (entry.rate / maxRate) * 100;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 scroll-animate stagger-${
                    (index % 4) + 1
                  } ${povertyRef.isVisible ? "visible" : ""}`}
                >
                  <div className="w-16 text-right font-semibold text-gray-700">
                    {entry.year}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-hover flex items-center justify-end pr-3 transition-all duration-1000"
                      style={{ width: `${barWidth}%` }}
                    >
                      <span className="text-white text-sm font-bold">
                        {entry.rate}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-gray-500 text-sm mt-6 italic">
            Source: Philippine Statistics Authority (PSA) Small Area Estimates of
            Poverty Incidence
          </p>
        </section>

        {/* Major Industries Section */}
        <section
          ref={industriesRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            industriesRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Major Industries & Agriculture
            </h2>
          </div>
          <p className="text-gray-700 text-lg mb-8">
            Key economic activities driving Tuy's predominantly agricultural
            economy.
          </p>

          <div className="space-y-6">
            {majorIndustries.map((industry, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all scroll-animate-left stagger-${
                  (index % 3) + 1
                } ${industriesRef.isVisible ? "visible" : ""}`}
              >
                <div className="flex items-start gap-6 flex-wrap">
                  <div
                    className={`w-16 h-16 rounded-lg ${industry.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <i className={`fas ${industry.icon} text-3xl`}></i>
                  </div>
                  <div className="flex-1 min-w-[250px]">
                    <h3 className="text-2xl font-bold text-primary mb-3">
                      {industry.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {industry.description}
                    </p>
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                        Key Activities:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {industry.keyActivities.map((activity, actIndex) => (
                          <div
                            key={actIndex}
                            className="flex items-center gap-2"
                          >
                            <i className="fas fa-check-circle text-primary text-sm"></i>
                            <span className="text-gray-700">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Natural Resources Section */}
        <section
          ref={resourcesRef.elementRef}
          className={`bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg p-8 scroll-animate ${
            resourcesRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Natural Resources
            </h2>
          </div>
          <p className="text-gray-700 text-lg mb-8">
            Natural resources found within the municipality of Tuy.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {naturalResources.map((resource, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-6 hover:shadow-lg transition-all scroll-animate stagger-${
                  index + 1
                } ${resourcesRef.isVisible ? "visible" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-full ${resource.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <i className={`fas ${resource.icon} text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure Development Section */}
        <section
          ref={infrastructureRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            infrastructureRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Infrastructure
            </h2>
          </div>

          <div className="space-y-6">
            {Object.entries(infrastructure).map(
              ([key, category], catIndex) => (
                <div
                  key={key}
                  className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 scroll-animate-left stagger-${
                    catIndex + 1
                  } ${infrastructureRef.isVisible ? "visible" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <i
                        className={`fas ${category.icon} text-primary text-xl`}
                      ></i>
                    </div>
                    <h3 className="text-2xl font-bold text-primary">
                      {category.title}
                    </h3>
                  </div>

                  <ul className="space-y-2 ml-4">
                    {category.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <i className="fas fa-check-circle text-primary text-sm mt-1 flex-shrink-0"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Education Facilities Section */}
        <section
          ref={educationRef.elementRef}
          className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-8 scroll-animate ${
            educationRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Education Facilities
            </h2>
          </div>
          <p className="text-gray-700 text-lg mb-8">
            Educational institutions serving the municipality of Tuy, Batangas.
          </p>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-school text-lg"></i>
              </div>
              <div className="text-2xl font-bold text-primary">19</div>
              <div className="text-gray-600 text-sm">Elementary Schools</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-graduation-cap text-lg"></i>
              </div>
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-gray-600 text-sm">Secondary Schools</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-tools text-lg"></i>
              </div>
              <div className="text-2xl font-bold text-primary">1</div>
              <div className="text-gray-600 text-sm">Vocational School</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-university text-lg"></i>
              </div>
              <div className="text-2xl font-bold text-primary">1</div>
              <div className="text-gray-600 text-sm">Higher Education</div>
            </div>
          </div>

          {/* Elementary Schools List */}
          <div
            className={`bg-white rounded-lg p-6 mb-6 scroll-animate stagger-1 ${
              educationRef.isVisible ? "visible" : ""
            }`}
          >
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <i className="fas fa-school text-blue-600"></i>
              Elementary Schools (19)
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              {elementarySchools.map((school, index) => (
                <div key={index} className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-primary text-xs"></i>
                  <span className="text-gray-700 text-sm">{school}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Schools List */}
          <div
            className={`bg-white rounded-lg p-6 mb-6 scroll-animate stagger-2 ${
              educationRef.isVisible ? "visible" : ""
            }`}
          >
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <i className="fas fa-graduation-cap text-green-600"></i>
              Secondary Schools (6)
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              {secondarySchools.map((school, index) => (
                <div key={index} className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-primary text-xs"></i>
                  <span className="text-gray-700 text-sm">{school}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Higher Education */}
          <div
            className={`bg-white rounded-lg p-6 scroll-animate stagger-3 ${
              educationRef.isVisible ? "visible" : ""
            }`}
          >
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <i className="fas fa-university text-purple-600"></i>
              Higher Education & Vocational
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <i className="fas fa-check-circle text-primary text-xs mt-1"></i>
                <div>
                  <span className="text-gray-700 text-sm font-semibold">
                    Dr. Francisco L. Calingasan Memorial Colleges Foundation
                  </span>
                  <p className="text-gray-500 text-xs">
                    Higher education institution serving Tuy and neighboring
                    municipalities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <i className="fas fa-check-circle text-primary text-xs mt-1"></i>
                <div>
                  <span className="text-gray-700 text-sm font-semibold">
                    Vocational/Technical Training
                  </span>
                  <p className="text-gray-500 text-xs">
                    Skills training and TESDA-accredited programs available in
                    the municipality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources Note */}
        <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500 text-sm">
          <p>
            <strong>Data Sources:</strong> Philippine Statistics Authority (PSA)
            Census of Population, PSA Small Area Estimates of Poverty Incidence,
            Bureau of Local Government Finance (BLGF), Department of Education
            (DepEd), Wikipedia — Municipality of Tuy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocioEconomic;

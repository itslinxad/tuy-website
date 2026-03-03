import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Demography = () => {
  // Parallax effect for hero section
  const { offset } = useParallax({ speed: 0.3 });

  // Scroll animation hooks for each section
  const overviewRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const ageDistributionRef = useScrollAnimation();
  const trendsRef = useScrollAnimation();
  const householdRef = useScrollAnimation();
  const languageRef = useScrollAnimation();
  const religionRef = useScrollAnimation();

  // Population Statistics — Source: PSA 2024 Census
  const populationStats = [
    {
      icon: "fa-users",
      number: "47,199",
      label: "Total Population",
      suffix: "",
      description: "2024 Census (PSA)",
    },
    {
      icon: "fa-chart-area",
      number: "499",
      label: "Population Density",
      suffix: "/km\u00B2",
      description: "Inhabitants per square kilometer",
    },
    {
      icon: "fa-chart-line",
      number: "1.07",
      label: "Growth Rate",
      suffix: "%",
      description: "Annual growth rate (2010\u20132024)",
    },
    {
      icon: "fa-home",
      number: "11,448",
      label: "Households",
      suffix: "",
      description: "Total number of households (2024)",
    },
  ];

  // Age Distribution — Source: PSA 2015 Census via PhilAtlas
  // (most recent census with detailed age breakdown available)
  const ageDistribution = [
    {
      ageGroup: "0\u201314 years",
      population: "13,348",
      percentage: "30.5",
      icon: "fa-child",
      color: "bg-blue-100 text-blue-600",
      description: "Children and young adolescents",
    },
    {
      ageGroup: "15\u201324 years",
      population: "7,667",
      percentage: "17.5",
      icon: "fa-user-graduate",
      color: "bg-green-100 text-green-600",
      description: "Youth and young adults",
    },
    {
      ageGroup: "25\u201354 years",
      population: "16,693",
      percentage: "38.2",
      icon: "fa-user-tie",
      color: "bg-purple-100 text-purple-600",
      description: "Working-age adults",
    },
    {
      ageGroup: "55\u201364 years",
      population: "3,204",
      percentage: "7.3",
      icon: "fa-user",
      color: "bg-yellow-100 text-yellow-600",
      description: "Mature adults",
    },
    {
      ageGroup: "65+ years",
      population: "2,831",
      percentage: "6.5",
      icon: "fa-user-clock",
      color: "bg-red-100 text-red-600",
      description: "Senior citizens",
    },
  ];

  // Population Trends — Source: PSA Historical Census Data
  const populationTrends = [
    {
      year: "1990",
      population: "30,409",
      growthRate: "-",
    },
    {
      year: "1995",
      population: "32,447",
      growthRate: "1.22%",
    },
    {
      year: "2000",
      population: "35,672",
      growthRate: "2.05%",
    },
    {
      year: "2007",
      population: "40,290",
      growthRate: "1.69%",
    },
    {
      year: "2010",
      population: "40,734",
      growthRate: "0.40%",
    },
    {
      year: "2015",
      population: "43,743",
      growthRate: "1.37%",
    },
    {
      year: "2020",
      population: "46,519",
      growthRate: "1.30%",
    },
    {
      year: "2024",
      population: "47,199",
      growthRate: "0.35%",
    },
  ];

  // Household Statistics — Source: PSA 2015 Census via PhilAtlas, 2024 Census
  const householdStats = [
    {
      title: "Average Household Size",
      value: "4.34",
      suffix: " persons",
      icon: "fa-users",
      color: "bg-blue-100 text-blue-600",
      description: "Average number of members per household (2015 Census)",
    },
    {
      title: "Total Households",
      value: "11,448",
      suffix: "",
      icon: "fa-home",
      color: "bg-indigo-100 text-indigo-600",
      description: "Total households as of 2024 Census",
    },
    {
      title: "Dependency Ratio",
      value: "58.7",
      suffix: "%",
      icon: "fa-balance-scale",
      color: "bg-green-100 text-green-600",
      description: "Ratio of dependents to working-age population (2015)",
    },
    {
      title: "Median Age",
      value: "26.4",
      suffix: " years",
      icon: "fa-calendar",
      color: "bg-pink-100 text-pink-600",
      description: "Median age of the population (2015 Census)",
    },
  ];

  // Language — Source: Wikipedia (Tuy, Batangas)
  // Note: exact percentages for language use are described qualitatively;
  // the descriptions below reflect verified information.
  const languages = [
    {
      name: "Tagalog (Batangue\u00F1o)",
      description: "Primary local language spoken in all households",
      icon: "fa-comment",
    },
    {
      name: "English",
      description: "Widely spoken; used in education, business, and government",
      icon: "fa-language",
    },
    {
      name: "Filipino",
      description: "National language used in media and official communication",
      icon: "fa-comments",
    },
  ];

  // Religious Demographics — Source: Wikipedia (Tuy, Batangas)
  // Wikipedia states "vast majority" Roman Catholic with INC (5 chapels)
  // and other Christian denominations present.
  const religiousDenominations = [
    {
      religion: "Roman Catholic",
      description: "Vast majority of the population; parish church dedicated to Saint Vincent Ferrer",
      icon: "fa-cross",
      color: "bg-blue-100 text-blue-600",
    },
    {
      religion: "Iglesia ni Cristo",
      description: "Five chapels across the municipality: Guinhawa, Tuy, Sabang, Acle, and Silangan",
      icon: "fa-church",
      color: "bg-green-100 text-green-600",
    },
    {
      religion: "Evangelicals & Baptists",
      description: "Protestant Christian communities present in the municipality",
      icon: "fa-bible",
      color: "bg-purple-100 text-purple-600",
    },
    {
      religion: "Other Denominations",
      description: "Including Jehovah's Witnesses, Adventists, and Church of Christ movements",
      icon: "fa-praying-hands",
      color: "bg-gray-100 text-gray-600",
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
            <span className="text-white/90">Demography</span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Demography of Tuy
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Understanding Our People and Communities
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">
        {/* Overview Section */}
        <section
          ref={overviewRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            overviewRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Demographic Overview
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              The Municipality of Tuy, located in the province of Batangas
              within the CALABARZON region, is home to 47,199 people as of the
              2024 Census conducted by the Philippine Statistics Authority. The
              population is distributed across 22 barangays, with the largest
              concentrations in Magahis, Luntal, Sabang, and Putol. The
              municipality covers a land area of 94.65 square kilometers,
              resulting in a population density of approximately 499 inhabitants
              per square kilometer.
            </p>
            <p>
              Tuy has experienced steady population growth over the past
              century, rising from just 2,340 people in 1903 to over 47,000
              today. The annualized growth rate has moderated in recent years,
              from 1.95% during the 1980s-1990s period to 1.30% between 2015
              and 2020, and further slowing to 0.35% between 2020 and 2024. The
              population is relatively young, with a median age of 26.4 years
              as of the 2015 Census, and a significant proportion of residents
              falling within the working-age bracket of 25 to 54 years.
            </p>
            <p>
              Tagalog, in its Batangue&ntilde;o dialect, is the primary language
              spoken across all households. The municipality is predominantly
              Roman Catholic, with the Saint Vincent Ferrer Parish Church
              serving as the main religious institution. Understanding these
              demographic characteristics is essential for effective municipal
              planning, resource allocation, and the delivery of public
              services to the communities of Tuy.
            </p>
          </div>
        </section>

        {/* Population Statistics Dashboard */}
        <section
          ref={statsRef.elementRef}
          className={`bg-gradient-to-br from-primary to-primary-hover py-12 rounded-lg shadow-xl scroll-animate ${
            statsRef.isVisible ? "visible" : ""
          }`}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Population Statistics
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            {populationStats.map((stat, index) => (
              <div
                key={index}
                className={`text-center scroll-animate stagger-${
                  index + 1
                } ${statsRef.isVisible ? "visible" : ""}`}
              >
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${stat.icon} text-4xl text-white`}></i>
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="text-white text-lg font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-white/80 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Age Distribution Section */}
        <section
          ref={ageDistributionRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            ageDistributionRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Age Distribution
            </h2>
          </div>
          <p className="text-gray-700 text-lg mb-8">
            Population breakdown by age groups based on the 2015 Census
            (PSA), the most recent census with detailed age data available.
          </p>

          <div className="space-y-4">
            {ageDistribution.map((group, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all scroll-animate-left stagger-${
                  index + 1
                } ${ageDistributionRef.isVisible ? "visible" : ""}`}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-14 h-14 rounded-full ${group.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <i className={`fas ${group.icon} text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        {group.ageGroup}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {group.percentage}%
                    </div>
                    <div className="text-gray-600">{group.population}</div>
                  </div>
                </div>
                {/* Visual Progress Bar */}
                <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-1000"
                    style={{
                      width: ageDistributionRef.isVisible
                        ? `${group.percentage}%`
                        : "0%",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Population Trends Section */}
        <section
          ref={trendsRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            trendsRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Population Growth Trends
            </h2>
          </div>
          <p className="text-gray-700 text-lg mb-8">
            Historical population data from PSA censuses showing growth
            patterns over the decades.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {populationTrends.map((trend, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 hover:shadow-lg transition-all scroll-animate stagger-${
                  (index % 4) + 1
                } ${trendsRef.isVisible ? "visible" : ""}`}
              >
                <div className="text-center">
                  <div className="text-primary font-bold text-lg mb-2">
                    {trend.year}
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {trend.population}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {trend.growthRate !== "-" && (
                      <span className="inline-flex items-center gap-1">
                        <i className="fas fa-arrow-up text-green-600"></i>
                        {trend.growthRate}
                      </span>
                    )}
                    {trend.growthRate === "-" && (
                      <span className="text-gray-400">Base year</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Household Statistics Section */}
        <section
          ref={householdRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            householdRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Household Statistics
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {householdStats.map((stat, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all scroll-animate stagger-${
                  index + 1
                } ${householdRef.isVisible ? "visible" : ""}`}
              >
                <div
                  className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mb-4`}
                >
                  <i className={`fas ${stat.icon} text-xl`}></i>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {stat.title}
                </h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                  {stat.suffix}
                </div>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages Section */}
        <section
          ref={languageRef.elementRef}
          className={`bg-white rounded-lg shadow-xl p-8 scroll-animate ${
            languageRef.isVisible ? "visible" : ""
          }`}
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            Languages Spoken
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Languages widely used in the Municipality of Tuy.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {languages.map((lang, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all scroll-animate stagger-${
                  index + 1
                } ${languageRef.isVisible ? "visible" : ""}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <i className={`fas ${lang.icon} text-xl`}></i>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {lang.name}
                </h3>
                <p className="text-gray-600 text-sm">{lang.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Religious Demographics Section */}
        <section
          ref={religionRef.elementRef}
          className={`bg-gradient-to-br from-primary to-primary-hover py-12 rounded-lg shadow-xl scroll-animate ${
            religionRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="px-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Religious Demographics
            </h2>
            <p className="text-white/90 text-lg mb-10">
              Religious affiliations in the Municipality of Tuy.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {religiousDenominations.map((religion, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-6 hover:shadow-lg transition-all scroll-animate stagger-${
                    (index % 4) + 1
                  } ${religionRef.isVisible ? "visible" : ""}`}
                >
                  <div
                    className={`w-14 h-14 rounded-full ${religion.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <i className={`fas ${religion.icon} text-2xl`}></i>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {religion.religion}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {religion.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Sources Note */}
        <section className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <i className="fas fa-info-circle text-blue-600 mt-1"></i>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Data Sources</p>
              <p>
                Population figures are from the Philippine Statistics Authority
                (PSA) censuses. Age distribution and household data are from the
                2015 Census, the most recent with detailed breakdowns available.
                Language and religious information is based on publicly available
                records.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Demography;

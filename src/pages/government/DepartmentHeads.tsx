import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.tsx";
import { useParallax } from "../../hooks/useParallax";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const DepartmentHeads = () => {
  // Parallax effect for hero section
  const { offset } = useParallax({ speed: 0.3 });

  // Scroll animation hooks
  const introRef = useScrollAnimation();
  const executiveRef = useScrollAnimation();
  const supportRef = useScrollAnimation();
  const operationalRef = useScrollAnimation();

  const basePath = import.meta.env.VITE_BASE_PATH || "";

  // Trunkline for departments using local extensions
  const trunkline = "(043) 276-0047";

  // Executive Offices — Source: TUY_WEBSITE_DETAILS.xlsx
  const executiveOffices = [
    {
      departmentName: "Office of the Municipal Mayor",
      head: "Hon. Jose Jecerell C. Cerrado",
      position: "Municipal Mayor",
      photoPath: `${basePath}/OfficialS_PIC/Jose Jecerell C. Cerrado.jpg`,
      hasPhoto: true,
      phone: `${trunkline} local 200-201`,
      office: "Municipal Hall",
      icon: "fa-user-tie",
      color: "bg-blue-100 text-blue-600",
      description:
        "The chief executive of the municipality, responsible for overall governance, policy implementation, and delivery of basic services to constituents.",
    },
    {
      departmentName: "Office of the Municipal Vice Mayor",
      head: "Hon. Armando P. Afable",
      position: "Municipal Vice Mayor",
      photoPath: `${basePath}/OfficialS_PIC/Armando P. Afable.jpg`,
      hasPhoto: true,
      phone: "(043) 276-0121",
      office: "Municipal Hall",
      icon: "fa-user-shield",
      color: "bg-indigo-100 text-indigo-600",
      description:
        "Presides over the Sangguniang Bayan and performs the duties of the Municipal Mayor in case of temporary absence or incapacity.",
    },
    {
      departmentName: "Office of the Municipal Administrator",
      head: "Menandro V. De Castro",
      position: "Administrative Officer V",
      hasPhoto: false,
      phone: trunkline,
      office: "Municipal Hall",
      icon: "fa-user-cog",
      color: "bg-purple-100 text-purple-600",
      description:
        "Assists the Mayor in supervising and coordinating the operations of all departments, ensuring efficient delivery of municipal services.",
    },
  ];

  // Support Services — Source: TUY_WEBSITE_DETAILS.xlsx
  const supportServices = [
    {
      departmentName: "Municipal Planning and Development Office",
      acronym: "MPDO",
      head: "Guillerma D. Mayor",
      position: "Municipal Planning and Development Coordinator",
      hasPhoto: false,
      phone: `${trunkline} local 206`,
      office: "Municipal Hall",
      icon: "fa-clipboard-list",
      color: "bg-green-100 text-green-600",
      description:
        "Formulates integrated economic, social, physical, and other development plans and policies for consideration of the local development council.",
    },
    {
      departmentName: "Municipal Budget Office",
      acronym: "MBO",
      head: "Rita D. Macalindong",
      position: "Municipal Budget Officer",
      hasPhoto: false,
      phone: `${trunkline} local 203`,
      office: "Municipal Hall",
      icon: "fa-calculator",
      color: "bg-yellow-100 text-yellow-600",
      description:
        "Prepares the municipal budget, monitors budget implementation, and ensures proper allocation and utilization of funds.",
    },
    {
      departmentName: "Municipal Accountant's Office",
      acronym: "MACCO",
      head: "Almira Joy A. Rovillos",
      position: "Municipal Accountant",
      hasPhoto: false,
      phone: `${trunkline} local 214`,
      office: "Municipal Hall",
      icon: "fa-file-invoice-dollar",
      color: "bg-teal-100 text-teal-600",
      description:
        "Maintains financial records, prepares financial statements, and ensures compliance with accounting standards and government regulations.",
    },
    {
      departmentName: "Municipal Treasurer's Office",
      acronym: "MTO",
      head: "OIC Miles M. Perez",
      position: "Municipal Treasurer",
      hasPhoto: false,
      phone: `${trunkline} local 223-224`,
      office: "Municipal Hall",
      icon: "fa-coins",
      color: "bg-amber-100 text-amber-600",
      description:
        "Collects revenues, manages municipal funds, and ensures proper custody and disbursement of public funds.",
    },
    {
      departmentName: "Municipal Assessor's Office",
      acronym: "MAO",
      head: "Horesto D. Fernandez",
      position: "Municipal Assessor",
      hasPhoto: false,
      phone: `${trunkline} local 207`,
      office: "Municipal Hall",
      icon: "fa-home",
      color: "bg-orange-100 text-orange-600",
      description:
        "Assesses real properties for taxation purposes, maintains property records, and processes tax declarations.",
    },
    {
      departmentName: "Human Resource Management Office",
      acronym: "HRMO",
      head: "Emmanuel A. Afable",
      position: "Human Resource Management Officer",
      hasPhoto: false,
      phone: `${trunkline} local 209`,
      office: "Municipal Hall",
      icon: "fa-users-cog",
      color: "bg-pink-100 text-pink-600",
      description:
        "Manages recruitment, employee records, performance evaluation, and personnel development programs for municipal employees.",
    },
    {
      departmentName: "General Services Office",
      acronym: "GSO",
      head: "Katrine A. De Jesus",
      position: "General Services Officer",
      hasPhoto: false,
      phone: trunkline,
      office: "Municipal Hall",
      icon: "fa-tools",
      color: "bg-gray-100 text-gray-600",
      description:
        "Manages municipal properties, facilities, equipment, and provides general administrative support services to all departments.",
    },
    {
      departmentName: "Municipal Civil Registrar's Office",
      acronym: "MCRO",
      head: "Peter C. Filler",
      position: "Municipal Civil Registrar",
      hasPhoto: false,
      phone: `${trunkline} local 220`,
      office: "Municipal Hall",
      icon: "fa-id-card",
      color: "bg-cyan-100 text-cyan-600",
      description:
        "Processes civil registry documents including birth, marriage, and death certificates, and maintains vital statistics records.",
    },
  ];

  // Operational Departments — Source: TUY_WEBSITE_DETAILS.xlsx
  const operationalDepartments = [
    {
      departmentName: "Municipal Engineer's Office",
      acronym: "MEO",
      head: "Engr. Isigani F. Residuo",
      position: "Municipal Engineer",
      hasPhoto: false,
      phone: "(043) 206-0105",
      office: "Municipal Hall",
      icon: "fa-hard-hat",
      color: "bg-slate-100 text-slate-600",
      description:
        "Plans, designs, constructs, and maintains public infrastructure including roads, bridges, buildings, and water supply systems.",
    },
    {
      departmentName: "Municipal Health Office",
      acronym: "MHO",
      head: "Dr. Liza Carmelli A. Chua",
      position: "Municipal Health Officer",
      hasPhoto: false,
      phone: "(043) 276-0113",
      office: "Rural Health Unit",
      icon: "fa-heartbeat",
      color: "bg-red-100 text-red-600",
      description:
        "Provides primary healthcare services, implements health programs, and promotes health and wellness in the community.",
    },
    {
      departmentName: "Municipal Social Welfare and Development Office",
      acronym: "MSWDO",
      head: "Zaira M. Abellera",
      position: "Municipal Social Welfare and Development Officer",
      hasPhoto: false,
      phone: "(043) 276-0117",
      office: "Municipal Hall",
      icon: "fa-hands-helping",
      color: "bg-rose-100 text-rose-600",
      description:
        "Implements social welfare programs, provides assistance to vulnerable sectors, and promotes community development.",
    },
    {
      departmentName: "Municipal Agriculture Office",
      acronym: "MAgrO",
      head: "Liza C. Maranan",
      position: "Municipal Agriculturist",
      hasPhoto: false,
      phone: `${trunkline} local 219`,
      office: "Municipal Hall",
      icon: "fa-seedling",
      color: "bg-lime-100 text-lime-600",
      description:
        "Promotes agricultural development, provides technical assistance to farmers and fisherfolk, and implements agricultural programs.",
    },
    {
      departmentName: "Municipal Disaster Risk Reduction and Management Office",
      acronym: "MDRRMO",
      head: "Jacqueline S. De Taza",
      position: "LDRRMO",
      hasPhoto: false,
      phone: "(043) 276-0120",
      office: "MDRRMO Office",
      icon: "fa-exclamation-triangle",
      color: "bg-red-100 text-red-600",
      description:
        "Coordinates disaster preparedness, response, and recovery operations; implements risk reduction measures and emergency management.",
    },
    {
      departmentName: "Municipal Library",
      acronym: "",
      head: "",
      position: "",
      hasPhoto: false,
      phone: "(043) 276-0082",
      office: "Municipal Library Building",
      icon: "fa-book",
      color: "bg-emerald-100 text-emerald-600",
      description:
        "Provides library services, reading materials, and information resources to the residents and students of Tuy.",
    },
  ];

  // Render a department card
  const renderDeptCard = (
    dept: (typeof executiveOffices)[0] & { acronym?: string },
    index: number,
    parentRef: ReturnType<typeof useScrollAnimation>,
  ) => (
    <div
      key={index}
      className={`bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden scroll-animate stagger-${
        (index % 3) + 1
      } ${parentRef.isVisible ? "visible" : ""}`}
    >
      {/* Department Header */}
      <div className="bg-gradient-to-r from-primary to-primary-hover p-4 text-white">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
          <i className={`fas ${dept.icon} text-2xl text-white`}></i>
        </div>
        <h3 className="text-lg font-bold mb-1">{dept.departmentName}</h3>
        {dept.acronym && (
          <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">
            {dept.acronym}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Photo or Icon */}
        {dept.hasPhoto ? (
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
            <img
              src={dept.photoPath}
              alt={dept.head}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-3xl text-gray-400"></i>
          </div>
        )}

        {/* Info */}
        {dept.head && (
          <div className="text-center mb-4">
            <h4 className="text-lg font-bold text-primary">{dept.head}</h4>
            <p className="text-sm text-gray-600 mb-2">{dept.position}</p>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          {dept.description}
        </p>

        {/* Contact Info */}
        <div className="border-t border-gray-200 pt-3 space-y-2 text-xs text-gray-600">
          <p className="flex items-center gap-2">
            <i className="fas fa-phone text-primary w-4"></i>
            <span>{dept.phone}</span>
          </p>
          <p className="flex items-center gap-2">
            <i className="fas fa-map-marker-alt text-primary w-4"></i>
            <span>{dept.office}</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section with Parallax */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <div
          className="parallax-bg"
          style={{
            transform: `translateY(${offset}px)`,
            backgroundImage: `url('${basePath}/hero-image.jpg')`,
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
            <span className="text-white/90">Department Heads</span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Department Heads
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Leading Municipal Offices and Services
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
              Our Municipal Departments
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              The Municipal Government of Tuy operates through various
              departments and offices, each headed by qualified professionals
              dedicated to serving the community. These departments work
              collaboratively to deliver efficient and effective public services
              to all residents.
            </p>
            <p>
              From infrastructure development to social welfare, from revenue
              collection to health services, each department plays a vital role
              in the municipality's governance and development. The department
              heads ensure proper implementation of programs, projects, and
              policies in their respective areas of responsibility.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-600">
                <strong>Trunkline:</strong> {trunkline} / (043) 276-0100 /
                (043) 276-0104 / (043) 276-0102
              </p>
            </div>
          </div>
        </section>

        {/* Executive Offices Section */}
        <section
          ref={executiveRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            executiveRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-8">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Executive Offices
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executiveOffices.map((dept, index) =>
              renderDeptCard(dept, index, executiveRef),
            )}
          </div>
        </section>

        {/* Support Services Section */}
        <section
          ref={supportRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            supportRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-8">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Support Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportServices.map((dept, index) =>
              renderDeptCard(dept, index, supportRef),
            )}
          </div>
        </section>

        {/* Operational Departments Section */}
        <section
          ref={operationalRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            operationalRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-8">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">
              Operational Departments
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operationalDepartments.map((dept, index) =>
              renderDeptCard(dept, index, operationalRef),
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DepartmentHeads;

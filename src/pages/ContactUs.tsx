import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar.tsx";
import ContactMap from "../components/ContactMap.tsx";
import { useParallax } from "../hooks/useParallax";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const ContactUs = () => {
  const { offset } = useParallax({ speed: 0.3 });
  const contactInfoRef = useScrollAnimation();
  const formRef = useScrollAnimation();
  const officesRef = useScrollAnimation();
  const emergencyRef = useScrollAnimation();
  const mapRef = useScrollAnimation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Validation rules
  const validateField = useCallback((name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Full name must be at least 2 characters";
        return "";
      case "email": {
        if (!value.trim()) return "Email address is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      }
      case "phone": {
        if (!value.trim()) return ""; // Phone is optional
        const phoneRegex = /^(\+639|09)\d{9}$/;
        const cleaned = value.replace(/[\s-]/g, "");
        if (!phoneRegex.test(cleaned)) return "Please enter a valid Philippine phone number (09XX XXX XXXX or +639XX XXX XXXX)";
        return "";
      }
      case "subject":
        if (!value) return "Please select a subject";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const fields = ["name", "email", "phone", "subject", "message"] as const;
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    let isValid = true;

    for (const field of fields) {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      newErrors[field] = error;
      if (error) isValid = false;
    }

    setErrors(newErrors);
    setTouched(newTouched);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus("submitting");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "Not provided",
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    } catch {
      setFormStatus("error");
    }
  };

  const resetForm = () => {
    setFormStatus("idle");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTouched({});
    setErrors({});
  };

  // Helper to get input border class
  const getInputBorderClass = (field: string) => {
    if (errors[field] && touched[field]) return "border-red-500 focus:border-red-500";
    if (!errors[field] && touched[field] && formData[field as keyof typeof formData]) return "border-green-500 focus:border-green-500";
    return "border-gray-300 focus:border-primary";
  };

  const departments = [
    {
      icon: "fa-user-tie",
      name: "Office of the Municipal Mayor",
      head: "Hon. Jose Jecerell C. Cerrado",
      phone: "Trunkline: (043) 276-0047 local 200-201",
      location: "2nd Floor, Municipal Hall",
    },
    {
      icon: "fa-user",
      name: "Office of the Vice Mayor / Sangguniang Bayan",
      head: "Hon. Armando P. Afable",
      phone: "(043) 276-0121",
      location: "2nd Floor, Municipal Hall",
    },
    {
      icon: "fa-file-alt",
      name: "Municipal Administrator's Office",
      head: "Menandro V. De Castro, Admin Officer V",
      phone: "Trunkline: (043) 276-0047",
      location: "Municipal Hall",
    },
    {
      icon: "fa-chart-line",
      name: "Municipal Planning & Development Office",
      head: "Guillerma D. Mayor, MPDC",
      phone: "Trunkline: (043) 276-0047 local 206",
      location: "2nd Floor, Municipal Hall",
    },
    {
      icon: "fa-calculator",
      name: "Municipal Budget Office",
      head: "Rita D. Macalindong, Municipal Budget Officer",
      phone: "Trunkline: (043) 276-0047 local 203",
      location: "2nd Floor, Municipal Hall",
    },
    {
      icon: "fa-book",
      name: "Municipal Accounting Office",
      head: "Almira Joy A. Rovillos, Municipal Accountant",
      phone: "Trunkline: (043) 276-0047 local 214",
      location: "Municipal Hall",
    },
    {
      icon: "fa-wallet",
      name: "Municipal Treasurer's Office",
      head: "Miles M. Perez (OIC), Municipal Treasurer",
      phone: "Trunkline: (043) 276-0047 local 223-224",
      location: "1st Floor, Municipal Hall",
    },
    {
      icon: "fa-landmark",
      name: "Municipal Assessor's Office",
      head: "Horesto D. Fernandez, Municipal Assessor",
      phone: "Trunkline: (043) 276-0047 local 207",
      location: "Municipal Hall",
    },
    {
      icon: "fa-id-card",
      name: "Human Resource Management Office",
      head: "Emmanuel A. Afable, HRMO",
      phone: "Trunkline: (043) 276-0047 local 209",
      location: "Municipal Hall",
    },
    {
      icon: "fa-cogs",
      name: "General Services Office",
      head: "Katrine A. De Jesus, GSO",
      phone: "Trunkline: (043) 276-0047",
      location: "Municipal Hall",
    },
    {
      icon: "fa-file-signature",
      name: "Municipal Civil Registrar's Office",
      head: "Peter C. Filler, Municipal Civil Registrar",
      phone: "Trunkline: (043) 276-0047 local 220",
      location: "Municipal Hall",
    },
    {
      icon: "fa-hard-hat",
      name: "Municipal Engineering Office",
      head: "Engr. Isigani F. Residuo, Municipal Engineer",
      phone: "(043) 206-0105",
      location: "Municipal Hall",
    },
    {
      icon: "fa-clinic-medical",
      name: "Municipal Health Office",
      head: "Dr. Liza Carmelli A. Chua, Municipal Health Officer",
      phone: "(043) 276-0113",
      location: "Rural Health Unit Building",
    },
    {
      icon: "fa-users",
      name: "Municipal Social Welfare & Development Office",
      head: "Zaira M. Abellera, MSWDO",
      phone: "(043) 276-0117",
      location: "Ground Floor, Municipal Hall",
    },
    {
      icon: "fa-seedling",
      name: "Municipal Agriculture Office",
      head: "Liza C. Maranan, Municipal Agriculturist",
      phone: "Trunkline: (043) 276-0047 local 219",
      location: "Municipal Hall",
    },
    {
      icon: "fa-shield-alt",
      name: "Municipal Disaster Risk Reduction & Management Office",
      head: "Jacqueline S. De Taza, MDRRMO",
      phone: "(043) 276-0120",
      location: "Ground Floor, Municipal Hall",
    },
  ];

  const emergencyContacts = [
    {
      icon: "fa-shield-alt",
      service: "MDRRMO Hotline",
      number: "(043) 276-0120",
      description: "Municipal Disaster Risk Reduction & Management Office — disaster and calamity assistance",
      color: "red",
    },
    {
      icon: "fa-phone-alt",
      service: "National Emergency Hotline",
      number: "911",
      description: "Police, fire, and medical emergencies nationwide",
      color: "blue",
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
            <span className="text-white/90">Contact Us</span>
          </nav>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-4 animate-fadeInUp">
            Contact Us
          </h1>
          <p
            className="text-2xl text-white drop-shadow-lg animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            We're Here to Serve You
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <i className="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">
        {/* Quick Contact Info */}
        <section
          ref={contactInfoRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            contactInfoRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Get in Touch</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            The Municipal Government of Tuy is committed to serving the people. Whether you have
            questions, concerns, or feedback, we're here to help. Reach out to us through any of
            the channels below.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Address */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-map-marker-alt text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
              <p className="text-gray-700">
                <strong>Municipal Hall of Tuy</strong>
                <br />
                Poblacion, Tuy, Batangas
                <br />
                Philippines 4214
              </p>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-phone text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-700">
                <strong>Trunklines:</strong>
                <br />
                (043) 276-0047
                <br />
                (043) 276-0100
                <br />
                (043) 276-0104
                <br />
                (043) 276-0102
              </p>
            </div>

            {/* Social Media / Online */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-share-alt text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect Online</h3>
              <p className="text-gray-700 text-sm">
                Follow us on social media for news and announcements. You can also send us a message
                using the contact form below.
              </p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <i className="fas fa-clock text-primary mr-3"></i>
              Office Hours
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Regular Business Hours</h4>
                <p className="text-gray-700">
                  <strong>Monday to Friday:</strong> 8:00 AM - 5:00 PM
                  <br />
                  <strong>Lunch Break:</strong> 12:00 PM - 1:00 PM
                  <br />
                  <strong>Saturday & Sunday:</strong> Closed
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Special Notes</h4>
                <p className="text-gray-700 text-sm">
                  • Offices are closed on national holidays and special non-working days
                  <br />
                  • Some offices may have extended hours for specific services
                  <br />• Emergency services are available 24/7
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section
          ref={formRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            formRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Send Us a Message</h2>
          </div>

          {/* Success State */}
          {formStatus === "success" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check-circle text-green-600 text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Thank you for reaching out. We have received your message and will get back to you as soon as possible.
              </p>
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
              >
                <i className="fas fa-envelope"></i>
                Send Another Message
              </button>
            </div>
          )}

          {/* Form (shown when not in success state) */}
          {formStatus !== "success" && (
            <>
              {/* Error Banner */}
              {formStatus === "error" && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
                  <p className="text-red-800 text-sm flex items-start gap-2">
                    <i className="fas fa-exclamation-circle mt-1"></i>
                    <span>
                      <strong>Failed to send message.</strong> Please check your internet connection and try again. If the problem persists, please contact us using the phone numbers above.
                    </span>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={formStatus === "submitting"}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${getInputBorderClass("name")}`}
                      placeholder="Juan Dela Cruz"
                    />
                    {errors.name && touched.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-xs"></i>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={formStatus === "submitting"}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${getInputBorderClass("email")}`}
                      placeholder="juan@example.com"
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-xs"></i>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={formStatus === "submitting"}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${getInputBorderClass("phone")}`}
                      placeholder="09XX XXX XXXX"
                    />
                    {errors.phone && touched.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-xs"></i>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={formStatus === "submitting"}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${getInputBorderClass("subject")}`}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Suggestion">Suggestion</option>
                      <option value="Request for Assistance">Request for Assistance</option>
                      <option value="Business Inquiry">Business Inquiry</option>
                      <option value="Tourism Information">Tourism Information</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && touched.subject && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-xs"></i>
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={formStatus === "submitting"}
                    rows={6}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${getInputBorderClass("message")}`}
                    placeholder="Please type your message here..."
                  ></textarea>
                  <div className="flex justify-between items-center mt-1">
                    <div>
                      {errors.message && touched.message && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <i className="fas fa-exclamation-circle text-xs"></i>
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <p className={`text-xs ${formData.message.trim().length >= 10 ? "text-green-600" : "text-gray-400"}`}>
                      {formData.message.trim().length} / 10 min characters
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </section>

        {/* Department Contacts */}
        <section
          ref={officesRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            officesRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Department Contacts</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            For specific concerns, you may directly contact the relevant department or office:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                      <i className={`fas ${dept.icon} text-primary text-xl`}></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{dept.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{dept.head}</p>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>
                        <i className="fas fa-phone text-primary mr-2"></i>
                        {dept.phone}
                      </p>
                      <p>
                        <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                        {dept.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section
          ref={emergencyRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            emergencyRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-red-600 mr-4"></div>
            <h2 className="text-4xl font-bold text-red-600">Emergency Contacts</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            For emergencies, please contact these 24/7 hotlines immediately:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-${contact.color}-50 to-${contact.color}-100 rounded-lg p-6 border-2 border-${contact.color}-200`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 bg-${contact.color}-600 rounded-full flex items-center justify-center`}
                    >
                      <i className={`fas ${contact.icon} text-white text-2xl`}></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.service}</h3>
                    <p className="text-2xl font-bold text-red-600 mb-2">{contact.number}</p>
                    <p className="text-sm text-gray-700">{contact.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-red-50 border-l-4 border-red-600 p-6 rounded">
            <h4 className="font-bold text-red-800 mb-2 flex items-center">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              National Emergency Hotlines
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-red-700 text-sm">
              <p>
                <strong>National Emergency Hotline:</strong> 911
              </p>
              <p>
                <strong>PNP Hotline:</strong> 117
              </p>
              <p>
                <strong>BFP Hotline:</strong> (02) 8426-0219
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section
          ref={mapRef.elementRef}
          className={`bg-white shadow-lg rounded-lg p-8 scroll-animate ${
            mapRef.isVisible ? "visible" : ""
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-primary mr-4"></div>
            <h2 className="text-4xl font-bold text-primary">Find Us on the Map</h2>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Municipal Hall is located at the heart of Tuy, easily accessible by various modes
            of transportation.
          </p>

          {/* Interactive Google Map with Directions */}
          <div className="h-[600px] md:h-[800px] rounded-lg overflow-hidden shadow-lg">
            <ContactMap />
          </div>

          {/* Directions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <i className="fas fa-directions text-primary mr-3"></i>
              How to Get Here
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h4 className="font-bold mb-2">From Manila</h4>
                <p className="text-sm">
                  Take SLEX/STAR Tollway to Batangas. Exit at Batangas City and follow signs to
                  Tuy. Travel time: approximately 2-3 hours by car.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">From Batangas City</h4>
                <p className="text-sm">
                  Take a bus or jeepney bound for Tuy. Alight at the town proper. The Municipal
                  Hall is near the public market. Travel time: approximately 30-45 minutes.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Public Transportation</h4>
                <p className="text-sm">
                  Jeepneys and tricycles are available from the town proper going to the Municipal
                  Hall. Buses from Manila and Batangas City pass through Tuy.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Landmarks</h4>
                <p className="text-sm">
                  Near: Tuy Public Market, Tuy Catholic Church, Tuy National High School. GPS
                  Coordinates: 14.0191, 120.7302
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-4">
            <i className="fas fa-share-alt text-5xl text-white/80"></i>
          </div>
          <h3 className="text-3xl font-bold mb-4">Follow Us on Social Media</h3>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Stay connected and get the latest updates, news, and announcements from the Municipal
            Government of Tuy
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/MunicipalityOfTuy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;

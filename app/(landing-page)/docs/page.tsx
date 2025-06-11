import { getLanguage } from "@/lib/i18n/server-utils";
import {
  Code,
  Database,
  Layers,
  LineChart,
  CheckCircle,
  ArrowRight,
  Target,
  Lightbulb,
  Rocket,
  TrendingUp,
  Palette,
  Shield,
  Zap,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function DocumentationPage() {
  // Get language and translations
  const currentLanguage = await getLanguage();
  // const t = await getTranslations(currentLanguage);

  // Determine if RTL
  const isRTL = currentLanguage === "ar" || currentLanguage === "he";

  // Hero services cards
  const heroServices = [
    {
      id: "strategy",
      title: "Product Strategy",
      description:
        "Laying the strategic foundation for your product with clear goals and a defined roadmap.",
      icon: Target,
      gradient: "from-blue-500 to-purple-600",
      features: [
        "Market Analysis",
        "Competitive Research",
        "Product Roadmap",
        "Goal Setting",
        "Risk Assessment",
        "Success Metrics",
      ],
    },
    {
      id: "research",
      title: "Research & Analytics",
      description:
        "Gathering critical insights through comprehensive market and user research.",
      icon: LineChart,
      gradient: "from-orange-500 to-pink-600",
      features: [
        "User Research",
        "Market Analysis",
        "Data Analytics",
        "A/B Testing",
        "User Interviews",
        "Behavioral Analysis",
      ],
    },
    {
      id: "design",
      title: "UX/UI Design",
      description:
        "Crafting an intuitive and engaging user experience, blending aesthetics & functionality.",
      icon: Palette,
      gradient: "from-green-500 to-teal-600",
      features: [
        "User Experience Design",
        "Interface Design",
        "Prototyping",
        "Design Systems",
        "Usability Testing",
        "Responsive Design",
      ],
    },
    {
      id: "development",
      title: "Software Development",
      description:
        "Turning designs into reality with efficient and robust software development.",
      icon: Code,
      gradient: "from-purple-500 to-indigo-600",
      features: [
        "Full-Stack Development",
        "API Development",
        "Database Design",
        "Cloud Deployment",
        "Performance Optimization",
        "Security Implementation",
      ],
    },
    {
      id: "marketing",
      title: "Digital Marketing",
      description:
        "Launch your product into the market with strategies that captivate your audience.",
      icon: TrendingUp,
      gradient: "from-red-500 to-orange-600",
      features: [
        "Content Strategy",
        "SEO Optimization",
        "Social Media Marketing",
        "Email Campaigns",
        "Conversion Optimization",
        "Analytics & Reporting",
      ],
    },
    {
      id: "growth",
      title: "Product Growth",
      description:
        "Enhancing your product's reach and impact in response to market dynamics and user feedback.",
      icon: Rocket,
      gradient: "from-teal-500 to-cyan-600",
      features: [
        "Growth Hacking",
        "User Acquisition",
        "Retention Strategies",
        "Feature Optimization",
        "Scaling Solutions",
        "Performance Monitoring",
      ],
    },
  ];

  // Technologies with categories
  const technologies = {
    Frontend: [
      { name: "React", icon: Code, description: "Modern UI development" },
      {
        name: "Next.js",
        icon: Code,
        description: "Full-stack React framework",
      },
      { name: "TypeScript", icon: Code, description: "Type-safe development" },
      { name: "Tailwind CSS", icon: Palette, description: "Utility-first CSS" },
    ],
    Backend: [
      { name: "Node.js", icon: Code, description: "Server-side JavaScript" },
      { name: "Python", icon: Code, description: "Data & AI development" },
      {
        name: "PostgreSQL",
        icon: Database,
        description: "Relational database",
      },
      { name: "MongoDB", icon: Database, description: "NoSQL database" },
    ],
    "Cloud & DevOps": [
      { name: "AWS", icon: Shield, description: "Cloud infrastructure" },
      { name: "Docker", icon: Layers, description: "Containerization" },
      {
        name: "Kubernetes",
        icon: Layers,
        description: "Container orchestration",
      },
      { name: "CI/CD", icon: Zap, description: "Automated deployment" },
    ],
  };

  // Case studies with enhanced data
  const caseStudies = [
    {
      title: "E-commerce Revolution",
      client: "RetailTech Solutions",
      description:
        "Complete digital transformation with 300% increase in conversions and seamless user experience across all devices.",
      image: "/images/case-retail.jpg",
      technologies: ["Next.js", "React", "Node.js", "PostgreSQL"],
      results: [
        "300% conversion increase",
        "50% faster load times",
        "Mobile-first design",
      ],
      category: "E-commerce",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Global Content Platform",
      client: "MediaCorp International",
      description:
        "Multi-language CMS supporting 12 languages with real-time collaboration and advanced content workflows.",
      image: "/images/case-media.jpg",
      technologies: ["React", "Node.js", "MongoDB", "i18n"],
      results: [
        "12 languages supported",
        "Real-time collaboration",
        "Advanced workflows",
      ],
      category: "Content Management",
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "AI-Powered Analytics",
      client: "DataViz Enterprise",
      description:
        "Real-time data visualization platform with predictive analytics and automated insights generation.",
      image: "/images/case-data.jpg",
      technologies: ["React", "Python", "TensorFlow", "WebSockets"],
      results: [
        "Real-time processing",
        "Predictive analytics",
        "Automated insights",
      ],
      category: "Analytics",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  // Process steps with enhanced design
  const processSteps = [
    {
      title: "Discovery Call",
      description:
        "We dive deep into your vision, goals, and challenges to understand your unique needs.",
      icon: Lightbulb,
      duration: "30-60 min",
      image: "/assets/p6.png",
    },
    {
      title: "Strategic Proposal",
      description:
        "Receive a comprehensive project roadmap with timeline, deliverables, and investment details.",
      icon: Target,
      duration: "2-3 days",
      image: "/assets/p1.jpeg",
    },
    {
      title: "Design & Development",
      description:
        "Our expert team brings your vision to life with regular updates and collaboration.",
      icon: Code,
      duration: "4-12 weeks",
      image: "/assets/p3.jpeg",
    },
    {
      title: "Launch & Optimization",
      description:
        "Your solution goes live with performance monitoring and initial optimization.",
      icon: Rocket,
      duration: "1-2 weeks",
      image: "/assets/p4.jpeg",
    },
    {
      title: "Growth & Support",
      description:
        "Ongoing partnership with continuous improvements, updates, and scaling support.",
      icon: TrendingUp,
      duration: "Ongoing",
      image: "/assets/p5.jpeg",
    },
  ];

  return (
    <div className="min-h-screen " dir={isRTL ? "rtl" : "ltr"}>
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 py-16">
          {/* Floating sidebar navigation
          <aside className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-8 bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Navigation</h3>
              <nav className="space-y-2">
                {navItems.map((item, i) => (
                  <a 
                    key={i}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-slate-900 group transition-all duration-200"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-100 mr-3 transition-colors">
                      <item.icon className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside> */}

          {/* Main content */}
          <main className="flex-1">
            {/* Services Overview */}
            <section id="services" className="mb-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 ">
                  How LoopXo Gets It Done
                </h2>
                <p className="text-xl  max-w-3xl mx-auto">
                  Our team of product, design, and research experts help people
                  like you craft beautifully simple and world-class products.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {heroServices.map((service, i) => (
                  <div
                    key={i}
                    className="group  rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 " />
                    </div>

                    <h3 className="text-2xl font-bold  mb-4">
                      {service.title}
                    </h3>
                    <p className=" mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2">
                      {service.features.slice(0, 3).map((feature, j) => (
                        <div key={j} className="flex items-center text-sm ">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <a
                        href={`#${service.id}`}
                        className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                      >
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Individual Service Details */}
            {heroServices.map((service, index) => (
              <section
                id={service.id}
                key={index}
                className="mb-24 scroll-mt-16"
              >
                <div className=" rounded-3xl p-8 md:p-12 border ">
                  <div className="flex items-center mb-8">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mr-6`}
                    >
                      <service.icon className="w-10 h-10 " />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold mb-2">
                        {service.title}
                      </h2>
                      <p className="text-xl">{service.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-6">
                        What&#39;s Included
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {service.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center  p-4 rounded-xl border border-slate-200"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="font-medium ">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`bg-gradient-to-br ${service.gradient} rounded-2xl p-8 flex items-center justify-center text-white`}
                    >
                      <div className="text-center">
                        <service.icon className="w-16 h-16 mx-auto mb-4 opacity-80" />
                        <p className="text-lg font-semibold opacity-90">
                          Professional {service.title} Services
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}

            {/* Technologies Section */}
            <section id="tech" className="mb-24 scroll-mt-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold  mb-6">
                  Cutting-Edge Technologies
                </h2>
                <p className="text-xl  max-w-3xl mx-auto">
                  We leverage the latest technologies and frameworks to build
                  scalable, secure, and high-performance solutions.
                </p>
              </div>

              {Object.entries(technologies).map(
                ([category, techs], categoryIndex) => (
                  <div key={categoryIndex} className="mb-12">
                    <h3 className="text-2xl font-bold  mb-6">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {techs.map((tech, i) => (
                        <div
                          key={i}
                          className=" rounded-xl border  p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                        >
                          <div className="flex items-center mb-4">
                            <div className="p-3 rounded-lg mr-4">
                              <tech.icon className="w-6 h-6 " />
                            </div>
                            <div>
                              <h4 className="font-bold ">{tech.name}</h4>
                              <p className="text-sm ">{tech.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </section>

            {/* Case Studies */}
            <section id="cases" className="mb-24 scroll-mt-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Success Stories</h2>
                <p className="text-xl max-w-3xl mx-auto">
                  See how we&#39;ve helped companies transform their digital
                  presence and achieve remarkable growth.
                </p>
              </div>

              <div className="space-y-12">
                {caseStudies.map((study, i) => (
                  <div
                    key={i}
                    className=" rounded-3xl border  shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div
                        className={`bg-gradient-to-br ${study.gradient} p-12 flex items-center justify-center  relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 "></div>
                        <div className="relative text-center">
                          <div className="w-24 h-24  rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-2xl font-bold">
                              {study.client.charAt(0)}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold mb-2">
                            {study.category}
                          </h4>
                          <p className="opacity-90">{study.title}</p>
                        </div>
                      </div>

                      <div className="p-8 lg:p-12">
                        <div className="h-full flex flex-col">
                          <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                              {study.category}
                            </span>
                            <h3 className="text-2xl lg:text-3xl font-bold  mb-3">
                              {study.title}
                            </h3>
                            <p className="text-lg text-blue-600 font-semibold mb-4">
                              {study.client}
                            </p>
                            <p className=" leading-relaxed mb-6">
                              {study.description}
                            </p>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-bold  mb-3">Key Results:</h4>
                            <div className="space-y-2">
                              {study.results.map((result, j) => (
                                <div key={j} className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  <span>{result}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-auto">
                            <h4 className="font-bold  mb-3">
                              Technologies Used:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {study.technologies.map((tech, j) => (
                                <span
                                  key={j}
                                  className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Getting Started Process */}
            <section id="get-started" className="mb-24 scroll-mt-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold  mb-6">
                  Your Journey to Success
                </h2>
                <p className="text-xl max-w-3xl mx-auto mb-8">
                  From initial discovery to ongoing growth, here&#39;s how we
                  partner with you every step of the way.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Book Your Free Discovery Session</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>

              <div className="relative">
  {/* Process timeline */}
  <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-teal-200 transform -translate-x-1/2"></div>

  <div className="space-y-12 lg:space-y-24">
    {processSteps.map((step, i) => (
      <div
        key={i}
        className={`flex flex-col lg:flex-row items-center gap-8 ${
          i % 2 === 1 ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Timeline dot (optional – remove if image should replace this too) */}
        <div className="hidden lg:flex absolute left-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full items-center justify-center z-10 transform -translate-x-1/2 shadow-lg">
          <step.icon className="w-8 h-8" />
        </div>

        {/* Step number for mobile */}
        <div className="lg:hidden w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
          {i + 1}
        </div>

        {/* Text content */}
        <div className="flex-1 lg:w-1/2">
          <div
            className={`rounded-2xl p-8 shadow-lg border ${
              i % 2 === 1 ? "lg:mr-12" : "lg:ml-12"
            }`}
          >
            <div className="flex items-center mb-4">
              <div className="lg:hidden p-3 rounded-lg mr-4">
                <step.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <span className="text-sm text-blue-600 font-medium">
                  {step.duration}
                </span>
              </div>
            </div>
            <p className="leading-relaxed">{step.description}</p>
          </div>
        </div>

        {/* Visual placeholder with image */}
        <div className="flex-1 lg:w-1/2">
          <div
            className={`h-48 bg-white rounded-2xl flex items-center justify-center ${
              i % 2 === 1 ? "lg:ml-12" : "lg:mr-12"
            }`}
          >
            <div className="relative w-full h-full p-4">
              <Image
                src={step.image}
                alt={`Image for ${step.title}`}
                fill
                className="object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl transform translate-x-48 -translate-y-48"></div>

              <div className="relative text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Vision?
                </h2>
                <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Join 100+ successful companies who trusted LOOPXO to bring
                  their digital products to life. Let&#39;s discuss how we can
                  accelerate your growth.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link
                    href="/contact"
                    className="group bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center"
                  >
                    <span>Book Free Discovery Session</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/contact"
          className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 flex items-center"
        >
          <MessageCircle className="w-6 h-6 mr-0 group-hover:mr-2 transition-all duration-300" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold">
            Free Consultation
          </span>
        </Link>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}

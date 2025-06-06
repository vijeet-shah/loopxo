// app/(landing-page)/services/page.tsx
import React from 'react';
import Link from 'next/link';
import { getLanguage } from '@/lib/i18n/server-utils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, X, ChevronDown, Phone, Video, MessageSquare, Zap, Users, Trophy } from 'lucide-react';

export default async function ServicesPage() {
  // Get language and translations with proper await
  const currentLanguage = await getLanguage();
  
  // Determine if the language reads right-to-left
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'he';

  // Service packages
  const packages = [
    {
      name: "Discovery",
      price: "Free",
      description: "Perfect for understanding your needs and exploring possibilities.",
      duration: "30-minute session",
      features: [
        { name: "Free Discovery Call", included: true },
        { name: "Business Analysis", included: true },
        { name: "Strategy Consultation", included: true },
        { name: "Project Roadmap", included: true },
        { name: "Custom Proposal", included: true },
        { name: "Market Research Overview", included: true },
        { name: "Dedicated Project Manager", included: false },
        { name: "24/7 Priority Support", included: false },
        { name: "Advanced Analytics Setup", included: false },
        { name: "Custom Integrations", included: false },
      ],
      cta: "Book Free Discovery Session",
      popular: false,
      icon: <Phone className="w-6 h-6" />,
      color: "emerald"
    },
    {
      name: "Growth",
      price: "$1999",
      period: "per month",
      description: "Complete digital transformation for growing businesses.",
      duration: "3-6 month engagement",
      features: [
        { name: "Everything in Discovery", included: true },
        { name: "Custom Website Development", included: true },
        { name: "SEO & Content Strategy", included: true },
        { name: "Social Media Management", included: true },
        { name: "Email Marketing Campaigns", included: true },
        { name: "Performance Analytics", included: true },
        { name: "Dedicated Project Manager", included: true },
        { name: "24/7 Priority Support", included: false },
        { name: "Advanced Analytics Setup", included: false },
        { name: "Custom Integrations", included: false },
      ],
      cta: "Start Growth Journey",
      popular: true,
      icon: <Zap className="w-6 h-6" />,
      color: "blue"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Comprehensive solutions for established enterprises.",
      duration: "6+ month partnership",
      features: [
        { name: "Everything in Growth", included: true },
        { name: "Custom Software Development", included: true },
        { name: "Enterprise Integrations", included: true },
        { name: "Advanced Analytics & BI", included: true },
        { name: "Multi-platform Solutions", included: true },
        { name: "White-label Solutions", included: true },
        { name: "Dedicated Project Manager", included: true },
        { name: "24/7 Priority Support", included: true },
        { name: "Advanced Analytics Setup", included: true },
        { name: "Custom Integrations", included: true },
      ],
      cta: "Schedule Enterprise Consultation",
      popular: false,
      icon: <Trophy className="w-6 h-6" />,
      color: "purple"
    }
  ];

  // FAQ items for agency services
  const faqItems = [
    {
      question: "What happens during the free discovery call?",
      answer: "During our 30-minute discovery session, we'll discuss your business goals, current challenges, and explore how our services can help you achieve your objectives. We'll also provide you with a preliminary strategy and next steps."
    },
    {
      question: "How long does it take to see results?",
      answer: "Results vary by service and industry, but most clients see initial improvements within 30-60 days. For comprehensive digital transformation projects, significant results typically appear within 3-6 months."
    },
    {
      question: "Do you work with businesses in my industry?",
      answer: "We work with businesses across various industries including e-commerce, SaaS, healthcare, finance, and professional services. Our strategies are customized to fit your specific industry requirements and market dynamics."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "We stand behind our work with a 30-day satisfaction guarantee. If you're not completely satisfied with our services within the first month, we'll work with you to make it right or provide a full refund."
    },
    {
      question: "Can I upgrade or downgrade my package?",
      answer: "Absolutely! We understand that business needs evolve. You can upgrade or adjust your service package at any time. We'll work with you to ensure a smooth transition that aligns with your current goals."
    }
  ];

  

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      
      
      {/* Service Packages */}
      <section id="services" className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Growth Path
            </h2>
            <p className="text-xl  max-w-3xl mx-auto">
              Tailored solutions designed to meet your business exactly where it is 
              and take it where it needs to go.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={cn(
                  "relative rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2", 
                  pkg.popular 
                    ? "border-blue-200 shadow-2xl scale-105 " 
                    : "border-slate-200 shadow-lg hover:shadow-xl ",
                  "flex flex-col h-full"
                )}
              >
                
                <div className="p-8 pb-6">
                  <div className={cn(
                    "inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full",
                    pkg.color === 'emerald' && "bg-emerald-100 text-emerald-700",
                    pkg.color === 'blue' && "bg-blue-100 text-blue-700", 
                    pkg.color === 'purple' && "bg-purple-100 text-purple-700"
                  )}>
                    {pkg.icon}
                    <span className="font-semibold">{pkg.name}</span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-bold">{pkg.price}</span>
                      {pkg.period && <span className=" text-lg">{pkg.period}</span>}
                    </div>
                    {pkg.duration && (
                      <p className=" text-sm">{pkg.duration}</p>
                    )}
                  </div>
                  
                  <p className=" mb-8 text-lg leading-relaxed">{pkg.description}</p>
                  
                  <Button 
                    className={cn(
                      "w-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mb-8",
                      pkg.popular 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" 
                        : ""
                    )}
                    variant={pkg.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href={index === 0 ? "/contact" : index === 2 ? "/contact" : "/contact"}>
                      {pkg.cta}
                    </Link>
                  </Button>
                </div>
                
                <div className="p-8 pt-0 flex-grow">
                  <h4 className="font-semibold mb-6 text-lg">What&#39;s included:</h4>
                  <ul className="space-y-4">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <div className="bg-green-100 rounded-full p-1">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                        ) : (
                          <div className="bg-slate-100 rounded-full p-1">
                            <X className="w-4 h-4 text-slate-400" />
                          </div>
                        )}
                        <span className={cn(
                          "text-sm leading-relaxed",
                        )}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enterprise CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        
        <div className="relative max-w-5xl mx-auto text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-6 text-slate-300" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Enterprise-Level Growth?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join industry leaders who trust us with their most ambitious projects. 
            Custom solutions, dedicated support, and proven results at scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold transition-all duration-300"
              asChild
            >
              <Link href="/contact">
                <Video className="w-5 h-5 mr-2" />
                Schedule Enterprise Demo
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300"
              asChild
            >
              <Link href="/case-studies">
                View Success Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about working with us
            </p>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-8 cursor-pointer hover:bg-slate-50 transition-colors">
                    <h3 className="text-lg font-semibold pr-8">{item.question}</h3>
                    <ChevronDown className="w-6 h-6 group-open:rotate-180 transition-transform duration-300 text-slate-400" />
                  </summary>
                  <div className="px-8 pb-8 pt-0">
                    <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center rounded-3xl p-12 bg-white dark:bg-black">
            <MessageSquare className="w-12 h-12 mx-auto mb-6 " />
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="mb-8 text-lg">
              Our team is here to help you find the perfect solution for your business.
            </p>
            <Button size="lg" className="px-8 py-4 text-lg font-semibold" asChild>
              <Link href="/contact" className='text-white'>
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
    
    </div>
  );
}
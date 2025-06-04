// app/(landing-page)/pricing/page.tsx
import React from 'react';
import Link from 'next/link';
import { getLanguage, getTranslations } from '@/lib/i18n/server-utils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, X, ChevronDown } from 'lucide-react';

export default async function PricingPage() {
  // Get language and translations with proper await
  const currentLanguage = await getLanguage();
  const t = await getTranslations(currentLanguage);
  
  // Determine if the language reads right-to-left
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'he';

  // Pricing plans
  const plans = [
    {
      name: t.freePlan || "Free",
      price: t.freePlanPrice || "Free",
      description: t.freePlanDesc || "Perfect for personal projects or learning.",
      features: [
        { name: t.uiComponents || "UI Components", included: true },
        { name: t.responsiveDesign || "Responsive Design", included: true },
        { name: t.singleUser || "Single User", included: true },
        { name: t.basicTemplates || "Basic Templates", included: true },
        { name: t.githubAccess || "GitHub Access", included: true },
        { name: t.communitySupport || "Community Support", included: true },
        { name: t.blogFunctionality || "Blog Functionality", included: false },
        { name: t.multiLanguageSupport || "Multi-Language Support", included: false },
        { name: t.prioritySupport || "Priority Support", included: false },
        { name: t.advancedAnalytics || "Advanced Analytics", included: false },
      ],
      cta: t.getStarted || "Get Started",
      popular: false,
    },
    {
      name: t.proPlan || "Pro",
      price: t.proPlanPrice || "$99",
      period: t.proPlanPeriod || "one-time payment",
      description: t.proPlanDesc || "Everything you need for professional projects.",
      features: [
        { name: t.uiComponents || "UI Components", included: true },
        { name: t.responsiveDesign || "Responsive Design", included: true },
        { name: t.unlimitedUsers || "Unlimited Users", included: true },
        { name: t.allTemplates || "All Templates", included: true },
        { name: t.githubAccess || "GitHub Access", included: true },
        { name: t.emailSupport || "Email Support", included: true },
        { name: t.blogFunctionality || "Blog Functionality", included: true },
        { name: t.multiLanguageSupport || "Multi-Language Support", included: true },
        { name: t.prioritySupport || "Priority Support", included: false },
        { name: t.advancedAnalytics || "Advanced Analytics", included: false },
      ],
      cta: t.buyNow || "Buy Now",
      popular: true,
    },
    {
      name: t.enterprisePlan || "Enterprise",
      price: t.enterprisePlanPrice || "Custom",
      description: t.enterprisePlanDesc || "Advanced features and dedicated support for large teams.",
      features: [
        { name: t.uiComponents || "UI Components", included: true },
        { name: t.responsiveDesign || "Responsive Design", included: true },
        { name: t.unlimitedUsers || "Unlimited Users", included: true },
        { name: t.allTemplates || "All Templates", included: true },
        { name: t.githubAccess || "GitHub Access", included: true },
        { name: t.premiumSupport || "Premium Support", included: true },
        { name: t.blogFunctionality || "Blog Functionality", included: true },
        { name: t.multiLanguageSupport || "Multi-Language Support", included: true },
        { name: t.prioritySupport || "Priority Support", included: true },
        { name: t.advancedAnalytics || "Advanced Analytics", included: true },
      ],
      cta: t.contactSales || "Contact Sales",
      popular: false,
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: t.pricingFaq1Q || "What's included in the free plan?",
      answer: t.pricingFaq1A || "The free plan includes access to all basic UI components, responsive design, and GitHub repository access. It's perfect for personal projects, learning, or evaluating the admin panel before purchasing."
    },
    {
      question: t.pricingFaq2Q || "Is the Pro license a subscription or one-time payment?",
      answer: t.pricingFaq2A || "The Pro license is a one-time payment that gives you lifetime access to all current features included in the Pro plan at the time of purchase. Future major version updates may require an upgrade fee."
    },
    {
      question: t.pricingFaq3Q || "Can I use this for client projects?",
      answer: t.pricingFaq3A || "Yes! The Pro license allows you to use the admin panel for unlimited client projects. Each project can have its own installation and customization."
    },
    {
      question: t.pricingFaq4Q || "Do you offer refunds?",
      answer: t.pricingFaq4A || "We offer a 14-day money-back guarantee for the Pro license. If you're not satisfied with the product, contact us within 14 days of purchase for a full refund."
    },
    {
      question: t.pricingFaq5Q || "What kind of support is included?",
      answer: t.pricingFaq5A || "Free users get community support through GitHub issues. Pro users receive email support with a 48-hour response time. Enterprise clients get priority support with dedicated channels and faster response times."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-foreground">
            {t.transparentPricing || "Simple, Transparent Pricing"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {t.pricingDesc || "Choose the perfect plan for your project. All plans include access to our core admin panel features."}
          </p>
          
          {/* Pricing toggle - could implement annual/monthly toggle here */}
          <div className="flex justify-center items-center space-x-3 mb-12">
            <span className="text-sm font-medium">{t.oneTimePayment || "One-time payment"}</span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400">
              {t.noSubscription || "No subscription"}
            </span>
          </div>
        </div>
      </section>
      
      {/* Pricing Plans */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={cn(
                  "rounded-2xl overflow-hidden border", 
                  plan.popular ? "border-primary scale-105 shadow-xl z-10" : "border-border shadow-md",
                  "bg-background relative flex flex-col h-full transform transition-all hover:-translate-y-1 hover:shadow-lg"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 w-full text-center bg-primary text-primary-foreground py-2 text-sm font-medium">
                    {t.mostPopular || "Most Popular"}
                  </div>
                )}
                
                <div className={cn("p-6", plan.popular ? "pt-12" : "")}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-2 text-sm">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  
                  <Button 
                    className={cn(
                      "w-full mb-6",
                      plan.popular ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={index === 2 ? "/contact" : "/documentation/quick-start"}>
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
                
                <div className="p-6 bg-muted/50 flex-grow">
                  <h4 className="font-medium mb-4">{t.whatsIncluded || "What's included:"}</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mr-3 flex-shrink-0" />
                        )}
                        <span className={!feature.included ? "text-muted-foreground" : ""}>
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
      
      {/* Enterprise Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.needCustomSolution || "Need a custom solution?"}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            {t.customSolutionDesc || "Our enterprise plan includes custom development, priority support, and additional features tailored to your specific needs."}
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/10"
            asChild
          >
            <Link href="/contact">
              {t.contactSales || "Contact Sales"}
            </Link>
          </Button>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            {t.frequentlyAskedQuestions || "Frequently Asked Questions"}
          </h2>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border border-border rounded-lg overflow-hidden bg-background"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">{item.question}</h3>
                    <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              {t.stillHaveQuestions || "Still have questions?"}
            </p>
            <Button asChild>
              <Link href="/contact">
                {t.contactSupport || "Contact Support"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.readyToGetStarted || "Ready to Get Started?"}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t.startBuildingToday || "Join thousands of developers building better admin panels with our solution."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              asChild
            >
              <Link href="/documentation/quick-start">
                {t.getStartedFree || "Get Started for Free"}
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
            >
              <Link href="/features/overview">
                {t.exploreFeatures || "Explore Features"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
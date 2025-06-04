// app/(landing-page)/contact/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { getLanguage, getTranslations } from "@/lib/i18n/server-utils";
import { siteConfig } from "@/config/site";

export default async function ContactPage() {
  // Get language and translations with proper await
  const lang = await getLanguage();
  const t = await getTranslations(lang);
  
  // Determine if the language reads right-to-left
  const isRTL = lang === 'ar' || lang === 'he';

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/5 via-background to-primary/5" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-16 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              {t.contactUs || "Contact Us"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.contactDescription || "We are always eager to answer your questions and help you. Contact us for any inquiries!"}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-muted rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {t.callUs || "Call Us"}
              </h2>
              <div className="space-y-3">
                <a href={`tel:${siteConfig.contact.phone}`} className="block text-foreground hover:text-primary transition-colors">
                  {siteConfig.contact.phone}
                </a>
                {/* Add secondary phone if available */}
                {siteConfig.contact.secondaryPhone && (
                  <a href={`tel:${siteConfig.contact.secondaryPhone}`} className="block text-foreground hover:text-primary transition-colors">
                    {siteConfig.contact.secondaryPhone}
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-muted rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {t.emailUs || "Email Us"}
              </h2>
              <a href={`mailto:${siteConfig.contact.email}`} className="block text-foreground hover:text-primary transition-colors mb-3">
                {siteConfig.contact.email}
              </a>
              <p className="text-muted-foreground">
                {t.visit || "Website"}: {" "}
                <a href={siteConfig.url} className="text-primary hover:underline">
                  {new URL(siteConfig.url).hostname}
                </a>
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-muted rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {t.bankingHours || "Office Hours"}
              </h2>
              <p className="text-foreground">
                {t.weekdayHours || "Monday - Friday: 9:00 AM - 5:00 PM"}
              </p>
              <p className="text-foreground mt-2">
                {t.saturdayHours || "Saturday: 10:00 AM - 2:00 PM"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Address & Map */}
      <section className="py-12 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-background p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    {t.ourAddress || "Our Address"}
                  </h2>
                  <address className="text-muted-foreground not-italic">
                    {siteConfig.contact.address.street}<br />
                    {siteConfig.contact.address.locality}<br />
                    {siteConfig.contact.address.postalCode}<br />
                    {siteConfig.contact.address.region}
                  </address>
                </div>
              </div>
              
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image 
                  src="/images/map.jpg" 
                  alt="Office Location Map" 
                  width={600} 
                  height={300} 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${siteConfig.contact.address.street} ${siteConfig.contact.address.locality} ${siteConfig.contact.address.region}`
                    )}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none"
                  >
                    {t.viewOnMaps || "View on Google Maps"}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {t.contactForm || "Contact Form"}
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    {t.yourName || "Your Name"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder={t.enterYourName || "Enter your name"}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    {t.email || "Email"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder={t.enterYourEmail || "Enter your email"}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                    {t.phone || "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder={t.enterYourPhone || "Enter your phone number"}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                    {t.subject || "Subject"}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder={t.enterSubject || "Enter subject"}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                    {t.message || "Message"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder={t.enterYourMessage || "Enter your message"}
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t.sendMessage || "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t.ctaTitle || "Start Your Journey Now"}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t.ctaDescription || "Speak with our experts and choose the right solution to achieve your goals."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-white px-6 py-3 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-background/90 focus-visible:outline-none">
                {t.applyNow || "Apply Now"}
              </Link>
              <a href={`tel:${siteConfig.contact.phone}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-white px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none">
                <Phone className="w-4 h-4 mr-2" />
                {t.callUs || "Call Us"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
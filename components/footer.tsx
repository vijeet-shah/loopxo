// This file should be placed at app/components/footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { getLanguage, getTranslations } from "@/lib/i18n/server-utils";

export function Footer() {
  const lang = getLanguage();
  const t = getTranslations(lang);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-amber-900 to-amber-800 dark:from-gray-900 dark:to-gray-800 text-white">
      {/* Main Footer */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 relative mr-3 bg-white dark:bg-gray-700 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Shree Laxmi Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  <span className="text-white">Shree </span>
                  <span className="text-amber-300 dark:text-amber-400">Laxmi</span>
                </h3>
                <p className="text-xs text-amber-100/80 dark:text-gray-400">Co-Op Credit Society Ltd</p>
              </div>
            </div>
            <p className="text-sm text-amber-50 dark:text-gray-300">
              {t.aboutShortDesc || "Empowering financial growth and security since 1987. Trusted by the community for reliable financial services and support."}
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" aria-label="Facebook" className="bg-amber-800/70 dark:bg-gray-700 hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors p-2 rounded-full">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="bg-amber-800/70 dark:bg-gray-700 hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors p-2 rounded-full">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="bg-amber-800/70 dark:bg-gray-700 hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors p-2 rounded-full">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="bg-amber-800/70 dark:bg-gray-700 hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors p-2 rounded-full">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b border-amber-700/50 dark:border-gray-700 pb-2">
              {t.quickLinks || "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.aboutUs || "About Us"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.services || "Services"}</span>
                </Link>
              </li>
              <li>
                <Link href="/loans" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.loans || "Loans"}</span>
                </Link>
              </li>
              <li>
                <Link href="/deposits" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.deposits || "Deposits"}</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.careers || "Careers"}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.contactUs || "Contact Us"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b border-amber-700/50 dark:border-gray-700 pb-2">
              {t.ourServices || "Our Services"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/personal-loans" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.personalLoan || "Personal Loans"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services/home-loans" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.homeLoan || "Home Loans"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services/fixed-deposits" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.fixedDeposit || "Fixed Deposits"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services/recurring-deposits" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.recurringDeposit || "Recurring Deposits"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services/savings" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.savings || "Savings Accounts"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services/insurance" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1 text-amber-400 dark:text-amber-500" />
                  <span>{t.insurance || "Insurance"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b border-amber-700/50 dark:border-gray-700 pb-2">
              {t.getInTouch || "Get In Touch"}
            </h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="text-amber-300 dark:text-amber-400 mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-amber-50 dark:text-gray-300 text-sm">
                  6th Floor, Autumn Grove Building,<br />
                  Lokhandwala Township, Kandivali East,<br />
                  Mumbai - 400101
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-amber-300 dark:text-amber-400 mr-3 flex-shrink-0" size={18} />
                <a href="tel:+919769423547" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors text-sm">
                  +91 9769423547
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="text-amber-300 dark:text-amber-400 mr-3 flex-shrink-0" size={18} />
                <a href="tel:+919967338979" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors text-sm">
                  +91 9967338979
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="text-amber-300 dark:text-amber-400 mr-3 flex-shrink-0" size={18} />
                <a href="mailto:support@shreelaxmifinance.com" className="text-amber-50 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-400 transition-colors text-sm">
                  support@shreelaxmifinance.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Banking Hours Strip */}
      <div className="bg-amber-800 dark:bg-gray-800 py-4">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-3 md:mb-0">
              <h4 className="text-amber-300 dark:text-amber-400 font-medium text-sm">
                {t.bankingHours || "Banking Hours"}:
              </h4>
              <p className="text-amber-50 dark:text-gray-300 text-sm">
                {t.weekdayHours || "Monday - Friday: 9:00 AM - 5:00 PM"} | {t.saturdayHours || "Saturday: 10:00 AM - 2:00 PM"}
              </p>
            </div>
            <div>
              <a href="#" className="bg-amber-600 hover:bg-amber-500 dark:bg-amber-600 dark:hover:bg-amber-500 dark:text-gray-900 transition-colors text-white py-2 px-6 rounded-lg text-sm font-medium inline-block shadow-lg hover:shadow-amber-600/20 dark:hover:shadow-amber-500/20">
                {t.onlineBanking || "Online Banking Login"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-amber-950 dark:bg-gray-900 py-4">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-amber-200/70 dark:text-gray-400 mb-3 md:mb-0">
              &copy; {currentYear} Shree Laxmi Co-Op Credit Society Ltd. {t.allRightsReserved || "All Rights Reserved"}
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="text-amber-200/70 dark:text-gray-400 hover:text-amber-300 dark:hover:text-amber-400 transition-colors">
                {t.privacyPolicy || "Privacy Policy"}
              </Link>
              <Link href="/terms" className="text-amber-200/70 dark:text-gray-400 hover:text-amber-300 dark:hover:text-amber-400 transition-colors">
                {t.terms || "Terms & Conditions"}
              </Link>
              <Link href="/sitemap" className="text-amber-200/70 dark:text-gray-400 hover:text-amber-300 dark:hover:text-amber-400 transition-colors">
                {t.sitemap || "Sitemap"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
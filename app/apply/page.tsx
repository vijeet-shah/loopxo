'use client';

import React, { useState } from "react";
import { getClientLanguage as getLanguage} from "@/lib/i18n/client-utils";
import { Check, User, Mail, Phone, MapPin, FileText, Send } from "lucide-react";

export default function ApplyPage() {
  const lang = getLanguage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    message: ""
  });

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Clear form and show success message
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        serviceType: "",
        message: ""
      });
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
};

return (
  <div className="min-h-screen bg-gradient-to-r from-amber-50 via-white to-amber-50">
    
    {/* Hero Section */}
    <section className="relative bg-gradient-to-b from-amber-100 to-white pt-16 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {lang === "hi" ? "आवेदन करें" : "Apply Now"}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {lang === "hi" 
              ? "हमारी सेवाओं के लिए अपना आवेदन आज ही भरें। हमारा टीम जल्द ही आपसे संपर्क करेगी।"
              : "Fill your application for our services today. Our team will contact you soon."}
          </p>
        </div>
      </div>
    </section>

    {/* Application Form */}
    <section className="py-12 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        {submitSuccess ? (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-green-800">
                  {lang === "hi" ? "आवेदन सफलतापूर्वक भेजा गया!" : "Application Successfully Submitted!"}
                </h3>
                <p className="mt-2 text-gray-700">
                  {lang === "hi" 
                    ? "आपका आवेदन प्राप्त हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी। धन्यवाद!"
                    : "Your application has been received. Our team will contact you soon. Thank you!"}
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {lang === "hi" ? "नया आवेदन भरें" : "Submit Another Application"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-amber-700">
              {lang === "hi" ? "आवेदन फॉर्म" : "Application Form"}
            </h2>
            
            {submitError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700">{submitError}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "hi" ? "पहला नाम *" : "First Name *"}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <User className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                      placeholder={lang === "hi" ? "पहला नाम" : "First name"}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "hi" ? "अंतिम नाम *" : "Last Name *"}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <User className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                      placeholder={lang === "hi" ? "अंतिम नाम" : "Last name"}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "hi" ? "ईमेल *" : "Email *"}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Mail className="h-5 w-5" />
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                      placeholder={lang === "hi" ? "आपका ईमेल" : "Your email"}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === "hi" ? "फोन नंबर *" : "Phone Number *"}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Phone className="h-5 w-5" />
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                      placeholder={lang === "hi" ? "आपका फोन नंबर" : "Your phone number"}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "hi" ? "पता" : "Address"}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                    placeholder={lang === "hi" ? "आपका पता" : "Your address"}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "hi" ? "सेवा का प्रकार *" : "Service Type *"}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FileText className="h-5 w-5" />
                  </span>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-700 focus:border-amber-500 focus:ring-amber-500"
                    required
                  >
                    <option value="" disabled>
                      {lang === "hi" ? "-- सेवा चुनें --" : "-- Select Service --"}
                    </option>
                    <option value="Savings Account">
                      {lang === "hi" ? "बचत खाता" : "Savings Account"}
                    </option>
                    <option value="Fixed Deposit">
                      {lang === "hi" ? "सावधि जमा" : "Fixed Deposit"}
                    </option>
                    <option value="Recurring Deposit">
                      {lang === "hi" ? "आवर्ती जमा" : "Recurring Deposit"}
                    </option>
                    <option value="Yearly Income Scheme">
                      {lang === "hi" ? "वार्षिक आय योजना" : "Yearly Income Scheme"}
                    </option>
                    <option value="Lakhpati Scheme">
                      {lang === "hi" ? "लखपति योजना" : "Lakhpati Scheme"}
                    </option>
                    <option value="Personal Loan">
                      {lang === "hi" ? "व्यक्तिगत ऋण" : "Personal Loan"}
                    </option>
                    <option value="Home Loan">
                      {lang === "hi" ? "गृह ऋण" : "Home Loan"}
                    </option>
                    <option value="Vehicle Loan">
                      {lang === "hi" ? "वाहन ऋण" : "Vehicle Loan"}
                    </option>
                    <option value="Business Loan">
                      {lang === "hi" ? "व्यापार ऋण" : "Business Loan"}
                    </option>
                    <option value="Other">
                      {lang === "hi" ? "अन्य" : "Other"}
                    </option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "hi" ? "अतिरिक्त संदेश" : "Additional Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 py-3 px-4 placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500"
                  placeholder={lang === "hi" ? "आवेदन के बारे में कोई अतिरिक्त जानकारी..." : "Any additional information about your application..."}
                ></textarea>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {lang === "hi" ? "प्रस्तुत कर रहा है..." : "Submitting..."}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      {lang === "hi" ? "आवेदन जमा करें" : "Submit Application"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>

    {/* Required Documents */}
    <section className="py-12 px-6 bg-amber-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {lang === "hi" ? "आवश्यक दस्तावेज़" : "Required Documents"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-amber-700">
              {lang === "hi" ? "खाता खोलने के लिए" : "For Account Opening"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-gray-700">
                  {lang === "hi" ? "आधार कार्ड" : "Aadhaar Card"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-gray-700">
                  {lang === "hi" ? "पैन कार्ड" : "PAN Card"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-gray-700">
                  {lang === "hi" ? "पासपोर्ट साइज फोटो (2 नग)" : "Passport Size Photos (2 nos)"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-gray-700">
                  {lang === "hi" ? "निवास प्रमाण (बिजली बिल / पानी बिल / पासपोर्ट आदि)" : "Address Proof (Electricity Bill / Water Bill / Passport etc.)"}
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-amber-700">
              {lang === "hi" ? "ऋण के लिए अतिरिक्त दस्तावेज़" : "Additional Documents for Loans"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-gray-700">
                  {lang === "hi" ? "आय प्रमाण (वेतन पर्ची / आयकर रिटर्न / फॉर्म 16)" : "Income Proof (Salary Slips / Income Tax Return / Form 16)"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-gray-700">
                  {lang === "hi" ? "बैंक स्टेटमेंट (पिछले 6 महीने)" : "Bank Statement (Last 6 months)"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-gray-700">
                  {lang === "hi" ? "रोजगार प्रमाणपत्र (नौकरीपेशा) / व्यापार पंजीकरण (स्वरोजगार)" : "Employment Certificate (Salaried) / Business Registration (Self-employed)"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-gray-700">
                  {lang === "hi" ? "संपत्ति दस्तावेज़ (गृह ऋण / बंधक ऋण के लिए)" : "Property Documents (For Home Loan / Mortgage Loan)"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Process Steps */}
    <section className="py-12 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {lang === "hi" ? "आवेदन प्रक्रिया" : "Application Process"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">1</div>
            <h3 className="font-semibold mb-2 text-gray-800">
              {lang === "hi" ? "फॉर्म भरें" : "Fill Form"}
            </h3>
            <p className="text-gray-600 text-sm">
              {lang === "hi" 
                ? "ऑनलाइन आवेदन फॉर्म भरें या हमारी किसी भी शाखा पर जाएं"
                : "Fill out the online application form or visit any of our branches"}
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">2</div>
            <h3 className="font-semibold mb-2 text-gray-800">
              {lang === "hi" ? "दस्तावेज़ जमा करें" : "Submit Documents"}
            </h3>
            <p className="text-gray-600 text-sm">
              {lang === "hi" 
                ? "आवश्यक दस्तावेजों को हमारी शाखा में जमा करें"
                : "Submit required documents at our branch"}
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">3</div>
            <h3 className="font-semibold mb-2 text-gray-800">
              {lang === "hi" ? "आवेदन प्रोसेसिंग" : "Application Processing"}
            </h3>
            <p className="text-gray-600 text-sm">
              {lang === "hi" 
                ? "हमारी टीम आपके आवेदन की समीक्षा और प्रोसेस करेगी"
                : "Our team will review and process your application"}
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">4</div>
            <h3 className="font-semibold mb-2 text-gray-800">
              {lang === "hi" ? "अनुमोदन और सक्रियण" : "Approval & Activation"}
            </h3>
            <p className="text-gray-600 text-sm">
              {lang === "hi" 
                ? "अनुमोदन के बाद, आपका खाता/ऋण सक्रिय कर दिया जाएगा"
                : "After approval, your account/loan will be activated"}
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="py-8 px-6 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-amber-400 font-semibold mb-2">
            {lang === "hi" ? "आपकी वित्तीय समृद्धि हमारा लक्ष्य है" : "Your Financial Prosperity is Our Goal"}
          </p>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Shree Laxmi Co-Op Credit Society
            Ltd. {lang === "hi" ? "सर्वाधिकार सुरक्षित" : "All Rights Reserved"}
          </p>
        </div>
      </div>
    </footer>
  </div>
);
}
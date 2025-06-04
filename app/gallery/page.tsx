// app/gallery/page.tsx
import React from "react";
import Image from "next/image";
import { getLanguage } from "@/lib/i18n/server-utils";




// Define gallery image type
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: "events" | "office" | "team" | "achievements";
}

export default async function GalleryPage() {
  const lang = await getLanguage('en');

  // Gallery images data
  const galleryImages: GalleryImage[] = [
    // Events
    { id: 1, src: "/gallery/event1.jpg", alt: "Annual Meeting 2023", category: "events" },
    { id: 2, src: "/gallery/event2.jpg", alt: "Financial Literacy Workshop", category: "events" },
    { id: 3, src: "/gallery/event3.jpg", alt: "Customer Appreciation Day", category: "events" },
    { id: 4, src: "/gallery/event4.jpg", alt: "Community Service Initiative", category: "events" },
    { id: 5, src: "/gallery/event5.jpg", alt: "Diwali Celebration 2023", category: "events" },
    
    // Office
    { id: 6, src: "/gallery/office1.jpg", alt: "Kandivali Branch", category: "office" },
    { id: 7, src: "/gallery/office2.jpg", alt: "Customer Service Area", category: "office" },
    { id: 8, src: "/gallery/office3.jpg", alt: "Conference Room", category: "office" },
    { id: 9, src: "/gallery/office4.jpg", alt: "New Branch Opening", category: "office" },
    
    // Team
    { id: 10, src: "/gallery/team1.jpg", alt: "Management Team", category: "team" },
    { id: 11, src: "/gallery/team2.jpg", alt: "Customer Service Team", category: "team" },
    { id: 12, src: "/gallery/team3.jpg", alt: "Finance Team", category: "team" },
    { id: 13, src: "/gallery/team4.jpg", alt: "IT Department", category: "team" },
    
    // Achievements
    { id: 14, src: "/gallery/achievement1.jpg", alt: "Best Credit Society Award 2023", category: "achievements" },
    { id: 15, src: "/gallery/achievement2.jpg", alt: "10 Years of Service Celebration", category: "achievements" },
    { id: 16, src: "/gallery/achievement3.jpg", alt: "5000+ Customer Milestone", category: "achievements" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-50 via-white to-amber-50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-amber-100 to-white pt-16 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {lang === "hi" ? "गैलरी" : "Gallery"}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {lang === "hi" 
                ? "श्री लक्ष्मी को-ऑप क्रेडिट सोसाइटी के कार्यक्रमों, टीम और उपलब्धियों की झलक देखें।"
                : "See glimpses of Shree Laxmi Co-Op Credit Society's events, team, and achievements."}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Navigation */}
      <section className="py-8 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#events" className="px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors">
              {lang === "hi" ? "कार्यक्रम" : "Events"}
            </a>
            <a href="#office" className="px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors">
              {lang === "hi" ? "कार्यालय" : "Office"}
            </a>
            <a href="#team" className="px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors">
              {lang === "hi" ? "टीम" : "Team"}
            </a>
            <a href="#achievements" className="px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors">
              {lang === "hi" ? "उपलब्धियां" : "Achievements"}
            </a>
          </div>
        </div>
      </section>

      {/* Events Gallery */}
      <section id="events" className="py-12 px-6 bg-amber-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-amber-700">
            {lang === "hi" ? "कार्यक्रम" : "Events"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages
              .filter(image => image.category === "events")
              .map(image => (
                <div key={image.id} className="overflow-hidden rounded-lg shadow-md bg-white">
                  <div className="relative h-64">
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      width={400} 
                      height={300} 
                      className="object-cover h-full w-full transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-800 font-medium">
                      {lang === "hi" 
                        ? image.alt.includes("Annual Meeting") ? "वार्षिक बैठक 2023" :
                          image.alt.includes("Financial Literacy") ? "वित्तीय साक्षरता कार्यशाला" :
                          image.alt.includes("Customer Appreciation") ? "ग्राहक प्रशंसा दिवस" :
                          image.alt.includes("Community Service") ? "सामुदायिक सेवा पहल" :
                          "दिवाली उत्सव 2023"
                        : image.alt}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Office Gallery */}
      <section id="office" className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-amber-700">
            {lang === "hi" ? "कार्यालय" : "Office"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages
              .filter(image => image.category === "office")
              .map(image => (
                <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
                  <div className="relative h-64">
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      width={400} 
                      height={300} 
                      className="object-cover h-full w-full transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-gray-800 font-medium">
                      {lang === "hi" 
                        ? image.alt.includes("Kandivali") ? "कांदिवली शाखा" :
                          image.alt.includes("Customer Service") ? "ग्राहक सेवा क्षेत्र" :
                          image.alt.includes("Conference") ? "सम्मेलन कक्ष" :
                          "नई शाखा का उद्घाटन"
                        : image.alt}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Team Gallery */}
      <section id="team" className="py-12 px-6 bg-amber-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-amber-700">
            {lang === "hi" ? "टीम" : "Team"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {galleryImages
              .filter(image => image.category === "team")
              .map(image => (
                <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
                  <div className="relative h-80">
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      width={600} 
                      height={400} 
                      className="object-cover h-full w-full transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-gray-800 font-medium">
                      {lang === "hi" 
                        ? image.alt.includes("Management") ? "प्रबंधन टीम" :
                          image.alt.includes("Customer Service") ? "ग्राहक सेवा टीम" :
                          image.alt.includes("Finance") ? "वित्त टीम" :
                          "आईटी विभाग"
                        : image.alt}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Achievements Gallery */}
      <section id="achievements" className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-amber-700">
            {lang === "hi" ? "उपलब्धियां" : "Achievements"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages
              .filter(image => image.category === "achievements")
              .map(image => (
                <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
                  <div className="relative h-64">
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      width={400} 
                      height={300} 
                      className="object-cover h-full w-full transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-gray-800 font-medium">
                      {lang === "hi" 
                        ? image.alt.includes("Best Credit") ? "बेस्ट क्रेडिट सोसाइटी पुरस्कार 2023" :
                          image.alt.includes("10 Years") ? "10 वर्षों की सेवा का उत्सव" :
                          "5000+ ग्राहक मील का पत्थर"
                        : image.alt}
                    </p>
                  </div>
                </div>
              ))}
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
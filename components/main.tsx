import React from "react";
import { useTranslation } from "@/lib/i18n/client-utils";
import {
 
} from "lucide-react";
import { usePageNavigation } from "@/hook/usePageNavigation";
import { PageTurn } from "./book/pageTurn";
import Newsletter from "./landing-page/newsletter";
import { PageNavigationControls } from "./book/pageNavigationControls";
import HeroSection from "./landing-page/heroSection";
import StorySection from "./landing-page/storySection";
import YoutubeSection from "./landing-page/youtubeSection";
import BlogShowcase from "@/components/landing-page/blogShowcase";


export default function Main() {
  const { t } = useTranslation();
  const { currentPage, goNext, goPrev, direction, isAnimating } =
    usePageNavigation();

    

  // Page content sections
  const pages = [
    { id: "hero", title: "Hero" },
    { id: "tech", title: "Technologies" },
    { id: "featured", title: "Featured" },
    { id: "recent", title: "Recent Posts" },
    { id: "subscribe", title: "Subscribe to Newsletter" },

  ];

  return (
    <div className="relative min-h-screen overflow-hidden perspective-1000">
      {/* Page corner effect */}
      <div className="fixed top-0 right-0 w-24 h-24 z-40 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-transparent to-gray-200/10 dark:to-gray-800/10"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        ></div>
      </div>

      {/* Book pages container */}
      <div className="relative min-h-screen w-full perspective-1000 bg-background">
        {/* Hero Page - Completely reimagined centerpiece design */}
        <PageTurn
          isVisible={currentPage === 1}
          direction={direction}
          zIndex={40 - currentPage}
        >
          <HeroSection/>
        </PageTurn>

        {/* Technology Page - Using your TechnologyTicker component */}
        <PageTurn
          isVisible={currentPage === 2}
          direction={direction}
          zIndex={40 - currentPage}
        >
          <div className="min-h-screen relative overflow-hidden">
            <div className="min-h-screen ">
              <BlogShowcase  />
            </div>
          </div>
        </PageTurn>

        {/* Featured Post Page - Using your FeaturedPost component */}
        <PageTurn
          isVisible={currentPage === 3}
          direction={direction}
          zIndex={40 - currentPage}
        >
          <StorySection/>
        </PageTurn>

 

        <PageTurn
          isVisible={currentPage === 4}
          direction={direction}
          zIndex={40 - currentPage}
        >
<YoutubeSection/>           
        </PageTurn>

        <PageTurn
          isVisible={currentPage === 5}
          direction={direction}
          zIndex={40 - currentPage}
        >
      <Newsletter t={t} />
        </PageTurn>




      </div>

      {/* Page navigation controls */}
      <PageNavigationControls
        currentPage={currentPage}
        goNext={goNext}
        goPrev={goPrev}
        pagesCount={pages.length}
        isAnimating={isAnimating}
      />

     
    </div>
  );
}

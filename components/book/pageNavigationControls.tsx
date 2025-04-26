import { cn } from "@/lib/utils";
import { useEffect } from "react";

// Navigation controls component
export const PageNavigationControls = ({ currentPage, goNext, goPrev, pagesCount, isAnimating }) => {
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger navigation if animation is in progress
      if (isAnimating) return;
      
      // Navigate based on key presses
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (currentPage < pagesCount) {
          goNext();
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (currentPage > 1) {
          goPrev();
        }
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, pagesCount, goNext, goPrev, isAnimating]);

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col space-y-4">
      <button
        onClick={goPrev}
        disabled={currentPage === 1 || isAnimating}
        className={cn(
          "w-12 h-12 rounded-full bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center",
          currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-300 dark:hover:bg-gray-700"
        )}
        aria-label="Previous page"
      >
        <span className="text-sm font-medium">{currentPage > 1 ? currentPage - 1 : '-'}</span>
      </button>
      
      <div className="w-12 flex flex-col items-center space-y-1">
        {Array.from({ length: pagesCount }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i + 1 === currentPage 
                ? "bg-primary w-4" 
                : "bg-gray-400 dark:bg-gray-600"
            )}
          />
        ))}
      </div>
      
      <button
        onClick={goNext}
        disabled={currentPage === pagesCount || isAnimating}
        className={cn(
          "w-12 h-12 rounded-full bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center",
          currentPage === pagesCount ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-300 dark:hover:bg-gray-700" 
        )}
        aria-label="Next page"
      >
        <span className="text-sm font-medium">{currentPage < pagesCount ? currentPage + 1 : '-'}</span>
      </button>
    </div>
  );
};
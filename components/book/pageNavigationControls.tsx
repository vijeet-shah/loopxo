import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Navigation controls component
export const PageNavigationControls = ({ currentPage, goNext, goPrev, pagesCount, isAnimating }) => {
  // For touch swipe functionality
    interface TouchPoint {
      x: number;
      y: number;
    }
    const [touchStart, setTouchStart] = useState<TouchPoint | null>(null);
    const [touchEnd, setTouchEnd] = useState<TouchPoint | null>(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Add keyboard and touch navigation
  useEffect(() => {
    // Handle touch start
    const onTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    };
    
    // Handle touch move
    const onTouchMove = (e) => {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    };
    
    // Handle touch end and decide direction
    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      // Don't trigger navigation if animation is in progress
      if (isAnimating) return;
      
      const distanceX = touchStart.x - touchEnd.x;
      const distanceY = touchStart.y - touchEnd.y;
      const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
      
      // Check if swipe distance is sufficient
      if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          // Swiped left, go to next page
          if (currentPage < pagesCount) {
            goNext();
          }
        } else {
          // Swiped right, go to previous page
          if (currentPage > 1) {
            goPrev();
          }
        }
      } else if (!isHorizontalSwipe && Math.abs(distanceY) > minSwipeDistance) {
        if (distanceY > 0) {
          // Swiped up, go to next page
          if (currentPage < pagesCount) {
            goNext();
          }
        } else {
          // Swiped down, go to previous page
          if (currentPage > 1) {
            goPrev();
          }
        }
      }
      
      // Reset touch points
      setTouchStart(null);
      setTouchEnd(null);
    };

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

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
    
    // Clean up the event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentPage, pagesCount, goNext, goPrev, isAnimating, touchStart, touchEnd, minSwipeDistance]);

  return (
    <>
      {/* Desktop navigation controls */}
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
      
      {/* Mobile indicator (dots only) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex md:hidden space-x-1">
        {Array.from({ length: pagesCount }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i + 1 === currentPage 
                ? "bg-primary w-6" 
                : "bg-gray-400/70 dark:bg-gray-600/70"
            )}
          />
        ))}
      </div>
    </>
  );
};
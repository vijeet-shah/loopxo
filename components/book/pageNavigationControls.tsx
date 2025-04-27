import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

// Define types for better TypeScript support
interface TouchPoint {
  x: number;
  y: number;
  time: number;
}

// Navigation controls component
export const PageNavigationControls = ({ currentPage, goNext, goPrev, pagesCount, isAnimating }) => {
  
  // Properly typed state variables
  const [touchStart, setTouchStart] = useState<TouchPoint | null>(null);
  const [touchEnd, setTouchEnd] = useState<TouchPoint | null>(null);
  const [swipeIndicator, setSwipeIndicator] = useState<'left' | 'right' | null>(null);
  const swipeTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Tuned parameters for better mobile experience
  const minSwipeDistance = 80; // Increased from 50 to prevent accidental swipes
  const maxSwipeTime = 500; // Maximum time in ms for a swipe to be registered
  
  // Add keyboard and touch navigation
  useEffect(() => {
    // Handle touch start
    const onTouchStart = (e: TouchEvent) => {
      // Only handle single-finger touches
      if (e.touches.length !== 1) return;
      
      setTouchEnd(null);
      setSwipeIndicator(null);
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
        time: Date.now()
      });
    };
    
    // Handle touch move to provide feedback
    const onTouchMove = (e: TouchEvent) => {
      if (!touchStart || e.touches.length !== 1) return;
      
      const currentX = e.targetTouches[0].clientX;
      const currentY = e.targetTouches[0].clientY;
      const deltaX = touchStart.x - currentX;
      const deltaY = touchStart.y - currentY;
      
      // Only show indicator for horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance * 0.5) {
        setSwipeIndicator(deltaX > 0 ? 'left' : 'right');
      } else {
        setSwipeIndicator(null);
      }
      
      setTouchEnd({
        x: currentX,
        y: currentY,
        time: Date.now()
      });
    };
    
    // Handle touch end with more precise control
    const onTouchEnd = () => {
      // Clear any pending swipe feedback
      if (swipeTimeout.current) {
        clearTimeout(swipeTimeout.current);
        swipeTimeout.current = null;
      }
      
      if (!touchStart || !touchEnd) {
        setSwipeIndicator(null);
        return;
      }
      
      // Don't trigger navigation if animation is in progress
      if (isAnimating) {
        setSwipeIndicator(null);
        return;
      }
      
      const deltaX = touchStart.x - touchEnd.x;
      const deltaY = touchStart.y - touchEnd.y;
      const timeElapsed = touchEnd.time - touchStart.time;
      
      // Only process quick swipes (not slow drags)
      if (timeElapsed > maxSwipeTime) {
        setSwipeIndicator(null);
        setTouchStart(null);
        setTouchEnd(null);
        return;
      }
      
      // Only process horizontal swipes that are significantly larger than vertical movement
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.5;
      
      if (isHorizontalSwipe && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          // Swiped left, go to next page
          if (currentPage < pagesCount) {
            setSwipeIndicator('left');
            goNext();
            
            // Clear the indicator after navigation completes
            swipeTimeout.current = setTimeout(() => {
              setSwipeIndicator(null);
            }, 300);
          }
        } else {
          // Swiped right, go to previous page
          if (currentPage > 1) {
            setSwipeIndicator('right');
            goPrev();
            
            // Clear the indicator after navigation completes
            swipeTimeout.current = setTimeout(() => {
              setSwipeIndicator(null);
            }, 300);
          }
        }
      } else {
        setSwipeIndicator(null);
      }
      
      // Reset touch points
      setTouchStart(null);
      setTouchEnd(null);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
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
    document.addEventListener("touchstart", onTouchStart as EventListener, { passive: true });
    document.addEventListener("touchmove", onTouchMove as EventListener, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
    
    // Clean up the event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", onTouchStart as EventListener);
      document.removeEventListener("touchmove", onTouchMove as EventListener);
      document.removeEventListener("touchend", onTouchEnd);
      
      if (swipeTimeout.current) {
        clearTimeout(swipeTimeout.current);
      }
    };
  }, [currentPage, pagesCount, goNext, goPrev, isAnimating, touchStart, touchEnd]);

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
      
      {/* Mobile navigation at the TOP of the screen with page numbers */}
      <div className="fixed top-4 left-0 right-0 z-50 md:hidden">
        <div className="flex justify-between px-4">
          <button
            onClick={goPrev}
            disabled={currentPage === 1 || isAnimating}
            className={cn(
              "w-10 h-10 rounded-full bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg",
              currentPage === 1 ? "opacity-30" : "active:scale-95"
            )}
            aria-label="Previous page"
          >
            <span className="text-xs font-medium">{currentPage > 1 ? currentPage - 1 : '-'}</span>
          </button>
          
          <button
            onClick={goNext}
            disabled={currentPage === pagesCount || isAnimating}
            className={cn(
              "w-10 h-10 rounded-full bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg",
              currentPage === pagesCount ? "opacity-30" : "active:scale-95"
            )}
            aria-label="Next page"
          >
            <span className="text-xs font-medium">{currentPage < pagesCount ? currentPage + 1 : '-'}</span>
          </button>
        </div>
      </div>
      
      {/* Swipe visual indicators (using the swipeIndicator state) */}
      {swipeIndicator && (
        <div className="fixed inset-0 z-40 pointer-events-none md:hidden">
          <div 
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 bg-primary/20 rounded-full h-16 w-16 flex items-center justify-center transition-all duration-300",
              swipeIndicator === 'left' ? "right-4 animate-pulse" : "left-4 animate-pulse" 
            )}
          >
            {/* Show direction indicator */}
            <span className="text-lg font-bold text-primary">
              {swipeIndicator === 'left' ? '→' : '←'}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
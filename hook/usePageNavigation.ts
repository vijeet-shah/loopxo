import { useEffect, useState } from "react";

export const usePageNavigation = () => {
    // Get stored page from localStorage on initial load
    const getInitialPage = () => {
        if (typeof window !== 'undefined') {
            const storedPage = localStorage.getItem('currentPage');
            return storedPage ? parseInt(storedPage, 10) : 0;
        }
        return 0;
    };

    const [currentPage, setCurrentPage] = useState(0); // Start with 0 and update in useEffect
    const [direction, setDirection] = useState("next");
    const [isAnimating, setIsAnimating] = useState(false);
    const totalPages = 6; // Hero, Tech, Featured, Recent, Newsletter

    // Initialize page from localStorage after component mounts
    useEffect(() => {
        setCurrentPage(getInitialPage());
    }, []);

    // Save currentPage to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined' && currentPage !== 0) {
            localStorage.setItem('currentPage', currentPage.toString());
        }
    }, [currentPage]);

    const navigate = (to) => {
      if (isAnimating) return;

      setIsAnimating(true);
      if (to > currentPage) setDirection("next");
      else setDirection("prev");

      setCurrentPage(to);

      // Reset animation flag after animation completes
      setTimeout(() => setIsAnimating(false), 800);
    };

    const goNext = () => {
      if (currentPage < totalPages - 1) {
        navigate(currentPage + 1);
      }
    };

    const goPrev = () => {
      if (currentPage > 0) {
        navigate(currentPage - 1);
      }
    };

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") goNext();
        else if (e.key === "ArrowLeft") goPrev();
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentPage]);

    // For debugging - can be removed in production
    useEffect(() => {
      console.log("Current page:", currentPage);
    }, [currentPage]);

    return { currentPage, goNext, goPrev, direction, isAnimating, navigate };
};
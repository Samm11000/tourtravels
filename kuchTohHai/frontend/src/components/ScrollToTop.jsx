import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Get the stored scroll position for this route
    const scrollPositions = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
    const savedPosition = scrollPositions[pathname];

    if (savedPosition !== undefined) {
      // Restore the saved scroll position
      setTimeout(() => {
        window.scrollTo(0, savedPosition);
      }, 0);
    } else {
      // If no saved position, scroll to top (for new routes)
      window.scrollTo(0, 0);
    }

    // Save scroll position when user scrolls
    const handleScroll = () => {
      const currentScrollPositions = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
      currentScrollPositions[pathname] = window.scrollY;
      sessionStorage.setItem('scrollPositions', JSON.stringify(currentScrollPositions));
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove scroll listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
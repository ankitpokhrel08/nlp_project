import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Save scroll position when leaving home page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (pathname === "/") {
        sessionStorage.setItem("homeScrollPosition", window.scrollY.toString());
      }
    };

    // Save scroll position before route change
    return () => {
      if (pathname === "/") {
        sessionStorage.setItem("homeScrollPosition", window.scrollY.toString());
      }
    };
  }, [pathname]);

  useLayoutEffect(() => {
    if (pathname === "/") {
      // Restore scroll position for home page
      const savedPosition = sessionStorage.getItem("homeScrollPosition");
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    } else {
      // Scroll to top for all other pages
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;

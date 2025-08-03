import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleNavClick = (url, external = false) => {
    handleClick();

    if (external) {
      window.open(url, "_blank", "noopener noreferrer");
      return;
    }

    // If we're not on home page and clicking an anchor link, navigate to home first
    if (location.pathname !== "/" && url.startsWith("#")) {
      navigate("/" + url);
    } else if (url.startsWith("#")) {
      // Smooth scroll to section on same page
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-gray-200/50 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out shadow-sm ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        openNavigation ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a
          className="block w-[9rem] xl:mr-8 group"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
        >
          <img
            src={brainwave}
            width={90}
            height={18}
            alt="Brainwave"
            className="transition-transform duration-200"
          />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-white/100 shadow-2xl backdrop-blur-sm lg:static lg:flex lg:mx-auto lg:bg-transparent lg:shadow-none lg:backdrop-blur-none`}
        >
          <div className="relative z-10 flex flex-col items-center justify-center m-auto lg:flex-row bg-white/100 lg:bg-transparent w-full lg:w-auto">
            {navigation.map((item) =>
              item.external ? (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.url, true);
                  }}
                  className={`block relative font-semibold text-2xl uppercase text-gray-900 transition-colors duration-300 hover:text-brand-primary ${
                    item.onlyMobile ? "lg:hidden" : ""
                  } px-6 py-4 md:py-6 lg:-mr-0.25 lg:text-base lg:font-semibold lg:text-gray-700 lg:leading-5 lg:hover:text-brand-primary xl:px-12`}
                >
                  {item.title}
                </a>
              ) : (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.url);
                  }}
                  className={`block relative font-semibold text-2xl uppercase text-gray-900 transition-colors duration-300 hover:text-brand-primary ${
                    item.onlyMobile ? "lg:hidden" : ""
                  } px-6 py-4 md:py-6 lg:-mr-0.25 lg:text-base lg:font-semibold ${
                    item.url === location.hash
                      ? "z-2 lg:text-brand-primary"
                      : "lg:text-gray-700"
                  } lg:leading-5 lg:hover:text-brand-primary xl:px-12`}
                >
                  {item.title}
                </a>
              )
            )}
          </div>

          <HamburgerMenu />
        </nav>

        <Button
          className="hidden lg:flex"
          onClick={() => navigate("/documentation")}
        >
          Documentation
        </Button>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

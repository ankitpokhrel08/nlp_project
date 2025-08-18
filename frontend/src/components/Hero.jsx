import { heroBackground } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BottomLine } from "./design/Hero";
import { useRef } from "react";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[2rem] -mt-[5.25rem] min-h-screen relative"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      {/* Background Image - positioned absolutely behind content */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src={heroBackground}
          className="w-full h-full object-cover opacity-60"
          style={{ filter: "contrast(1.2)" }}
          width={1440}
          height={1800}
          alt="hero"
        />
        {/* Floating elements for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-brand-primary/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-brand-secondary/20 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-brand-accent/20 rounded-full animate-bounce delay-500"></div>
      </div>

      <div
        className="container relative z-10 min-h-screen flex items-center justify-center"
        ref={parallaxRef}
      >
        <div className="relative z-1 max-w-[68rem] mx-auto text-center w-full">
          {/* Semi-transparent overlay for better text contrast */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl -mx-8 -my-8"></div>

          <div className="relative z-10">
            {/* Animated badge */}
            <div className="inline-flex items-center px-6 py-2 bg-brand-primary/20 rounded-full border border-brand-primary/20 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-brand-primary rounded-full mr-3 animate-pulse"></div>
              <span className="text-brand-primary font-medium text-sm">
                Student-Powered Innovation
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              Explore Nepali <br />
              <span className="text-brand-primary">NLP</span>{" "}
              <span className="text-orange-500">Projects</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-900 lg:mb-10 leading-relaxed">
              From Advanced Chatbots to Intelligent Text Analysis - Discover the
              Future of Language Technology
            </p>

            {/* Enhanced button with hover effects */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="#features"
                className="group relative overflow-hidden bg-brand-primary hover:bg-brand-secondary transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              <a
                href="#about"
                className="px-8 py-3 text-brand-primary hover:text-brand-secondary font-medium transition-colors duration-300 group inline-flex items-center"
              >
                Learn More
                <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;

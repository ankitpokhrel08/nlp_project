import { heroBackground } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BottomLine } from "./design/Hero";
import { useRef } from "react";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        {/* Background Image - positioned absolutely behind content */}
        <div className="absolute top-0 left-1/2 w-[200%] -translate-x-1/2 -translate-y-[20%] pointer-events-none z-0">
          <img
            src={heroBackground}
            className="w-full opacity-30"
            style={{ filter: "contrast(0.8)" }}
            width={1440}
            height={1800}
            alt="hero"
          />
        </div>

        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Explore Student-Powered <br />
            <span className="text-n-2">NLP Projects</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 text-n-3 lg:mb-8 leading-relaxed">
            From Chatbots to Text Summarizers - All in One Place
          </p>
          <Button href="/pricing" white>
            View Projects
          </Button>
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;

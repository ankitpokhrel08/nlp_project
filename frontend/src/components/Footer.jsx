import React from "react";
import Section from "./Section";
import { socials } from "../constants";

const Footer = () => {
  return (
    <Section
      crosses
      className="!px-0 !py-10 bg-gray-50 border-t border-gray-200"
    >
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <div className="text-center sm:text-left">
          <p className="text-gray-600 mb-2">
            © {new Date().getFullYear()} NLP Projects. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with ❤️ by{" "}
            <span className="font-semibold text-brand-primary">PUL079BCTA</span>
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-end">
          <p className="text-sm text-gray-500 mb-2">
            Student-Powered Innovation
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Live Project</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Footer;

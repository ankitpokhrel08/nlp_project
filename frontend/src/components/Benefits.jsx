import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Benefits = () => {
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const navigate = useNavigate();

  const openPopup = (benefit) => {
    setSelectedBenefit(benefit);
  };

  const closePopup = () => {
    setSelectedBenefit(null);
  };

  const handleTryNow = (e, modelName = null) => {
    e.stopPropagation(); // Prevent opening popup when clicking Try Now
    // Get model name from selectedBenefit if in popup, or from parameter if in card
    const modelToUse = modelName || selectedBenefit?.title;
    if (modelToUse) {
      // Convert title to URL-friendly format (lowercase, replace spaces with hyphens)
      const urlFriendlyName = modelToUse.toLowerCase().replace(/\s+/g, "-");

      // Route to different chat interfaces based on model type
      if (modelToUse.includes("Named Entity Recognition")) {
        navigate(`/ner/${urlFriendlyName}`);
      } else if (modelToUse.includes("Morphological Analyzer")) {
        navigate(`/chat/${urlFriendlyName}`);
      } else if (modelToUse.includes("Aspect-Based Sentiment Analysis")) {
        navigate(`/chat/${urlFriendlyName}`);
      } else {
        // Default to regular chat for other models (NepaliGPT and NepaliLemmatizer)
        navigate(`/chat/${urlFriendlyName}`);
      }
    }
  };

  const handleSourceCode = () => {
    window.open("https://github.com", "_blank");
  };

  // Handle ESC key press and prevent background scrolling
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" && selectedBenefit) {
        closePopup();
      }
    };

    if (selectedBenefit) {
      document.addEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [selectedBenefit]);
  return (
    <>
      <Section id="features">
        <div className="container relative z-2">
          <div className="relative max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                The Projects
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {benefits.map((item) => (
              <div
                className="block relative border border-gray-300 rounded-2xl cursor-pointer transition-transform hover:border-gray-400 bg-white hover:shadow-lg w-full"
                key={item.id}
                onClick={(e) => {
                  // Only open popup if clicking on the card itself, not on buttons
                  if (
                    e.target === e.currentTarget ||
                    e.target.closest(".card-content")
                  ) {
                    openPopup(item);
                  }
                }}
              >
                <div className="relative z-2 flex flex-col min-h-[22rem] p-4 sm:p-6 lg:p-[2.4rem] pointer-events-none card-content">
                  <h5 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-gray-900">
                    {item.title}
                  </h5>
                  <p className="text-sm sm:text-base text-n-3 mb-4 sm:mb-6 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 mt-auto pointer-events-auto">
                    {/* <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  /> */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPopup(item);
                        }}
                        className="px-3 sm:px-4 py-2 bg-white hover:bg-brand-primary text-brand-primary hover:text-white rounded-lg transition-all duration-200 font-medium text-xs sm:text-sm border border-brand-primary flex-1 sm:flex-none"
                      >
                        Learn more
                      </button>
                      <button
                        onClick={(e) => handleTryNow(e, item.title)}
                        className="px-3 sm:px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg transition-all duration-200 font-medium text-xs sm:text-sm border border-brand-primary hover:border-brand-secondary flex-1 sm:flex-none"
                      >
                        Try Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Popup Modal - Moved outside to avoid z-index issues */}
      {selectedBenefit && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-n-8/90 backdrop-blur-sm animate-in fade-in duration-300 p-4 sm:p-6"
          style={{ isolation: "isolate" }}
          onClick={closePopup}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] bg-gradient-to-br from-n-7 to-n-8 border border-n-6/50 rounded-2xl sm:rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Source Code Button */}
            <button
              onClick={handleSourceCode}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 px-3 sm:px-4 py-2 bg-white hover:bg-brand-primary text-brand-primary hover:text-white rounded-lg transition-all duration-200 font-medium text-xs sm:text-sm border border-brand-primary z-10"
            >
              Source Code
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-4 sm:p-6 lg:p-8">
              {/* Popup Content */}
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-n-1 pr-20 sm:pr-24">
                  {selectedBenefit.title}
                </h3>

                <p className="text-sm sm:text-base text-n-3 mb-6 sm:mb-8 leading-relaxed max-w-lg">
                  {selectedBenefit.text}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <button
                    onClick={closePopup}
                    className="px-6 sm:px-8 py-3 bg-white hover:bg-brand-danger text-brand-danger hover:text-white rounded-xl transition-all duration-200 font-medium text-sm sm:text-base border border-brand-danger"
                  >
                    Close
                  </button>
                  <button
                    onClick={(e) => handleTryNow(e)}
                    className="px-6 sm:px-8 py-3 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl transition-all duration-200 font-medium text-sm sm:text-base border border-brand-primary hover:border-brand-secondary"
                  >
                    Try Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Benefits;

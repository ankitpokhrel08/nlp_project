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
          <Heading className="md:max-w-md lg:max-w-2xl" title="The Projects" />

          <div className="flex flex-wrap gap-10 mb-10">
            {benefits.map((item) => (
              <div
                className="block relative border border-gray-300 rounded-2xl md:max-w-[24rem] cursor-pointer transition-transform hover:scale-105 hover:border-gray-400 bg-white"
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
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none card-content">
                  <h5 className="text-xl font-semibold mb-5 text-gray-900">
                    {item.title}
                  </h5>
                  <p className="text-base text-n-3 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pointer-events-auto">
                    {/* <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  /> */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPopup(item);
                        }}
                        className="px-4 py-2 bg-white hover:bg-brand-primary text-brand-primary hover:text-white rounded-lg transition-all duration-200 font-medium text-sm border border-brand-primary"
                      >
                        Learn more
                      </button>
                      <button
                        onClick={(e) => handleTryNow(e, item.title)}
                        className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg transition-all duration-200 font-medium text-sm border border-brand-primary hover:border-brand-secondary"
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
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-n-8/90 backdrop-blur-sm animate-in fade-in duration-300 p-4"
          style={{ isolation: "isolate" }}
          onClick={closePopup}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] bg-gradient-to-br from-n-7 to-n-8 border border-n-6/50 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Source Code Button */}
            <button
              onClick={handleSourceCode}
              className="absolute top-4 right-4 px-4 py-2 bg-white hover:bg-brand-primary text-brand-primary hover:text-white rounded-lg transition-all duration-200 font-medium text-sm border border-brand-primary z-10"
            >
              Source Code
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-8">
              {/* Popup Content */}
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold mb-6 text-n-1">
                  {selectedBenefit.title}
                </h3>

                <p className="text-base text-n-3 mb-8 leading-relaxed max-w-lg">
                  {selectedBenefit.text}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={closePopup}
                    className="px-8 py-3 bg-white hover:bg-brand-danger text-brand-danger hover:text-white rounded-xl transition-all duration-200 font-medium text-base border border-brand-danger"
                  >
                    Close
                  </button>
                  <button
                    onClick={(e) => handleTryNow(e)}
                    className="px-8 py-3 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl transition-all duration-200 font-medium text-base border border-brand-primary hover:border-brand-secondary"
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

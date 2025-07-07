import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
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
        // Default to regular chat for other models (like NepaliGPT)
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
                className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] cursor-pointer transition-transform hover:scale-105"
                style={{
                  backgroundImage: `url(${item.backgroundUrl})`,
                }}
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
                  <h5 className="h5 mb-5">{item.title}</h5>
                  <p className="body-2 mb-6 text-n-3">{item.description}</p>
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
                        className="px-4 py-2 bg-n-6/80 hover:bg-n-5 text-n-1 rounded-lg transition-all duration-200 font-code text-xs font-semibold border border-n-5/50 hover:border-n-4"
                      >
                        Learn more
                      </button>
                      <button
                        onClick={(e) => handleTryNow(e, item.title)}
                        className="px-4 py-2 bg-gradient-to-r from-color-1 to-color-2 text-n-1 rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-200 font-code text-xs font-semibold shadow-lg"
                      >
                        Try Now
                      </button>
                    </div>
                  </div>
                </div>
                {item.light && <GradientLight />}
                <div
                  className="absolute inset-0.5 bg-n-8"
                  style={{ clipPath: "url(#benefits)" }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        width={380}
                        height={362}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <ClipPath />{" "}
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
              className="absolute top-4 right-4 px-4 py-2 bg-n-6/80 hover:bg-n-5 text-n-1 rounded-lg transition-all duration-200 font-code text-xs font-semibold border border-n-5/50 hover:border-n-4 z-10"
            >
              Source Code
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-8">
              {/* Popup Content */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-3xl bg-gradient-to-br from-color-1 via-color-2 to-color-3 shadow-lg">
                  <img
                    src={selectedBenefit.iconUrl}
                    width={40}
                    height={40}
                    alt={selectedBenefit.title}
                    className="filter brightness-0 invert"
                  />
                </div>

                <h3 className="h3 mb-4 text-n-1 bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent">
                  {selectedBenefit.title}
                </h3>

                <p className="body-1 text-n-3 mb-8 leading-relaxed max-w-lg">
                  {selectedBenefit.text}
                </p>

                {selectedBenefit.imageUrl && (
                  <div className="w-full max-w-md mb-8 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={selectedBenefit.imageUrl}
                      alt={selectedBenefit.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={closePopup}
                    className="px-8 py-3 bg-n-6/80 hover:bg-n-5 text-n-1 rounded-xl transition-all duration-200 font-code text-sm font-semibold border border-n-5/50 hover:border-n-4"
                  >
                    Close
                  </button>
                  <button
                    onClick={(e) => handleTryNow(e)}
                    className="px-8 py-3 bg-gradient-to-r from-color-1 to-color-2 text-n-1 rounded-xl hover:opacity-90 hover:scale-105 transition-all duration-200 font-code text-sm font-semibold shadow-lg"
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

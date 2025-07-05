import { useNavigate } from "react-router-dom";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import Header from "./Header";

const OurMission = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <Section className="min-h-screen py-4">
        <div className="container relative z-2 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-n-6/80 hover:bg-n-5 text-n-1 rounded-lg transition-all duration-200 font-code text-xs md:text-sm font-semibold border border-n-5/50 hover:border-n-4"
            >
              <svg
                className="w-3 md:w-4 h-3 md:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <Heading className="text-center" title="Our Mission" />
            <div className="w-16 md:w-32" /> {/* Spacer for centering */}
          </div>

          {/* Mission Content */}
          <div className="max-w-4xl mx-auto">
            {/* Why We Built This Project */}
            <div className="bg-gradient-to-br from-n-7 to-n-8 border border-n-6/50 rounded-2xl md:rounded-3xl p-4 md:p-8 mb-6 md:mb-8 shadow-2xl">
              <div className="text-center mb-6 md:mb-8">
                <div className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center rounded-2xl md:rounded-3xl bg-gradient-to-br from-color-1 via-color-2 to-color-3 shadow-lg">
                  <span className="text-3xl md:text-4xl">🎯</span>
                </div>
                <h2 className="h4 md:h3 mb-3 md:mb-4 text-n-1 bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent">
                  Why We Built This Project
                </h2>
                <p className="body-2 md:body-1 text-n-3 leading-relaxed">
                  Natural Language Processing (NLP) has the power to break down
                  language barriers and democratize access to AI technology. We
                  believe that every language, including Nepali and other
                  underrepresented languages, deserves cutting-edge NLP tools
                  and resources.
                </p>
              </div>
            </div>

            {/* The Idea Behind Our Project */}
            <div className="bg-gradient-to-br from-n-7 to-n-8 border border-n-6/50 rounded-2xl md:rounded-3xl p-4 md:p-8 mb-6 md:mb-8 shadow-2xl">
              <div className="text-center mb-6 md:mb-8">
                <div className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center rounded-2xl md:rounded-3xl bg-gradient-to-br from-color-2 via-color-3 to-color-4 shadow-lg">
                  <span className="text-3xl md:text-4xl">💡</span>
                </div>
                <h2 className="h4 md:h3 mb-3 md:mb-4 text-n-1 bg-gradient-to-r from-color-2 to-color-3 bg-clip-text text-transparent">
                  The Idea Behind Our Project
                </h2>
                <p className="body-2 md:body-1 text-n-3 leading-relaxed">
                  Our vision is to create a centralized hub where researchers,
                  developers, and enthusiasts can discover, experiment with, and
                  contribute to NLP models. We wanted to bridge the gap between
                  complex research and practical applications, making advanced
                  NLP accessible to everyone.
                </p>
              </div>
            </div>

            {/* How We Did It */}
            <div className="bg-gradient-to-br from-n-7 to-n-8 border border-n-6/50 rounded-2xl md:rounded-3xl p-4 md:p-8 mb-6 md:mb-8 shadow-2xl">
              <div className="text-center mb-6 md:mb-8">
                <div className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center rounded-2xl md:rounded-3xl bg-gradient-to-br from-color-3 via-color-4 to-color-1 shadow-lg">
                  <span className="text-3xl md:text-4xl">🛠️</span>
                </div>
                <h2 className="h4 md:h3 mb-3 md:mb-4 text-n-1 bg-gradient-to-r from-color-3 to-color-4 bg-clip-text text-transparent">
                  How We Did It
                </h2>
                <div className="text-left space-y-3 md:space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 mt-1 flex items-center justify-center rounded-full bg-color-1 text-n-1 text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="h5 text-n-1 mb-2">Research & Planning</h4>
                      <p className="text-n-3 text-sm">
                        We researched existing NLP models, identified gaps in
                        language support, and planned a user-friendly interface
                        that could showcase multiple models effectively.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 mt-1 flex items-center justify-center rounded-full bg-color-2 text-n-1 text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="h5 text-n-1 mb-2">Technology Stack</h4>
                      <p className="text-n-3 text-sm">
                        Built with React.js for a responsive frontend,
                        integrated with Hugging Face APIs for model access, and
                        designed with modern UI/UX principles using Tailwind
                        CSS.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 mt-1 flex items-center justify-center rounded-full bg-color-3 text-n-1 text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="h5 text-n-1 mb-2">
                        Integration & Testing
                      </h4>
                      <p className="text-n-3 text-sm">
                        Integrated multiple NLP models, created interactive chat
                        interfaces, and extensively tested to ensure smooth user
                        experience across different devices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Vision */}
            <div className="bg-gradient-to-br from-n-7 to-n-8 border border-n-6/50 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
              <div className="text-center">
                <div className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center rounded-2xl md:rounded-3xl bg-gradient-to-br from-color-4 via-color-1 to-color-2 shadow-lg">
                  <span className="text-3xl md:text-4xl">🚀</span>
                </div>
                <h2 className="h4 md:h3 mb-3 md:mb-4 text-n-1 bg-gradient-to-r from-color-4 to-color-1 bg-clip-text text-transparent">
                  Our Vision for the Future
                </h2>
                <p className="body-2 md:body-1 text-n-3 leading-relaxed mb-4 md:mb-6">
                  We envision this platform growing into a comprehensive
                  ecosystem where developers can contribute their own models,
                  researchers can collaborate on new techniques, and users can
                  access state-of-the-art NLP capabilities in their native
                  languages.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
                  <Button
                    onClick={goBack}
                    className="w-full md:w-auto px-6 md:px-8 py-3 bg-gradient-to-r from-color-1 to-color-2"
                  >
                    Explore Projects
                  </Button>
                  <button
                    onClick={() =>
                      window.open(
                        "https://github.com/ankitpokhrel08/nlp_project",
                        "_blank"
                      )
                    }
                    className="w-full md:w-auto px-6 md:px-8 py-3 bg-n-6/80 hover:bg-n-5 text-n-1 rounded-xl transition-all duration-200 font-code text-sm font-semibold border border-n-5/50 hover:border-n-4"
                  >
                    View Source Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default OurMission;

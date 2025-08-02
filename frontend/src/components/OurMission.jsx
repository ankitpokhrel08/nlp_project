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
      <Section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Our <span className="text-brand-primary">Mission</span>
            </h1>
          </div>

          {/* Mission Content */}
          <div className="max-w-4xl mx-auto text-center">
            {/* Project Background */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Academic Project Background
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  This project was built as part of the completion of{" "}
                  <span className="font-semibold text-brand-primary">
                    Software Engineering Project
                  </span>
                  .
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  All the projects you find here are created by{" "}
                  <span className="font-semibold">
                    Bachelors and Masters students of Pulchowk Campus
                  </span>{" "}
                  under the supervision of{" "}
                  <span className="font-semibold text-brand-primary">
                    <a
                      href="https://scholar.google.com/citations?user=tmzff0YAAAAJ&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary hover:text-brand-secondary underline font-semibold transition-colors duration-200"
                    >
                      Mr. Aman Sakya Sir
                    </a>
                  </span>
                  . You can explore more projects by visiting his blog at:{" "}
                  <a
                    href="http://amanshakya.com.np/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:text-brand-secondary underline font-semibold transition-colors duration-200"
                  >
                    amanshakya.com.np
                  </a>
                </p>
              </div>
            </div>

            {/* Why We Built This Project */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why We Built This Project
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Natural Language Processing (NLP) has the power to break down
                  language barriers and democratize access to AI technology. We
                  believe that every language, including Nepali and other
                  underrepresented languages, deserves cutting-edge NLP tools
                  and resources.
                </p>
              </div>
            </div>

            {/* The Idea Behind Our Project */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                The Idea Behind Our Project
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our vision is to create a centralized hub where researchers,
                  developers, and enthusiasts can discover, experiment with, and
                  contribute to NLP models. We wanted to bridge the gap between
                  complex research and practical applications, making advanced
                  NLP accessible to everyone.
                </p>
              </div>
            </div>

            {/* How We Did It */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How We Did It
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-brand-primary">
                        1
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Research & Planning
                    </h4>
                    <p className="text-gray-600">
                      We researched existing NLP models, identified gaps in
                      language support, and planned a user-friendly interface
                      that could showcase multiple models effectively.
                    </p>
                  </div>

                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-brand-secondary">
                        2
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Technology Stack
                    </h4>
                    <p className="text-gray-600">
                      Built with React.js for a responsive frontend, integrated
                      with Hugging Face APIs for model access, and designed with
                      modern UI/UX principles using Tailwind CSS.
                    </p>
                  </div>

                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-orange-500">
                        3
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Integration & Testing
                    </h4>
                    <p className="text-gray-600">
                      Integrated multiple NLP models, created interactive chat
                      interfaces, and extensively tested to ensure smooth user
                      experience across different devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Vision */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Our Vision for the Future
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  We envision this platform growing into a comprehensive
                  ecosystem where developers can contribute their own models,
                  researchers can collaborate on new techniques, and users can
                  access state-of-the-art NLP capabilities in their native
                  languages.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <Button
                    onClick={goBack}
                    className="w-full md:w-auto px-8 py-3 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg border border-brand-primary hover:border-brand-secondary shadow-md hover:shadow-lg transition-all duration-200"
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
                    className="w-full md:w-auto px-8 py-3 bg-white hover:bg-gray-50 text-brand-primary hover:text-brand-secondary rounded-lg transition-all duration-200 font-semibold border-2 border-brand-primary hover:border-brand-secondary shadow-md hover:shadow-lg"
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

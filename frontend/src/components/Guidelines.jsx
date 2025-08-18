import React, { useEffect } from "react";
import Section from "./Section";
import Header from "./Header";
import Footer from "./Footer";

const Guidelines = () => {
  // Ensure page starts at top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <Header />
      <Section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Guidelines
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Important guidelines for contributing to our NLP projects and
              ensuring quality and consistency
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Founding Team Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Founding Team
              </h2>
              <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-l-4 border-brand-primary rounded-r-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  First Batch Pioneers
                </h3>
                <p className="text-gray-700 mb-4">
                  This project was initiated by the first batch of dedicated
                  developers who laid the foundation with love and care. They
                  are the pioneers who started this journey:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <a
                      href="https://github.com/ankitpokhrel08"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-brand-primary hover:text-brand-secondary font-medium hover:underline transition-colors"
                    >
                      • Ankit Pokhrel
                    </a>
                    <a
                      href="https://github.com/ankit-kisi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-brand-primary hover:text-brand-secondary font-medium hover:underline transition-colors"
                    >
                      • Ankit Kisi
                    </a>
                  </div>
                  <div className="space-y-2">
                    <a
                      href="https://github.com/AmanDbz1101"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-brand-primary hover:text-brand-secondary font-medium hover:underline transition-colors"
                    >
                      • Aman Dhaubanjar
                    </a>
                    <a
                      href="https://github.com/anjalsatyal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-brand-primary hover:text-brand-secondary font-medium hover:underline transition-colors"
                    >
                      • Anjal Satyal
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Message for Future Contributors:</strong> This project
                  was built with love and dedication. For upcoming batches and
                  our beloved juniors, please continue to build everything with
                  the same care and effort.
                </p>
              </div>
            </div>

            {/* Project Ownership Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Project Ownership & Rights
              </h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    Academic Project Rights
                  </h3>
                  <p className="text-blue-800 mb-4">
                    This platform exclusively contains projects developed by
                    Bachelor's and Master's students, primarily Master's
                    students under the mentorship of{" "}
                    <strong>Aman Sakya Sir</strong>.
                  </p>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      All showcased projects are the intellectual property of
                      their respective creators
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Project owners hold full rights to their work
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Any requests for changes or removal must be respected and
                      agreed upon
                    </li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">
                    <strong>Important:</strong> If any project owner wishes to
                    make changes or remove their project from this platform, we
                    must agree upon it and comply with their request
                    immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Project Addition Guidelines */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Adding New Projects
              </h2>
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    Authorization Process
                  </h3>
                  <p className="text-green-800 mb-4">
                    All projects currently showcased on this platform have been
                    provided by
                    <strong> Aman Sakya Sir</strong> through his website or
                    direct communication.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">
                      Before Adding New Projects:
                    </h4>
                    <ol className="space-y-2 text-green-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 font-bold">
                          1.
                        </span>
                        Contact Aman Sakya Sir directly
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 font-bold">
                          2.
                        </span>
                        Obtain explicit permission for the new project
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 font-bold">
                          3.
                        </span>
                        Ensure all documentation and credits are approved
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 font-bold">
                          4.
                        </span>
                        Only then proceed with integration
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Model Integrity Guidelines */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Model Integrity & Attribution
              </h2>
              <div className="space-y-6">
                <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">
                    Strict Guidelines
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2">
                        No Model Alterations
                      </h4>
                      <p className="text-purple-800">
                        Under no circumstances should any modifications be made
                        to the original models. They must be showcased exactly
                        as provided by their creators.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2">
                        Proper Credit Attribution
                      </h4>
                      <p className="text-purple-800">
                        Always provide proper and comprehensive credit to the
                        original product owners. This includes clear attribution
                        in documentation, UI, and any promotional materials.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2">
                        Documentation Standards
                      </h4>
                      <p className="text-purple-800">
                        Maintain accurate and detailed documentation that
                        respects the original work while providing clear usage
                        instructions for platform users.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-800 text-sm">
                    <strong>Remember:</strong> Our role is to showcase and
                    provide access to these excellent NLP models while
                    maintaining the highest standards of respect and attribution
                    to their creators.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Questions & Support
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about these guidelines or need
                  clarification on any aspect of contributing to this platform,
                  please don't hesitate to reach out.
                </p>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-600">
                    For project-related queries and permissions, contact{" "}
                    <strong>Aman Sakya Sir</strong> directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default Guidelines;

import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import Header from "./Header";
import Footer from "./Footer";

const Documentation = () => {
  return (
    <>
      <Header />
      <Section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <Heading
              title="Documentation"
              text="Comprehensive guide to understanding and using our NLP platform"
              tag="DOCUMENTATION"
            />
          </div>

          {/* Navigation Cards */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Getting Started */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-brand-primary/30">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Getting Started
                </h3>
                <p className="text-gray-600 mb-4">
                  Quick start guide to begin using our NLP models and APIs.
                </p>
                <Button
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white"
                  href="/documentation/guide"
                >
                  View Guide
                </Button>
              </div>

              {/* Guidelines */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-brand-primary/30">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Guidelines
                </h3>
                <p className="text-gray-600 mb-4">
                  {/* If you are thinking of contributing that you need to follow these guidelines */}
                  Important guidelines for contributing to our NLP projects.
                </p>
                <Button
                  className="w-full bg-brand-secondary hover:bg-brand-primary text-white"
                  href="/documentation/guidelines"
                >
                  View Guidelines
                </Button>
              </div>

              {/* Models */}
              {/* Models */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-brand-primary/30">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Models
                </h3>
                <p className="text-gray-600 mb-4">
                  Detailed information about our NLP models and their
                  capabilities.
                </p>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  href="/documentation/models"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default Documentation;

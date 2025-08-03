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

              {/* API Reference */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-brand-primary/30">

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  API Reference
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete API documentation for all available endpoints and
                  models.
                </p>
                <Button className="w-full bg-brand-secondary hover:bg-brand-primary text-white">
                  Explore APIs
                </Button>
              </div>

              {/* Models */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-brand-primary/30">

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Models
                </h3>
                <p className="text-gray-600 mb-4">
                  Detailed information about our NLP models and their
                  capabilities.
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Sections */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Documentation
            </h2>

            {/* Lemmatizer Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nepali Lemmatizer
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our Nepali Lemmatizer reduces words to their root form,
                essential for text analysis and natural language understanding
                tasks in Nepali.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-brand-primary hover:bg-brand-secondary text-white">
                  View Documentation
                </Button>
                <Button className="bg-gray-500 hover:bg-gray-700 text-white">
                  Try Demo
                </Button>
              </div>
            </div>

            {/* Stemmer Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nepali Stemmer
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Advanced stemming algorithm for Nepali text that handles complex
                morphological variations and produces accurate stem forms.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-brand-primary hover:bg-brand-secondary text-white">
                  View Documentation
                </Button>
                <Button className="bg-gray-500 hover:bg-gray-700 text-white">
                  Try Demo
                </Button>
              </div>
            </div>

            {/* NER Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Named Entity Recognition
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Identify and classify named entities in Nepali text including
                persons, locations, organizations, and other important entities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-brand-primary hover:bg-brand-secondary text-white">
                  View Documentation
                </Button>
                <Button className="bg-gray-500 hover:bg-gray-700 text-white">
                  Try Demo
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

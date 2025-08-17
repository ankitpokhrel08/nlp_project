import React, { useState } from "react";
import Section from "./Section";
import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button";
import API_CONFIG from "../config/api.js";

const Models = () => {
  const [activeModel, setActiveModel] = useState("nepaligpt");

  const models = {
    nepaligpt: {
      id: "nepaligpt",
      name: "NepaliGPT",
      subtitle: "Conversational AI",
      description:
        "A fine-tuned GPT model specifically trained for Nepali language generation",
      modelPath: "Shushant/thesis_nepaliGPT",
      architecture: "Transformer-based Language Model",
      capabilities: [
        "Natural language conversation in Nepali",
        "Text completion and generation",
        "Creative writing assistance",
        "Question answering in Nepali context",
        "Language learning support",
      ],
      useCases: [
        "Chatbots and virtual assistants",
        "Content generation for Nepali websites",
        "Educational tools for Nepali language",
        "Creative writing assistance",
        "Nepali language research",
      ],
      technicalDetails: {
        framework: "Transformers (PyTorch)",
        inputFormat: "Text (Nepali/English)",
        outputFormat: "Generated Nepali text",
        maxTokens: "2048 tokens",
        trainingData: "Nepali text corpus with conversational data",
      },
      examples: [
        {
          input: "नेपालको राजधानी कहाँ छ?",
          output:
            "नेपालको राजधानी काठमाडौं हो। यो नेपालको सबैभन्दा ठूलो सहर पनि हो र यहाँ धेरै ऐतिहासिक र सांस्कृतिक महत्वका स्थानहरू छन्।",
        },
        {
          input: "मलाई नेपाली खाना बनाउने तरिका भन्नुहोस्",
          output:
            "नेपाली दाल भात बनाउनको लागि पहिले दाल उमालेर पकाउनुहोस्। त्यसपछि भात छुट्टै भाँडोमा पकाउनुहोस्। दाललाई जीरा, बेसार र नुनले स्वादिलो बनाउनुहोस्।",
        },
      ],
      demoRoute: "/chat/nepaligpt",
    },
    ner: {
      id: "ner",
      name: "Named Entity Recognition",
      subtitle: "Information Extraction",
      description:
        "BERT-based model for identifying and classifying named entities in Nepali text",
      modelPath: "bishaldpande/Ner-xlm-roberta-base",
      architecture: "XLM-RoBERTa (Transformer)",
      capabilities: [
        "Person name recognition",
        "Location identification",
        "Organization detection",
        "Miscellaneous entity classification",
        "Confidence score reporting",
      ],
      useCases: [
        "Information extraction from news articles",
        "Content analysis and categorization",
        "Data mining from Nepali documents",
        "Social media monitoring",
        "Academic research in NLP",
      ],
      technicalDetails: {
        framework: "Transformers (XLM-RoBERTa)",
        inputFormat: "Nepali text sentences",
        outputFormat: "Entity labels with confidence scores",
        entityTypes: "PERSON, LOCATION, ORGANIZATION, MISC",
        trainingDataset: "Everest NER Dataset",
      },
      examples: [
        {
          input: "राम शर्मा काठमाडौं विश्वविद्यालयमा पढ्छन्।",
          output:
            "राम शर्मा (PERSON - 95.4%), काठमाडौं विश्वविद्यालय (ORGANIZATION - 87.2%)",
        },
        {
          input: "गौतम बुद्ध लुम्बिनीमा जन्मेका थिए।",
          output: "गौतम बुद्ध (PERSON - 99.1%), लुम्बिनी (LOCATION - 94.8%)",
        },
      ],
      demoRoute: "/ner/named-entity-recognition",
    },
    lemmatizer: {
      id: "lemmatizer",
      name: "Nepali Lemmatizer",
      subtitle: "Text Normalization",
      description:
        "Rule-based lemmatization system that converts Nepali words to their root forms",
      modelPath: "Custom Rule-based System",
      architecture: "Rule-based Morphological Analyzer",
      capabilities: [
        "Word lemmatization to root forms",
        "Morphological analysis",
        "Text normalization",
        "Dictionary-based processing",
        "Batch text processing",
      ],
      useCases: [
        "Search engine optimization",
        "Text preprocessing for NLP tasks",
        "Linguistic analysis and research",
        "Information retrieval systems",
        "Text mining applications",
      ],
      technicalDetails: {
        framework: "Custom Python implementation",
        inputFormat: "Nepali words or sentences",
        outputFormat: "Lemmatized root forms",
        dictionarySize: "20,000+ root words",
        ruleBase: "Comprehensive Nepali morphological rules",
      },
      examples: [
        {
          input: "खेल्दै",
          output: "खेल्",
        },
        {
          input: "गरिरहेका",
          output: "गर्",
        },
      ],
      demoRoute: "/chat/nepali-lemmatizer",
    },
    stemmer: {
      id: "stemmer",
      name: "Morphological Analyzer",
      subtitle: "Linguistic Analysis",
      description:
        "Comprehensive stemmer with 100+ transformation rules for Nepali morphological analysis",
      modelPath: "Custom Morphological System",
      architecture: "Rule-based Morphological Analyzer",
      capabilities: [
        "Root word identification",
        "Suffix analysis and classification",
        "Part-of-speech tagging",
        "Morphological rule application",
        "Grammatical pattern recognition",
      ],
      useCases: [
        "Linguistic research and analysis",
        "Grammar checking applications",
        "Educational language tools",
        "Text analysis for computational linguistics",
        "Language learning applications",
      ],
      technicalDetails: {
        framework: "Custom Python with morphological rules",
        inputFormat: "Nepali words or text",
        outputFormat: "Root, suffix, POS tags, and analysis",
        database: "Brihat Nepali Shabdakosh (20,000+ words)",
        rules: "100+ morphological transformation rules",
        posSystem: "NN, VF, ADJ, ADR, PN, PPG, CCON tags",
      },
      examples: [
        {
          input: "घरहरू",
          output: "Root: घर, Suffix: हरू, POS: NN (Noun), Rule: Plural",
        },
        {
          input: "पढ्छु",
          output:
            "Root: पढ्, Suffix: छु, POS: VF (Verb), Rule: 1st person singular",
        },
      ],
      demoRoute: "/chat/morphological-analyzer",
    },
    aspect: {
      id: "aspect",
      name: "Aspect-Based Sentiment Analysis",
      subtitle: "Opinion Mining",
      description:
        "BERT-based model for fine-grained sentiment analysis identifying aspect categories in Nepali text",
      modelPath: "Karinkato/Aspect_based_sentiment_analysis",
      architecture: "NepalBERT (BERT-based)",
      capabilities: [
        "Aspect category identification",
        "Multi-label classification",
        "Sentiment analysis per aspect",
        "Content moderation support",
        "Social media text analysis",
      ],
      useCases: [
        "Social media monitoring and analysis",
        "Content moderation systems",
        "Public opinion analysis",
        "Political text analysis",
        "Customer feedback analysis",
      ],
      technicalDetails: {
        framework: "Transformers (NepalBERT)",
        inputFormat: "Nepali text sentences",
        outputFormat: "Aspect labels with confidence",
        aspectCategories: "GENERAL, FEEDBACK, PROFANITY, VIOLENCE",
        architecture: "Multi-label classification with sigmoid activation",
        maxLength: "128 tokens per sentence",
      },
      examples: [
        {
          input: "यो नेताको कुरा राम्रो लाग्यो।",
          output: "Aspects: GENERAL, FEEDBACK",
        },
        {
          input: "सरकारको काम बिग्रिएको छ।",
          output: "Aspects: GENERAL, FEEDBACK",
        },
      ],
      demoRoute: "/chat/aspect-based-sentiment-analysis",
    },
  };

  const currentModel = models[activeModel];

  return (
    <>
      <Header />
      <Section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              NLP Models
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technical documentation and usage examples for our
              Nepali Natural Language Processing models
            </p>
          </div>

          {/* Model Navigation */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Available Models
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.values(models).map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setActiveModel(model.id)}
                    className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                      activeModel === model.id
                        ? "border-brand-primary bg-brand-primary/5 shadow-md"
                        : "border-gray-200 hover:border-brand-primary/50 hover:shadow-sm"
                    }`}
                  >
                    <h3
                      className={`font-semibold mb-2 ${
                        activeModel === model.id
                          ? "text-brand-primary"
                          : "text-gray-900"
                      }`}
                    >
                      {model.name}
                    </h3>
                    <p className="text-sm text-gray-600">{model.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Model Details */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentModel.name}
                </h2>
                <p className="text-xl text-brand-primary font-semibold mb-2">
                  {currentModel.subtitle}
                </p>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {currentModel.description}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-xl p-4 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Model Path
                  </h4>
                  <p className="text-sm text-brand-primary font-mono">
                    {currentModel.modelPath}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Architecture
                  </h4>
                  <p className="text-sm text-blue-600">
                    {currentModel.architecture}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Demo Available
                  </h4>
                  <Button
                    href={currentModel.demoRoute}
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2"
                  >
                    Try It Live
                  </Button>
                </div>
              </div>

              {/* Capabilities */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Key Capabilities
                  </h3>
                  <ul className="space-y-2">
                    {currentModel.capabilities.map((capability, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-brand-primary mr-2 mt-1">•</span>
                        <span className="text-gray-700">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Use Cases
                  </h3>
                  <ul className="space-y-2">
                    {currentModel.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Technical Specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(currentModel.technicalDetails).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="bg-white rounded-lg p-4 border border-gray-200"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <p className="text-gray-600 text-sm">{value}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Usage Examples */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Usage Examples
                </h3>
                <div className="space-y-6">
                  {currentModel.examples.map((example, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200"
                    >
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Example {index + 1}
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">
                            Input:
                          </h5>
                          <div className="bg-white rounded-lg p-3 border border-gray-200 font-mono text-sm">
                            {example.input}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">
                            Output:
                          </h5>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-200 font-mono text-sm">
                            {example.output}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* API Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                API Integration
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Endpoint Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    <div className="mb-2">
                      <span className="text-gray-600">Method:</span>{" "}
                      <span className="text-blue-600">POST</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">URL:</span>{" "}
                      <span className="text-green-600">
                        {API_CONFIG.BASE_URL}/
                        {currentModel.id === "nepaligpt"
                          ? "chat"
                          : currentModel.id === "ner"
                          ? "ner"
                          : currentModel.id === "lemmatizer"
                          ? "lemmatize"
                          : currentModel.id === "stemmer"
                          ? "stemmer"
                          : "aspect"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Content-Type:</span>{" "}
                      <span className="text-purple-600">application/json</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Request Body
                  </h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">
                    <pre>{`{
  "text": "Your Nepali text here"
}`}</pre>
                  </div>
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

export default Models;

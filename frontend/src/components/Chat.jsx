import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Section from "./Section";
import Button from "./Button";
import Header from "./Header";

const Chat = () => {
  const { modelName } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Convert URL-friendly name back to display name
  const displayName = modelName
    ?.replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Determine model type based on modelName
  const getModelType = () => {
    if (modelName?.includes("lemmatizer")) return "lemmatizer";
    if (modelName?.includes("ner") || modelName?.includes("entity"))
      return "ner";
    if (modelName?.includes("stemmer") || modelName?.includes("morphological"))
      return "stemmer";
    if (modelName?.includes("aspect-based-sentiment-analysis")) return "aspect";
    return "chat"; // default for NepaliGPT
  };

  const modelType = getModelType();

  // Sample prompts based on model type
  const getSamplePrompts = () => {
    if (modelType === "lemmatizer") {
      return [
        "पढ्दै",
        "खेल्दै",
        "खाइरहेको",
        "गरिरहेका",
        "फुलेका",
        "छोराछोरीहरु",
      ];
    } else if (modelType === "ner") {
      return [
        "काठमाडौं, पोखरा, लुम्बिनी, चितवन, र मुस्ताङ नेपालका प्रसिद्ध पर्यटकीय स्थलहरू हुन्।",
        "राम शर्मा काठमाडौं विश्वविद्यालयमा पढ्छन्।",
        "सगरमाथा नेपालको सबैभन्दा अग्लो हिमाल हो।",
        "प्रधानमन्त्री ओली सिंहदरबारमा बसेर काम गर्छन्।",
        "गौतम बुद्ध लुम्बिनीमा जन्मेका थिए।",
        "गोरखा जिल्लामा रहेको मनकामना मन्दिर प्रसिद्ध छ।",
      ];
    } else if (modelType === "stemmer") {
      return [
        "विद्यार्थीहरू किताब पढिरहेका थिए।",
        "शिक्षकलाई पुरस्कार दिइयो।",
        "म भोलि खाना खानेछु।",
        "उनीहरू गाउँ जाँदैछन्।",
        "पुस्तकहरूको मूल्य बढेको छ।",
        "घरमा लेखिएको कुरा बुझिएन।",
      ];
    } else if (modelType === "aspect") {
      return [
        "यो सरकारले राम्रो काम गरेको छ।",
        "नेताहरु भ्रष्ट छन्।",
        "यो विधेयक खारेज हुनुपर्छ।",
        "त्यो मान्छेलाई तुरुन्तै कारबाही गरियोस्।",
        "राष्ट्रपतिको भाषण प्रभावशाली थियो।",
        "यो नीति निकै राम्रो छ।",
      ];
    } else {
      return [
        "नमस्ते, तपाईं कस्तो हुनुहुन्छ?",
        "काठमाडौं बारे बताउनुहोस्",
        "नेपालको संस्कृति के छ?",
        "हिमालयको बारेमा केही भन्नुहोस्",
        "नेपाली खाना के मन पराउनुहुन्छ?",
        "दशैं तिहारको बारेमा भन्नुहोस्",
      ];
    }
  };

  const samplePrompts = getSamplePrompts();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // Check if user is at the bottom of chat
  const checkIfAtBottom = () => {
    if (!chatContainerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    return scrollHeight - scrollTop - clientHeight < 5; // 5px threshold
  };

  // Handle scroll events to track user position
  const handleScroll = () => {
    setIsAtBottom(checkIfAtBottom());
  };

  // Auto-scroll to bottom only if user was already at bottom when new message arrives
  useEffect(() => {
    if (isAtBottom && messages.length > 1) {
      // Changed to > 1 to exclude welcome message
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  // Initialize with a welcome message
  useEffect(() => {
    let welcomeText = "";
    if (modelType === "lemmatizer") {
      welcomeText = `नमस्ते! I'm ${displayName}. Send me Nepali text and I'll convert the words to their root forms (lemmas). Try typing some Nepali words!`;
    } else if (modelType === "ner") {
      welcomeText = `नमस्ते! I'm ${displayName}. I can identify named entities (people, places, organizations) in Nepali text. Enter any Nepali text and I'll highlight the entities I find!`;
    } else if (modelType === "stemmer") {
      welcomeText = `नमस्ते! I'm ${displayName}. I analyze Nepali words to find their root forms, suffixes, and grammatical patterns. Send me Nepali text and I'll show you detailed morphological analysis including part-of-speech tags!`;
    } else if (modelType === "aspect") {
      welcomeText = `नमस्ते! I'm ${displayName}. I perform aspect-based sentiment analysis on Nepali text, identifying aspect categories like GENERAL, FEEDBACK, PROFANITY, and VIOLENCE. Send me Nepali text and I'll analyze the aspects and sentiments!`;
    } else {
      welcomeText = `नमस्ते! I'm ${displayName}, a Nepali language model. I can help you generate text in Nepali. Feel free to ask me questions in Nepali or English. You can also use the sample prompts below to get started!`;
    }

    setMessages([
      {
        id: 1,
        text: welcomeText,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [displayName, modelType]);

  // Handle sample prompt selection
  const handleSamplePrompt = (prompt) => {
    setInputValue(prompt);
    setShowSamples(false);
    inputRef.current?.focus();
  };

  // Simple transliteration helper for common English to Nepali words
  const getEnhancedPrompt = (text) => {
    const commonTransliterations = {
      namaste: "नमस्ते",
      kathmandu: "काठमाडौं",
      nepal: "नेपाल",
      himalaya: "हिमालय",
      dashain: "दशैं",
      tihar: "तिहार",
      momo: "मोमो",
      "dal bhat": "दाल भात",
      everest: "सगरमाथा",
    };

    let enhancedText = text.toLowerCase();
    Object.entries(commonTransliterations).forEach(([english, nepali]) => {
      const regex = new RegExp(`\\b${english}\\b`, "gi");
      enhancedText = enhancedText.replace(regex, nepali);
    });

    return enhancedText !== text.toLowerCase() ? enhancedText : text;
  };

  // Focus input when component mounts
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  // No automatic scrolling for welcome message - let user see the page from top

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsAtBottom(true); // User just sent a message, so we want to show the response

    // Focus the input after clearing it
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    try {
      let response, data;

      if (modelType === "lemmatizer") {
        // Call lemmatizer API
        response = await fetch("http://localhost:5001/lemmatize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: userMessage.text,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();

        if (data.success) {
          const botResponse = {
            id: Date.now() + 1,
            text: data.lemmatized_text,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
        } else {
          throw new Error(data.message || "Lemmatization failed");
        }
      } else if (modelType === "ner") {
        // Call NER API
        response = await fetch("http://localhost:5001/ner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: userMessage.text,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();

        if (data.success) {
          let responseText = `Found ${data.entity_count} entities:\n\n`;
          data.entities.forEach((entity, index) => {
            responseText += `${index + 1}. "${entity.word}" - ${
              entity.entity
            } (${(entity.confidence * 100).toFixed(1)}%)\n`;
          });

          const botResponse = {
            id: Date.now() + 1,
            text: responseText,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
        } else {
          throw new Error(data.message || "NER failed");
        }
      } else if (modelType === "stemmer") {
        // Call Stemmer API
        response = await fetch("http://localhost:5001/stemmer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: userMessage.text,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();

        if (data.success) {
          let responseText = `📊 Morphological Analysis\n`;
          responseText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

          data.words.forEach((wordData, index) => {
            responseText += `${index + 1}. 📝 "${wordData.word}"\n`;

            if (wordData.analyses && wordData.analyses.length > 0) {
              // Find the best analysis (prefer Root + Suffix over Root Word, and non-null POS)
              let bestAnalysis = wordData.analyses[0];
              if (wordData.analyses.length > 1) {
                bestAnalysis =
                  wordData.analyses.find(
                    (a) =>
                      a.type === "Root + Suffix" && a.pos && a.pos !== "null"
                  ) ||
                  wordData.analyses.find((a) => a.pos && a.pos !== "null") ||
                  wordData.analyses[0];
              }

              if (bestAnalysis.type === "Unknown") {
                responseText += `   ❓ Status: Not found in dictionary\n`;
              } else {
                responseText += `   🌱 Root: ${bestAnalysis.root}\n`;

                if (bestAnalysis.suffix && bestAnalysis.suffix.trim()) {
                  responseText += `   📎 Suffix: ${bestAnalysis.suffix}\n`;
                }

                if (bestAnalysis.pos && bestAnalysis.pos !== "null") {
                  const posNames = {
                    NN: "Noun",
                    VF: "Verb (Finite)",
                    ADJ: "Adjective",
                    ADR: "Adverb",
                    PN: "Proper Noun",
                    PPG: "Postposition",
                    CCON: "Conjunction",
                  };
                  const posName =
                    posNames[bestAnalysis.pos] || bestAnalysis.pos;
                  responseText += `   🏷️ Type: ${posName}\n`;
                }

                if (bestAnalysis.type === "Root + Suffix") {
                  responseText += `   ⚙️ Analysis: Inflected word\n`;
                } else {
                  responseText += `   ⚙️ Analysis: Root word\n`;
                }
              }
            }
            responseText += `\n`;
          });

          responseText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
          responseText += `Summary: ${data.statistics.total_words} words • `;
          responseText += `${data.statistics.analyzed_words} analyzed • `;
          responseText += `${data.statistics.root_words} roots • `;
          responseText += `${data.statistics.unknown_words} unknown`;

          const botResponse = {
            id: Date.now() + 1,
            text: responseText,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
        } else {
          throw new Error(data.message || "Stemmer analysis failed");
        }
      } else if (modelType === "aspect") {
        // Call Aspect-Based Sentiment Analysis API
        response = await fetch("http://localhost:5001/aspect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: userMessage.text,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();

        if (data.success) {
          let responseText = ``;

          data.predictions.forEach((prediction, index) => {
            responseText += `"${prediction.sentence}"\n`;
            if (prediction.aspects && prediction.aspects.length > 0) {
              responseText += `Detected Aspects: ${prediction.aspects.join(
                ", "
              )}\n`;
            } else {
              responseText += `Detected Aspects: None\n`;
            }
            if (index < data.predictions.length - 1) {
              responseText += `\n`;
            }
          });

          const botResponse = {
            id: Date.now() + 1,
            text: responseText,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
        } else {
          throw new Error(data.message || "Aspect analysis failed");
        }
      } else {
        // Default: Call NepaliGPT API
        // Enhanced prompt with transliteration
        const enhancedPrompt = getEnhancedPrompt(userMessage.text);

        // Show transliteration info if prompt was enhanced
        if (enhancedPrompt !== userMessage.text) {
          const transliterationInfo = {
            id: Date.now() + 0.5,
            text: `✨ Auto-converted: "${userMessage.text}" → "${enhancedPrompt}"`,
            sender: "system",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, transliterationInfo]);
        }

        // Call the Flask API
        response = await fetch("http://localhost:5001/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: enhancedPrompt,
            max_length: 150,
            temperature: 0.7,
            do_sample: true,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();

        if (data.success) {
          const botResponse = {
            id: Date.now() + 1,
            text: data.response || "I'm sorry, I couldn't generate a response.",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
        } else {
          throw new Error(data.message || "Generation failed");
        }
      }
    } catch (error) {
      console.error("Error calling API:", error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running and try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      // Ensure input stays focused after response
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const goBack = () => {
    navigate("/");
  };

  const handleSourceCode = () => {
    window.open("https://github.com", "_blank");
  };

  return (
    <>
      <Header />
      <Section className="min-h-screen">
        <div className="container relative z-2 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goBack}
              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-brand-primary text-brand-primary hover:text-white rounded-lg transition-all duration-200 font-code text-xs font-semibold border border-brand-primary"
            >
              <svg
                className="w-3 h-3"
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
            <h2 className="text-xl font-semibold text-center text-n-1">
              Chat with {displayName}
            </h2>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>

          {/* Chat Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-n-5 rounded-2xl overflow-hidden shadow-lg">
              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                onScroll={handleScroll}
                className="h-64 md:h-80 overflow-y-auto p-3 md:p-4 space-y-3"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : message.sender === "system"
                        ? "justify-center"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                        message.sender === "user"
                          ? "bg-n-6 text-n-1"
                          : message.sender === "system"
                          ? "bg-n-7 text-n-2 border border-n-5 text-center"
                          : "bg-n-6 text-n-1 border border-n-5"
                      }`}
                    >
                      <p className="text-base leading-relaxed">
                        {message.text}
                      </p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-n-6 text-n-1 border border-n-5 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-n-3 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-n-3 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-n-3 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-n-3">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>{" "}
              {/* Input Area */}
              <div className="border-t border-n-5 p-3">
                {/* Sample Prompts */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-n-4">
                      {modelType === "lemmatizer"
                        ? "Sample Nepali Text for Lemmatization:"
                        : modelType === "ner"
                        ? "Sample Nepali Text with Entities:"
                        : modelType === "stemmer"
                        ? "Sample Nepali Text for Morphological Analysis:"
                        : modelType === "aspect"
                        ? "Sample Nepali Text for Aspect Analysis:"
                        : "Sample Nepali Prompts:"}
                    </span>
                    <button
                      onClick={() => setShowSamples(!showSamples)}
                      className="text-xs text-n-4 hover:text-n-3 transition-colors"
                    >
                      {showSamples ? "Hide" : "Show"} Examples
                    </button>
                  </div>

                  {showSamples && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {samplePrompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handleSamplePrompt(prompt)}
                          className="text-left p-2 bg-n-6 hover:bg-n-5 border border-n-5 hover:border-n-4 rounded-lg text-xs text-n-2 hover:text-n-1 transition-all duration-200"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:items-end">
                  <div className="flex-1">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        modelType === "lemmatizer"
                          ? "Enter Nepali text to lemmatize..."
                          : modelType === "ner"
                          ? "Enter Nepali text to find entities..."
                          : modelType === "stemmer"
                          ? "Enter Nepali text to analyze morphology..."
                          : modelType === "aspect"
                          ? "Enter Nepali text to analyze aspects..."
                          : `Ask ${displayName} anything in Nepali or English...`
                      }
                      className="w-full bg-n-7 border border-n-5 rounded-xl px-3 py-2 text-n-1 placeholder-n-4 resize-none focus:outline-none focus:border-n-4 transition-colors text-sm"
                      rows="1"
                      disabled={isLoading}
                    />
                    <div className="mt-1 text-xs text-n-4">
                      💡 Tip: Try typing in English like &quot;namaste&quot; or
                      use Nepali script directly
                      <br />
                      🔗 Need Nepali keyboard? Try:{" "}
                      <a
                        href="https://www.google.com/inputtools/try/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-n-4 hover:text-n-3 underline"
                      >
                        Google Input Tools
                      </a>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="w-full md:w-auto px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-brand-primary hover:border-brand-secondary"
                  >
                    Send
                  </Button>
                </div>

                {/* Model Info */}
                <div className="mt-3 text-center">
                  <p className="text-xs text-n-4">
                    Currently chatting with{" "}
                    <span className="text-n-3 font-semibold">
                      {displayName}
                    </span>{" "}
                    NLP Model
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Model Information Card */}
          <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-white border border-n-5 rounded-2xl p-4">
              <h3 className="text-xl font-semibold mb-3 text-n-1 text-center">
                About {displayName}
              </h3>
              <p className="text-n-3 text-center leading-relaxed text-base mb-4">
                {modelType === "lemmatizer"
                  ? `${displayName} is a rule-based lemmatizer for Nepali words. It converts inflected words to their root forms (lemmas). For example, it can turn 'खाएको' into its base form 'खानु'. Perfect for Nepali language processing and text analysis.`
                  : modelType === "ner"
                  ? `${displayName} is a BERT-based model for Named Entity Recognition in Nepali text. It can identify and classify entities like people, places, organizations, and other important terms in Nepali text with high accuracy.`
                  : modelType === "stemmer"
                  ? `${displayName} is a comprehensive morphological analyzer for Nepali words. It identifies root words, suffixes, and grammatical patterns using 100+ transformation rules. Built on extensive linguistic data from Brihat Nepali Shabdakosh with over 20,000 root words and part-of-speech information.`
                  : modelType === "aspect"
                  ? `${displayName} is a BERT-based model for aspect-based sentiment analysis of Nepali text. It identifies aspect categories (GENERAL, FEEDBACK, PROFANITY, VIOLENCE) and analyzes sentiments associated with these aspects. Built on NepalBERT architecture for fine-grained sentiment analysis and content moderation.`
                  : `${displayName} is a Nepali language generation model fine-tuned on Nepali text data. It can understand and generate text in the Nepali language, helping with conversations, text completion, and creative writing in Nepali. The model is based on transformer architecture and is specifically trained for Nepali language understanding.`}
              </p>

              {/* Input Help Section */}
              <div className="bg-n-7 border border-n-5 rounded-xl p-3 mb-4">
                <h4 className="text-sm font-semibold text-n-1 mb-2">
                  💡 How to interact:
                </h4>
                <ul className="text-xs text-n-3 space-y-1">
                  {modelType === "lemmatizer" ? (
                    <>
                      <li>
                        • Type Nepali words or sentences to see their lemmatized
                        forms
                      </li>
                      <li>• Use sample text above for quick demonstration</li>
                      <li>• Works best with properly spelled Nepali words</li>
                      <li>• Each word will be converted to its root form</li>
                    </>
                  ) : modelType === "ner" ? (
                    <>
                      <li>
                        • Enter Nepali text containing names, places, or
                        organizations
                      </li>
                      <li>• Use sample sentences above for quick testing</li>
                      <li>• The model will identify and classify entities</li>
                      <li>• Results show entity type and confidence level</li>
                    </>
                  ) : modelType === "stemmer" ? (
                    <>
                      <li>
                        • Type Nepali words or sentences for morphological
                        analysis
                      </li>
                      <li>• Use sample text above for quick demonstration</li>
                      <li>
                        • Analyzes root words, suffixes, and grammatical
                        patterns
                      </li>
                      <li>
                        • Shows part-of-speech tags and transformation rules
                      </li>
                      <li>• Works with inflected and compound Nepali words</li>
                    </>
                  ) : modelType === "aspect" ? (
                    <>
                      <li>
                        • Type Nepali text for aspect-based sentiment analysis
                      </li>
                      <li>• Use sample sentences above for quick testing</li>
                      <li>
                        • Identifies aspects: GENERAL, FEEDBACK, PROFANITY,
                        VIOLENCE
                      </li>
                      <li>
                        • Perfect for content moderation and opinion analysis
                      </li>
                      <li>• Works with political and social text content</li>
                    </>
                  ) : (
                    <>
                      <li>• Type in Nepali script for best results</li>
                      <li>• Use sample prompts above for quick start</li>
                      <li>
                        • English words like "namaste" will be auto-converted
                      </li>
                      <li>
                        • Mix English and Nepali - the model understands both!
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSourceCode}
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg transition-all duration-200 font-code text-sm font-semibold border border-brand-primary hover:border-brand-secondary"
                >
                  Source Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Chat;

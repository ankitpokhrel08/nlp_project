import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Section from "./Section";
import Button from "./Button";
import Header from "./Header";
import Footer from "./Footer";

const NERChat = () => {
  const { modelName } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample Nepali texts for NER testing
  const sampleTexts = [
    "काठमाडौं, पोखरा, लुम्बिनी, चितवन, र मुस्ताङ नेपालका प्रसिद्ध पर्यटकीय स्थलहरू हुन्।",
    "राम शर्मा काठमाडौं विश्वविद्यालयमा पढ्छन्।",
    "सगरमाथा नेपालको सबैभन्दा अग्लो हिमाल हो।",
    "प्रधानमन्त्री ओली सिंहदरबारमा बसेर काम गर्छन्।",
    "गौतम बुद्ध लुम्बिनीमा जन्मेका थिए।",
    "गोरखा जिल्लामा रहेको मनकामना मन्दिर प्रसिद्ध छ।",
  ];

  // Convert URL-friendly name back to display name
  const displayName = modelName
    ?.replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with a welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `नमस्ते! I'm the ${displayName} model. I can identify named entities (people, places, organizations) in Nepali text. Enter any Nepali text and I'll highlight the entities I find!`,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [displayName]);

  // Focus input when component mounts
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  // Handle sample text selection
  const handleSampleText = (text) => {
    setInputValue(text);
    setShowSamples(false);
    inputRef.current?.focus();
  };

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

    // Focus the input after clearing it
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    try {
      // Call the Flask NER API
      const response = await fetch("http://localhost:5001/ner", {
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

      const data = await response.json();

      if (data.success) {
        // Group entities by combining B- and I- tags
        const groupEntities = (entities, originalText) => {
          const grouped = [];
          let currentGroup = null;
          
          entities.forEach((entity, index) => {
            const cleanWord = entity.word.replace(/^▁/, '').trim();
            const entityTag = entity.entity;
            const entityType = entityTag.replace(/^[BI]-/, ''); // Remove B- or I- prefix
            
            if (entityTag.startsWith('B-')) {
              // Start new entity group
              if (currentGroup) {
                grouped.push(currentGroup);
              }
              currentGroup = {
                words: [cleanWord],
                type: entityType,
                confidences: [entity.confidence],
                start: entity.start,
                end: entity.end,
                positions: [{ start: entity.start, end: entity.end, word: cleanWord }]
              };
            } else if (entityTag.startsWith('I-') && currentGroup && currentGroup.type === entityType) {
              // Continue current entity group
              currentGroup.words.push(cleanWord);
              currentGroup.confidences.push(entity.confidence);
              currentGroup.end = entity.end;
              currentGroup.positions.push({ start: entity.start, end: entity.end, word: cleanWord });
            } else {
              // Handle case where I- tag appears without B- tag (treat as new entity)
              if (currentGroup) {
                grouped.push(currentGroup);
              }
              currentGroup = {
                words: [cleanWord],
                type: entityType,
                confidences: [entity.confidence],
                start: entity.start,
                end: entity.end,
                positions: [{ start: entity.start, end: entity.end, word: cleanWord }]
              };
            }
          });
          
          // Add the last group
          if (currentGroup) {
            grouped.push(currentGroup);
          }
          
          // Format combined entities based on original text positioning
          return grouped.map(group => {
            let combinedText;
            
            if (group.positions.length === 1) {
              combinedText = group.words[0];
            } else {
              // Check if words are consecutive in original text
              const textSegment = originalText.substring(group.start, group.end);
              
              // If the extracted segment from original text contains all words, use it
              if (textSegment && textSegment.trim()) {
                combinedText = textSegment.trim();
              } else {
                // Fallback: join words with space
                combinedText = group.words.join(' ');
              }
            }
            
            // Calculate average confidence
            const avgConfidence = group.confidences.reduce((sum, conf) => sum + conf, 0) / group.confidences.length;
            
            return {
              word: combinedText,
              entity: group.type,
              confidence: avgConfidence,
              start: group.start,
              end: group.end,
              wordCount: group.words.length
            };
          });
        };

        const groupedEntities = groupEntities(data.entities, userMessage.text);

        const botResponse = {
          id: Date.now() + 1,
          text: `Found ${groupedEntities.length} named entities`,
          sender: "bot",
          timestamp: new Date(),
          entities: groupedEntities, // Store grouped entities
          originalText: userMessage.text,
          isFormatted: true
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        throw new Error(data.message || "Failed to perform NER");
      }
    } catch (error) {
      console.error("Error calling NER API:", error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting to the NER server. Please make sure the backend is running and try again.",
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
    window.open(
      "https://huggingface.co/bishaldpande/Ner-xlm-roberta-base",
      "_blank"
    );
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
              className="flex items-center gap-2 px-3 py-2 bg-n-6/80 hover:bg-n-5 text-n-1 rounded-lg transition-all duration-200 font-code text-xs font-semibold border border-n-5/50 hover:border-n-4"
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
            <h2 className="h5 text-center text-n-1 bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent">
              {displayName} - Named Entity Recognition
            </h2>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>

          {/* Chat Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-n-7 to-n-8 border border-n-6/50 rounded-2xl overflow-hidden shadow-2xl">
              {/* Chat Messages */}
              <div className="h-64 md:h-80 overflow-y-auto p-3 md:p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-color-1 to-color-2 text-n-1"
                          : "bg-n-6/80 text-n-1 border border-n-5/50"
                      }`}
                    >
                      {/* Enhanced rendering for NER results */}
                      {message.sender === "bot" && message.entities ? (
                        <div>
                          <div className="mb-3">
                            <p className="text-sm md:text-base leading-relaxed mb-2">
                              Found {message.entities.length} named entities:
                            </p>
                            {message.originalText && (
                              <div className="bg-n-5/20 rounded-lg p-2 mb-3">
                                <span className="text-xs text-n-4">Analyzed text:</span>
                                <p className="text-sm italic text-n-2">"{message.originalText}"</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            {message.entities.map((entity, index) => {
                              const confidence = (entity.confidence * 100).toFixed(1);
                              
                              // Color coding for different entity types
                              const getEntityColor = (type) => {
                                switch(type.toLowerCase()) {
                                  case 'person': return 'bg-green-500/20 border-green-400';
                                  case 'location': return 'bg-blue-500/20 border-blue-400';
                                  case 'organization': return 'bg-purple-500/20 border-purple-400';
                                  case 'miscellaneous': return 'bg-orange-500/20 border-orange-400';
                                  default: return 'bg-gray-500/20 border-gray-400';
                                }
                              };
                              
                              return (
                                <div key={index} className={`flex items-center justify-between rounded-lg p-3 border ${getEntityColor(entity.entity)}`}>
                                  <div className="flex items-center gap-3">
                                    <span className="bg-color-1 text-white px-2 py-1 rounded text-xs font-semibold">
                                      {index + 1}
                                    </span>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-color-2">
                                        "{entity.word}"
                                      </span>
                                      {entity.wordCount > 1 && (
                                        <span className="text-xs text-n-4">
                                          ({entity.wordCount} words combined)
                                        </span>
                                      )}
                                    </div>
                                    <span className="px-2 py-1 bg-n-4/20 rounded text-xs font-medium">
                                      {entity.entity}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs text-n-3">
                                      {confidence}%
                                    </span>
                                    <div className="text-xs text-n-4">
                                      pos: {entity.start}-{entity.end}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          {/* Summary section */}
                          <div className="mt-3 pt-3 border-t border-n-5/30">
                            <div className="grid grid-cols-2 gap-2 text-xs text-n-4">
                              <div>Total entities: <span className="text-n-2 font-semibold">{message.entities.length}</span></div>
                              <div>Entity types: <span className="text-n-2 font-semibold">{[...new Set(message.entities.map(e => e.entity))].length}</span></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
                          {message.text}
                        </p>
                      )}
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
                    <div className="bg-n-6/80 text-n-1 border border-n-5/50 rounded-2xl px-4 py-3">
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
                        <span className="text-sm text-n-3">Analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
              {/* Input Area */}
              <div className="border-t border-n-6/50 p-3">
                {/* Sample Texts */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-n-4">
                      Sample Nepali Texts for NER:
                    </span>
                    <button
                      onClick={() => setShowSamples(!showSamples)}
                      className="text-xs text-color-1 hover:text-color-2 transition-colors"
                    >
                      {showSamples ? "Hide" : "Show"} Examples
                    </button>
                  </div>

                  {showSamples && (
                    <div className="grid grid-cols-1 gap-2 mb-3">
                      {sampleTexts.map((text, index) => (
                        <button
                          key={index}
                          onClick={() => handleSampleText(text)}
                          className="text-left p-2 bg-n-6/30 hover:bg-n-6/50 border border-n-5/30 hover:border-n-5/50 rounded-lg text-xs text-n-2 hover:text-n-1 transition-all duration-200"
                        >
                          {text}
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
                      placeholder="Enter Nepali text to analyze for named entities..."
                      className="w-full bg-n-6/50 border border-n-5/50 rounded-xl px-3 py-2 text-n-1 placeholder-n-4 resize-none focus:outline-none focus:border-color-1 transition-colors text-sm"
                      rows="2"
                      disabled={isLoading}
                    />
                    <div className="mt-1 text-xs text-n-4">
                      💡 Tip: Enter Nepali text containing names, places, or
                      organizations
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-color-1 to-color-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Analyze
                  </Button>
                </div>

                {/* Model Info */}
                <div className="mt-3 text-center">
                  <p className="text-xs text-n-4">
                    Currently using{" "}
                    <span className="text-color-1 font-semibold">
                      NER Model (XLM-RoBERTa)
                    </span>{" "}
                    for entity recognition
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Model Information Card */}
          <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-gradient-to-br from-n-7 to-n-8 border border-n-6/50 rounded-2xl p-4">
              <h3 className="h5 mb-3 text-n-1 text-center">
                About {displayName}
              </h3>
              <p className="text-n-3 text-center leading-relaxed text-sm mb-4">
                This is a Nepali Named Entity Recognition (NER) model built on
                top of XLM-RoBERTa. It can identify and classify named entities
                like person names, locations, and organizations in Nepali text.
                The model has been trained on the Everest NER dataset and
                provides confidence scores for each detected entity.
              </p>

              {/* Input Help Section */}
              <div className="bg-n-6/30 border border-n-5/30 rounded-xl p-3 mb-4">
                <h4 className="text-sm font-semibold text-n-1 mb-2">
                  🎯 What it detects:
                </h4>
                <ul className="text-xs text-n-3 space-y-1">
                  <li>
                    • <strong>Person names:</strong> राम, सीता, गौतम बुद्ध
                  </li>
                  <li>
                    • <strong>Locations:</strong> काठमाडौं, पोखरा, सगरमाथा
                  </li>
                  <li>
                    • <strong>Organizations:</strong> विश्वविद्यालय, सरकार
                  </li>
                  <li>
                    • <strong>Other entities:</strong> Based on training data
                    patterns
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSourceCode}
                  className="px-4 py-2 bg-n-6/80 hover:bg-n-5 text-n-1 rounded-lg transition-all duration-200 font-code text-sm font-semibold border border-n-5/50 hover:border-n-4"
                >
                  View on Hugging Face
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default NERChat;

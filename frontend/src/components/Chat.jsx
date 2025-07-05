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

  // Sample Nepali prompts to help users
  const samplePrompts = [
    "नमस्ते, तपाईं कस्तो हुनुहुन्छ?",
    "काठमाडौं बारे बताउनुहोस्",
    "नेपालको संस्कृति के छ?",
    "हिमालयको बारेमा केही भन्नुहोस्",
    "नेपाली खाना के मन पराउनुहुन्छ?",
    "दशैं तिहारको बारेमा भन्नुहोस्",
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
        text: `नमस्ते! I'm ${displayName}, a Nepali language model. I can help you generate text in Nepali. Feel free to ask me questions in Nepali or English. You can also use the sample prompts below to get started!`,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [displayName]);

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
      const response = await fetch("http://localhost:5001/generate", {
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

      const data = await response.json();

      if (data.success) {
        const botResponse = {
          id: Date.now() + 1,
          text: data.response || "I'm sorry, I couldn't generate a response.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        throw new Error(data.message || "Failed to generate response");
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
              Chat with {displayName}
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
                        : message.sender === "system"
                        ? "justify-center"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-color-1 to-color-2 text-n-1"
                          : message.sender === "system"
                          ? "bg-color-3/20 text-n-2 border border-color-3/30 text-center"
                          : "bg-n-6/80 text-n-1 border border-n-5/50"
                      }`}
                    >
                      <p className="text-sm md:text-base leading-relaxed">
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
                        <span className="text-sm text-n-3">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>{" "}
              {/* Input Area */}
              <div className="border-t border-n-6/50 p-3">
                {/* Sample Prompts */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-n-4">
                      Sample Nepali Prompts:
                    </span>
                    <button
                      onClick={() => setShowSamples(!showSamples)}
                      className="text-xs text-color-1 hover:text-color-2 transition-colors"
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
                          className="text-left p-2 bg-n-6/30 hover:bg-n-6/50 border border-n-5/30 hover:border-n-5/50 rounded-lg text-xs text-n-2 hover:text-n-1 transition-all duration-200"
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
                      placeholder={`Ask ${displayName} anything in Nepali or English...`}
                      className="w-full bg-n-6/50 border border-n-5/50 rounded-xl px-3 py-2 text-n-1 placeholder-n-4 resize-none focus:outline-none focus:border-color-1 transition-colors text-sm"
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
                        className="text-color-1 hover:text-color-2 underline"
                      >
                        Google Input Tools
                      </a>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-color-1 to-color-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </Button>
                </div>

                {/* Model Info */}
                <div className="mt-3 text-center">
                  <p className="text-xs text-n-4">
                    Currently chatting with{" "}
                    <span className="text-color-1 font-semibold">
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
            <div className="bg-gradient-to-br from-n-7 to-n-8 border border-n-6/50 rounded-2xl p-4">
              <h3 className="h5 mb-3 text-n-1 text-center">
                About {displayName}
              </h3>
              <p className="text-n-3 text-center leading-relaxed text-sm mb-4">
                {displayName} is a Nepali language generation model fine-tuned
                on Nepali text data. It can understand and generate text in the
                Nepali language, helping with conversations, text completion,
                and creative writing in Nepali. The model is based on
                transformer architecture and is specifically trained for Nepali
                language understanding.
              </p>

              {/* Input Help Section */}
              <div className="bg-n-6/30 border border-n-5/30 rounded-xl p-3 mb-4">
                <h4 className="text-sm font-semibold text-n-1 mb-2">
                  💡 How to interact:
                </h4>
                <ul className="text-xs text-n-3 space-y-1">
                  <li>• Type in Nepali script for best results</li>
                  <li>• Use sample prompts above for quick start</li>
                  <li>
                    • English words like &quot;namaste&quot; will be
                    auto-converted
                  </li>
                  <li>
                    • Mix English and Nepali - the model understands both!
                  </li>
                </ul>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSourceCode}
                  className="px-4 py-2 bg-n-6/80 hover:bg-n-5 text-n-1 rounded-lg transition-all duration-200 font-code text-sm font-semibold border border-n-5/50 hover:border-n-4"
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

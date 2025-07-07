// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Section from "./Section";
// import Button from "./Button";
// import Header from "./Header";

// const LemmatizerChat = () => {
//   const { modelName } = useParams();
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSamples, setShowSamples] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   // Sample Nepali texts for lemmatization testing
//   const sampleTexts = [
//     "पढ्दै",
//     "खेल्दै",
//     "घरमा",
//     "गरिरहेका",
//     "फुलेका",
//     "पार्कमा",
//   ];

//   // Convert URL-friendly name back to display name
//   const displayName = modelName
//     ?.replace(/-/g, " ")
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Initialize with a welcome message
//   useEffect(() => {
//     setMessages([
//       {
//         id: 1,
//         text: `नमस्ते! I'm the ${displayName} model. Send me Nepali text and I'll convert the words to their root forms (lemmas). Try typing some Nepali words!`,
//         sender: "bot",
//         timestamp: new Date(),
//       },
//     ]);
//   }, [displayName]);

//   const formatLemmatizerResponse = (data) => {
//     // Simple format: just return the lemmatized text
//     return data.lemmatized_text;
//   };

//   const handleSendMessage = async () => {
//     if (!inputValue.trim() || isLoading) return;

//     const userMessage = {
//       id: Date.now(),
//       text: inputValue.trim(),
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:5001/lemmatize", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           text: userMessage.text,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.success) {
//         const botMessage = {
//           id: Date.now() + 1,
//           text: formatLemmatizerResponse(data),
//           sender: "bot",
//           timestamp: new Date(),
//         };
//         setMessages((prev) => [...prev, botMessage]);
//       } else {
//         throw new Error(data.message || "Lemmatization failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       const errorMessage = {
//         id: Date.now() + 1,
//         text: `Sorry, I encountered an error: ${error.message}. Please make sure the backend server is running.`,
//         sender: "bot",
//         timestamp: new Date(),
//         isError: true,
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const useSampleText = (text) => {
//     setInputValue(text);
//     setShowSamples(false);
//     // Focus the input after a short delay
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 100);
//   };

//   const formatMessage = (text) => {
//     return text;
//   };

//   return (
//     <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
//       <Header />
//       <Section className="pt-[12rem] -mt-[5.25rem]" id="lemmatizer">
//         <div className="container relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
//           <h1 className="h1 mb-6">
//             {displayName || "Nepali Lemmatizer"}{" "}
//             <span className="inline-block relative">
//               Chat{" "}
//               <img
//                 src="/src/assets/curve.png"
//                 className="absolute top-full left-0 w-full xl:-mt-2"
//                 width={624}
//                 height={28}
//                 alt="Curve"
//               />
//             </span>
//           </h1>
//           <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
//             Interact with our Nepali Lemmatizer model. Enter Nepali text to see
//             words reduced to their root forms.
//           </p>
//         </div>

//         <div className="relative">
//           <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
//             <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
//               <img
//                 className="w-full h-full object-cover md:object-right"
//                 width={800}
//                 height={730}
//                 alt="Lemmatizer"
//                 src="/src/assets/hero/robot.jpg"
//               />
//             </div>

//             <div className="relative z-1 max-w-[17rem] ml-auto">
//               <h4 className="h4 mb-4">Nepali Lemmatizer</h4>
//               <p className="body-2 mb-[3rem] text-n-3">
//                 Convert Nepali words to their lemmatized root forms using
//                 advanced rule-based processing.
//               </p>

//               {/* Chat interface */}
//               <div className="bg-n-8/80 rounded-xl p-4 backdrop-blur-sm border border-n-1/10">
//                 {/* Messages */}
//                 <div className="h-64 overflow-y-auto mb-4 space-y-3">
//                   {messages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex ${
//                         message.sender === "user"
//                           ? "justify-end"
//                           : "justify-start"
//                       }`}
//                     >
//                       <div
//                         className={`max-w-[80%] p-3 rounded-lg text-sm ${
//                           message.sender === "user"
//                             ? "bg-color-1 text-white"
//                             : message.isError
//                             ? "bg-red-500/20 text-red-200 border border-red-500/30"
//                             : "bg-n-7 text-n-1"
//                         }`}
//                       >
//                         <div className="whitespace-pre-wrap">
//                           {message.text}
//                         </div>
//                         <div className="text-xs opacity-70 mt-1">
//                           {message.timestamp.toLocaleTimeString()}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {isLoading && (
//                     <div className="flex justify-start">
//                       <div className="bg-n-7 text-n-1 p-3 rounded-lg text-sm">
//                         <div className="flex items-center space-x-2">
//                           <div className="flex space-x-1">
//                             <div className="w-2 h-2 bg-n-3 rounded-full animate-bounce"></div>
//                             <div className="w-2 h-2 bg-n-3 rounded-full animate-bounce delay-75"></div>
//                             <div className="w-2 h-2 bg-n-3 rounded-full animate-bounce delay-150"></div>
//                           </div>
//                           <span>Lemmatizing...</span>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   <div ref={messagesEndRef} />
//                 </div>

//                 {/* Sample texts dropdown */}
//                 {showSamples && (
//                   <div className="mb-4 bg-n-7 rounded-lg border border-n-6 p-2 max-h-32 overflow-y-auto">
//                     <div className="text-xs text-n-3 mb-2">Sample texts:</div>
//                     {sampleTexts.map((sample, index) => (
//                       <button
//                         key={index}
//                         onClick={() => useSampleText(sample)}
//                         className="block w-full text-left p-2 text-sm text-n-1 hover:bg-n-6 rounded transition-colors"
//                       >
//                         {sample}
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {/* Input area */}
//                 <div className="flex space-x-2">
//                   <div className="flex-1 relative">
//                     <textarea
//                       ref={inputRef}
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value)}
//                       onKeyDown={handleKeyPress}
//                       placeholder="Enter Nepali text to lemmatize..."
//                       className="w-full p-2 bg-n-7 border border-n-6 rounded text-n-1 placeholder-n-4 resize-none focus:outline-none focus:border-color-1"
//                       rows="2"
//                       disabled={isLoading}
//                     />
//                   </div>
//                   <div className="flex flex-col space-y-1">
//                     <Button
//                       onClick={handleSendMessage}
//                       disabled={!inputValue.trim() || isLoading}
//                       className="px-3 py-2 text-sm h-auto min-h-0"
//                     >
//                       Send
//                     </Button>
//                     <Button
//                       onClick={() => setShowSamples(!showSamples)}
//                       className="px-3 py-1 text-xs h-auto min-h-0"
//                       white
//                     >
//                       {showSamples ? "Hide" : "Examples"}
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               <Button
//                 className="w-full mt-4"
//                 onClick={() => navigate("/")}
//                 white
//               >
//                 Back to Projects
//               </Button>
//             </div>
//           </div>

//           {/* Background gradient */}
//           <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
//             <img
//               src="/src/assets/hero-background.jpg"
//               className="w-full"
//               width={1440}
//               height={1800}
//               alt="hero"
//             />
//           </div>
//         </div>
//       </Section>
//     </div>
//   );
// };

// export default LemmatizerChat;

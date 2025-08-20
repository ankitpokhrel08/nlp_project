// API Configuration
const API_CONFIG = {
  // Use proxy in development, direct URL in production
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV
      ? "/api" // Use proxy in development
<<<<<<< HEAD
      : "https://nlp-backend.itclub.asmitphuyal.com.np"), // Updated to secure backend URL
=======
      : "https://nlp-backend.itclub.asmitphuyal.com.np"),
>>>>>>> update-backend-urls

  // For local development (use port 8007 for Docker container)
  // BASE_URL: "http://localhost:8007",

  ENDPOINTS: {
    GENERATE: "/generate",
    LEMMATIZE: "/lemmatize",
    NER: "/ner",
    STEM: "/stemmer", // Fixed: backend uses /stemmer not /stem
    ASPECT: "/aspect", // Fixed: backend uses /aspect not /aspect-sentiment
    HEALTH: "/health",
    MODEL_INFO: "/model-info", // Added: new endpoint for model information
  },
};

export default API_CONFIG;

// API Configuration
const API_CONFIG = {
  // Production deployment on Coolify
  BASE_URL: "https://nlp_backend.itclub.asmitphuyal.com.np",

  // For local development (use port 8007 for Docker container)
  // BASE_URL: "http://localhost:8007",

  ENDPOINTS: {
    GENERATE: "/generate",
    LEMMATIZE: "/lemmatize",
    NER: "/ner",
    STEM: "/stem",
    ASPECT: "/aspect-sentiment",
    HEALTH: "/health",
  },
};

export default API_CONFIG;

// API Configuration
const API_CONFIG = {
  // For production deployment on Coolify
  BASE_URL: "https://nlp_backend.itclub.asmitphuyal.com.np",

  // For local Docker container (commented out for production)
  // BASE_URL: "http://localhost:8000",

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

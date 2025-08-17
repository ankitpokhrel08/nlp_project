// API Configuration
const API_CONFIG = {
  // For local Docker container
  BASE_URL: "http://localhost:8000",

  // For production deployment (you'll update this when deploying to Coolify)
  // BASE_URL: 'https://nlp_backend.itclub.asmitphuyal.com.np',

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

import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "#hero",
  },
  {
    id: "1",
    title: "Projects",
    url: "#features",
  },
  {
    id: "2",
    title: "Contribute",
    url: "https://github.com/ankitpokhrel08/nlp_project",
    external: true,
  },
  {
    id: "3",
    title: "About Us",
    url: "#about",
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Ankit Pokhrel",
    description: "AI chatbot, personalized recommendations",
  },
  {
    id: "1",
    title: "Anam Dhaubanjar",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
  },
  {
    id: "2",
    title: "Ankit Prasad Kisi",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
  },
  {
    id: "3",
    title: "Anjal Satyal",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
  },
];

export const benefits = [
  {
    id: "0",
    title: "NepaliGPT",
    description: "Advanced text generation for the Nepali language",
    text: "A cutting-edge GPT-2 based language model specifically designed for Nepali text generation. Trained on an extensive 9.3GB dataset from Nepali literature, news, and open-source content, this model excels at predicting contextually appropriate words in Nepali sentences. Built with modern deep learning techniques including optimized training parameters and bf16 precision for enhanced performance.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "STEPS Parser",
    description: "Multilingual dependency parsing with transformer models",
    text: "A sophisticated research tool that analyzes sentence structures across multiple languages using advanced transformer models like mBERT and XLM-R. STEPS identifies grammatical relationships between words, making it invaluable for computational linguistics research. The system supports multiple languages, provides evaluation scripts, and enables reproducible research using Universal Dependencies data.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Nepali Named Entity Recognition",
    description:
      "Intelligent identification of people, places, and organizations in Nepali text",
    text: "A powerful NER model built on XLM-RoBERTa architecture, specifically trained on the Everest NER dataset for Nepali language processing. This tool automatically detects and categorizes important entities like person names, locations, and organizations in Nepali text. Easy to integrate with existing applications through the Hugging Face library, making it perfect for research and development projects.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "NepaliLemmatizer",
    description:
      "Efficient root word extraction for Nepali language processing",
    text: "An intelligent lemmatization tool that converts inflected Nepali words to their root forms using advanced TRIE-based and hybrid algorithms. For example, it transforms 'खाएको' to its base form 'खानु'. This essential NLP tool streamlines text preprocessing for Nepali language applications, offering reliable and efficient word normalization for developers and researchers.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Nepali Morphological Analyzer",
    description:
      "Advanced morphological analysis and stemming for Nepali words",
    text: "A comprehensive morphological analysis tool that identifies root words, suffixes, and grammatical patterns in Nepali text. This analyzer uses 100+ transformation rules for Nepali morphology and can determine part-of-speech tags, making it invaluable for linguistic research and NLP applications. Built on extensive linguistic data from Brihat Nepali Shabdakosh with over 20,000 root words.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "5",
    title: "Spoken Language Identifier",
    description: "Real-time audio language detection using deep learning",
    text: "An innovative CNN-based system that identifies spoken languages from audio clips using Mel Spectrogram analysis. Currently supports five South Asian languages: Nepali, Hindi, Sanskrit, Newari, and Maithili. The system processes audio files as short as 10 seconds and includes a web API for real-time predictions. Fully containerized with Docker for easy deployment and scalability.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "6",
    title: "COVID-19 Nepali Tweet Classifier",
    description: "AI-powered social media analysis for public health insights",
    text: "A specialized multilingual AI system that analyzes Nepali-language tweets about COVID-19, filling a critical gap in social media monitoring for low-resource languages. The system automatically categorizes tweets into eight key topics including symptoms, vaccination, and misinformation. Features a live dashboard powered by advanced mBERT and MuRIL models, with all datasets and code available as open-source resources.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];

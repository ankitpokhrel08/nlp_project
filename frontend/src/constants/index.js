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
    url: "#pricing",
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
    description: "Nepali Language Generative Pretrained Transformer Model",
    text: "Generative Language Model for Nepali Language — An experimental project to build a text generation model for the Nepali language using a GPT-2 based architecture. It learns to predict the next word in a sentence based on previous context in Nepali. Trained on a 9.3 GB dataset collected from Nepali books, news articles, and open-source resources. Key training settings include 5 epochs, learning rate of 2e-5, weight decay of 0.01, and bf16 precision. Model for Nepali Language",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "STEPS Parser",
    description:
      "A modular dependency parser using transformer models, built for reproducible and extensible linguistic analysis.",
    text: "The STEPS is a research prototype parser that uses transformer models (like mBERT and XLM-R) to analyze the structure of sentences in different languages. Designed for experiments in computational linguistics, it can predict how words are connected (dependencies) in a sentence. The code helps researchers reproduce results from a published study and explore new ideas using Universal Dependencies data. It supports training on multiple languages, parsing new text, and evaluating results with provided scripts. Note: this software is for research only and isn’t actively maintained. uses natural language processing to understand user queries and provide accurate and relevant responses.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Named Entity Recognition for Nepali Using BERT Based Models",
    description:
      "A Nepali-language model that identifies names of people, places, and organizations from text.",
    text: "This is a Nepali Named Entity Recognition (NER) model built on top of a powerful multilingual AI (xlm-roberta-base). It has been trained using the Everest NER dataset to detect names of people, locations, and organizations in Nepali sentences. You can use it with just a few lines of Python code through the Hugging Face library to analyze any Nepali text and find meaningful entities. Ideal for researchers, students, or developers working with Nepali natural language processing tasks.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "NepaliLemmatizer",
    description:
      "A tool to find the root form of Nepali words using TRIE and hybrid techniques.",
    text: "NepaliLemmatizer is a simple tool that helps convert Nepali words into their root forms (lemmas). For example, it can turn 'खाएको' into its base form 'खानु'. It uses two methods—TRIE-based and a hybrid approach—to do this efficiently. You just need to install the dependencies, activate the environment, and run the script with your Nepali word to get its root form. Perfect for anyone working on Nepali language processing or building smart language apps.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title:
      "Spoken Language Identifier: Detecting Nepali Languages from Audio Using CNNs",
    description:
      "A deep learning system that identifies the spoken language from audio files using PyTorch and Mel Spectrograms.",
    text: "This project is an AI-based system that listens to an audio clip and tells you what language is being spoken. It uses deep learning (specifically, a CNN model built with PyTorch) and transforms the sound into visual patterns called Mel Spectrograms—like turning audio into images—and then classifies which language it is. The system can currently detect five regional languages (Nepali, Hindi, Sanskrit, Newari, Maithili) using audio clips as short as 10 seconds. It also includes a web API that you can interact with to upload your own audio files and get real-time predictions. The entire system is containerized with Docker and can be deployed on the cloud for accessibility. It’s a practical tool for speech recognition, multilingual support in contact centers, or automatic audio translation.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Classifying COVID-19 Nepali Tweets in a Low-Resource Setting",
    description:
      "A multilingual AI system that categorizes Nepali tweets about COVID-19 into key topics for better public health insights.",
    text: "This project uses AI to understand what Nepali Twitter users were saying about COVID-19 during the pandemic. Since most social media monitoring tools only work in big global languages, this system helps fill the gap for Nepali. It automatically collects Nepali-language tweets related to COVID-19, classifies them into eight common topics—like symptoms, vaccination, or misinformation—and displays the results in a live dashboard. The team used two advanced AI models (mBERT and MuRIL) to train the system and found that MuRIL, which better understands South Asian languages, performs well on larger datasets. Everything, including the dataset, models, and code, is open-source and publicly available, making it a valuable tool for public health researchers and developers working in low-resource languages.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
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

# 🧠 Nepali NLP Hub - Interactive Language Processing Platform

A comprehensive web platform showcasing cutting-edge Natural Language Processing models specifically designed for the Nepali language. This project serves as both a demonstration platform and a practical tool for researchers, developers, and enthusiasts working with Nepali text processing.

## 🎯 Why This Project?

The Nepali language, spoken by over 30 million people worldwide, has been underrepresented in the field of Natural Language Processing. This platform aims to:

- **Bridge the Language Gap**: Provide accessible NLP tools for Nepali speakers
- **Showcase Research**: Demonstrate state-of-the-art Nepali language models
- **Enable Innovation**: Offer a platform for researchers to share their work
- **Educational Purpose**: Help students and developers learn about NLP in Nepali context
- **Community Building**: Foster collaboration in Nepali NLP research

Built with modern web technologies, this platform provides an intuitive interface for interacting with various Nepali NLP models through real-time chat interfaces.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Git**

### Backend Setup (Flask API)

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python app.py
```

The backend will start on **http://localhost:5001**

### Frontend Setup (React App)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on **http://localhost:5174**

## 🤖 Available Models

### 1. **NepaliGPT** - Conversational AI

- **Model**: `Shushant/thesis_nepaliGPT`
- **Description**: A fine-tuned GPT model specifically trained for Nepali language generation
- **Capabilities**: Text completion, conversation, creative writing in Nepali
- **Use Cases**: Chatbots, content generation, language learning assistance

### 2. **Named Entity Recognition (NER)** - Information Extraction

- **Model**: BERT-based NER model for Nepali
- **Description**: Identifies and classifies named entities in Nepali text
- **Capabilities**: Recognizes people, places, organizations, and other entities
- **Use Cases**: Information extraction, content analysis, data mining

### 3. **Nepali Lemmatizer** - Text Normalization

- **Model**: Rule-based lemmatization system
- **Description**: Converts Nepali words to their root forms (lemmas)
- **Capabilities**: Morphological analysis, text normalization
- **Use Cases**: Search engines, text preprocessing, linguistic analysis

### 4. **Morphological Analyzer** - Linguistic Analysis

- **Model**: Comprehensive stemmer with 100+ transformation rules
- **Description**: Analyzes Nepali word structure, roots, suffixes, and grammatical patterns
- **Capabilities**: Root extraction, suffix identification, part-of-speech tagging
- **Database**: Built on Brihat Nepali Shabdakosh with 20,000+ root words
- **Use Cases**: Linguistic research, grammar checking, educational tools

### 5. **Aspect-Based Sentiment Analysis** - Opinion Mining

- **Model**: `Karinkato/Aspect_based_sentiment_analysis`
- **Description**: BERT-based model for fine-grained sentiment analysis of Nepali text
- **Capabilities**: Identifies aspect categories (GENERAL, FEEDBACK, PROFANITY, VIOLENCE) and analyzes sentiments
- **Architecture**: Built on NepalBERT for optimized Nepali language understanding
- **Use Cases**: Social media monitoring, content moderation, public opinion analysis, political text analysis

## 🌐 API Endpoints

| Endpoint      | Method | Description                     |
| ------------- | ------ | ------------------------------- |
| `/generate`   | POST   | NepaliGPT text generation       |
| `/ner`        | POST   | Named Entity Recognition        |
| `/lemmatize`  | POST   | Lemmatization of Nepali text    |
| `/stemmer`    | POST   | Morphological analysis          |
| `/aspect`     | POST   | Aspect-based sentiment analysis |

## 🤝 Contributing

We welcome contributions from the Nepali NLP community! If you have developed a Nepali NLP model and would like to feature it on this platform:

### How to Contribute Your Model

1. **Fork this repository** to your GitHub account
2. **Create a new branch** for your model: `git checkout -b feature/your-model-name`
3. **Add your model integration**:
   - Backend: Add API endpoint in `backend/app.py`
   - Frontend: Add model card in `frontend/src/constants/index.js`
   - Update chat interface if needed
4. **Test your integration** thoroughly
5. **Update documentation** with model details
6. **Create a Pull Request** with:
   - Clear description of your model
   - Performance metrics and examples
   - Instructions for testing
   - Any additional dependencies

### What We Look For

- **Nepali Language Focus**: Models specifically designed for Nepali text
- **Quality Implementation**: Well-tested and documented code
- **Open Source**: Models should be accessible and properly licensed
- **Educational Value**: Clear examples and use cases
- **Performance**: Reasonable inference time and accuracy

### Review Process

1. **Initial Review**: We'll check code quality and model integration
2. **Testing**: Verify functionality and performance
3. **Community Feedback**: Gather input from other contributors
4. **Approval**: Merge into main branch and deploy

Join us in building the most comprehensive Nepali NLP platform! 🇳🇵

---

**Made with ❤️ for the Nepali NLP community by PUL079BCTA**

# 🧠 NLP Projects Showcase - NepaliGPT Chat Interface

A full-stack web application that showcases Natural Language Processing projects with an interactive chat interface for the NepaliGPT model. Built with React, Tailwind CSS, and Flask.

## 🌟 Features

### Frontend (React + Tailwind CSS)

- **Modern UI/UX**: Beautiful gradient design with responsive layout
- **Interactive Chat Interface**: Real-time chat with NepaliGPT model
- **Project Showcase**: Display of various NLP projects and models
- **Smart Navigation**: Single-page navigation with smooth scrolling
- **Nepali Language Support**: Enhanced features for Nepali text input

### Backend (Flask API)

- **NepaliGPT Integration**: Direct integration with Hugging Face's NepaliGPT model
- **RESTful API**: Clean endpoints for health checks, text generation, and model info
- **CORS Enabled**: Cross-origin requests support for frontend integration
- **Error Handling**: Comprehensive error handling and logging

### Enhanced Nepali Support

- **Sample Prompts**: Pre-written Nepali phrases for quick testing
- **Auto-transliteration**: Automatic conversion of common English words to Nepali script
- **Virtual Keyboard Support**: Integration with Google Input Tools
- **Bilingual Interface**: Support for both English and Nepali inputs

## 🚀 Live Demo

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:5001
- **Chat Interface (NepaliGPT)**: http://localhost:5174/chat/nepali-gpt
- **NER Interface (Entity Recognition)**: http://localhost:5174/ner/named-entity-recognition-for-nepali-using-bert-based-models

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend

- **Flask** - Lightweight Python web framework
- **Transformers** - Hugging Face transformers library
- **PyTorch** - Deep learning framework
- **Flask-CORS** - Cross-origin resource sharing

### AI Model

- **NepaliGPT** (`Shushant/thesis_nepaliGPT`) - Fine-tuned GPT model for Nepali language

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd nlp_projects
```

### 2. Backend Setup (Flask API)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
./start.sh
# Or manually:
# python app.py
```

The backend will start on **http://localhost:5001**

### 3. Frontend Setup (React App)

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on **http://localhost:5174**

## 🎯 Usage Guide

### Basic Chat Interaction

1. **Open the application** at http://localhost:5174
2. **Navigate to Projects** section or click "Chat" on any project card
3. **Start chatting** with the NepaliGPT model

### Enhanced Nepali Input Methods

#### Method 1: Sample Prompts

- Click **"Show Examples"** in the chat interface
- Select from pre-written Nepali prompts like:
  - `नमस्ते, तपाईं कस्तो हुनुहुन्छ?`
  - `काठमाडौं बारे बताउनुहोस्`
  - `नेपालको संस्कृति के छ?`

#### Method 2: Auto-transliteration

Type common English words and they'll auto-convert:

- `namaste` → `नमस्ते`
- `kathmandu` → `काठमाडौं`
- `nepal` → `नेपाल`
- `himalaya` → `हिमालय`

#### Method 3: Virtual Keyboard

- Click the **Google Input Tools** link in the chat interface
- Use online Nepali keyboard for proper Devanagari input

#### Method 4: Direct Nepali Input

- If you have Nepali keyboard configured, type directly in Devanagari script

## 🌐 API Endpoints

### Backend API (http://localhost:5001)

| Endpoint      | Method | Description                         |
| ------------- | ------ | ----------------------------------- |
| `/health`     | GET    | Health check and model status       |
| `/generate`   | POST   | Generate text using NepaliGPT       |
| `/ner`        | POST   | Named Entity Recognition using BERT |
| `/model-info` | GET    | Get model information and specs     |

### Example API Usage

```bash
# Health check
curl http://localhost:5001/health

# Generate text
curl -X POST http://localhost:5001/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "नमस्ते", "max_length": 100, "temperature": 0.7}'

# Named Entity Recognition
curl -X POST http://localhost:5001/ner \
  -H "Content-Type: application/json" \
  -d '{"text": "काठमाडौं, पोखरा, लुम्बिनी नेपालका प्रसिद्ध ठाउँहरू हुन्।"}'
```

## 📁 Project Structure

```
nlp_projects/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Chat.jsx      # Main chat interface
│   │   │   ├── Header.jsx    # Navigation header
│   │   │   ├── Hero.jsx      # Landing page hero
│   │   │   └── ...
│   │   ├── constants/        # App constants and data
│   │   └── assets/          # Images and icons
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Flask backend
│   ├── app.py               # Main Flask application
│   ├── requirements.txt     # Python dependencies
│   ├── start.sh            # Startup script
│   ├── test_api.py         # API testing script
│   └── README.md           # Backend-specific docs
└── README.md               # This file
```

## 🧪 Testing the Application

### Test Backend API

```bash
cd backend
python test_api.py
```

### Test Frontend

1. Open http://localhost:5174
2. Navigate to chat interface
3. Try different input methods (samples, transliteration, direct Nepali)

## 🐛 Troubleshooting

### Common Issues

**Port 5000 already in use (macOS)**

- The backend uses port 5001 to avoid conflicts with AirPlay Receiver
- Alternatively, disable AirPlay Receiver in System Preferences

**Model loading takes time**

- First run downloads the NepaliGPT model (~500MB)
- Subsequent runs load from cache much faster

**CORS errors**

- Ensure backend is running on port 5001
- Frontend should be on port 5174
- Flask-CORS is configured for cross-origin requests

**Nepali text not displaying properly**

- Ensure your browser supports Devanagari fonts
- Try using Google Chrome or Firefox for best compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hugging Face** for the transformers library and model hosting
- **Shushant** for the NepaliGPT model (`Shushant/thesis_nepaliGPT`)
- **React Team** for the amazing frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **Flask Team** for the lightweight web framework

## 📞 Support

For questions or support, please:

1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Review the API documentation

---

**Made with ❤️ for the Nepali NLP community**

import React, { useState } from "react";
import Section from "./Section";
import Header from "./Header";
import Footer from "./Footer";
import API_CONFIG from "../config/api.js";

const DocumentationGuide = () => {
  const [activeSection, setActiveSection] = useState("users");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const UserSection = () => (
    <div className="space-y-12">
      {/* Quick Start */}
      <div id="quick-start" className="scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
          Quick Start
        </h2>
        <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-l-4 border-brand-primary rounded-r-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            You will learn
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-brand-primary mr-2">•</span>
              How to clone and set up the application
            </li>
            <li className="flex items-start">
              <span className="text-brand-primary mr-2">•</span>
              How to install and configure requirements
            </li>
            <li className="flex items-start">
              <span className="text-brand-primary mr-2">•</span>
              How to run the frontend and backend
            </li>
            <li className="flex items-start">
              <span className="text-brand-primary mr-2">•</span>
              How to interact with NLP models
            </li>
          </ul>
        </div>
      </div>

      {/* Prerequisites */}
      <div id="prerequisites" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <span className="text-2xl mr-3">🖥️</span>
              System Requirements
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Node.js 16+ and npm</li>
              <li>• Python 3.8+</li>
              <li>• Git</li>
              <li>• 4GB RAM minimum</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <span className="text-2xl mr-3">🛠️</span>
              Recommended Tools
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>• VS Code or similar IDE</li>
              <li>• Postman for API testing</li>
              <li>• Chrome DevTools</li>
              <li>• Terminal/Command Line</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Clone Repository */}
      <div id="clone-repo" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          1. Clone the Repository
        </h3>
        <p className="text-gray-600 mb-4">
          First, clone the repository to your local machine:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            <code>{`git clone https://github.com/ankitpokhrel08/nlp_project.git
cd nlp_project`}</code>
          </pre>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>💡 Tip:</strong> Make sure you have Git installed on your
            system. You can download it from{" "}
            <a
              href="https://git-scm.com/"
              className="text-brand-primary hover:underline"
            >
              git-scm.com
            </a>
          </p>
        </div>
      </div>

      {/* Backend Setup */}
      <div id="backend-setup" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          2. Backend Setup
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Navigate to Backend Directory
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>cd backend</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Create Virtual Environment
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`# Create virtual environment
python -m venv myenv

# Activate virtual environment
# On Windows:
myenv\\Scripts\\activate

# On macOS/Linux:
source myenv/bin/activate`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Install Dependencies
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>pip install -r requirements.txt</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Run Backend Server
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>python app.py</code>
              </pre>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                <strong>✅ Success:</strong> Your backend server is now deployed
                at{" "}
                <code className="bg-green-200 px-2 py-1 rounded">
                  https://nlp_backend.itclub.asmitphuyal.com.np
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frontend Setup */}
      <div id="frontend-setup" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          3. Frontend Setup
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Navigate to Frontend Directory
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`# Open new terminal window/tab
cd frontend`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Install Node Dependencies
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>npm install</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Run Development Server
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>npm run dev</code>
              </pre>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                <strong>✅ Success:</strong> Your frontend application should
                now be running on{" "}
                <code className="bg-green-200 px-2 py-1 rounded">
                  http://localhost:5173
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testing the Application */}
      <div id="testing-app" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          4. Testing the Application
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-3">🌐</span>
              Frontend Testing
            </h4>
            <ol className="space-y-2 text-gray-600">
              <li>
                1. Open browser to{" "}
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  localhost:5173
                </code>
              </li>
              <li>2. Navigate through different pages</li>
              <li>3. Test responsive design</li>
              <li>4. Verify all components load</li>
            </ol>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-3">🔧</span>
              Backend Testing
            </h4>
            <ol className="space-y-2 text-gray-600">
              <li>1. Test API endpoints in Postman</li>
              <li>2. Verify model responses</li>
              <li>3. Check console for errors</li>
              <li>4. Test chat functionality</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div id="troubleshooting" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          5. Troubleshooting
        </h3>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-red-800 mb-2">
              Common Issues
            </h4>
            <ul className="space-y-2 text-red-700 text-sm">
              <li>
                • <strong>Port already in use:</strong> Change port in
                configuration or kill existing process
              </li>
              <li>
                • <strong>Module not found:</strong> Ensure all dependencies are
                installed correctly
              </li>
              <li>
                • <strong>CORS errors:</strong> Check backend CORS configuration
              </li>
              <li>
                • <strong>API not responding:</strong> Verify backend server is
                running
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const DeveloperSection = () => (
    <div className="space-y-12">
      {/* Integration Guide */}
      <div id="integration-guide" className="scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
          Developer Integration Guide
        </h2>
        <div className="bg-gradient-to-r from-brand-secondary/5 to-orange-500/5 border-l-4 border-brand-secondary rounded-r-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            What you'll learn
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-brand-secondary mr-2">•</span>
              How to add new NLP models to the platform
            </li>
            <li className="flex items-start">
              <span className="text-brand-secondary mr-2">•</span>
              How to create API endpoints for your models
            </li>
            <li className="flex items-start">
              <span className="text-brand-secondary mr-2">•</span>
              How to build frontend components for model interaction
            </li>
            <li className="flex items-start">
              <span className="text-brand-secondary mr-2">•</span>
              How to integrate everything seamlessly
            </li>
          </ul>
        </div>
      </div>

      {/* Model Integration */}
      <div id="model-integration" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          1. Adding a New Model
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Model Structure
            </h4>
            <p className="text-gray-600 mb-4">
              Create your model directory in{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                backend/model/
              </code>
              :
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`backend/model/
├── YourModel/
│   ├── app.py              # Flask app for your model
│   ├── main.py             # Model logic and processing
│   ├── requirements.txt    # Model-specific dependencies
│   ├── model_files/        # Your trained model files
│   └── utils/              # Helper functions`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Model Implementation
            </h4>
            <p className="text-gray-600 mb-4">
              Create{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                main.py
              </code>{" "}
              with your model logic:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`class YourModel:
    def __init__(self):
        # Initialize your model
        self.model = self.load_model()
    
    def load_model(self):
        # Load your trained model
        pass
    
    def predict(self, input_text):
        # Process input and return prediction
        result = self.model.predict(input_text)
        return {
            'input': input_text,
            'output': result,
            'confidence': 0.95
        }`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div id="api-endpoints" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          2. Creating API Endpoints
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Flask App Setup
            </h4>
            <p className="text-gray-600 mb-4">
              Create{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                app.py
              </code>{" "}
              in your model directory:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`from flask import Flask, request, jsonify
from flask_cors import CORS
from main import YourModel

app = Flask(__name__)
CORS(app)

# Initialize model
model = YourModel()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_text = data.get('text', '')
        
        if not input_text:
            return jsonify({'error': 'No text provided'}), 400
        
        result = model.predict(input_text)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Main Backend Integration
            </h4>
            <p className="text-gray-600 mb-4">
              Add your model route to the main{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                backend/app.py
              </code>
              :
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`import requests

@app.route('/api/yourmodel', methods=['POST'])
def yourmodel_api():
    try:
        data = request.get_json()
        
        # Forward request to your model service
        response = requests.post(
            'https://nlp_backend.itclub.asmitphuyal.com.np/generate',
            json=data,
            timeout=30
        )
        
        return jsonify(response.json())
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Frontend Integration */}
      <div id="frontend-integration" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          3. Frontend Integration
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Create Model Component
            </h4>
            <p className="text-gray-600 mb-4">
              Create{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                YourModelChat.jsx
              </code>{" "}
              in the components folder:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`import React, { useState } from 'react';
import Section from './Section';
import Header from './Header';
import Footer from './Footer';
import Button from './Button';

const YourModelChat = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/yourmodel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <Section className="min-h-screen pt-32">
        {/* Your model interface */}
      </Section>
      <Footer />
    </>
  );
};

export default YourModelChat;`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Add Route
            </h4>
            <p className="text-gray-600 mb-4">
              Add the route to{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                App.jsx
              </code>
              :
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`import YourModelChat from './components/YourModelChat';

// Add to Routes
<Route path="/yourmodel" element={<YourModelChat />} />`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Add to Benefits Section
            </h4>
            <p className="text-gray-600 mb-4">
              Add your model to the benefits list in{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                constants/index.js
              </code>
              :
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`export const benefits = [
  // ... existing models
  {
    id: "your-model-id",
    title: "Your Model Name",
    text: "Description of what your model does...",
    backgroundUrl: "./src/assets/benefits/card-7.svg",
    iconUrl: yourModelIcon,
    imageUrl: yourModelImage,
  }
];`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* HuggingFace Models */}
      <div id="huggingface-models" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          4. Integrating HuggingFace Models
        </h3>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-lg p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            🤗 HuggingFace Integration
          </h4>
          <p className="text-gray-700">
            HuggingFace provides thousands of pre-trained models that you can
            easily integrate into your NLP platform. This section covers how to
            use transformers library and HuggingFace Hub for model deployment.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Installation & Setup
            </h4>
            <p className="text-gray-600 mb-4">
              First, install the required HuggingFace libraries:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`# Add to your requirements.txt
transformers>=4.21.0
torch>=1.12.0
tokenizers>=0.13.0
datasets>=2.4.0
accelerate>=0.12.0

# Install dependencies
pip install transformers torch tokenizers datasets accelerate`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Model Implementation Example
            </h4>
            <p className="text-gray-600 mb-4">
              Create a HuggingFace model wrapper in your model directory:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline
import torch

class HuggingFaceModel:
    def __init__(self, model_name="distilbert-base-uncased-finetuned-sst-2-english"):
        """
        Initialize HuggingFace model
        Args:
            model_name: Model identifier from HuggingFace Hub
        """
        self.model_name = model_name
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)
        
        # Create pipeline for easier inference
        self.classifier = pipeline(
            "sentiment-analysis", 
            model=self.model, 
            tokenizer=self.tokenizer,
            device=0 if torch.cuda.is_available() else -1
        )
    
    def predict(self, text):
        """
        Predict using HuggingFace model
        """
        try:
            result = self.classifier(text)
            return {
                'input': text,
                'predictions': result,
                'model_name': self.model_name,
                'confidence': result[0]['score'] if result else 0
            }
        except Exception as e:
            return {'error': str(e)}
    
    def batch_predict(self, texts):
        """
        Batch prediction for multiple texts
        """
        try:
            results = self.classifier(texts)
            return {
                'inputs': texts,
                'predictions': results,
                'model_name': self.model_name
            }
        except Exception as e:
            return {'error': str(e)}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Environment Variables & Configuration
            </h4>
            <p className="text-gray-600 mb-4">
              Set up environment variables for HuggingFace authentication:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`# Create .env file in your project root
HUGGINGFACE_API_TOKEN=your_hf_token_here
HF_HOME=/path/to/your/cache/directory

# In your Python code
import os
from huggingface_hub import login

# Login to HuggingFace Hub (optional, for private models)
if os.getenv("HUGGINGFACE_API_TOKEN"):
    login(token=os.getenv("HUGGINGFACE_API_TOKEN"))`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">
              💡 Tips for HuggingFace Integration
            </h4>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li>
                • Use model cards to understand model capabilities and
                limitations
              </li>
              <li>
                • Cache models locally to reduce loading time in production
              </li>
              <li>• Consider using quantized models for faster inference</li>
              <li>
                • Implement proper error handling for model loading failures
              </li>
              <li>• Use batch processing for multiple inputs when possible</li>
              <li>
                • Monitor GPU usage and implement fallback to CPU if needed
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* GitHub Models */}
      <div id="github-models" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          5. Integrating GitHub Models
        </h3>

        <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-gray-600 rounded-r-lg p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            🐙 GitHub Models Integration
          </h4>
          <p className="text-gray-700">
            GitHub provides access to various AI models through GitHub Models
            marketplace. You can integrate these models using GitHub's REST API
            or official SDKs for seamless AI-powered applications.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Setup GitHub Models Access
            </h4>
            <p className="text-gray-600 mb-4">
              First, get access to GitHub Models and set up authentication:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`# Install required packages
pip install requests openai anthropic

# Set up environment variables
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_MODELS_API_URL=https://models.inference.ai.azure.com`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              GitHub Models Implementation
            </h4>
            <p className="text-gray-600 mb-4">
              Create a wrapper class for GitHub Models integration:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`import requests
import json
import os
from typing import Dict, List, Optional

class GitHubModelsClient:
    def __init__(self, token: str = None):
        """
        Initialize GitHub Models client
        Args:
            token: GitHub personal access token
        """
        self.token = token or os.getenv("GITHUB_TOKEN")
        self.base_url = "https://models.inference.ai.azure.com"
        self.headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }
    
    def chat_completion(self, model: str, messages: List[Dict], **kwargs):
        """
        Chat completion using GitHub Models
        Args:
            model: Model identifier (e.g., "gpt-4o", "Meta-Llama-3-8B-Instruct")
            messages: List of message dictionaries
        """
        endpoint = f"{self.base_url}/chat/completions"
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": kwargs.get("temperature", 0.7),
            "max_tokens": kwargs.get("max_tokens", 1000),
            "top_p": kwargs.get("top_p", 1.0)
        }
        
        try:
            response = requests.post(
                endpoint, 
                headers=self.headers, 
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}
    
    def text_completion(self, model: str, prompt: str, **kwargs):
        """
        Text completion for supported models
        """
        endpoint = f"{self.base_url}/completions"
        
        payload = {
            "model": model,
            "prompt": prompt,
            "max_tokens": kwargs.get("max_tokens", 1000),
            "temperature": kwargs.get("temperature", 0.7)
        }
        
        try:
            response = requests.post(
                endpoint, 
                headers=self.headers, 
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}
    
    def embeddings(self, model: str, input_texts: List[str]):
        """
        Generate embeddings using GitHub Models
        """
        endpoint = f"{self.base_url}/embeddings"
        
        payload = {
            "model": model,
            "input": input_texts
        }
        
        try:
            response = requests.post(
                endpoint, 
                headers=self.headers, 
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Flask Integration Example
            </h4>
            <p className="text-gray-600 mb-4">
              Here's how to integrate GitHub Models into your Flask application:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`from flask import Flask, request, jsonify
from github_models_client import GitHubModelsClient

app = Flask(__name__)
github_client = GitHubModelsClient()

@app.route('/api/github-chat', methods=['POST'])
def github_chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        model = data.get('model', 'gpt-4o-mini')
        
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message}
        ]
        
        result = github_client.chat_completion(
            model=model,
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )
        
        if "error" in result:
            return jsonify({"error": result["error"]}), 500
            
        return jsonify({
            "response": result["choices"][0]["message"]["content"],
            "model": model,
            "usage": result.get("usage", {})
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/github-embeddings', methods=['POST'])
def github_embeddings():
    try:
        data = request.get_json()
        texts = data.get('texts', [])
        model = data.get('model', 'text-embedding-3-large')
        
        result = github_client.embeddings(model=model, input_texts=texts)
        
        if "error" in result:
            return jsonify({"error": result["error"]}), 500
            
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-amber-800 mb-3">
              ⚠️ Important Considerations
            </h4>
            <ul className="space-y-2 text-amber-700 text-sm">
              <li>
                • <strong>Rate Limits:</strong> GitHub Models has usage limits,
                implement proper rate limiting
              </li>
              <li>
                • <strong>Authentication:</strong> Keep your GitHub token secure
                and use environment variables
              </li>
              <li>
                • <strong>Model Availability:</strong> Not all models may be
                available in all regions
              </li>
              <li>
                • <strong>Costs:</strong> Monitor usage as some models may have
                associated costs
              </li>
              <li>
                • <strong>Privacy:</strong> Be aware of data privacy
                implications when using external models
              </li>
              <li>
                • <strong>Fallbacks:</strong> Implement fallback mechanisms for
                when models are unavailable
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testing Integration */}
      <div id="testing-integration" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          6. Testing Your Integration
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-3">🧪</span>
              Backend Testing
            </h4>
            <ol className="space-y-2 text-gray-600">
              <li>1. Test model service independently</li>
              <li>2. Test API endpoint with Postman</li>
              <li>3. Verify error handling</li>
              <li>4. Check response format</li>
            </ol>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-3">🎨</span>
              Frontend Testing
            </h4>
            <ol className="space-y-2 text-gray-600">
              <li>1. Test component rendering</li>
              <li>2. Verify API integration</li>
              <li>3. Test responsive design</li>
              <li>4. Check error states</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div id="best-practices" className="scroll-mt-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          7. Best Practices
        </h3>

        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-800 mb-3">
              ✅ Do's
            </h4>
            <ul className="space-y-2 text-green-700">
              <li>• Follow existing code patterns and conventions</li>
              <li>• Add proper error handling and validation</li>
              <li>• Include comprehensive documentation</li>
              <li>• Test thoroughly before integration</li>
              <li>• Use consistent styling with the existing design system</li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-red-800 mb-3">
              ❌ Don'ts
            </h4>
            <ul className="space-y-2 text-red-700">
              <li>• Don't modify core application files unnecessarily</li>
              <li>• Don't hardcode API URLs or configuration</li>
              <li>• Don't skip input validation and sanitization</li>
              <li>• Don't forget to handle loading and error states</li>
              <li>• Don't break existing functionality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <Section className="min-h-screen pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* React-style Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Documentation Guide
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
              Welcome to the NLP Projects Documentation. This documentation
              serves as a comprehensive guide for both general users and
              developers. Whether you’re looking to run our models locally on
              your device or integrate your own models into the platform, you’ll
              find everything you need to get started and go deeper.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Dropdown Navigation */}
            <div className="lg:w-64 lg:sticky lg:top-32 h-fit">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Navigation
                </h3>

                {/* For Users Dropdown */}
                <div className="mb-4">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "users" ? null : "users"
                      )
                    }
                    className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-between"
                  >
                    For Users
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === "users" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {activeDropdown === "users" && (
                    <div className="mt-2 pl-4 space-y-2">
                      <button
                        onClick={() => scrollToSection("quick-start")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Quick Start
                      </button>
                      <button
                        onClick={() => scrollToSection("prerequisites")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Prerequisites
                      </button>
                      <button
                        onClick={() => scrollToSection("clone-repo")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Clone Repository
                      </button>
                      <button
                        onClick={() => scrollToSection("backend-setup")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Backend Setup
                      </button>
                      <button
                        onClick={() => scrollToSection("frontend-setup")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Frontend Setup
                      </button>
                      <button
                        onClick={() => scrollToSection("testing-app")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Testing Application
                      </button>
                    </div>
                  )}
                </div>

                {/* For Developers Dropdown */}
                <div>
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "developers" ? null : "developers"
                      )
                    }
                    className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-between"
                  >
                    For Developers
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === "developers" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {activeDropdown === "developers" && (
                    <div className="mt-2 pl-4 space-y-2">
                      <button
                        onClick={() => scrollToSection("integration-guide")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Integration Guide
                      </button>
                      <button
                        onClick={() => scrollToSection("model-integration")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Model Integration
                      </button>
                      <button
                        onClick={() => scrollToSection("api-endpoints")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        API Endpoints
                      </button>
                      <button
                        onClick={() => scrollToSection("frontend-integration")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Frontend Integration
                      </button>
                      <button
                        onClick={() => scrollToSection("huggingface-models")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        HuggingFace Models
                      </button>
                      <button
                        onClick={() => scrollToSection("github-models")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        GitHub Models
                      </button>
                      <button
                        onClick={() => scrollToSection("testing-integration")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Testing Integration
                      </button>
                      <button
                        onClick={() => scrollToSection("best-practices")}
                        className="block text-left text-sm text-blue-600 hover:text-blue-800 py-1"
                      >
                        Best Practices
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="space-y-16">
                <div id="getting-started">
                  <UserSection />
                </div>
                <div id="setup" className="border-t border-gray-200 pt-16">
                  <DeveloperSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default DocumentationGuide;

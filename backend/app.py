from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables for model and tokenizer
tokenizer = None
model = None

def load_model():
    """Load the model and tokenizer"""
    global tokenizer, model
    try:
        logger.info("Loading NepaliGPT model and tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained("Shushant/thesis_nepaliGPT")
        model = AutoModelForCausalLM.from_pretrained("Shushant/thesis_nepaliGPT")
        
        # Set pad token if not exists
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token
            
        logger.info("Model and tokenizer loaded successfully!")
        return True
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        return False

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "message": "NepaliGPT API is running"
    })

@app.route('/generate', methods=['POST'])
def generate():
    """Generate text using NepaliGPT model"""
    try:
        # Check if model is loaded
        if model is None or tokenizer is None:
            return jsonify({
                "error": "Model not loaded",
                "message": "Please wait for the model to load"
            }), 503

        # Get data from request
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        prompt = data.get("prompt", "")
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        # Optional parameters
        max_length = data.get("max_length", 100)
        temperature = data.get("temperature", 0.7)
        do_sample = data.get("do_sample", True)
        
        logger.info(f"Generating text for prompt: {prompt[:50]}...")

        # Tokenize input
        inputs = tokenizer(
            prompt, 
            return_tensors="pt", 
            padding=True, 
            truncation=True,
            max_length=512
        )

        # Generate text
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_length=max_length,
                temperature=temperature,
                do_sample=do_sample,
                pad_token_id=tokenizer.eos_token_id,
                no_repeat_ngram_size=2,
                early_stopping=True
            )

        # Decode the generated text
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Remove the original prompt from the response to get only the generated part
        response_text = generated_text[len(prompt):].strip()
        
        logger.info("Text generated successfully!")

        return jsonify({
            "prompt": prompt,
            "response": response_text,
            "full_text": generated_text,
            "success": True
        })

    except Exception as e:
        logger.error(f"Error during text generation: {str(e)}")
        return jsonify({
            "error": "Generation failed",
            "message": str(e)
        }), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get information about the loaded model"""
    if model is None or tokenizer is None:
        return jsonify({
            "error": "Model not loaded"
        }), 503
        
    return jsonify({
        "model_name": "Shushant/thesis_nepaliGPT",
        "model_type": "Causal Language Model",
        "description": "A GPT model fine-tuned for Nepali language generation",
        "vocab_size": tokenizer.vocab_size,
        "max_position_embeddings": getattr(model.config, 'max_position_embeddings', 'N/A'),
        "model_loaded": True
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Endpoint not found",
        "message": "The requested endpoint does not exist"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal server error",
        "message": "An unexpected error occurred"
    }), 500

if __name__ == '__main__':
    logger.info("Starting NepaliGPT Flask API...")
    
    # Load model on startup
    if load_model():
        logger.info("Starting Flask server on port 5001...")
        app.run(host='0.0.0.0', port=5001, debug=True)
    else:
        logger.error("Failed to load model. Exiting...")
        exit(1)

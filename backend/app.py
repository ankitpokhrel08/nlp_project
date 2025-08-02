from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch
import logging
import sys
import os
import re

# Add the lemmatizer path to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), 'model', 'NepaliLemmatizer'))

# Add the stemmer path to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), 'model', 'stemmer'))

try:
    from main import lemmatize_word
    lemmatizer_available = True
except ImportError as e:
    logging.warning(f"Could not import lemmatizer: {e}")
    lemmatizer_available = False

try:
    from morph import Morph
    stemmer_available = True
except ImportError as e:
    logging.warning(f"Could not import stemmer: {e}")
    stemmer_available = False

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables for model and tokenizer
tokenizer = None
model = None
ner_pipeline = None
stemmer = None

def load_model():
    """Load the model and tokenizer"""
    global tokenizer, model, ner_pipeline, stemmer
    try:
        logger.info("Loading NepaliGPT model and tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained("Shushant/thesis_nepaliGPT")
        model = AutoModelForCausalLM.from_pretrained("Shushant/thesis_nepaliGPT")
        
        # Set pad token if not exists
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token
            
        logger.info("Model and tokenizer loaded successfully!")
        
        logger.info("Loading NER model...")
        ner_pipeline = pipeline("ner", model="bishaldpande/Ner-xlm-roberta-base")
        logger.info("NER model loaded successfully!")
        
        # Load stemmer
        if stemmer_available:
            logger.info("Loading Stemmer model...")
            try:
                root_file = os.path.join(os.path.dirname(__file__), 'model', 'stemmer', 'files', 'root')
                suffix_file = os.path.join(os.path.dirname(__file__), 'model', 'stemmer', 'files', 'suffix.txt')
                suffix_rule_file = os.path.join(os.path.dirname(__file__), 'model', 'stemmer', 'files', 'suffix_rule.txt')
                
                stemmer = Morph(root_file, suffix_file, suffix_rule_file)
                logger.info("Stemmer model loaded successfully!")
            except Exception as e:
                logger.error(f"Error loading stemmer: {str(e)}")
        
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
        "ner_loaded": ner_pipeline is not None,
        "lemmatizer_loaded": lemmatizer_available,
        "stemmer_loaded": stemmer is not None,
        "message": "NLP Models API is running"
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

@app.route('/ner', methods=['POST'])
def named_entity_recognition():
    """Perform Named Entity Recognition using BERT-based model"""
    try:
        # Check if NER model is loaded
        if ner_pipeline is None:
            return jsonify({
                "error": "NER model not loaded",
                "message": "Please wait for the NER model to load"
            }), 503

        # Get data from request
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        logger.info(f"Performing NER on text: {text[:50]}...")

        # Perform NER
        entities = ner_pipeline(text)
        
        # Format entities for better readability
        formatted_entities = []
        for entity in entities:
            formatted_entities.append({
                "word": entity['word'],
                "entity": entity['entity'],
                "confidence": float(entity['score']),  # Convert numpy float32 to Python float
                "start": int(entity['start']),        # Convert to Python int
                "end": int(entity['end'])              # Convert to Python int
            })
        
        logger.info(f"Found {len(formatted_entities)} entities")

        return jsonify({
            "text": text,
            "entities": formatted_entities,
            "entity_count": len(formatted_entities),
            "success": True
        })

    except Exception as e:
        logger.error(f"Error during NER: {str(e)}")
        return jsonify({
            "error": "NER failed",
            "message": str(e)
        }), 500

@app.route('/lemmatize', methods=['POST'])
def lemmatize():
    """Lemmatize Nepali words using NepaliLemmatizer"""
    try:
        # Check if lemmatizer is available
        if not lemmatizer_available:
            return jsonify({
                "error": "Lemmatizer not available",
                "message": "NepaliLemmatizer could not be loaded"
            }), 503

        # Get data from request
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        logger.info(f"Lemmatizing text: {text[:50]}...")

        # Split text into words and lemmatize each word
        words = text.split()
        lemmatized_words = []
        
        for word in words:
            try:
                lemma = lemmatize_word(word.strip())
                lemmatized_words.append({
                    "original": word,
                    "lemma": lemma
                })
            except Exception as e:
                logger.warning(f"Error lemmatizing word '{word}': {str(e)}")
                # If lemmatization fails for a word, keep the original
                lemmatized_words.append({
                    "original": word,
                    "lemma": word
                })
        
        # Create the lemmatized text
        lemmatized_text = " ".join([item["lemma"] for item in lemmatized_words])
        
        logger.info(f"Lemmatized {len(words)} words successfully!")

        return jsonify({
            "original_text": text,
            "lemmatized_text": lemmatized_text,
            "word_details": lemmatized_words,
            "word_count": len(words),
            "success": True
        })

    except Exception as e:
        logger.error(f"Error during lemmatization: {str(e)}")
        return jsonify({
            "error": "Lemmatization failed",
            "message": str(e)
        }), 500

@app.route('/stemmer', methods=['POST'])
def analyze_stemmer():
    """Analyze Nepali words using morphological analyzer (stemmer)"""
    try:
        # Check if stemmer is loaded
        if stemmer is None:
            return jsonify({
                "error": "Stemmer not loaded",
                "message": "Stemmer model is not available"
            }), 503

        # Get data from request
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400

        logger.info(f"Analyzing text with stemmer: {text[:50]}...")

        # Extract Nepali words from input (remove punctuation and split)
        words = re.findall(r'[\u0900-\u097F]+', text)
        
        if not words:
            return jsonify({
                "error": "No Nepali words found",
                "message": "The input text does not contain any Nepali words"
            }), 400

        analyzed_words = []
        root_count = 0
        
        for word in words:
            word = word.strip()
            if not word:
                continue
                
            word_analysis = {
                'word': word,
                'is_root': False,
                'analyses': []
            }
            
            # Check if the word is directly in the root list
            if word in stemmer.roots:
                word_analysis['is_root'] = True
                pos = stemmer.pos.get(word, "Unknown")
                word_analysis['analyses'].append({
                    'type': 'Root Word',
                    'root': word,
                    'suffix': '',
                    'pos': pos,
                    'rule': ''
                })
                root_count += 1
            
            # Try to find possible roots by removing suffixes
            for suffix in stemmer.suffixes:
                if word.endswith(suffix) and len(word) > len(suffix):
                    potential_root = word[:-len(suffix)]
                    if potential_root in stemmer.roots:
                        pos = stemmer.pos.get(potential_root, "Unknown")
                        rule = stemmer.suffix_rules.get(suffix, "Unknown")
                        word_analysis['analyses'].append({
                            'type': 'Root + Suffix',
                            'root': potential_root,
                            'suffix': suffix,
                            'pos': pos,
                            'rule': rule
                        })
            
            # If no analysis found, mark as unknown
            if not word_analysis['analyses']:
                word_analysis['analyses'].append({
                    'type': 'Unknown',
                    'root': '-',
                    'suffix': '-',
                    'pos': 'Not found',
                    'rule': '-'
                })
            
            analyzed_words.append(word_analysis)

        # Create summary statistics
        analyzed_count = sum(1 for w in analyzed_words if any(a['type'] != 'Unknown' for a in w['analyses']))
        
        logger.info(f"Analyzed {len(words)} words with stemmer successfully!")

        return jsonify({
            "original_text": text,
            "words": analyzed_words,
            "statistics": {
                "total_words": len(words),
                "root_words": root_count,
                "analyzed_words": analyzed_count,
                "unknown_words": len(words) - analyzed_count
            },
            "success": True
        })

    except Exception as e:
        logger.error(f"Error during stemmer analysis: {str(e)}")
        return jsonify({
            "error": "Stemmer analysis failed",
            "message": str(e)
        }), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get information about the loaded models"""
    if model is None or tokenizer is None:
        return jsonify({
            "error": "Models not loaded"
        }), 503
        
    return jsonify({
        "nepali_gpt": {
            "model_name": "Shushant/thesis_nepaliGPT",
            "model_type": "Causal Language Model",
            "description": "A GPT model fine-tuned for Nepali language generation",
            "vocab_size": tokenizer.vocab_size,
            "max_position_embeddings": getattr(model.config, 'max_position_embeddings', 'N/A'),
            "model_loaded": True
        },
        "ner_model": {
            "model_name": "bishaldpande/Ner-xlm-roberta-base",
            "model_type": "Named Entity Recognition",
            "description": "BERT-based model for Named Entity Recognition in Nepali text",
            "model_loaded": ner_pipeline is not None
        },
        "lemmatizer": {
            "model_name": "NepaliLemmatizer",
            "model_type": "Lemmatization",
            "description": "Rule-based lemmatizer for Nepali words",
            "model_loaded": lemmatizer_available
        },
        "stemmer": {
            "model_name": "NepaliStemmer",
            "model_type": "Morphological Analysis",
            "description": "Morphological analyzer for Nepali words to find roots and suffixes",
            "model_loaded": stemmer is not None
        }
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

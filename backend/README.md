# NepaliGPT Flask Backend

This Flask backend provides API endpoints to interact with the NepaliGPT model from Hugging Face.

## Setup Instructions

### 1. Create a Virtual Environment

```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Application

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check

- **GET** `/health`
- Returns the health status of the API and model loading status

### Generate Text

- **POST** `/generate`
- Generate text using the NepaliGPT model

**Request Body:**

```json
{
  "prompt": "Your text prompt here",
  "max_length": 100,
  "temperature": 0.7,
  "do_sample": true
}
```

**Response:**

```json
{
  "prompt": "Your text prompt here",
  "response": "Generated text response",
  "full_text": "Complete generated text including prompt",
  "success": true
}
```

### Model Information

- **GET** `/model-info`
- Returns information about the loaded model

## Usage Examples

### Using curl

```bash
# Health check
curl http://localhost:5000/health

# Generate text
curl -X POST http://localhost:5000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "नमस्ते, म", "max_length": 50}'

# Model info
curl http://localhost:5000/model-info
```

### Using JavaScript (for frontend integration)

```javascript
// Generate text
const response = await fetch("http://localhost:5000/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: "Your prompt here",
    max_length: 100,
    temperature: 0.7,
  }),
});

const data = await response.json();
console.log(data.response);
```

## Model Details

- **Model:** Shushant/thesis_nepaliGPT
- **Type:** Causal Language Model
- **Language:** Nepali
- **Source:** Hugging Face

## Notes

- The model will be downloaded on first run (may take some time)
- CORS is enabled for frontend integration
- The API includes error handling and logging
- Model loading happens on startup for better performance

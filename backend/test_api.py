import requests
import json
import time

# API base URL
BASE_URL = "http://localhost:5001"

def test_health():
    """Test the health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print("Health Check:")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        print("-" * 50)
        return response.status_code == 200
    except Exception as e:
        print(f"Health check failed: {e}")
        return False

def test_generate(prompt="नमस्ते, म"):
    """Test the generate endpoint"""
    try:
        data = {
            "prompt": prompt,
            "max_length": 50,
            "temperature": 0.7,
            "do_sample": True
        }
        
        response = requests.post(
            f"{BASE_URL}/generate",
            headers={"Content-Type": "application/json"},
            json=data
        )
        
        print("Text Generation:")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
        print("-" * 50)
        return response.status_code == 200
    except Exception as e:
        print(f"Generate test failed: {e}")
        return False

def test_model_info():
    """Test the model info endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/model-info")
        print("Model Info:")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        print("-" * 50)
        return response.status_code == 200
    except Exception as e:
        print(f"Model info test failed: {e}")
        return False

def main():
    print("Testing NepaliGPT Flask API...")
    print("=" * 50)
    
    # Wait a bit for server to start if needed
    time.sleep(2)
    
    # Run tests
    health_ok = test_health()
    
    if health_ok:
        model_info_ok = test_model_info()
        generate_ok = test_generate()
        
        # Test with different prompts
        print("Testing with different prompts:")
        test_generate("काठमाडौं एक")
        test_generate("नेपाल एक सुन्दर")
        
        if all([health_ok, model_info_ok, generate_ok]):
            print("✅ All tests passed!")
        else:
            print("❌ Some tests failed!")
    else:
        print("❌ Server is not running or not healthy!")

if __name__ == "__main__":
    main()

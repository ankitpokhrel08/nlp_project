#!/usr/bin/env python3
"""
Test script for Aspect-Based Sentiment Analysis API endpoint
"""
import requests
import json

# Configuration
BASE_URL = "http://localhost:5001"

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed")
            print(f"   Status: {data.get('status')}")
            print(f"   Aspect model loaded: {data.get('aspect_loaded')}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_aspect_analysis(text, description=""):
    """Test aspect analysis with given text"""
    print(f"\n🎯 Testing aspect analysis{f' - {description}' if description else ''}...")
    print(f"   Input: {text}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/aspect",
            json={"text": text},
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Aspect analysis successful!")
            print(f"   Sentences analyzed: {data['statistics']['sentences_analyzed']}")
            print(f"   Total aspects found: {data['statistics']['total_aspects_found']}")
            
            for i, prediction in enumerate(data['predictions'], 1):
                aspects = prediction['aspects']
                if aspects:
                    print(f"   Sentence {i}: \"{prediction['sentence']}\"")
                    print(f"      → Aspects: {', '.join(aspects)}")
                else:
                    print(f"   Sentence {i}: \"{prediction['sentence']}\"")
                    print(f"      → No aspects detected")
            
            return True
        else:
            print(f"❌ Aspect analysis failed: {response.status_code}")
            if response.headers.get('content-type', '').startswith('application/json'):
                error_data = response.json()
                print(f"   Error: {error_data.get('message', 'Unknown error')}")
            return False
            
    except Exception as e:
        print(f"❌ Aspect analysis error: {e}")
        return False

def test_model_info():
    """Test the model info endpoint"""
    print("\n📊 Testing model info...")
    try:
        response = requests.get(f"{BASE_URL}/model-info")
        if response.status_code == 200:
            data = response.json()
            aspect_info = data.get('aspect_model', {})
            print("✅ Model info retrieved successfully!")
            print(f"   Model: {aspect_info.get('model_name')}")
            print(f"   Type: {aspect_info.get('model_type')}")
            print(f"   Supported aspects: {aspect_info.get('aspects')}")
            print(f"   Loaded: {aspect_info.get('model_loaded')}")
            return True
        else:
            print(f"❌ Model info failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Model info error: {e}")
        return False

def test_error_cases():
    """Test error handling"""
    print("\n🚨 Testing error cases...")
    
    # Test empty text
    print("   Testing empty text...")
    response = requests.post(f"{BASE_URL}/aspect", json={"text": ""})
    if response.status_code == 400:
        print("   ✅ Empty text error handling works")
    else:
        print("   ❌ Empty text error handling failed")
    
    # Test missing text field
    print("   Testing missing text field...")
    response = requests.post(f"{BASE_URL}/aspect", json={})
    if response.status_code == 400:
        print("   ✅ Missing text error handling works")
    else:
        print("   ❌ Missing text error handling failed")

def main():
    """Main test function"""
    print("🧪 Starting Aspect-Based Sentiment Analysis API Tests")
    print("=" * 60)
    
    # Test health check first
    if not test_health_check():
        print("\n❌ Health check failed. Make sure the server is running.")
        return
    
    # Test model info
    test_model_info()
    
    # Test cases with various Nepali texts
    test_cases = [
        ("यो सरकारले राम्रो काम गरेको छ।", "Positive feedback"),
        ("नेताहरु भ्रष्ट छन्।", "Negative feedback"),
        ("यो विधेयक खारेज हुनुपर्छ।", "Policy criticism"),
        ("त्यो मान्छेलाई तुरुन्तै कारबाही गरियोस्।", "Call for action"),
        ("राष्ट्रपतिको भाषण प्रभावशाली थियो। यो नीति निकै राम्रो छ।", "Multiple sentences"),
        ("केटाकेटीहरूले राम्रो पढ्नुपर्छ।", "General statement"),
        ("गाली गलौच गर्नु राम्रो होइन।", "Profanity reference"),
        ("हिंसा कहिल्यै समाधान होइन।", "Violence reference")
    ]
    
    # Run test cases
    for text, description in test_cases:
        test_aspect_analysis(text, description)
    
    # Test error cases
    test_error_cases()
    
    print("\n" + "=" * 60)
    print("🎉 Aspect-Based Sentiment Analysis API Tests Completed!")
    print("\n💡 Usage examples:")
    print("   curl -X POST http://localhost:5001/aspect \\")
    print("     -H \"Content-Type: application/json\" \\")
    print("     -d '{\"text\": \"यो सरकारले राम्रो काम गरेको छ।\"}'")

if __name__ == "__main__":
    main()

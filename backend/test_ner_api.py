#!/usr/bin/env python3
"""
Test script for the NER API endpoint
"""

import requests
import json

BASE_URL = "http://localhost:5001"

def test_ner_endpoint():
    """Test the NER endpoint with sample Nepali text"""
    print("Testing NER Endpoint...")
    print("=" * 50)
    
    # Test text with multiple entities
    test_text = "काठमाडौं, पोखरा, लुम्बिनी, चितवन, र मुस्ताङ नेपालका प्रसिद्ध पर्यटकीय स्थलहरू हुन्।"
    
    try:
        response = requests.post(
            f"{BASE_URL}/ner",
            json={"text": test_text},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        data = response.json()
        
        if response.status_code == 200 and data.get("success"):
            print(f"✅ NER successful!")
            print(f"Input text: {data['text']}")
            print(f"Found {data['entity_count']} entities:")
            
            for i, entity in enumerate(data['entities'], 1):
                print(f"  {i}. {entity['word']} ({entity['entity']}) - Confidence: {entity['confidence']}")
        else:
            print(f"❌ NER failed: {data}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_health_check():
    """Test the health check endpoint"""
    print("\nTesting Health Check...")
    print("=" * 50)
    
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
    except Exception as e:
        print(f"❌ Error: {e}")

def test_additional_ner_samples():
    """Test with additional Nepali text samples"""
    print("\nTesting Additional NER Samples...")
    print("=" * 50)
    
    samples = [
        "राम शर्मा काठमाडौं विश्वविद्यालयमा पढ्छन्।",
        "सगरमाथा नेपालको सबैभन्दा अग्लो हिमाल हो।",
        "गौतम बुद्ध लुम्बिनीमा जन्मेका थिए।"
    ]
    
    for i, text in enumerate(samples, 1):
        print(f"\nSample {i}: {text}")
        try:
            response = requests.post(
                f"{BASE_URL}/ner",
                json={"text": text},
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    print(f"  ✅ Found {data['entity_count']} entities:")
                    for entity in data['entities']:
                        print(f"    - {entity['word']} ({entity['entity']})")
                else:
                    print(f"  ❌ Failed: {data}")
            else:
                print(f"  ❌ HTTP Error: {response.status_code}")
                
        except Exception as e:
            print(f"  ❌ Error: {e}")

if __name__ == "__main__":
    print("🧪 Testing NepaliGPT + NER Flask API...")
    print("=" * 60)
    
    test_health_check()
    test_ner_endpoint()
    test_additional_ner_samples()
    
    print("\n" + "=" * 60)
    print("✅ All tests completed!")

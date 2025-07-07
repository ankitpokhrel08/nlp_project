#!/usr/bin/env python3
"""
Test script for the NepaliLemmatizer API endpoint
"""

import requests
import json

# API endpoint
API_URL = "http://localhost:5001/lemmatize"

def test_lemmatizer():
    """Test the lemmatizer endpoint with sample Nepali text"""
    
    # Sample Nepali text for testing
    test_cases = [
        "किताबहरु पढ्दै छु",
        "केटाहरु खेल्दै छन्",
        "घरमा खाना खाइरहेको छ",
        "मान्छेहरु काम गरिरहेका छन्"
    ]
    
    print("Testing NepaliLemmatizer API endpoint...")
    print("=" * 50)
    
    for i, text in enumerate(test_cases, 1):
        print(f"\nTest Case {i}: {text}")
        print("-" * 30)
        
        payload = {
            "text": text
        }
        
        try:
            response = requests.post(API_URL, json=payload, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Original: {data['original_text']}")
                print(f"✅ Lemmatized: {data['lemmatized_text']}")
                print(f"✅ Word Count: {data['word_count']}")
                print("✅ Word Details:")
                for word_detail in data['word_details']:
                    print(f"   '{word_detail['original']}' → '{word_detail['lemma']}'")
            else:
                print(f"❌ Error {response.status_code}: {response.text}")
                
        except requests.exceptions.ConnectionError:
            print("❌ Connection Error: Make sure the Flask server is running on http://localhost:5001")
            return
        except requests.exceptions.RequestException as e:
            print(f"❌ Request Error: {e}")
            return
    
    print("\n" + "=" * 50)
    print("✅ All tests completed!")

if __name__ == "__main__":
    test_lemmatizer()

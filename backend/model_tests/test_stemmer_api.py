#!/usr/bin/env python3
"""
Test script for the Stemmer API endpoint
"""

import requests
import json

# API endpoint
BASE_URL = "http://localhost:5001"
STEMMER_ENDPOINT = f"{BASE_URL}/stemmer"

def test_stemmer_api():
    """Test the stemmer API with sample Nepali text"""
    
    # Test data
    test_cases = [
        {
            "name": "Single word - inflected noun",
            "text": "घरहरू"
        },
        {
            "name": "Single word - verb form",
            "text": "पढ्छु"
        },
        {
            "name": "Multiple words",
            "text": "घरहरू राम्रोलाई पढ्छु"
        },
        {
            "name": "Sentence with mixed words",
            "text": "बच्चाहरूको किताबमा लेखिएको कुरा धेरै राम्रो छ।"
        },
        {
            "name": "Root words",
            "text": "घर किताब राम्रो"
        }
    ]
    
    print("🧪 Testing Stemmer API")
    print("=" * 50)
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n📝 Test {i}: {test_case['name']}")
        print(f"Input: {test_case['text']}")
        print("-" * 30)
        
        try:
            # Make API request
            response = requests.post(
                STEMMER_ENDPOINT,
                json={"text": test_case['text']},
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    print("✅ SUCCESS")
                    print(f"📊 Statistics:")
                    stats = data['statistics']
                    print(f"   Total words: {stats['total_words']}")
                    print(f"   Root words: {stats['root_words']}")
                    print(f"   Analyzed words: {stats['analyzed_words']}")
                    print(f"   Unknown words: {stats['unknown_words']}")
                    
                    print(f"\n🔍 Word Analysis:")
                    for word_data in data['words']:
                        print(f"   Word: '{word_data['word']}'")
                        for analysis in word_data['analyses']:
                            if analysis['type'] == 'Unknown':
                                print(f"      • Type: {analysis['type']}")
                            else:
                                print(f"      • Type: {analysis['type']}")
                                print(f"      • Root: {analysis['root']}")
                                if analysis['suffix']:
                                    print(f"      • Suffix: {analysis['suffix']}")
                                print(f"      • POS: {analysis['pos']}")
                                if analysis['rule'] != "Unknown":
                                    print(f"      • Rule: {analysis['rule']}")
                else:
                    print("❌ API returned success=False")
                    print(f"Error: {data.get('error', 'Unknown error')}")
            else:
                print(f"❌ HTTP Error: {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error: {error_data.get('error', 'Unknown error')}")
                    print(f"Message: {error_data.get('message', 'No message')}")
                except:
                    print(f"Response: {response.text}")
                    
        except requests.exceptions.ConnectionError:
            print("❌ CONNECTION ERROR: Could not connect to the API")
            print("Make sure the Flask server is running on http://localhost:5001")
            return
        except Exception as e:
            print(f"❌ UNEXPECTED ERROR: {str(e)}")

def test_health_check():
    """Test the health check endpoint"""
    print("\n🏥 Testing Health Check")
    print("=" * 30)
    
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print("✅ Health Check Passed")
            print(f"Status: {data['status']}")
            print(f"Stemmer loaded: {data.get('stemmer_loaded', 'Unknown')}")
        else:
            print(f"❌ Health Check Failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health Check Error: {str(e)}")

def test_error_cases():
    """Test error handling"""
    print("\n🚨 Testing Error Cases")
    print("=" * 30)
    
    error_cases = [
        {
            "name": "Empty text",
            "data": {"text": ""}
        },
        {
            "name": "No text field",
            "data": {}
        },
        {
            "name": "Non-Nepali text",
            "data": {"text": "Hello world"}
        }
    ]
    
    for case in error_cases:
        print(f"\n📝 Testing: {case['name']}")
        try:
            response = requests.post(
                STEMMER_ENDPOINT,
                json=case['data'],
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code != 200:
                print(f"✅ Expected error: {response.status_code}")
                error_data = response.json()
                print(f"Error: {error_data.get('error', 'Unknown')}")
            else:
                data = response.json()
                if not data.get('success'):
                    print(f"✅ Expected failure: {data.get('error', 'Unknown')}")
                else:
                    print("⚠️ Unexpected success")
                    
        except Exception as e:
            print(f"❌ Error testing error case: {str(e)}")

if __name__ == "__main__":
    print("🇳🇵 Nepali Stemmer API Test Suite")
    print("=" * 60)
    
    # Test health check first
    test_health_check()
    
    # Test main functionality
    test_stemmer_api()
    
    # Test error handling
    test_error_cases()
    
    print("\n" + "=" * 60)
    print("🏁 Test Suite Complete")

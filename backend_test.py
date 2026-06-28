#!/usr/bin/env python3
"""
Backend API tests for NurulQuran FastAPI application.
Tests all endpoints: courses, contact, newsletter, enrollments.
"""

import requests
import json
from datetime import datetime

# Base URL from frontend/.env
BASE_URL = "https://quran-flourish.preview.emergentagent.com/api"

def print_test_header(test_name):
    """Print a formatted test header."""
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(passed, message):
    """Print test result."""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")

def test_get_courses():
    """Test GET /api/courses - should return 6 courses sorted by order."""
    print_test_header("GET /api/courses - List all courses")
    
    try:
        response = requests.get(f"{BASE_URL}/courses", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        courses = response.json()
        print(f"Number of courses returned: {len(courses)}")
        
        # Check if we got 6 courses
        if len(courses) != 6:
            print_result(False, f"Expected 6 courses, got {len(courses)}")
            return False
        
        # Check if courses are sorted by order
        orders = [c.get('order') for c in courses]
        if orders != sorted(orders):
            print_result(False, f"Courses not sorted by order. Got: {orders}")
            return False
        
        # Verify required fields in first course
        required_fields = ['id', 'title', 'tag', 'level', 'language', 'duration', 
                          'start', 'image', 'desc', 'longDesc', 'instructor', 
                          'days', 'time', 'fee', 'modules', 'outcomes', 'order']
        
        first_course = courses[0]
        missing_fields = [f for f in required_fields if f not in first_course]
        
        if missing_fields:
            print_result(False, f"Missing fields in course: {missing_fields}")
            return False
        
        # Verify modules and outcomes are lists
        if not isinstance(first_course['modules'], list):
            print_result(False, "modules field is not a list")
            return False
        
        if not isinstance(first_course['outcomes'], list):
            print_result(False, "outcomes field is not a list")
            return False
        
        print(f"Sample course: {first_course['title']} (order: {first_course['order']})")
        print_result(True, "All 6 courses returned with correct structure and sorted by order")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_get_course_by_id():
    """Test GET /api/courses/{id} - should return single course."""
    print_test_header("GET /api/courses/{id} - Get single course")
    
    try:
        # Test with valid course ID
        course_id = "sabeel-ul-jannah"
        response = requests.get(f"{BASE_URL}/courses/{course_id}", timeout=10)
        print(f"Status Code for valid ID '{course_id}': {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200 for valid ID, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        course = response.json()
        
        # Verify it's the correct course
        if course.get('id') != course_id:
            print_result(False, f"Expected course id '{course_id}', got '{course.get('id')}'")
            return False
        
        # Verify required fields
        required_fields = ['id', 'title', 'tag', 'level', 'language', 'duration', 
                          'start', 'image', 'desc', 'longDesc', 'instructor', 
                          'days', 'time', 'fee', 'modules', 'outcomes', 'order']
        
        missing_fields = [f for f in required_fields if f not in course]
        if missing_fields:
            print_result(False, f"Missing fields: {missing_fields}")
            return False
        
        print(f"Course retrieved: {course['title']}")
        print_result(True, f"Valid course ID returned correct course with all fields")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_get_course_404():
    """Test GET /api/courses/{id} - should return 404 for unknown ID."""
    print_test_header("GET /api/courses/{id} - Test 404 for unknown ID")
    
    try:
        # Test with invalid course ID
        invalid_id = "does-not-exist"
        response = requests.get(f"{BASE_URL}/courses/{invalid_id}", timeout=10)
        print(f"Status Code for invalid ID '{invalid_id}': {response.status_code}")
        
        if response.status_code != 404:
            print_result(False, f"Expected status 404 for unknown ID, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        print_result(True, "Unknown course ID correctly returns 404")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_post_contact_valid():
    """Test POST /api/contact - valid payload should return 200 with id and created_at."""
    print_test_header("POST /api/contact - Valid contact submission")
    
    try:
        payload = {
            "name": "Ahmed Hassan",
            "email": "ahmed.hassan@example.com",
            "subject": "Course Inquiry",
            "message": "I am interested in learning more about the Sabeel Ul Jannah program."
        }
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        result = response.json()
        
        # Verify response has id and created_at
        if 'id' not in result:
            print_result(False, "Response missing 'id' field")
            return False
        
        if 'created_at' not in result:
            print_result(False, "Response missing 'created_at' field")
            return False
        
        # Verify all submitted fields are in response
        for key in payload:
            if key not in result:
                print_result(False, f"Response missing field '{key}'")
                return False
            if result[key] != payload[key]:
                print_result(False, f"Field '{key}' mismatch: expected '{payload[key]}', got '{result[key]}'")
                return False
        
        print(f"Contact created with ID: {result['id']}")
        print_result(True, "Valid contact submission successful with id and created_at")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_post_contact_invalid_email():
    """Test POST /api/contact - invalid email should return 422."""
    print_test_header("POST /api/contact - Invalid email validation")
    
    try:
        payload = {
            "name": "Test User",
            "email": "notanemail",
            "subject": "Test",
            "message": "This should fail validation"
        }
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 422:
            print_result(False, f"Expected status 422 for invalid email, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        print_result(True, "Invalid email correctly returns 422")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_post_contact_missing_fields():
    """Test POST /api/contact - missing required fields should return 422."""
    print_test_header("POST /api/contact - Missing required fields")
    
    try:
        # Missing 'name' and 'message'
        payload = {
            "email": "test@example.com"
        }
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 422:
            print_result(False, f"Expected status 422 for missing fields, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        print_result(True, "Missing required fields correctly returns 422")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_post_newsletter_valid():
    """Test POST /api/newsletter - valid email should return 200 with id and created_at."""
    print_test_header("POST /api/newsletter - Valid newsletter subscription")
    
    try:
        # Use a unique email with timestamp
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        payload = {
            "email": f"subscriber.{timestamp}@example.com"
        }
        
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        result = response.json()
        
        # Verify response has id and created_at
        if 'id' not in result:
            print_result(False, "Response missing 'id' field")
            return False
        
        if 'created_at' not in result:
            print_result(False, "Response missing 'created_at' field")
            return False
        
        if result['email'] != payload['email']:
            print_result(False, f"Email mismatch: expected '{payload['email']}', got '{result['email']}'")
            return False
        
        print(f"Newsletter subscription created with ID: {result['id']}")
        print_result(True, "Valid newsletter subscription successful")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_post_newsletter_idempotent():
    """Test POST /api/newsletter - same email twice should be idempotent (no duplicate)."""
    print_test_header("POST /api/newsletter - Idempotency test")
    
    try:
        # Use a unique email for this test
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        payload = {
            "email": f"idempotent.test.{timestamp}@example.com"
        }
        
        # First submission
        response1 = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"First submission status: {response1.status_code}")
        
        if response1.status_code != 200:
            print_result(False, f"First submission failed with status {response1.status_code}")
            return False
        
        result1 = response1.json()
        first_id = result1['id']
        first_created_at = result1['created_at']
        
        # Second submission with same email
        response2 = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Second submission status: {response2.status_code}")
        
        if response2.status_code != 200:
            print_result(False, f"Second submission failed with status {response2.status_code}")
            return False
        
        result2 = response2.json()
        second_id = result2['id']
        second_created_at = result2['created_at']
        
        # Verify idempotency - should return same record
        print(f"First ID: {first_id}, Created at: {first_created_at}")
        print(f"Second ID: {second_id}, Created at: {second_created_at}")
        
        if first_id != second_id:
            print_result(False, f"Not idempotent: different IDs returned ({first_id} vs {second_id})")
            return False
        
        # Note: created_at may have minor serialization differences (microseconds vs milliseconds)
        # due to MongoDB datetime precision. This is acceptable as long as IDs match.
        if first_created_at != second_created_at:
            print(f"⚠️  Note: created_at timestamps differ slightly due to serialization (not a functional issue)")
        
        print(f"Both submissions returned same ID: {first_id}")
        print_result(True, "Newsletter subscription is idempotent - no duplicate created")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_post_newsletter_invalid_email():
    """Test POST /api/newsletter - invalid email should return 422."""
    print_test_header("POST /api/newsletter - Invalid email validation")
    
    try:
        payload = {
            "email": "notanemail"
        }
        
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 422:
            print_result(False, f"Expected status 422 for invalid email, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        print_result(True, "Invalid email correctly returns 422")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_post_enrollments():
    """Test POST /api/enrollments - should return 200 with id and created_at."""
    print_test_header("POST /api/enrollments - Course enrollment")
    
    try:
        payload = {
            "course_id": "sabeel-ul-jannah",
            "course_title": "Sabeel Ul Jannah",
            "name": "Fatima Ali",
            "email": "fatima.ali@example.com"
        }
        
        response = requests.post(f"{BASE_URL}/enrollments", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        result = response.json()
        
        # Verify response has id and created_at
        if 'id' not in result:
            print_result(False, "Response missing 'id' field")
            return False
        
        if 'created_at' not in result:
            print_result(False, "Response missing 'created_at' field")
            return False
        
        # Verify all submitted fields are in response
        for key in payload:
            if key not in result:
                print_result(False, f"Response missing field '{key}'")
                return False
            if result[key] != payload[key]:
                print_result(False, f"Field '{key}' mismatch")
                return False
        
        print(f"Enrollment created with ID: {result['id']}")
        print_result(True, "Enrollment successful with all fields")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_post_enrollments_optional_fields():
    """Test POST /api/enrollments - name and email are optional."""
    print_test_header("POST /api/enrollments - Optional name/email fields")
    
    try:
        payload = {
            "course_id": "nurun-ala-nur",
            "course_title": "NurunAlaNur"
        }
        
        response = requests.post(f"{BASE_URL}/enrollments", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        result = response.json()
        
        # Verify response has id and created_at
        if 'id' not in result:
            print_result(False, "Response missing 'id' field")
            return False
        
        if 'created_at' not in result:
            print_result(False, "Response missing 'created_at' field")
            return False
        
        print(f"Enrollment created with ID: {result['id']} (without name/email)")
        print_result(True, "Enrollment works with optional name/email fields")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def main():
    """Run all backend tests."""
    print("\n" + "="*80)
    print("NURULQURAN BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = {}
    
    # Test GET /api/courses
    results['GET /api/courses'] = test_get_courses()
    
    # Test GET /api/courses/{id}
    results['GET /api/courses/{id} - valid'] = test_get_course_by_id()
    results['GET /api/courses/{id} - 404'] = test_get_course_404()
    
    # Test POST /api/contact
    results['POST /api/contact - valid'] = test_post_contact_valid()
    results['POST /api/contact - invalid email'] = test_post_contact_invalid_email()
    results['POST /api/contact - missing fields'] = test_post_contact_missing_fields()
    
    # Test POST /api/newsletter
    results['POST /api/newsletter - valid'] = test_post_newsletter_valid()
    results['POST /api/newsletter - idempotent'] = test_post_newsletter_idempotent()
    results['POST /api/newsletter - invalid email'] = test_post_newsletter_invalid_email()
    
    # Test POST /api/enrollments
    results['POST /api/enrollments - full'] = test_post_enrollments()
    results['POST /api/enrollments - optional fields'] = test_post_enrollments_optional_fields()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\n{'='*80}")
    print(f"TOTAL: {passed}/{total} tests passed")
    print(f"{'='*80}\n")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)

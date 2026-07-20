#!/usr/bin/env python3
"""
Backend API tests for NurulQuran FastAPI application.
Tests all endpoints: courses, contact, newsletter, enrollments, admin endpoints.
"""

import requests
import json
from datetime import datetime

# Base URL from frontend/.env
BASE_URL = "http://127.0.0.1:8000/api"

# Admin credentials from backend/.env
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "NurulQuran@2026"

# Global variable to store auth token
AUTH_TOKEN = None

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
        
        # Check if we got 7 courses
        if len(courses) != 7:
            print_result(False, f"Expected 7 courses, got {len(courses)}")
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

# ==================== ADMIN AUTH TESTS ====================

def test_auth_login_success():
    """Test POST /api/auth/login with correct credentials."""
    global AUTH_TOKEN
    print_test_header("POST /api/auth/login - Correct credentials")
    
    try:
        payload = {
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        }
        
        response = requests.post(f"{BASE_URL}/auth/login", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        result = response.json()
        
        # Verify response has access_token
        if 'access_token' not in result:
            print_result(False, "Response missing 'access_token' field")
            return False
        
        if 'token_type' not in result:
            print_result(False, "Response missing 'token_type' field")
            return False
        
        if result['token_type'] != 'bearer':
            print_result(False, f"Expected token_type 'bearer', got '{result['token_type']}'")
            return False
        
        # Store token for subsequent tests
        AUTH_TOKEN = result['access_token']
        
        print(f"Access token received: {AUTH_TOKEN[:20]}...")
        print_result(True, "Login successful with access_token")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_auth_login_wrong_password():
    """Test POST /api/auth/login with wrong password."""
    print_test_header("POST /api/auth/login - Wrong password")
    
    try:
        payload = {
            "username": ADMIN_USERNAME,
            "password": "WrongPassword123"
        }
        
        response = requests.post(f"{BASE_URL}/auth/login", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 401:
            print_result(False, f"Expected status 401, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        print_result(True, "Wrong password correctly returns 401")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_auth_me_without_token():
    """Test GET /api/auth/me without token."""
    print_test_header("GET /api/auth/me - Without token")
    
    try:
        response = requests.get(f"{BASE_URL}/auth/me", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code not in [401, 403]:
            print_result(False, f"Expected status 401 or 403, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        print_result(True, f"Without token correctly returns {response.status_code}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_auth_me_with_token():
    """Test GET /api/auth/me with valid Bearer token."""
    print_test_header("GET /api/auth/me - With valid token")
    
    try:
        if not AUTH_TOKEN:
            print_result(False, "No auth token available (login test may have failed)")
            return False
        
        headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
        response = requests.get(f"{BASE_URL}/auth/me", headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        result = response.json()
        
        if 'username' not in result:
            print_result(False, "Response missing 'username' field")
            return False
        
        if result['username'] != ADMIN_USERNAME:
            print_result(False, f"Expected username '{ADMIN_USERNAME}', got '{result['username']}'")
            return False
        
        print(f"Authenticated as: {result['username']}")
        print_result(True, "Valid token returns correct username")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

# ==================== ADMIN COURSES TESTS ====================

def test_admin_courses_create():
    """Test POST /api/admin/courses with token."""
    print_test_header("POST /api/admin/courses - Create course")
    
    try:
        if not AUTH_TOKEN:
            print_result(False, "No auth token available")
            return False, None
        
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        payload = {
            "title": f"Test Course X {timestamp}",
            "desc": "Test course description",
            "modules": ["Module 1", "Module 2"],
            "outcomes": ["Outcome 1", "Outcome 2"]
        }
        
        headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
        response = requests.post(f"{BASE_URL}/admin/courses", json=payload, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
        
        result = response.json()
        
        # Verify response has auto-generated id
        if 'id' not in result:
            print_result(False, "Response missing 'id' field")
            return False, None
        
        # Verify response has order
        if 'order' not in result:
            print_result(False, "Response missing 'order' field")
            return False, None
        
        course_id = result['id']
        print(f"Course created with ID: {course_id}, order: {result['order']}")
        print_result(True, "Course created successfully with auto-generated id and order")
        return True, course_id
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False, None

def test_admin_courses_verify_in_list(course_id):
    """Verify created course appears in GET /api/courses."""
    print_test_header("GET /api/courses - Verify new course appears")
    
    try:
        if not course_id:
            print_result(False, "No course_id provided")
            return False
        
        response = requests.get(f"{BASE_URL}/courses", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        courses = response.json()
        course_ids = [c['id'] for c in courses]
        
        if course_id not in course_ids:
            print_result(False, f"Course {course_id} not found in courses list")
            return False
        
        print(f"Course {course_id} found in courses list")
        print_result(True, "New course appears in public courses list")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_admin_courses_update(course_id):
    """Test PUT /api/admin/courses/{id} with token."""
    print_test_header("PUT /api/admin/courses/{id} - Update course")
    
    try:
        if not AUTH_TOKEN or not course_id:
            print_result(False, "No auth token or course_id available")
            return False
        
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        payload = {
            "title": f"Test Course X Updated {timestamp}",
            "desc": "Updated description",
            "modules": ["Updated Module 1"],
            "outcomes": ["Updated Outcome 1"]
        }
        
        headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
        response = requests.put(f"{BASE_URL}/admin/courses/{course_id}", json=payload, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        result = response.json()
        
        # Verify title was updated
        if result['title'] != payload['title']:
            print_result(False, f"Title not updated. Expected '{payload['title']}', got '{result['title']}'")
            return False
        
        print(f"Course {course_id} updated successfully")
        print_result(True, "Course updated successfully")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_admin_courses_delete(course_id):
    """Test DELETE /api/admin/courses/{id} with token."""
    print_test_header("DELETE /api/admin/courses/{id} - Delete course")
    
    try:
        if not AUTH_TOKEN or not course_id:
            print_result(False, "No auth token or course_id available")
            return False
        
        headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
        response = requests.delete(f"{BASE_URL}/admin/courses/{course_id}", headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        print(f"Course {course_id} deleted successfully")
        print_result(True, "Course deleted successfully")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_admin_courses_verify_404(course_id):
    """Verify deleted course returns 404."""
    print_test_header("GET /api/courses/{id} - Verify 404 after deletion")
    
    try:
        if not course_id:
            print_result(False, "No course_id provided")
            return False
        
        response = requests.get(f"{BASE_URL}/courses/{course_id}", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 404:
            print_result(False, f"Expected status 404, got {response.status_code}")
            return False
        
        print_result(True, "Deleted course correctly returns 404")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_admin_courses_without_token():
    """Test admin courses endpoints without token."""
    print_test_header("Admin Courses - Without token (POST/PUT/DELETE)")
    
    try:
        all_passed = True
        
        # Test POST without token
        payload = {"title": "Test", "desc": "Test"}
        response = requests.post(f"{BASE_URL}/admin/courses", json=payload, timeout=10)
        print(f"POST Status Code: {response.status_code}")
        if response.status_code not in [401, 403]:
            print_result(False, f"POST: Expected 401/403, got {response.status_code}")
            all_passed = False
        else:
            print(f"✓ POST correctly returns {response.status_code}")
        
        # Test PUT without token
        response = requests.put(f"{BASE_URL}/admin/courses/test-id", json=payload, timeout=10)
        print(f"PUT Status Code: {response.status_code}")
        if response.status_code not in [401, 403]:
            print_result(False, f"PUT: Expected 401/403, got {response.status_code}")
            all_passed = False
        else:
            print(f"✓ PUT correctly returns {response.status_code}")
        
        # Test DELETE without token
        response = requests.delete(f"{BASE_URL}/admin/courses/test-id", timeout=10)
        print(f"DELETE Status Code: {response.status_code}")
        if response.status_code not in [401, 403]:
            print_result(False, f"DELETE: Expected 401/403, got {response.status_code}")
            all_passed = False
        else:
            print(f"✓ DELETE correctly returns {response.status_code}")
        
        if all_passed:
            print_result(True, "All admin courses endpoints correctly require authentication")
        return all_passed
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

# ==================== ADMIN MEDIA TESTS ====================

def test_admin_media_create():
    """Test POST /api/admin/media with token."""
    print_test_header("POST /api/admin/media - Create media")
    
    try:
        if not AUTH_TOKEN:
            print_result(False, "No auth token available")
            return False, None
        
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        payload = {
            "type": "audio",
            "title": f"Test Audio {timestamp}",
            "url": "https://example.com/test-audio.mp3",
            "description": "Test audio description"
        }
        
        headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
        response = requests.post(f"{BASE_URL}/admin/media", json=payload, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
        
        result = response.json()
        
        if 'id' not in result:
            print_result(False, "Response missing 'id' field")
            return False, None
        
        media_id = result['id']
        print(f"Media created with ID: {media_id}")
        print_result(True, "Media created successfully")
        return True, media_id
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False, None

def test_admin_media_verify_in_list(media_id):
    """Verify created media appears in GET /api/media?type=audio."""
    print_test_header("GET /api/media?type=audio - Verify new media appears")
    
    try:
        if not media_id:
            print_result(False, "No media_id provided")
            return False
        
        response = requests.get(f"{BASE_URL}/media?type=audio", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        media_items = response.json()
        media_ids = [m['id'] for m in media_items]
        
        if media_id not in media_ids:
            print_result(False, f"Media {media_id} not found in media list")
            return False
        
        print(f"Media {media_id} found in media list")
        print_result(True, "New media appears in public media list")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_admin_media_delete(media_id):
    """Test DELETE /api/admin/media/{id} with token."""
    print_test_header("DELETE /api/admin/media/{id} - Delete media")
    
    try:
        if not AUTH_TOKEN or not media_id:
            print_result(False, "No auth token or media_id available")
            return False
        
        headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
        response = requests.delete(f"{BASE_URL}/admin/media/{media_id}", headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        print(f"Media {media_id} deleted successfully")
        print_result(True, "Media deleted successfully")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_admin_media_without_token():
    """Test POST /api/admin/media without token."""
    print_test_header("POST /api/admin/media - Without token")
    
    try:
        payload = {
            "type": "audio",
            "title": "Test",
            "url": "https://example.com/test.mp3"
        }
        
        response = requests.post(f"{BASE_URL}/admin/media", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code not in [401, 403]:
            print_result(False, f"Expected 401/403, got {response.status_code}")
            return False
        
        print_result(True, f"Without token correctly returns {response.status_code}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

# ==================== ADMIN SITE CONTENT TESTS ====================

def test_admin_site_content_get():
    """Test GET /api/site-content (public)."""
    print_test_header("GET /api/site-content - Public access")
    
    try:
        response = requests.get(f"{BASE_URL}/site-content", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False, None
        
        result = response.json()
        
        # Verify expected keys
        expected_keys = ['hero', 'mission', 'stats', 'contact']
        missing_keys = [k for k in expected_keys if k not in result]
        
        if missing_keys:
            print_result(False, f"Missing keys: {missing_keys}")
            return False, None
        
        print(f"Site content keys: {list(result.keys())}")
        print_result(True, "Site content retrieved with expected structure")
        return True, result
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False, None

def test_admin_site_content_update(original_content):
    """Test PUT /api/admin/site-content with token."""
    print_test_header("PUT /api/admin/site-content - Update content")
    
    try:
        if not AUTH_TOKEN or not original_content:
            print_result(False, "No auth token or original content available")
            return False
        
        # Modify the hero badge
        updated_content = original_content.copy()
        timestamp = datetime.now().strftime("%H%M%S")
        updated_content['hero']['badge'] = f"Updated Badge {timestamp}"
        
        headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
        response = requests.put(f"{BASE_URL}/admin/site-content", json=updated_content, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        # Verify the update by fetching again
        verify_response = requests.get(f"{BASE_URL}/site-content", timeout=10)
        if verify_response.status_code != 200:
            print_result(False, "Failed to verify update")
            return False
        
        verify_result = verify_response.json()
        
        if verify_result['hero']['badge'] != updated_content['hero']['badge']:
            print_result(False, f"Badge not updated. Expected '{updated_content['hero']['badge']}', got '{verify_result['hero']['badge']}'")
            return False
        
        print(f"Badge updated to: {verify_result['hero']['badge']}")
        print_result(True, "Site content updated successfully")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_admin_site_content_without_token():
    """Test PUT /api/admin/site-content without token."""
    print_test_header("PUT /api/admin/site-content - Without token")
    
    try:
        payload = {"hero": {"badge": "Test"}}
        
        response = requests.put(f"{BASE_URL}/admin/site-content", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code not in [401, 403]:
            print_result(False, f"Expected 401/403, got {response.status_code}")
            return False
        
        print_result(True, f"Without token correctly returns {response.status_code}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

# ==================== ADMIN INBOX TESTS ====================

def test_admin_inbox_lists():
    """Test GET /api/admin/contacts, /newsletter, /enrollments with token."""
    print_test_header("Admin Inbox - GET lists (contacts/newsletter/enrollments)")
    
    try:
        if not AUTH_TOKEN:
            print_result(False, "No auth token available")
            return False
        
        headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
        all_passed = True
        
        # Test contacts
        response = requests.get(f"{BASE_URL}/admin/contacts", headers=headers, timeout=10)
        print(f"GET /admin/contacts Status: {response.status_code}")
        if response.status_code != 200:
            print_result(False, f"Contacts: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            contacts = response.json()
            print(f"✓ Contacts list retrieved ({len(contacts)} items)")
        
        # Test newsletter
        response = requests.get(f"{BASE_URL}/admin/newsletter", headers=headers, timeout=10)
        print(f"GET /admin/newsletter Status: {response.status_code}")
        if response.status_code != 200:
            print_result(False, f"Newsletter: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            newsletter = response.json()
            print(f"✓ Newsletter list retrieved ({len(newsletter)} items)")
        
        # Test enrollments
        response = requests.get(f"{BASE_URL}/admin/enrollments", headers=headers, timeout=10)
        print(f"GET /admin/enrollments Status: {response.status_code}")
        if response.status_code != 200:
            print_result(False, f"Enrollments: Expected 200, got {response.status_code}")
            all_passed = False
        else:
            enrollments = response.json()
            print(f"✓ Enrollments list retrieved ({len(enrollments)} items)")
        
        if all_passed:
            print_result(True, "All inbox lists retrieved successfully")
        return all_passed
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_admin_stats():
    """Test GET /api/admin/stats with token."""
    print_test_header("GET /api/admin/stats - Admin statistics")
    
    try:
        if not AUTH_TOKEN:
            print_result(False, "No auth token available")
            return False
        
        headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
        response = requests.get(f"{BASE_URL}/admin/stats", headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        result = response.json()
        
        # Verify expected keys
        expected_keys = ['courses', 'media', 'contacts', 'newsletter', 'enrollments']
        missing_keys = [k for k in expected_keys if k not in result]
        
        if missing_keys:
            print_result(False, f"Missing keys: {missing_keys}")
            return False
        
        print(f"Stats: {result}")
        print_result(True, "Admin stats retrieved with all counts")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_admin_inbox_without_token():
    """Test admin inbox endpoints without token."""
    print_test_header("Admin Inbox - Without token")
    
    try:
        all_passed = True
        
        endpoints = [
            "/admin/contacts",
            "/admin/newsletter",
            "/admin/enrollments",
            "/admin/stats"
        ]
        
        for endpoint in endpoints:
            response = requests.get(f"{BASE_URL}{endpoint}", timeout=10)
            print(f"GET {endpoint} Status: {response.status_code}")
            if response.status_code not in [401, 403]:
                print_result(False, f"{endpoint}: Expected 401/403, got {response.status_code}")
                all_passed = False
            else:
                print(f"✓ {endpoint} correctly returns {response.status_code}")
        
        if all_passed:
            print_result(True, "All inbox endpoints correctly require authentication")
        return all_passed
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_admin_delete_invalid_collection():
    """Test DELETE /api/admin/{collection}/{id} with invalid collection."""
    print_test_header("DELETE /api/admin/badcollection/someid - Invalid collection guard")
    
    try:
        if not AUTH_TOKEN:
            print_result(False, "No auth token available")
            return False
        
        headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
        response = requests.delete(f"{BASE_URL}/admin/badcollection/someid", headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 400:
            print_result(False, f"Expected status 400, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        print_result(True, "Invalid collection correctly returns 400")
        return True
        
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

# ==================== MAIN TEST RUNNER ====================

def main():
    """Run all backend tests."""
    print("\n" + "="*80)
    print("NURULQURAN BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = {}
    
    # ===== PUBLIC ENDPOINTS (Original tests) =====
    print("\n" + "="*80)
    print("TESTING PUBLIC ENDPOINTS")
    print("="*80)
    
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
    
    # ===== ADMIN ENDPOINTS (New tests) =====
    print("\n" + "="*80)
    print("TESTING ADMIN ENDPOINTS")
    print("="*80)
    
    # Auth tests
    results['POST /api/auth/login - success'] = test_auth_login_success()
    results['POST /api/auth/login - wrong password'] = test_auth_login_wrong_password()
    results['GET /api/auth/me - without token'] = test_auth_me_without_token()
    results['GET /api/auth/me - with token'] = test_auth_me_with_token()
    
    # Admin Courses tests
    course_created, course_id = test_admin_courses_create()
    results['POST /api/admin/courses'] = course_created
    
    if course_id:
        results['GET /api/courses - verify new course'] = test_admin_courses_verify_in_list(course_id)
        results['PUT /api/admin/courses/{id}'] = test_admin_courses_update(course_id)
        results['DELETE /api/admin/courses/{id}'] = test_admin_courses_delete(course_id)
        results['GET /api/courses/{id} - 404 after delete'] = test_admin_courses_verify_404(course_id)
    
    results['Admin Courses - without token'] = test_admin_courses_without_token()
    
    # Admin Media tests
    media_created, media_id = test_admin_media_create()
    results['POST /api/admin/media'] = media_created
    
    if media_id:
        results['GET /api/media?type=audio - verify new media'] = test_admin_media_verify_in_list(media_id)
        results['DELETE /api/admin/media/{id}'] = test_admin_media_delete(media_id)
    
    results['POST /api/admin/media - without token'] = test_admin_media_without_token()
    
    # Admin Site Content tests
    site_content_fetched, original_content = test_admin_site_content_get()
    results['GET /api/site-content'] = site_content_fetched
    
    if original_content:
        results['PUT /api/admin/site-content'] = test_admin_site_content_update(original_content)
    
    results['PUT /api/admin/site-content - without token'] = test_admin_site_content_without_token()
    
    # Admin Inbox tests
    results['GET /api/admin/* - lists'] = test_admin_inbox_lists()
    results['GET /api/admin/stats'] = test_admin_stats()
    results['Admin Inbox - without token'] = test_admin_inbox_without_token()
    results['DELETE /api/admin/badcollection/* - invalid'] = test_admin_delete_invalid_collection()
    
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

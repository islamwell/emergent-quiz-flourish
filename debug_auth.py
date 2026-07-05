#!/usr/bin/env python3
"""Debug auth issue."""

import requests
import json

BASE_URL = "https://arab-fluency-1.preview.emergentagent.com/api"

# Test 1: Login with correct credentials
print("=" * 80)
print("Test 1: Login with admin/NurulQuran@2026")
print("=" * 80)

payload = {
    "username": "admin",
    "password": "NurulQuran@2026"
}

print(f"Payload: {json.dumps(payload, indent=2)}")

response = requests.post(f"{BASE_URL}/auth/login", json=payload, timeout=10)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
print(f"Response Headers: {dict(response.headers)}")

# Test 2: Check what the backend env has
print("\n" + "=" * 80)
print("Test 2: Check backend environment")
print("=" * 80)

import os
import sys
sys.path.insert(0, '/app/backend')

from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path('/app/backend')
load_dotenv(ROOT_DIR / '.env')

print(f"ADMIN_USERNAME from env: {repr(os.environ.get('ADMIN_USERNAME'))}")
print(f"ADMIN_PASSWORD from env: {repr(os.environ.get('ADMIN_PASSWORD'))}")

# Test 3: Test the verify_credentials function directly
print("\n" + "=" * 80)
print("Test 3: Test verify_credentials function directly")
print("=" * 80)

from auth import verify_credentials, ADMIN_USERNAME, ADMIN_PASSWORD

print(f"ADMIN_USERNAME in auth.py: {repr(ADMIN_USERNAME)}")
print(f"ADMIN_PASSWORD in auth.py: {repr(ADMIN_PASSWORD)}")

test_username = "admin"
test_password = "NurulQuran@2026"

print(f"\nTesting with username='{test_username}', password='{test_password}'")
result = verify_credentials(test_username, test_password)
print(f"verify_credentials result: {result}")

print(f"\nComparison:")
print(f"  test_username == ADMIN_USERNAME: {test_username == ADMIN_USERNAME}")
print(f"  test_password == ADMIN_PASSWORD: {test_password == ADMIN_PASSWORD}")
print(f"  len(test_username): {len(test_username)}, len(ADMIN_USERNAME): {len(ADMIN_USERNAME)}")
print(f"  len(test_password): {len(test_password)}, len(ADMIN_PASSWORD): {len(ADMIN_PASSWORD)}")

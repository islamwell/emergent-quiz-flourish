#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Total redesign of nurulquran.com with nature theme (clouds, waterfalls, greenery, no people/faces/animals), modern 2026 look. Added multiple pages and now a backend for courses, contact, newsletter, and enrollment interest."

backend:
  - task: "GET /api/courses - list seeded courses"
    implemented: true
    working: true
    file: "backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: true
        -agent: "main"
        -comment: "Returns courses sorted by order. Seeded 6 courses on startup from seed_data.py."
        -working: true
        -agent: "testing"
        -comment: "✅ TESTED: Returns 6 courses sorted by order (1-6). All required fields present (id, title, tag, level, language, duration, start, image, desc, longDesc, instructor, days, time, fee, modules[], outcomes[], order). Verified modules and outcomes are arrays."
  - task: "GET /api/courses/{id} - single course + 404"
    implemented: true
    working: true
    file: "backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: true
        -agent: "main"
        -comment: "Returns full course detail incl modules/outcomes. Should 404 on unknown id."
        -working: true
        -agent: "testing"
        -comment: "✅ TESTED: Valid ID 'sabeel-ul-jannah' returns full course object with all fields. Unknown ID 'does-not-exist' correctly returns HTTP 404."
  - task: "POST /api/contact - persist contact message"
    implemented: true
    working: true
    file: "backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: true
        -agent: "main"
        -comment: "Validates email (EmailStr), requires name+message, stores in contacts collection."
        -working: true
        -agent: "testing"
        -comment: "✅ TESTED: Valid payload returns 200 with id + created_at and persists data. Invalid email 'notanemail' returns 422. Missing required fields (name/message) returns 422."
  - task: "POST /api/newsletter - subscribe (idempotent on email)"
    implemented: true
    working: true
    file: "backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        -working: true
        -agent: "main"
        -comment: "Idempotent: same email returns existing record, no duplicates."
        -working: true
        -agent: "testing"
        -comment: "✅ TESTED: Valid email returns 200 with id + created_at. IDEMPOTENCY VERIFIED: posting same email twice returns same ID (no duplicate created). Invalid email returns 422. Minor: created_at timestamps have slight serialization differences (microseconds vs milliseconds) due to MongoDB datetime precision - not a functional issue."
  - task: "POST /api/enrollments - record course interest"
    implemented: true
    working: true
    file: "backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Stores course_id + course_title (name/email optional) in enrollments collection."
        -working: true
        -agent: "testing"
        -comment: "✅ TESTED: Returns 200 with id + created_at. Verified with full payload (course_id, course_title, name, email) and minimal payload (only course_id, course_title). Optional name/email fields work correctly."

frontend:
  - task: "Frontend integration with backend APIs"
    implemented: true
    working: "NA"
    file: "frontend/src/lib/api.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Courses/CourseDetail fetch from API; CTA newsletter, Contact form, enroll button POST to API. Not yet UI-tested (awaiting user permission)."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    -agent: "main"
    -message: "Backend implemented with FastAPI + MongoDB. 6 courses seeded on startup. Please test all 5 API endpoints including validation (invalid email on contact/newsletter should 422), 404 on unknown course id, and newsletter idempotency. Do NOT test frontend yet."
    -agent: "testing"
    -message: "✅ ALL BACKEND TESTS PASSED (11/11). Tested all 5 API endpoints with comprehensive test cases: GET /api/courses (6 courses sorted), GET /api/courses/{id} (valid + 404), POST /api/contact (valid + validation errors), POST /api/newsletter (valid + idempotency + validation), POST /api/enrollments (full + optional fields). All endpoints working correctly. Minor note: newsletter idempotency has slight created_at serialization differences (MongoDB datetime precision) but functionally correct (same ID returned, no duplicates). Backend is production-ready."

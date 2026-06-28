# NurulQuran — Backend Integration Contracts

## Goal
Replace mocked data with a real FastAPI + MongoDB backend for courses, and persist
contact messages, newsletter signups, and course enrollment interest.

## Currently Mocked (in /app/frontend/src/mock.js)
- `courses` + `courseExtras` → move to backend `courses` collection
- Contact form submit (toast only) → POST to backend
- Newsletter/CTA email submit (toast only) → POST to backend
- Course "Enroll Now" button (toast only) → POST to backend

Kept in frontend (static/presentational, NOT moved): `images`, `navLinks`, `subjects`,
`stats`, `approachSteps`, `testimonials`, `resources`, `ayah`, `footer`, `aboutValues`,
`milestones`, `kidsFeatures`, `kidsLevels`, `readingMaterial`, `faqs`.
Note: `images` map (key → URL) stays in frontend; backend course stores the image KEY.

## API Contracts (all prefixed with /api)

### Courses
- `GET /api/courses` → `[ Course ]` (sorted by `order`)
- `GET /api/courses/{id}` → `Course` (404 if not found)

Course shape:
```
{ id, title, tag, level, language, duration, start, image, desc,
  longDesc, instructor, days, time, fee, modules:[str], outcomes:[str], order }
```

### Contact
- `POST /api/contact` body `{ name, email, subject?, message }` → `{ id, ...,, created_at }`

### Newsletter
- `POST /api/newsletter` body `{ email }` → `{ id, email, created_at }` (idempotent on email)

### Enrollment interest
- `POST /api/enrollments` body `{ course_id, course_title, name?, email? }`
  → `{ id, ..., created_at }`

## Seeding
On startup, if `courses` collection is empty, seed it from a hardcoded list in
`backend/seed_data.py` (mirrors current mock.js content).

## Frontend Integration Plan
- Add `src/lib/api.js` axios helper using `REACT_APP_BACKEND_URL` + `/api`.
- `FeaturedCourses.jsx` (home) and `Courses.jsx`: fetch `GET /api/courses` (loading state).
- `CourseDetail.jsx`: fetch `GET /api/courses/{id}`; enroll button → `POST /api/enrollments`.
- `CTA.jsx`: newsletter → `POST /api/newsletter`.
- `Contact.jsx`: form → `POST /api/contact`.
- Remove `courses`/`courseExtras` usage from these components (keep mock.js exports
  harmless; other components still use mock.js). Keep `images` import for URL mapping.
- Graceful error toasts on failure.

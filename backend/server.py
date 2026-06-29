from fastapi import FastAPI, APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Any, Dict
import uuid
from datetime import datetime, timezone

from seed_data import COURSES_SEED
from site_content import DEFAULT_SITE_CONTENT
from auth import verify_credentials, create_access_token, get_current_admin

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="NurulQuran API")
api_router = APIRouter(prefix="/api")


# ---------------------- Models ----------------------
class Course(BaseModel):
    id: str
    title: str
    tag: str
    level: str
    language: str
    duration: str
    start: str
    image: str
    desc: str
    longDesc: str = ""
    instructor: str = ""
    days: str = ""
    time: str = ""
    fee: str = ""
    modules: List[str] = []
    outcomes: List[str] = []
    order: int = 0


class CourseInput(BaseModel):
    title: str
    tag: str = "Course"
    level: str = "All Levels"
    language: str = "English"
    duration: str = ""
    start: str = ""
    image: str = ""
    desc: str = ""
    longDesc: str = ""
    instructor: str = ""
    days: str = ""
    time: str = ""
    fee: str = ""
    modules: List[str] = []
    outcomes: List[str] = []
    order: Optional[int] = None


class LoginRequest(BaseModel):
    username: str
    password: str


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str


class ContactMessage(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterSignup(NewsletterCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class EnrollmentCreate(BaseModel):
    course_id: str
    course_title: str
    name: Optional[str] = ""
    email: Optional[str] = ""


class Enrollment(EnrollmentCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class MediaInput(BaseModel):
    type: str  # "image" | "audio"
    title: str
    url: str
    description: Optional[str] = ""


class MediaItem(MediaInput):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


def slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or str(uuid.uuid4())[:8]


# ---------------------- Public Routes ----------------------
@api_router.get("/")
async def root():
    return {"message": "NurulQuran API is running"}


@api_router.get("/courses", response_model=List[Course])
async def get_courses():
    courses = await db.courses.find({}, {"_id": 0}).sort("order", 1).to_list(200)
    return [Course(**c) for c in courses]


@api_router.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    course = await db.courses.find_one({"id": course_id}, {"_id": 0})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return Course(**course)


@api_router.get("/site-content")
async def get_site_content():
    doc = await db.site_content.find_one({"key": "main"}, {"_id": 0})
    return doc or DEFAULT_SITE_CONTENT


@api_router.get("/media", response_model=List[MediaItem])
async def get_media(type: Optional[str] = None):
    query = {"type": type} if type else {}
    items = await db.media.find(query, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [MediaItem(**m) for m in items]


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.dict())
    await db.contacts.insert_one(msg.dict())
    return msg


@api_router.post("/newsletter", response_model=NewsletterSignup)
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": payload.email}, {"_id": 0})
    if existing:
        return NewsletterSignup(**existing)
    signup = NewsletterSignup(**payload.dict())
    await db.newsletter.insert_one(signup.dict())
    return signup


@api_router.post("/enrollments", response_model=Enrollment)
async def create_enrollment(payload: EnrollmentCreate):
    enrollment = Enrollment(**payload.dict())
    await db.enrollments.insert_one(enrollment.dict())
    return enrollment


# ---------------------- Auth ----------------------
@api_router.post("/auth/login")
async def login(payload: LoginRequest):
    if not verify_credentials(payload.username, payload.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_access_token(payload.username)
    return {"access_token": token, "token_type": "bearer", "username": payload.username}


@api_router.get("/auth/me")
async def me(admin: str = Depends(get_current_admin)):
    return {"username": admin}


# ---------------------- Admin: Courses ----------------------
@api_router.post("/admin/courses", response_model=Course)
async def create_course(payload: CourseInput, admin: str = Depends(get_current_admin)):
    data = payload.dict()
    course_id = slugify(data["title"])
    if await db.courses.find_one({"id": course_id}):
        course_id = f"{course_id}-{str(uuid.uuid4())[:4]}"
    if data.get("order") is None:
        last = await db.courses.find_one({}, sort=[("order", -1)])
        data["order"] = (last["order"] + 1) if last else 1
    course = Course(id=course_id, **data)
    await db.courses.insert_one(course.dict())
    return course


@api_router.put("/admin/courses/{course_id}", response_model=Course)
async def update_course(course_id: str, payload: CourseInput, admin: str = Depends(get_current_admin)):
    existing = await db.courses.find_one({"id": course_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Course not found")
    data = payload.dict()
    if data.get("order") is None:
        data["order"] = existing.get("order", 0)
    merged = {**existing, **data, "id": course_id}
    course = Course(**merged)
    await db.courses.replace_one({"id": course_id}, course.dict())
    return course


@api_router.delete("/admin/courses/{course_id}")
async def delete_course(course_id: str, admin: str = Depends(get_current_admin)):
    res = await db.courses.delete_one({"id": course_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"deleted": course_id}


# ---------------------- Admin: Media ----------------------
@api_router.post("/admin/media", response_model=MediaItem)
async def create_media(payload: MediaInput, admin: str = Depends(get_current_admin)):
    item = MediaItem(**payload.dict())
    await db.media.insert_one(item.dict())
    return item


@api_router.delete("/admin/media/{media_id}")
async def delete_media(media_id: str, admin: str = Depends(get_current_admin)):
    res = await db.media.delete_one({"id": media_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Media not found")
    return {"deleted": media_id}


# ---------------------- Admin: Site Content ----------------------
@api_router.put("/admin/site-content")
async def update_site_content(payload: Dict[str, Any], admin: str = Depends(get_current_admin)):
    payload["key"] = "main"
    await db.site_content.replace_one({"key": "main"}, payload, upsert=True)
    doc = await db.site_content.find_one({"key": "main"}, {"_id": 0})
    return doc


# ---------------------- Admin: Inbox ----------------------
@api_router.get("/admin/contacts")
async def list_contacts(admin: str = Depends(get_current_admin)):
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api_router.get("/admin/newsletter")
async def list_newsletter(admin: str = Depends(get_current_admin)):
    items = await db.newsletter.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api_router.get("/admin/enrollments")
async def list_enrollments(admin: str = Depends(get_current_admin)):
    items = await db.enrollments.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api_router.get("/admin/stats")
async def admin_stats(admin: str = Depends(get_current_admin)):
    return {
        "courses": await db.courses.count_documents({}),
        "media": await db.media.count_documents({}),
        "contacts": await db.contacts.count_documents({}),
        "newsletter": await db.newsletter.count_documents({}),
        "enrollments": await db.enrollments.count_documents({}),
    }


@api_router.delete("/admin/{collection}/{item_id}")
async def delete_inbox_item(collection: str, item_id: str, admin: str = Depends(get_current_admin)):
    if collection not in {"contacts", "newsletter", "enrollments"}:
        raise HTTPException(status_code=400, detail="Invalid collection")
    res = await db[collection].delete_one({"id": item_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"deleted": item_id}


# ---------------------- App setup ----------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_data():
    if await db.courses.count_documents({}) == 0:
        await db.courses.insert_many([dict(c) for c in COURSES_SEED])
        logger.info("Seeded %d courses", len(COURSES_SEED))
    if await db.site_content.count_documents({"key": "main"}) == 0:
        await db.site_content.insert_one(dict(DEFAULT_SITE_CONTENT))
        logger.info("Seeded default site content")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

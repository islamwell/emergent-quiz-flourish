from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from seed_data import COURSES_SEED

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
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


# ---------------------- Routes ----------------------
@api_router.get("/")
async def root():
    return {"message": "NurulQuran API is running"}


@api_router.get("/courses", response_model=List[Course])
async def get_courses():
    courses = await db.courses.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return [Course(**c) for c in courses]


@api_router.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    course = await db.courses.find_one({"id": course_id}, {"_id": 0})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return Course(**course)


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


# ---------------------- App setup ----------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_courses():
    """Seed the courses collection on startup if empty."""
    count = await db.courses.count_documents({})
    if count == 0:
        await db.courses.insert_many([dict(c) for c in COURSES_SEED])
        logger.info("Seeded %d courses", len(COURSES_SEED))
    else:
        logger.info("Courses already seeded (%d present)", count)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

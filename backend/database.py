"""Database client for the NurulQuran backend.
Supports SQLite (local zero-config fallback) and Firebase Firestore.
"""
import os
import sqlite3
import json
import logging
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Dict, Any, Optional

logger = logging.getLogger(__name__)

# Try importing firebase
try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    HAS_FIREBASE = True
except ImportError:
    HAS_FIREBASE = False

class DateTimeEncoder(json.JSONEncoder):
    """Custom JSON encoder to handle datetime objects by converting to ISO format."""
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

class SQLiteDB:
    """SQLite implementation of the database client."""
    def __init__(self, db_path: Optional[Path] = None):
        if db_path is None:
            db_path = Path(__file__).parent / 'nurulquran.db'
        self.db_path = db_path
        self._init_tables()
        logger.info(f"SQLite database initialized at {self.db_path}")

    def _get_conn(self):
        conn = sqlite3.connect(str(self.db_path))
        conn.row_factory = sqlite3.Row
        return conn

    def _init_tables(self):
        with self._get_conn() as conn:
            conn.execute("CREATE TABLE IF NOT EXISTS courses (id TEXT PRIMARY KEY, order_val INTEGER, data TEXT)")
            conn.execute("CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY, type TEXT, created_at TEXT, data TEXT)")
            conn.execute("CREATE TABLE IF NOT EXISTS site_content (key TEXT PRIMARY KEY, data TEXT)")
            conn.execute("CREATE TABLE IF NOT EXISTS contacts (id TEXT PRIMARY KEY, created_at TEXT, data TEXT)")
            conn.execute("CREATE TABLE IF NOT EXISTS newsletter (id TEXT PRIMARY KEY, email TEXT UNIQUE, created_at TEXT, data TEXT)")
            conn.execute("CREATE TABLE IF NOT EXISTS enrollments (id TEXT PRIMARY KEY, created_at TEXT, data TEXT)")
            conn.commit()

    async def get_courses(self) -> List[Dict[str, Any]]:
        with self._get_conn() as conn:
            rows = conn.execute("SELECT data FROM courses ORDER BY order_val ASC").fetchall()
            return [json.loads(r['data']) for r in rows]

    async def get_course(self, course_id: str) -> Optional[Dict[str, Any]]:
        with self._get_conn() as conn:
            row = conn.execute("SELECT data FROM courses WHERE id = ?", (course_id,)).fetchone()
            return json.loads(row['data']) if row else None

    async def create_course(self, course_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        order_val = data.get('order', 0)
        with self._get_conn() as conn:
            conn.execute(
                "INSERT OR REPLACE INTO courses (id, order_val, data) VALUES (?, ?, ?)",
                (course_id, order_val, json.dumps(data, cls=DateTimeEncoder))
            )
            conn.commit()
        return data

    async def update_course(self, course_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        order_val = data.get('order', 0)
        with self._get_conn() as conn:
            conn.execute(
                "INSERT OR REPLACE INTO courses (id, order_val, data) VALUES (?, ?, ?)",
                (course_id, order_val, json.dumps(data, cls=DateTimeEncoder))
            )
            conn.commit()
        return data

    async def delete_course(self, course_id: str) -> bool:
        with self._get_conn() as conn:
            cursor = conn.execute("DELETE FROM courses WHERE id = ?", (course_id,))
            conn.commit()
            return cursor.rowcount > 0

    async def count_courses(self) -> int:
        with self._get_conn() as conn:
            return conn.execute("SELECT COUNT(*) FROM courses").fetchone()[0]

    async def count_site_content(self, key: str) -> int:
        with self._get_conn() as conn:
            return conn.execute("SELECT COUNT(*) FROM site_content WHERE key = ?", (key,)).fetchone()[0]

    async def get_site_content(self) -> Optional[Dict[str, Any]]:
        with self._get_conn() as conn:
            row = conn.execute("SELECT data FROM site_content WHERE key = 'main'").fetchone()
            return json.loads(row['data']) if row else None

    async def update_site_content(self, data: Dict[str, Any]) -> Dict[str, Any]:
        with self._get_conn() as conn:
            conn.execute(
                "INSERT OR REPLACE INTO site_content (key, data) VALUES ('main', ?)",
                (json.dumps(data, cls=DateTimeEncoder),)
            )
            conn.commit()
        return data

    async def get_media(self, type_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        with self._get_conn() as conn:
            if type_filter:
                rows = conn.execute("SELECT data FROM media WHERE type = ? ORDER BY created_at DESC", (type_filter,)).fetchall()
            else:
                rows = conn.execute("SELECT data FROM media ORDER BY created_at DESC").fetchall()
            return [json.loads(r['data']) for r in rows]

    async def create_media(self, media_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        media_type = data.get('type', '')
        created_at = data.get('created_at', '')
        if isinstance(created_at, datetime):
            created_at = created_at.isoformat()
        with self._get_conn() as conn:
            conn.execute(
                "INSERT OR REPLACE INTO media (id, type, created_at, data) VALUES (?, ?, ?, ?)",
                (media_id, media_type, created_at, json.dumps(data, cls=DateTimeEncoder))
            )
            conn.commit()
        return data

    async def delete_media(self, media_id: str) -> bool:
        with self._get_conn() as conn:
            cursor = conn.execute("DELETE FROM media WHERE id = ?", (media_id,))
            conn.commit()
            return cursor.rowcount > 0

    async def create_contact(self, contact_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        created_at = data.get('created_at', '')
        if isinstance(created_at, datetime):
            created_at = created_at.isoformat()
        with self._get_conn() as conn:
            conn.execute(
                "INSERT INTO contacts (id, created_at, data) VALUES (?, ?, ?)",
                (contact_id, created_at, json.dumps(data, cls=DateTimeEncoder))
            )
            conn.commit()
        return data

    async def list_contacts(self) -> List[Dict[str, Any]]:
        with self._get_conn() as conn:
            rows = conn.execute("SELECT data FROM contacts ORDER BY created_at DESC").fetchall()
            return [json.loads(r['data']) for r in rows]

    async def get_newsletter_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        with self._get_conn() as conn:
            row = conn.execute("SELECT data FROM newsletter WHERE email = ?", (email,)).fetchone()
            return json.loads(row['data']) if row else None

    async def create_newsletter(self, signup_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        email = data.get('email', '')
        created_at = data.get('created_at', '')
        if isinstance(created_at, datetime):
            created_at = created_at.isoformat()
        with self._get_conn() as conn:
            conn.execute(
                "INSERT OR REPLACE INTO newsletter (id, email, created_at, data) VALUES (?, ?, ?, ?)",
                (signup_id, email, created_at, json.dumps(data, cls=DateTimeEncoder))
            )
            conn.commit()
        return data

    async def list_newsletter(self) -> List[Dict[str, Any]]:
        with self._get_conn() as conn:
            rows = conn.execute("SELECT data FROM newsletter ORDER BY created_at DESC").fetchall()
            return [json.loads(r['data']) for r in rows]

    async def create_enrollment(self, enrollment_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        created_at = data.get('created_at', '')
        if isinstance(created_at, datetime):
            created_at = created_at.isoformat()
        with self._get_conn() as conn:
            conn.execute(
                "INSERT INTO enrollments (id, created_at, data) VALUES (?, ?, ?)",
                (enrollment_id, created_at, json.dumps(data, cls=DateTimeEncoder))
            )
            conn.commit()
        return data

    async def list_enrollments(self) -> List[Dict[str, Any]]:
        with self._get_conn() as conn:
            rows = conn.execute("SELECT data FROM enrollments ORDER BY created_at DESC").fetchall()
            return [json.loads(r['data']) for r in rows]

    async def get_stats(self) -> Dict[str, int]:
        with self._get_conn() as conn:
            courses = conn.execute("SELECT COUNT(*) FROM courses").fetchone()[0]
            media = conn.execute("SELECT COUNT(*) FROM media").fetchone()[0]
            contacts = conn.execute("SELECT COUNT(*) FROM contacts").fetchone()[0]
            newsletter = conn.execute("SELECT COUNT(*) FROM newsletter").fetchone()[0]
            enrollments = conn.execute("SELECT COUNT(*) FROM enrollments").fetchone()[0]
            return {
                "courses": courses,
                "media": media,
                "contacts": contacts,
                "newsletter": newsletter,
                "enrollments": enrollments
            }

    async def delete_inbox_item(self, collection: str, item_id: str) -> bool:
        if collection not in {"contacts", "newsletter", "enrollments"}:
            return False
        with self._get_conn() as conn:
            cursor = conn.execute(f"DELETE FROM {collection} WHERE id = ?", (item_id,))
            conn.commit()
            return cursor.rowcount > 0

class FirestoreDB:
    """Firebase Firestore implementation of the database client."""
    def __init__(self, client):
        self.db = client
        logger.info("Firebase Firestore database client initialized")

    def _convert_dates(self, doc_dict: Dict[str, Any]) -> Dict[str, Any]:
        """Convert Firestore Datetime values to strings or format standard types."""
        if not doc_dict:
            return doc_dict
        res = {}
        for k, v in doc_dict.items():
            if isinstance(v, datetime):
                # Convert Firestore datetime to timezone-aware UTC datetime
                res[k] = v.replace(tzinfo=timezone.utc).isoformat()
            elif isinstance(v, dict):
                res[k] = self._convert_dates(v)
            elif isinstance(v, list):
                res[k] = [self._convert_dates(item) if isinstance(item, dict) else item for item in v]
            else:
                res[k] = v
        return res

    async def get_courses(self) -> List[Dict[str, Any]]:
        docs = self.db.collection("courses").stream()
        res = [self._convert_dates(doc.to_dict()) for doc in docs]
        return sorted(res, key=lambda x: x.get('order', 0))

    async def get_course(self, course_id: str) -> Optional[Dict[str, Any]]:
        doc = self.db.collection("courses").document(course_id).get()
        return self._convert_dates(doc.to_dict()) if doc.exists else None

    async def create_course(self, course_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self.db.collection("courses").document(course_id).set(data)
        return self._convert_dates(data)

    async def update_course(self, course_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self.db.collection("courses").document(course_id).set(data, merge=True)
        return self._convert_dates(data)

    async def delete_course(self, course_id: str) -> bool:
        doc_ref = self.db.collection("courses").document(course_id)
        if doc_ref.get().exists:
            doc_ref.delete()
            return True
        return False

    async def count_courses(self) -> int:
        docs = self.db.collection("courses").select([]).get()
        return len(docs)

    async def count_site_content(self, key: str) -> int:
        doc = self.db.collection("site_content").document(key).get()
        return 1 if doc.exists else 0

    async def get_site_content(self) -> Optional[Dict[str, Any]]:
        doc = self.db.collection("site_content").document("main").get()
        return self._convert_dates(doc.to_dict()) if doc.exists else None

    async def update_site_content(self, data: Dict[str, Any]) -> Dict[str, Any]:
        self.db.collection("site_content").document("main").set(data)
        return self._convert_dates(data)

    async def get_media(self, type_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        ref = self.db.collection("media")
        if type_filter:
            ref = ref.where("type", "==", type_filter)
        docs = ref.stream()
        res = [self._convert_dates(doc.to_dict()) for doc in docs]
        return sorted(res, key=lambda x: x.get('created_at', ''), reverse=True)

    async def create_media(self, media_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self.db.collection("media").document(media_id).set(data)
        return self._convert_dates(data)

    async def delete_media(self, media_id: str) -> bool:
        doc_ref = self.db.collection("media").document(media_id)
        if doc_ref.get().exists:
            doc_ref.delete()
            return True
        return False

    async def create_contact(self, contact_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self.db.collection("contacts").document(contact_id).set(data)
        return self._convert_dates(data)

    async def list_contacts(self) -> List[Dict[str, Any]]:
        docs = self.db.collection("contacts").stream()
        res = [self._convert_dates(doc.to_dict()) for doc in docs]
        return sorted(res, key=lambda x: x.get('created_at', ''), reverse=True)

    async def get_newsletter_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        docs = self.db.collection("newsletter").where("email", "==", email).limit(1).stream()
        results = [self._convert_dates(doc.to_dict()) for doc in docs]
        return results[0] if results else None

    async def create_newsletter(self, signup_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self.db.collection("newsletter").document(signup_id).set(data)
        return self._convert_dates(data)

    async def list_newsletter(self) -> List[Dict[str, Any]]:
        docs = self.db.collection("newsletter").stream()
        res = [self._convert_dates(doc.to_dict()) for doc in docs]
        return sorted(res, key=lambda x: x.get('created_at', ''), reverse=True)

    async def create_enrollment(self, enrollment_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        self.db.collection("enrollments").document(enrollment_id).set(data)
        return self._convert_dates(data)

    async def list_enrollments(self) -> List[Dict[str, Any]]:
        docs = self.db.collection("enrollments").stream()
        res = [self._convert_dates(doc.to_dict()) for doc in docs]
        return sorted(res, key=lambda x: x.get('created_at', ''), reverse=True)

    async def get_stats(self) -> Dict[str, int]:
        courses = len(self.db.collection("courses").select([]).get())
        media = len(self.db.collection("media").select([]).get())
        contacts = len(self.db.collection("contacts").select([]).get())
        newsletter = len(self.db.collection("newsletter").select([]).get())
        enrollments = len(self.db.collection("enrollments").select([]).get())
        return {
            "courses": courses,
            "media": media,
            "contacts": contacts,
            "newsletter": newsletter,
            "enrollments": enrollments
        }

    async def delete_inbox_item(self, collection: str, item_id: str) -> bool:
        if collection not in {"contacts", "newsletter", "enrollments"}:
            return False
        doc_ref = self.db.collection(collection).document(item_id)
        if doc_ref.get().exists:
            doc_ref.delete()
            return True
        return False

def init_db():
    """Factory to initialize the correct database client based on environment."""
    # 1. Check if Firebase should be used
    firebase_key_json = os.environ.get("FIREBASE_CREDENTIALS_JSON")
    firebase_key_path = os.environ.get("FIREBASE_SERVICE_ACCOUNT_KEY")
    google_app_creds = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    
    use_firebase = False
    db_client = None
    
    if HAS_FIREBASE:
        try:
            if firebase_key_json:
                logger.info("Initializing Firebase from credentials JSON env var")
                cred_dict = json.loads(firebase_key_json)
                cred = credentials.Certificate(cred_dict)
                firebase_admin.initialize_app(cred)
                db_client = firestore.client()
                use_firebase = True
            elif firebase_key_path and os.path.exists(firebase_key_path):
                logger.info(f"Initializing Firebase from key path: {firebase_key_path}")
                cred = credentials.Certificate(firebase_key_path)
                firebase_admin.initialize_app(cred)
                db_client = firestore.client()
                use_firebase = True
            elif google_app_creds:
                logger.info("Initializing Firebase using application default credentials")
                firebase_admin.initialize_app()
                db_client = firestore.client()
                use_firebase = True
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {e}. Falling back to SQLite.")
            use_firebase = False
            
    if use_firebase:
        return FirestoreDB(db_client)
    else:
        logger.info("Using SQLite database backend")
        return SQLiteDB()

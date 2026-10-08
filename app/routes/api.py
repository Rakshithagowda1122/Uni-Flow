from fastapi import APIRouter

from app.routes import admin, faculty, students

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(admin.router)
api_router.include_router(faculty.router)
api_router.include_router(students.router)

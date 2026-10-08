from fastapi import FastAPI

from app.routes import api_router

app = FastAPI(
    title="Uni Flow API",
    version="1.0.0",
    description="Backend API for the documented Uni Flow portal requirements.",
)
app.include_router(api_router)

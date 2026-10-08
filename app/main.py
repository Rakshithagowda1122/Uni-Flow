import logging
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from sqlalchemy.exc import SQLAlchemyError
from starlette.responses import JSONResponse

from app.database.session import dispose_database
from app.routes import api_router

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncGenerator[None, None]:
    del _app
    yield
    await dispose_database()


app = FastAPI(
    title="Uni Flow API",
    version="1.0.0",
    description="Backend API for the documented Uni Flow portal requirements.",
    lifespan=lifespan,
)
app.include_router(api_router)


@app.exception_handler(SQLAlchemyError)
async def handle_database_error(
    _request: Request,
    error: SQLAlchemyError,
) -> JSONResponse:
    del _request
    logger.error(
        "Database operation failed",
        exc_info=(type(error), error, error.__traceback__),
    )
    return JSONResponse(
        status_code=500,
        content={"detail": "A database operation could not be completed."},
    )

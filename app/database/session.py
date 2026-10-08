from collections.abc import AsyncIterator
from functools import lru_cache
from typing import Annotated

from fastapi import Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.config import get_settings
from app.dependencies.auth import (
    AuthenticatedPrincipal,
    get_current_principal,
)


@lru_cache
def get_session_factory() -> async_sessionmaker[AsyncSession]:
    settings = get_settings()
    if not settings.database_url.startswith("postgresql+asyncpg://"):
        raise ValueError(
            "DATABASE_URL must use the postgresql+asyncpg:// scheme."
        )
    engine = create_async_engine(settings.database_url, pool_pre_ping=True)
    return async_sessionmaker(engine, expire_on_commit=False)


async def get_tenant_session(
    principal: Annotated[
        AuthenticatedPrincipal, Depends(get_current_principal)
    ],
) -> AsyncIterator[AsyncSession]:
    session_factory = get_session_factory()
    async with session_factory() as session:
        async with session.begin():
            await session.execute(
                text("SELECT set_config('app.current_tenant_id', :tenant_id, true)"),
                {"tenant_id": str(principal.college_id)},
            )
            yield session

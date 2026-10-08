from enum import StrEnum
from typing import Annotated
from uuid import UUID

from fastapi import Depends, HTTPException, Request, status
from pydantic import BaseModel


class UserRole(StrEnum):
    ADMIN = "ADMIN"
    FACULTY = "FACULTY"
    STUDENT = "STUDENT"


class AuthenticatedPrincipal(BaseModel):
    user_id: UUID
    college_id: UUID
    role: UserRole


async def get_current_principal(request: Request) -> AuthenticatedPrincipal:
    principal = getattr(request.state, "uniflow_principal", None)
    if not isinstance(principal, AuthenticatedPrincipal):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authenticated UniFlow user context is required.",
        )
    return principal


def require_role(required_role: UserRole):
    async def role_dependency(
        principal: Annotated[
            AuthenticatedPrincipal, Depends(get_current_principal)
        ],
    ) -> AuthenticatedPrincipal:
        if principal.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="This operation is not available to the current role.",
            )
        return principal

    return role_dependency

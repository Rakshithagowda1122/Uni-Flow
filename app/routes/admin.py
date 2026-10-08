from typing import Annotated, Literal

from fastapi import APIRouter, Depends, Query

from app.dependencies.auth import (
    AuthenticatedPrincipal,
    UserRole,
    require_role,
)
from app.routes.unavailable import raise_mapping_unavailable

router = APIRouter(prefix="/admin", tags=["Admin"])
AdminAccess = Annotated[
    AuthenticatedPrincipal, Depends(require_role(UserRole.ADMIN))
]


@router.get("/attendance")
async def get_college_attendance_average(
    _principal: AdminAccess,
    scope: Literal["college"] = Query(...),
    aggregate: Literal["average"] = Query(...),
) -> None:
    del scope, aggregate
    raise_mapping_unavailable(
        "ADM-01",
        "The source documents do not define the attendance averaging rule.",
    )


@router.post("/notices")
async def create_global_notice(_principal: AdminAccess) -> None:
    raise_mapping_unavailable(
        "ADM-02",
        "No notice table or notice database mapping is defined.",
    )


@router.get("/faculty-attendance")
async def get_faculty_attendance(_principal: AdminAccess) -> None:
    raise_mapping_unavailable(
        "ADM-03",
        "No faculty-attendance table or database mapping is defined.",
    )

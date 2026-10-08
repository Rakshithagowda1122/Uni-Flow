from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_tenant_session
from app.dependencies.auth import (
    AuthenticatedPrincipal,
    UserRole,
    require_role,
)
from app.models import AttendanceRecord
from app.routes.unavailable import raise_mapping_unavailable
from app.schemas.attendance import AttendanceRead
from app.services.attendance import get_student_attendance

router = APIRouter(prefix="/students", tags=["Student"])
StudentAccess = Annotated[
    AuthenticatedPrincipal, Depends(require_role(UserRole.STUDENT))
]
TenantSession = Annotated[AsyncSession, Depends(get_tenant_session)]


@router.get("/me/attendance", response_model=list[AttendanceRead])
async def get_my_attendance(
    principal: StudentAccess,
    session: TenantSession,
) -> list[AttendanceRecord]:
    return await get_student_attendance(session, principal)


@router.get("/me/timetable")
async def get_my_timetable(_principal: StudentAccess) -> None:
    raise_mapping_unavailable(
        "STD-02",
        "The classes table has no meeting days or times needed for the defined timetable view.",
    )


@router.get("/me/marks")
async def get_my_marks(_principal: StudentAccess) -> None:
    raise_mapping_unavailable(
        "STD-03",
        "Test marks and academic-progress mappings are undefined; final_grade does not represent individual test marks.",
    )


@router.get("/academic-calendar")
async def get_academic_calendar(_principal: StudentAccess) -> None:
    raise_mapping_unavailable(
        "STD-04",
        "No holiday or exam-schedule table/database mapping is defined.",
    )


@router.get("/notices")
async def get_student_notices(_principal: StudentAccess) -> None:
    raise_mapping_unavailable(
        "STD-05",
        "No notice table or notice database mapping is defined.",
    )

from datetime import date
from typing import Annotated, Literal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies.auth import (
    AuthenticatedPrincipal,
    UserRole,
    require_role,
)
from app.models import AttendanceRecord
from app.routes.unavailable import raise_mapping_unavailable
from app.schemas.attendance import (
    AttendanceCreate,
    AttendanceRead,
    AttendanceStatus,
    AttendanceUpdate,
)
from app.services.attendance import create_attendance, update_attendance
from app.database.session import get_tenant_session

router = APIRouter(prefix="/faculty", tags=["Faculty"])
FacultyAccess = Annotated[
    AuthenticatedPrincipal, Depends(require_role(UserRole.FACULTY))
]
TenantSession = Annotated[AsyncSession, Depends(get_tenant_session)]


def is_unique_violation(error: IntegrityError) -> bool:
    original = error.orig
    sqlstate = getattr(original, "sqlstate", None) or getattr(
        original, "pgcode", None
    )
    if sqlstate is None:
        sqlstate = getattr(getattr(original, "__cause__", None), "sqlstate", None)
    return sqlstate == "23505"


@router.post(
    "/classes/{class_id}/attendance",
    response_model=AttendanceRead,
    status_code=status.HTTP_201_CREATED,
)
async def take_class_attendance(
    class_id: UUID,
    payload: AttendanceCreate,
    principal: FacultyAccess,
    session: TenantSession,
) -> AttendanceRecord:
    try:
        return await create_attendance(session, principal, class_id, payload)
    except IntegrityError as error:
        if is_unique_violation(error):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An attendance record already exists for this student, class, and date.",
            ) from error
        raise


@router.put(
    "/classes/{class_id}/attendance/{student_id}",
    response_model=AttendanceRead,
)
async def edit_class_attendance(
    class_id: UUID,
    student_id: UUID,
    *,
    session_date: date = Query(...),
    payload: AttendanceUpdate,
    principal: FacultyAccess,
    session: TenantSession,
) -> AttendanceRecord:
    return await update_attendance(
        session,
        principal,
        class_id,
        student_id,
        session_date,
        payload.status,
    )


@router.get("/timetable")
async def get_faculty_timetable(_principal: FacultyAccess) -> None:
    raise_mapping_unavailable(
        "FAC-02",
        "The classes table has no meeting days or times needed for the defined timetable view.",
    )


@router.get("/classes/{class_id}/attendance")
async def get_class_attendance_average(
    class_id: UUID,
    _principal: FacultyAccess,
    aggregate: Literal["average"] = Query(default="average"),
) -> None:
    del class_id, aggregate
    raise_mapping_unavailable(
        "FAC-03",
        "The source documents do not define the attendance averaging rule.",
    )


@router.post("/classes/{class_id}/tests/{test_id}/marks")
async def upload_test_marks(
    class_id: UUID,
    test_id: UUID,
    _principal: FacultyAccess,
) -> None:
    del class_id, test_id
    raise_mapping_unavailable(
        "FAC-04",
        "No test or marks table/database mapping is defined.",
    )


@router.put("/classes/{class_id}/tests/{test_id}/marks/{student_id}")
async def update_test_marks(
    class_id: UUID,
    test_id: UUID,
    student_id: UUID,
    _principal: FacultyAccess,
) -> None:
    del class_id, test_id, student_id
    raise_mapping_unavailable(
        "FAC-04",
        "No test or marks table/database mapping is defined.",
    )


@router.get("/notices")
async def get_global_notices(_principal: FacultyAccess) -> None:
    raise_mapping_unavailable(
        "FAC-05",
        "No notice table or notice database mapping is defined.",
    )

from datetime import date, datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class AttendanceStatus(StrEnum):
    PRESENT = "present"
    ABSENT = "absent"
    LATE = "late"
    EXCUSED = "excused"


class AttendanceCreate(BaseModel):
    student_id: UUID
    status: AttendanceStatus
    session_date: date | None = None

    model_config = ConfigDict(extra="forbid")


class AttendanceUpdate(BaseModel):
    status: AttendanceStatus

    model_config = ConfigDict(extra="forbid")


class AttendanceRead(BaseModel):
    id: UUID
    college_id: UUID
    class_id: UUID
    student_id: UUID
    session_date: date
    status: AttendanceStatus
    recorded_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Uni Flow backend

This FastAPI service follows `project_requirements.md`, `database_architecture.md`,
and `api_spec.md`. It does not create or alter database tables. The configured
PostgreSQL database must already use the documented schema and tenant RLS policies.

## Run locally

Use Python 3.11 or newer. Create a virtual environment, install the dependencies,
copy `.env.example` to `.env`, and set `DATABASE_URL` to the PostgreSQL connection
string for the documented database. Then start the API from the repository root:

```powershell
$env:DATABASE_URL = "postgresql+asyncpg://uniflow_admin:<password>@localhost:5432/uniflow_db"
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The application imports and starts without opening a database connection. A valid
`DATABASE_URL` is required when an implemented database-backed route is called.

## Request identity and tenant isolation

The source documents define roles and tenant isolation, but do not specify an
authentication protocol or endpoint. No login or token system is added here.
An upstream trusted authentication integration must place an
`AuthenticatedPrincipal` instance on `request.state.uniflow_principal`, containing
the authenticated `user_id`, `college_id`, and `role` (`ADMIN`, `FACULTY`, or
`STUDENT`). Requests without this context receive `401`; requests with a role
that is not permitted receive `403`.

Database-backed operations run in a transaction and set
`app.current_tenant_id` transaction-locally before queries, matching the database
architecture's RLS context convention.

The database architecture enables RLS on `attendance_records` but does not
provide a policy for that table in its policy definitions. Apply an approved
tenant policy before relying on RLS-protected attendance reads or writes; this
backend does not alter the schema or invent a policy.

## Implemented API routes

Base path: `/api/v1`.

| Method | Route | Requirement | Database mapping |
| --- | --- | --- | --- |
| POST | `/faculty/classes/{class_id}/attendance` | FAC-01 | Checks the assigned `classes` row; inserts into `attendance_records`. |
| PUT | `/faculty/classes/{class_id}/attendance/{student_id}?session_date={date}` | FAC-01 | Checks `classes`; updates the matching `attendance_records` row. |
| GET | `/students/me/attendance` | STD-01 | Selects the current student's `attendance_records`. |

The attendance POST accepts one record per request: `student_id`, `status`, and
optional `session_date`. If omitted, the database's documented `CURRENT_DATE`
default is used. The attendance status values are `present`, `absent`, `late`,
and `excused`. Extra request fields are rejected. The API specification does not
define a request schema; this minimal single-record contract is derived from the
existing `attendance_records` columns and requires confirmation if a different
submission shape is intended. A repeated class/student/date insertion returns
`409`.

All other routes in `api_spec.md` are registered with their specified methods and
paths and respond with `501 Not Implemented` plus the requirement ID and the
specific database/specification clarification required. These responses do not
claim to implement the underlying feature.

## Documented mapping blockers

- ADM-01 and FAC-03: The source defines read-only averages but not the averaging
  rule (including how attendance statuses are counted).
- ADM-02, FAC-05, and STD-05: No notice table or notice database mapping exists.
- ADM-03: No faculty-attendance table or database mapping exists.
- FAC-02 and STD-02: `classes` has no meeting-day or meeting-time fields.
- FAC-04: No test or marks table/mapping exists.
- STD-03: Test marks are unmapped; `enrollments.final_grade` is not individual
  test marks, and academic progress has no defined mapping.
- STD-04: No holiday or exam-schedule table/mapping exists.
- Authentication protocol/principal provisioning is not specified by the API
  document; trusted middleware integration is needed to populate request identity.
- The API document does not define attendance request/response schemas. The
  implemented POST uses one database attendance record as its minimal request
  contract. Confirm the body shape before client integration; batch attendance
  submission is not specified.

## Project layout

```text
app/
  config.py
  main.py
  database/
    session.py
  dependencies/
    auth.py
  models/
    entities.py
  routes/
    admin.py
    api.py
    faculty.py
    students.py
    unavailable.py
  schemas/
    attendance.py
  services/
    attendance.py
requirements.txt
.env.example
```

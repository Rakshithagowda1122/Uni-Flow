# UniFlow — API Specification

This document defines the UniFlow API blueprint from the approved functional requirements and database architecture. It establishes portal routes and their database actions before backend implementation; it does not define implementation details or extend the approved scope.

## 1. API Design Conventions

| Convention         | Standard                 |
| ------------------ | ------------------------ |
| API Base Path      | `/api/v1/`               |
| Architecture Style | REST-oriented            |
| Data Format        | JSON                     |
| Versioning         | URL-based                |
| Functional Source  | Project Requirement.md   |
| Database Source    | Database Architecture.md |

## 2. Admin Routes

| Route                                                      | Method | Feature (PRD)                                          | DB Table(s)                         | DB Action                                                 |
| ---------------------------------------------------------- | ------ | ------------------------------------------------------ | ----------------------------------- | --------------------------------------------------------- |
| `/api/v1/admin/attendance?scope=college&aggregate=average` | GET    | ADM-01 — View average college-wide student attendance  | `attendance_records`                | SELECT attendance records; calculate a read-only average. |
| `/api/v1/admin/notices`                                    | POST   | ADM-02 — Post global announcements to the Notice Board | Not defined in current architecture | Requires architecture clarification.                      |
| `/api/v1/admin/faculty-attendance`                         | GET    | ADM-03 — View faculty attendance records               | Not defined in current architecture | Requires architecture clarification.                      |

## 3. Faculty Routes

| Route                                                                            | Method | Feature (PRD)                                                                | DB Table(s)                         | DB Action                                                                         |
| -------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| `/api/v1/faculty/classes/{class_id}/attendance`                                  | POST   | FAC-01 — Take daily attendance for assigned classes                          | `classes`, `attendance_records`     | SELECT the assigned class; INSERT attendance records.                             |
| `/api/v1/faculty/classes/{class_id}/attendance/{student_id}?session_date={date}` | PUT    | FAC-01 — Update daily attendance for an existing record in an assigned class | `classes`, `attendance_records`     | SELECT the assigned class; UPDATE the matching attendance record.                 |
| `/api/v1/faculty/timetable`                                                      | GET    | FAC-02 — View personal teaching timetable                                    | `classes`                           | SELECT classes assigned to the faculty member.                                    |
| `/api/v1/faculty/classes/{class_id}/attendance?aggregate=average`                | GET    | FAC-03 — View average student attendance for specific classes                | `classes`, `attendance_records`     | SELECT the class and its attendance records; calculate a read-only class average. |
| `/api/v1/faculty/classes/{class_id}/tests/{test_id}/marks`                       | POST   | FAC-04 — Assign and upload marks for student tests                           | Not defined in current architecture | Requires architecture clarification.                                              |
| `/api/v1/faculty/classes/{class_id}/tests/{test_id}/marks/{student_id}`          | PUT    | FAC-04 — Update marks for student tests                                      | Not defined in current architecture | Requires architecture clarification.                                              |
| `/api/v1/faculty/notices`                                                        | GET    | FAC-05 — View the global Notice Board                                        | Not defined in current architecture | Requires architecture clarification.                                              |

## 4. Student Routes

| Route                                | Method | Feature (PRD)                                   | DB Table(s)                         | DB Action                                                                                          |
| ------------------------------------ | ------ | ----------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| `/api/v1/students/me/attendance`     | GET    | STD-01 — View personal attendance records       | `attendance_records`                | SELECT attendance records for the current student.                                                 |
| `/api/v1/students/me/timetable`      | GET    | STD-02 — View personal class timetable          | `enrollments`, `classes`            | SELECT the current student's enrollments and related classes.                                      |
| `/api/v1/students/me/marks`          | GET    | STD-03 — Check test marks and academic progress | `enrollments`                       | SELECT `final_grade`; test-mark and academic-progress mappings require architecture clarification. |
| `/api/v1/students/academic-calendar` | GET    | STD-04 — View upcoming holidays and exam dates  | Not defined in current architecture | Requires architecture clarification.                                                               |
| `/api/v1/students/notices`           | GET    | STD-05 — View the global Notice Board           | Not defined in current architecture | Requires architecture clarification.                                                               |

## 5. Requirement Traceability

| Requirement                                                   | Agent   | API Route                                                                                                                           | Method    |
| ------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- |
| ADM-01 — View average college-wide student attendance         | Admin   | `/api/v1/admin/attendance?scope=college&aggregate=average`                                                                          | GET       |
| ADM-02 — Post global announcements to the Notice Board        | Admin   | `/api/v1/admin/notices`                                                                                                             | POST      |
| ADM-03 — View faculty attendance records                      | Admin   | `/api/v1/admin/faculty-attendance`                                                                                                  | GET       |
| FAC-01 — Take daily attendance for assigned classes           | Faculty | `/api/v1/faculty/classes/{class_id}/attendance`; `/api/v1/faculty/classes/{class_id}/attendance/{student_id}?session_date={date}`   | POST, PUT |
| FAC-02 — View personal teaching timetable                     | Faculty | `/api/v1/faculty/timetable`                                                                                                         | GET       |
| FAC-03 — View average student attendance for specific classes | Faculty | `/api/v1/faculty/classes/{class_id}/attendance?aggregate=average`                                                                   | GET       |
| FAC-04 — Assign and upload marks for student tests            | Faculty | `/api/v1/faculty/classes/{class_id}/tests/{test_id}/marks`; `/api/v1/faculty/classes/{class_id}/tests/{test_id}/marks/{student_id}` | POST, PUT |
| FAC-05 — View the global Notice Board                         | Faculty | `/api/v1/faculty/notices`                                                                                                           | GET       |
| STD-01 — View personal attendance records                     | Student | `/api/v1/students/me/attendance`                                                                                                    | GET       |
| STD-02 — View personal class timetable                        | Student | `/api/v1/students/me/timetable`                                                                                                     | GET       |
| STD-03 — Check test marks and academic progress               | Student | `/api/v1/students/me/marks`                                                                                                         | GET       |
| STD-04 — View upcoming holidays and exam dates                | Student | `/api/v1/students/academic-calendar`                                                                                                | GET       |
| STD-05 — View the global Notice Board                         | Student | `/api/v1/students/notices`                                                                                                          | GET       |

## 6. Architecture Alignment Notes

- **ADM-02, FAC-05, STD-05 — Notices:** The architecture defines no notice table for creating or retrieving global notices.
- **ADM-03 — Faculty attendance:** The architecture defines no faculty-attendance table. `attendance_records` records student attendance through `student_id` and does not represent faculty attendance.
- **FAC-02, STD-02 — Timetables:** `classes` contains course, instructor, term, section, and room information, but no meeting days or times. The complete timetable view cannot be mapped from the defined fields.
- **FAC-04 — Test marks:** The architecture defines no test or marks table. `enrollments.final_grade` is a final grade and cannot be treated as individual test marks.
- **STD-03 — Test marks and academic progress:** The architecture defines no test-marks data. The PRD also defines no separate academic-progress entity; the relationship of academic progress to available data cannot be finalized from the sources.
- **STD-04 — Holidays and exam dates:** The architecture defines no holiday or exam-schedule table.

## 7. API Completeness Verification

| Verification                                        | Status                                                                                   |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| All 13 PRD requirements are mapped                  | Verified — each requirement appears in the traceability table.                           |
| No unsupported functionality was added              | Verified                                                                                 |
| Database references match the approved architecture | Verified — only defined table names are referenced; unsupported mappings are identified. |
| Routes are grouped by portal                        | Verified                                                                                 |
| HTTP methods are appropriate                        | Verified                                                                                 |
| Requirement traceability is maintained              | Verified — PRD IDs and responsible agents are retained.                                  |
| No implementation code has been introduced          | Verified                                                                                 |

## 8. Implementation Readiness

**Ready for backend implementation:** FAC-01 attendance submission and update, and STD-01 personal attendance retrieval, map to defined tables and relationships.

**Requires database architecture clarification:** ADM-02, ADM-03, FAC-02, FAC-04, FAC-05, STD-02, STD-03, STD-04, and STD-05 have missing or incomplete database mappings described in Section 6. These routes are retained for traceability but are not implementation-ready.

ADM-01 and FAC-03 use existing attendance records for read-only averages. The sources do not specify the precise averaging rule, so that calculation definition must be confirmed before implementation.

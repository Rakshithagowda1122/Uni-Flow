# UNI FLOW

## Crystal-Clear System Requirement Sheet

**Document:** Project_requirements
**Project:** Uni Flow
**Document Type:** Functional requirement Specification
**Status:** Requirements Definition
**Source of Truth:** Original `Project_requirements.md`

---

# STEP 1 — PROJECT IDENTIFICATION

### 1.1 Project Name

**Uni Flow**

### 1.2 Project Type

**College Management and Student Services Portal**

### 1.3 System Purpose

Uni Flow is a **role-based college management system** that provides different services and information to:

- Admin
- Faculty
- Student

The system requirements are organized according to the responsibilities and actions of each role.

---

# STEP 2 — SYSTEM AGENTS

An **Agent** is the person/role that performs an action in the system.

Uni Flow has exactly **three primary agents** identified in the source requirements.

| Agent ID | Agent   | Description                                        |
| -------- | ------- | -------------------------------------------------- |
| AG-01    | Admin   | Performs college-level administrative operations   |
| AG-02    | Faculty | Performs teaching and academic operations          |
| AG-03    | Student | Accesses personal academic and college information |

### Agent Summary

Uni Flow
│
├── Admin
│
├── Faculty
│
└── Student

# STEP 3 — REQUIREMENT IDENTIFICATION

Every statement from the original requirement document is converted into an identifiable requirement.

This prevents requirements from being lost or duplicated.

## 3.1 Admin Requirements

The original document specifies three Admin requirements.

| ID     | Requirement                                                           |
| ------ | --------------------------------------------------------------------- |
| ADM-01 | Admin shall be able to view average college-wide student attendance.  |
| ADM-02 | Admin shall be able to post global announcements to the Notice Board. |
| ADM-03 | Admin shall be able to view faculty attendance records.               |

---

## 3.2 Faculty Requirements

The original document specifies five Faculty requirements.

| ID     | Requirement                                                                          |
| ------ | ------------------------------------------------------------------------------------ |
| FAC-01 | Faculty shall be able to take daily attendance for assigned classes.                 |
| FAC-02 | Faculty shall be able to view their personal teaching timetable.                     |
| FAC-03 | Faculty shall be able to view average student attendance for their specific classes. |
| FAC-04 | Faculty shall be able to assign and upload marks for student tests.                  |
| FAC-05 | Faculty shall be able to view the global Notice Board.                               |

## 3.3 Student Requirements

The original document specifies five Student requirements.

| ID     | Requirement                                                      |
| ------ | ---------------------------------------------------------------- |
| STD-01 | Student shall be able to view personal attendance records.       |
| STD-02 | Student shall be able to view personal class timetable.          |
| STD-03 | Student shall be able to check test marks and academic progress. |
| STD-04 | Student shall be able to view upcoming holidays and exam dates.  |
| STD-05 | Student shall be able to view the global Notice Board.           |

# STEP 4 — AGENT → ACTION → ENTITY → RELATION

This is the **most important part** of the requirement analysis.

The Master Prompt requires each requirement to be broken down into these four elements.

This is the central requirement analysis model of Uni Flow

## 4.1 Complete Requirement Decomposition

| Req. ID | Agent   | Action        | Entity                  | Relation                          |
| ------- | ------- | ------------- | ----------------------- | --------------------------------- |
| ADM-01  | Admin   | View          | Student Attendance      | College-wide                      |
| ADM-02  | Admin   | Create/Post   | Notice                  | Global                            |
| ADM-03  | Admin   | View          | Faculty Attendance      | Faculty records                   |
| FAC-01  | Faculty | Create/Update | Student Attendance      | Assigned Classes                  |
| FAC-02  | Faculty | View          | Timetable               | Teaching Schedule                 |
| FAC-03  | Faculty | View          | Student Attendance      | Specific Classes                  |
| FAC-04  | Faculty | Create/Update | Marks                   | Student Tests                     |
| FAC-05  | Faculty | View          | Notice                  | Global                            |
| STD-01  | Student | View          | Student Attendance      | Personal Records                  |
| STD-02  | Student | View          | Timetable               | Personal Class Schedule           |
| STD-03  | Student | View          | Marks                   | Student Tests / Academic Progress |
| STD-04  | Student | View          | Holiday & Exam Schedule | Upcoming Dates                    |
| STD-05  | Student | View          | Notice                  | Global                            |

### Example

Original requirement:

> Faculty shall be able to take daily attendance for assigned classes.

Breakdown:

text
Agent → Faculty
Action → Create / Update
Entity → Student Attendance
Relation → Assigned Class

Therefore:

**Faculty → Create/Update → Student Attendance → Assigned Class**

This format makes the requirement directly traceable to later system design.

---

# STEP 5 — MASTER AGENT LIST

After analysing every requirement, the unique agents are:

text

1. Admin
2. Faculty
3. Student

### Agent Rule

Each requirement must belong to one of these defined agents.

No new agent is introduced without an approved requirement.

# STEP 6 — MASTER ACTION LIST

The unique actions identified from the requirements are:

| Action        | Meaning in Uni Flow         |
| ------------- | --------------------------- |
| View          | Access existing information |
| Create        | Add new information         |
| Update        | Modify existing information |
| Create/Update | Add or modify information   |

### Actions Identified

text
View
Create/Post
Create/Update

The actions are derived from the actual requirements rather than adding unrelated CRUD operations.

# STEP 7 — MASTER ENTITY LIST

After removing duplicates and calculated values, the core entities are:

| Entity ID | Entity             |
| --------- | ------------------ |
| ENT-01    | Student            |
| ENT-02    | Faculty            |
| ENT-03    | Student Attendance |
| ENT-04    | Faculty Attendance |
| ENT-05    | Timetable          |
| ENT-06    | Marks              |
| ENT-07    | Notice             |
| ENT-08    | Holiday            |
| ENT-09    | Exam Schedule      |

### Important Design Decision

There is **one `Timetable` entity**.

We do **not** create:

- Faculty Timetable
- Student Timetable

as two separate entities.

Both are different views/access patterns of the same Timetable information.

# STEP 8 — CALCULATED VALUES VS ENTITIES

This is an important point to demonstrate proper requirements engineering.

### Average College-Wide Student Attendance

**Not an entity.**

It is calculated from Student Attendance records.

text
Student Attendance
↓
Calculate Average
↓
College-wide Average Attendance

### Average Student Attendance for Specific Classes

**Not an entity.**

It is calculated from attendance records belonging to the relevant class.

text
Student Attendance
↓
Filter Specific Class
↓
Calculate Average
↓
Class Average Attendance

### Number of Students

**Not an entity.**

The entity is:

**Student**

The number of students is obtained by counting Student records.

text
Student records
↓
COUNT(Student)
↓
Number of Students

---

# STEP 9 — NOTICE BOARD CLARIFICATION

The requirement says Admin can post announcements to the **Notice Board**, while Faculty and Student can view the global Notice Board.

For requirements modelling:

**Notice** is the entity.

**Notice Board** is the presentation/access concept.

Therefore:

text
Admin
↓
Create/Post
↓
Notice
↓
Global
↓
Faculty / Student View

We do not create a separate `NoticeBoard` database entity based only on the wording of the requirement.

# STEP 10 — MASTER RELATION LIST

The relationships identified from the requirements are:

| Relation                | Purpose                                    |
| ----------------------- | ------------------------------------------ |
| College-wide            | Attendance information across the college  |
| Global                  | Notice accessible across the defined roles |
| Assigned Class          | Faculty attendance-taking context          |
| Teaching Schedule       | Faculty timetable                          |
| Specific Class          | Class-level attendance information         |
| Student Tests           | Marks associated with tests/students       |
| Personal Records        | Student's own attendance                   |
| Personal Class Schedule | Student's timetable                        |
| Academic Progress       | Context associated with student marks      |
| Upcoming Dates          | Holidays and exam dates                    |

These relations describe **how an agent interacts with an entity**, rather than creating unnecessary entities.

# STEP 11 — REQUIREMENT TRACEABILITY MATRIX

Every original requirement has a unique ID and can be traced through the system.

| ID     | Agent   | Action        | Entity                  | Relation          |
| ------ | ------- | ------------- | ----------------------- | ----------------- |
| ADM-01 | Admin   | View          | Student Attendance      | College-wide      |
| ADM-02 | Admin   | Create/Post   | Notice                  | Global            |
| ADM-03 | Admin   | View          | Faculty Attendance      | Faculty Records   |
| FAC-01 | Faculty | Create/Update | Student Attendance      | Assigned Class    |
| FAC-02 | Faculty | View          | Timetable               | Teaching Schedule |
| FAC-03 | Faculty | View          | Student Attendance      | Specific Class    |
| FAC-04 | Faculty | Create/Update | Marks                   | Student Tests     |
| FAC-05 | Faculty | View          | Notice                  | Global            |
| STD-01 | Student | View          | Student Attendance      | Personal Records  |
| STD-02 | Student | View          | Timetable               | Personal Schedule |
| STD-03 | Student | View          | Marks                   | Academic Progress |
| STD-04 | Student | View          | Holiday & Exam Schedule | Upcoming Dates    |
| STD-05 | Student | View          | Notice                  | Global            |

**Coverage: 13 / 13 source requirements identified.**

# STEP 12 — ROLE-BASED REQUIREMENT MATRIX

This gives a single clean view of what each role can do.

| Module / Information | Admin                     | Faculty                      | Student                  |
| -------------------- | ------------------------- | ---------------------------- | ------------------------ |
| Student Attendance   | View college average      | Take & view class attendance | View personal attendance |
| Faculty Attendance   | View                      | —                            | —                        |
| Timetable            | —                         | View teaching timetable      | View class timetable     |
| Marks                | —                         | Assign/upload                | View                     |
| Notice               | Post global announcements | View                         | View                     |
| Holidays             | —                         | —                            | View                     |
| Exam Dates           | —                         | —                            | View                     |

`—` means the current source requirements do not define an operation for that role.

This is important: **absence of a requirement should not automatically be treated as permission to invent one.**

---

# STEP 13 — REQUIREMENT SCOPE

The current Uni Flow requirement scope consists of:

### Administration

- College-wide student attendance viewing
- Global announcements
- Faculty attendance viewing

### Faculty Academic Operations

- Student attendance
- Teaching timetable
- Class attendance averages
- Student test marks
- Notice Board access

### Student Services

- Personal attendance
- Class timetable
- Test marks
- Academic progress information
- Holidays
- Exam dates
- Notice Board

---

# STEP 14 — REQUIREMENT NORMALIZATION

The following decisions keep the requirement sheet clean and avoid duplicate entities.

### Decision 1 — Attendance Average

`Average Attendance` is a **calculated result**, not an entity.

### Decision 2 — Student Count

`Number of Students` is a **calculated result**, not an entity.

### Decision 3 — Notice Board

`Notice` is the entity. `Notice Board` is the access/display concept.

### Decision 4 — Timetable

Use a single **Timetable** entity for both Faculty and Student requirements.

### Decision 5 — Academic Progress

The current source requirement mentions academic progress, but does not define separate independent data for it. Therefore, no independent `AcademicProgress` entity is introduced at this stage.

### Decision 6 — No Extra Modules

Features not stated in the original requirement document are not added to the requirement scope.

---

# STEP 15 — REQUIREMENT COMPLETENESS CHECK

Before moving to technical design:

| Check                                     | Status     |
| ----------------------------------------- | ---------- |
| Original requirements reviewed            | ✅         |
| Admin requirements identified             | ✅         |
| Faculty requirements identified           | ✅         |
| Student requirements identified           | ✅         |
| Every requirement given an ID             | ✅         |
| Every requirement mapped to an Agent      | ✅         |
| Every requirement mapped to an Action     | ✅         |
| Every requirement mapped to an Entity     | ✅         |
| Relations identified                      | ✅         |
| Duplicate entities removed                | ✅         |
| Calculated values separated from entities | ✅         |
| Extra features avoided                    | ✅         |
| Code introduced                           | ❌ Not yet |
| Database implementation introduced        | ❌ Not yet |
| API implementation introduced             | ❌ Not yet |
| Frontend implementation introduced        | ❌ Not yet |

---

# STEP 16 — FINAL REQUIREMENT MODEL

The complete requirement structure can now be represented as:

```text
                         Uni Flow
                             │
             ┌───────────────┼───────────────┐
             │               │               │
           ADMIN           FACULTY         STUDENT
             │               │               │
       ┌─────┼─────┐    ┌────┼─────┐    ┌───┼─────────┐
       │     │     │    │    │     │    │   │         │
 Attendance Notice Faculty Attendance Timetable Marks Attendance Timetable
                  Attendance         │              Marks
                                     │              Holidays
                                  Notice            Exams
                                                    Notice
```

The important part is that the diagram is **derived from the requirements**, not the other way around.

---

# STEP 17 — WHAT THIS REQUIREMENT SHEET BECOMES

This document should be treated as the foundation for the next stages.

```text
PROJECT REQUIREMENTS
        │
        ▼
Requirement IDs
        │
        ▼
Agent
        │
        ▼
Action
        │
        ▼
Entity
        │
        ▼
Relation
        │
        ▼
Entity Analysis
        │
        ▼
Database Design
        │
        ▼
API Design
        │
        ▼
Role Access
        │
        ▼
User Flow
        │
        ▼
UI / UX
```

This staged approach matches the Master Prompt's requirement to analyse the original requirements first and only then proceed through the later design stages.

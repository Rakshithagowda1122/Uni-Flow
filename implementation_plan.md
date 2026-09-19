# UNI FLOW

# Implementation Plan

## 1. Purpose

This document defines the controlled implementation path for the **Uni Flow College Management and Student Services Portal**.

The implementation plan is derived from the approved `Project_Requirement.md`.

`Project_Requirement.md` remains the **source of truth for what the system must provide**. This document defines the controlled sequence for designing, implementing, integrating, and validating those approved requirements.

---

# 2. Implementation Principles

The implementation of Uni Flow shall follow these principles:

- Implement only the requirements defined in `Project_Requirement.md`.
- Preserve all approved requirement IDs.
- Preserve the Agent → Action → Entity → Relation model.
- Maintain the three approved agents: Admin, Faculty, and Student.
- Do not introduce unsupported roles, features, entities, or operations.
- Maintain role-based access throughout implementation.
- Consider security throughout the development lifecycle.
- Consider scalability and maintainability throughout development.
- Treat calculated values as results derived from their source data.
- Do not prematurely lock database technology or detailed database architecture.
- Validate every approved requirement.
- Maintain traceability from requirement through implementation and testing.

---

# 3. Implementation Sequence

The implementation shall follow this sequence:

```text
Project Requirements
        ↓
Requirement Analysis
        ↓
System Design
        ↓
Role & Access Design
        ↓
Module Implementation
        ↓
Module Integration
        ↓
Security & Reliability Verification
        ↓
Scalability & Maintainability Verification
        ↓
Requirement-Based Testing
        ↓
Final System Verification
```

Each stage must be validated before proceeding to the next stage.

---

# 4. Phase 1 — Requirement Baseline

## Objective

Establish the approved requirements as the baseline for implementation.

## Requirements

All 13 approved requirements.

## Key Tasks

- Read and analyse `Project_Requirement.md`.
- Use the approved requirement IDs as implementation references.
- Confirm the three approved agents:
  - Admin
  - Faculty
  - Student

- Confirm the approved Agent → Action → Entity → Relation mappings.
- Confirm the approved entities and calculated values.
- Confirm the approved role-based scope.
- Identify the boundaries of the approved requirements.

## Dependency

None.

## Validation

The implementation baseline matches `Project_Requirement.md` and contains no added or modified requirements.

---

# 5. Phase 2 — System Design

## Objective

Translate the approved requirements into an implementation-ready system design.

## Requirements

All 13 approved requirements.

## Key Tasks

- Analyse the approved entities and relationships.
- Define system responsibilities based only on the approved requirements.
- Define the data required to support each approved operation.
- Define the required data flows between related operations.
- Define role-based access boundaries.
- Define the user flow for approved operations.
- Prepare the design required for database, API, and UI/UX implementation.
- Keep database technology and detailed database architecture open until the appropriate technical-design stage.
- Do not introduce unsupported modules or entities.

## Dependency

Phase 1.

## Validation

The design is traceable to the approved requirements and is sufficient to guide implementation without prematurely locking a specific database architecture.

---

# 6. Phase 3 — Role and Access Foundation

## Objective

Establish role-based access according to the approved requirements.

## Requirements

ADM-01 to ADM-03
FAC-01 to FAC-05
STD-01 to STD-05

## Key Tasks

- Establish the three approved roles:
  - Admin
  - Faculty
  - Student

- Map approved operations to the appropriate role.
- Enforce role-based authorization.
- Prevent roles from performing operations not defined for them.
- Preserve the role boundaries defined in the requirement matrix.

## Dependency

Phases 1–2.

## Validation

Each role can access only its approved operations.

---

# 7. Phase 4 — Student Attendance

## Objective

Implement the approved student attendance functionality.

## Requirements

- ADM-01
- FAC-01
- FAC-03
- STD-01

## Key Tasks

- Record student attendance for assigned classes.
- Allow students to view their personal attendance records.
- Allow faculty to view attendance for their specific classes.
- Calculate the college-wide student attendance average required by ADM-01.
- Calculate the class-specific student attendance average required by FAC-03.
- Apply role-based access to attendance information.

## Dependency

Phases 1–3.

## Validation

ADM-01, FAC-01, FAC-03, and STD-01 are correctly implemented without introducing unsupported attendance functionality.

---

# 8. Phase 5 — Timetable

## Objective

Implement the shared Timetable functionality.

## Requirements

- FAC-02
- STD-02

## Key Tasks

- Maintain one Timetable entity for the approved requirements.
- Provide Faculty access to their teaching timetable.
- Provide Student access to their personal class timetable.
- Apply appropriate role-based access.

## Dependency

Phases 1–3.

## Validation

Faculty and Student receive the correct timetable information according to their approved requirements.

---

# 9. Phase 6 — Faculty Attendance Records

## Objective

Implement Admin access to faculty attendance records.

## Requirement

- ADM-03

## Key Tasks

- Provide Admin access to faculty attendance records.
- Apply role restrictions.
- Use only the functionality necessary to satisfy ADM-03.
- Do not invent an additional faculty attendance-taking or faculty attendance-management workflow unless such a requirement is formally approved.

## Dependency

Phases 1–3.

## Validation

Admin can correctly view faculty attendance records according to ADM-03.

---

# 10. Phase 7 — Marks and Academic Progress

## Objective

Implement the approved marks and academic progress functionality.

## Requirements

- FAC-04
- STD-03

## Key Tasks

- Allow Faculty to assign and upload marks for student tests.
- Allow Students to view test marks.
- Provide academic progress information supported by the approved requirement.
- Do not introduce an independent `AcademicProgress` entity unless the requirements are formally expanded.

## Dependency

Phases 1–3.

## Validation

FAC-04 and STD-03 are correctly implemented according to the approved requirement scope.

---

# 11. Phase 8 — Notice Management

## Objective

Implement the global Notice functionality.

## Requirements

- ADM-02
- FAC-05
- STD-05

## Key Tasks

- Allow Admin to create/post global Notices.
- Allow Faculty to view global Notices.
- Allow Students to view global Notices.
- Maintain `Notice` as the underlying entity.
- Treat Notice Board as the presentation/access concept rather than a separate database entity.

## Dependency

Phases 1–3.

## Validation

Admin can post global Notices, and Faculty and Students can view them according to the approved requirements.

---

# 12. Phase 9 — Holidays and Exam Schedule

## Objective

Implement Student access to upcoming holidays and exam dates.

## Requirement

- STD-04

## Key Tasks

- Provide Holiday information.
- Provide Exam Schedule information.
- Provide Student viewing access.
- Apply the approved role restrictions.

## Dependency

Phases 1–3.

## Validation

Students can correctly view upcoming holidays and exam dates.

---

# 13. Phase 10 — Module Integration

## Objective

Integrate all approved modules into one coherent Uni Flow system.

## Requirements

All 13 approved requirements.

## Key Tasks

- Integrate Admin, Faculty, and Student functionality.
- Verify data flows between related modules.
- Preserve module separation.
- Verify role-based access across modules.
- Verify relationships between related entities.
- Verify that calculated values are derived from appropriate source data.
- Verify consistency of shared information.

## Dependency

Phases 1–9.

## Validation

- All approved modules operate together.
- No approved requirement is lost.
- Permissions remain correct.
- Data remains consistent.
- No unsupported functionality is introduced.

---

# 14. Phase 11 — Security and Reliability Verification

## Objective

Verify secure and reliable system behaviour.

## Key Tasks

- Verify role-based authorization.
- Test unauthorized access paths.
- Validate input and data handling.
- Verify error handling.
- Protect sensitive operations.
- Verify data consistency.
- Test invalid and failure scenarios.
- Ensure errors do not expose unnecessary internal information.

## Dependency

Phase 10.

## Validation

- Role boundaries are enforced.
- Unauthorized operations are rejected.
- Invalid input is handled appropriately.
- Errors are handled safely.
- Core operations behave predictably.

---

# 15. Phase 12 — Scalability and Maintainability Verification

## Objective

Verify that the system can be extended without unnecessary redesign.

## Key Tasks

- Review module boundaries.
- Review separation of concerns.
- Minimize unnecessary coupling.
- Verify reusable components where appropriate.
- Ensure calculated values are derived from source data.
- Consider future growth without unnecessary enterprise complexity.
- Ensure future approved functionality can be added without unrelated rewrites.

## Dependency

Phase 10.

## Validation

- Responsibilities are clearly separated.
- Unnecessary coupling is minimized.
- Data and business responsibilities are appropriately separated.
- The system can be extended.
- Scalability is considered without overengineering.

---

# 16. Phase 13 — Agent → Action → Entity → Relation Traceability

The implementation must preserve the Agent → Action → Entity → Relation model defined in `Project_Requirement.md`.

| Requirement ID | Agent   | Action        | Entity                  | Relation                          |
| -------------- | ------- | ------------- | ----------------------- | --------------------------------- |
| ADM-01         | Admin   | View          | Student Attendance      | College-wide                      |
| ADM-02         | Admin   | Create/Post   | Notice                  | Global                            |
| ADM-03         | Admin   | View          | Faculty Attendance      | Faculty Records                   |
| FAC-01         | Faculty | Create/Update | Student Attendance      | Assigned Class                    |
| FAC-02         | Faculty | View          | Timetable               | Teaching Schedule                 |
| FAC-03         | Faculty | View          | Student Attendance      | Specific Class                    |
| FAC-04         | Faculty | Create/Update | Marks                   | Student Tests                     |
| FAC-05         | Faculty | View          | Notice                  | Global                            |
| STD-01         | Student | View          | Student Attendance      | Personal Records                  |
| STD-02         | Student | View          | Timetable               | Personal Class Schedule           |
| STD-03         | Student | View          | Marks                   | Student Tests / Academic Progress |
| STD-04         | Student | View          | Holiday & Exam Schedule | Upcoming Dates                    |
| STD-05         | Student | View          | Notice                  | Global                            |

## Traceability Rule

Every implemented function must remain traceable through:

```text
Requirement ID
      ↓
Agent
      ↓
Action
      ↓
Entity
      ↓
Relation
      ↓
Implementation
      ↓
Test
```

No implementation decision may change an approved Agent, Action, Entity, or Relation without an approved change to the source requirements.

---

# 17. Phase 14 — Requirement-Based Testing

## Objective

Verify every approved requirement through explicit test scenarios.

| Requirement ID | Verification                                   |
| -------------- | ---------------------------------------------- |
| ADM-01         | Verify college-wide student attendance average |
| ADM-02         | Verify global Notice posting                   |
| ADM-03         | Verify Faculty attendance viewing              |
| FAC-01         | Verify assigned-class attendance               |
| FAC-02         | Verify Faculty teaching timetable              |
| FAC-03         | Verify class attendance average                |
| FAC-04         | Verify mark assignment/upload                  |
| FAC-05         | Verify global Notice viewing                   |
| STD-01         | Verify personal attendance                     |
| STD-02         | Verify personal class timetable                |
| STD-03         | Verify marks and academic progress             |
| STD-04         | Verify holidays and exam dates                 |
| STD-05         | Verify global Notice viewing                   |

## Validation

All 13 approved requirements pass their defined test scenarios.

---

# 18. Phase 15 — Requirement Traceability Matrix

| Requirement ID | Implementation Phase | Testing Phase |
| -------------- | -------------------- | ------------- |
| ADM-01         | Phase 4              | Phase 14      |
| ADM-02         | Phase 8              | Phase 14      |
| ADM-03         | Phase 6              | Phase 14      |
| FAC-01         | Phase 4              | Phase 14      |
| FAC-02         | Phase 5              | Phase 14      |
| FAC-03         | Phase 4              | Phase 14      |
| FAC-04         | Phase 7              | Phase 14      |
| FAC-05         | Phase 8              | Phase 14      |
| STD-01         | Phase 4              | Phase 14      |
| STD-02         | Phase 5              | Phase 14      |
| STD-03         | Phase 7              | Phase 14      |
| STD-04         | Phase 9              | Phase 14      |
| STD-05         | Phase 8              | Phase 14      |

**Requirement Coverage: 13/13**

---

# 19. Phase 16 — Final System Verification

## Objective

Perform complete final verification of the Uni Flow system.

## Verification Areas

- Functional correctness
- Requirement coverage
- Agent → Action → Entity → Relation traceability
- Role-based access
- Security
- Reliability
- Scalability
- Maintainability
- Module integration
- Error handling

## Final Acceptance Criteria

- All 13 requirements are implemented and verified.
- Role permissions are correct.
- Approved user flows work correctly.
- Security checks pass.
- Error handling works correctly.
- Integration checks pass.
- Scalability and maintainability checks pass.
- No unsupported features are introduced.
- Every implemented function is traceable to an approved requirement.

---

# 20. Builder AI Execution Rules

Builder AI must follow this controlled process:

```text
Read Project_Requirement.md
        ↓
Analyse Requirement IDs
        ↓
Preserve Agent → Action → Entity → Relation
        ↓
Follow Implementation Plan
        ↓
Design
        ↓
Implement Only Approved Scope
        ↓
Validate
        ↓
Check Security
        ↓
Check Maintainability
        ↓
Check Scalability
        ↓
Test Requirements
        ↓
Confirm Completion
```

Builder AI must:

- Treat `Project_Requirement.md` as the source of truth.
- Follow this Implementation Plan as the controlled development path.
- Implement only approved requirements.
- Never invent unsupported functionality.
- Never add new agents without approved requirements.
- Never add new entities without requirement support.
- Preserve the approved role boundaries.
- Preserve Agent → Action → Entity → Relation traceability.
- Validate each phase before proceeding.
- Maintain security throughout implementation.
- Maintain modularity and maintainability.
- Consider scalability without unnecessary complexity.
- Resolve implementation ambiguity using the approved requirement model.
- Keep the implementation within the defined project scope.
- Do not select a database technology or detailed architecture merely because it is convenient; such decisions must be made at the appropriate technical-design stage.

---

# 21. Source-of-Truth Rule

The development flow is:

```text
Project_Requirement.md
        ↓
Implementation Plan
        ↓
System Design
        ↓
Builder AI Development
        ↓
Testing & Verification
        ↓
Final Uni Flow System
```

## Responsibilities

- `Project_Requirement.md` defines **what the system must provide**.
- `Implementation_Plan.md` defines **the controlled path for developing it**.
- System design translates approved requirements into an implementation-ready design.
- Builder AI uses the approved requirements and implementation plan to perform development.
- Testing verifies that the implementation satisfies the approved requirements.
- No implementation decision may override the approved requirements.

---

# 22. Change Control Rule

No requirement may be:

- Added
- Removed
- Changed
- Reinterpreted as a new feature

during implementation without first updating and approving `Project_Requirement.md`.

The Implementation Plan must then be updated to reflect the approved requirement change.

---

# 23. Final Implementation Principle

The implementation of Uni Flow must remain:

**Requirement-driven → Traceable → Role-based → Secure → Maintainable → Scalable → Testable**

The system must implement the approved requirements without unnecessary features, unnecessary entities, premature architectural decisions, or unsupported functionality.

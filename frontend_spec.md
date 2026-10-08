# UniFlow Frontend Specification

**Project:** UniFlow — College Management and Student Services Portal  
**Document type:** Frontend design and implementation specification  
**Status:** Blueprint for frontend implementation  
**Source documents:** `project_requirements.md`, `database_architecture.md`, `api_spec.md`, and `implementation_plan.md`

---

## 1. Purpose and scope

This document defines the frontend blueprint for UniFlow before full frontend
implementation. It describes role-specific screens and user flows, navigation,
page layouts, UI components, visual styling, responsive behaviour,
accessibility, animation recommendations, API integration, client-side
fetching and caching, loading/error/empty states, identity integration points,
frontend structure, and requirement traceability.

The frontend represents only the approved Admin, Faculty, and Student
requirements. The functional source of truth is `project_requirements.md`; API
methods and routes come from `api_spec.md`; database entities and columns come
from `database_architecture.md`. `implementation_plan.md` requires modular
implementation, role separation, requirement-based validation, and no
unsupported functionality. It does not authorize new product features.

The specification distinguishes between:

- **Specified:** the source documents define the requirement and route.
- **Mapped:** the API document maps the route to existing database tables.
- **Requires clarification:** a route, operation, result shape, or data
  relationship is incomplete or has no database mapping.

All routes are included for traceability. Showing a screen or navigation
destination does not imply that a blocked API mapping is ready to implement.
No additional roles, APIs, database tables, entities, permissions, or business
workflows are introduced here.

## 2. Approved roles and responsibilities

UniFlow has exactly three primary agents:

| Role | Approved frontend responsibility | Requirements |
| --- | --- | --- |
| Admin | View average college-wide student attendance; post global announcements to the Notice Board; view faculty attendance records. | ADM-01, ADM-02, ADM-03 |
| Faculty | Take daily attendance for assigned classes; view personal teaching timetable; view average student attendance for specific classes; assign/upload marks for student tests; view the global Notice Board. | FAC-01–FAC-05 |
| Student | View personal attendance records; view personal class timetable; check test marks and academic progress; view upcoming holidays and exam dates; view the global Notice Board. | STD-01–STD-05 |

The source role matrix defines no operations for a role where it shows a dash.
Frontend navigation and available actions must preserve these boundaries.

## 3. Frontend architecture and data flow

### 3.1 Layer relationship

```text
Role-specific frontend page and UI components
                  ↓
Centralized API client, endpoint modules, and query/mutation hooks
                  ↓
FastAPI API routes under /api/v1/
                  ↓
PostgreSQL tables and documented tenant isolation
```

The browser does not connect directly to PostgreSQL. UI components request
data through the API layer; the backend performs the documented database
operations and returns results for display. Tenant isolation is enforced by the
backend/database architecture, not by frontend filtering.

### 3.2 General request flow

```text
User selects an approved role navigation item
                  ↓
Page invokes its route-specific query or mutation
                  ↓
Central API client sends the documented HTTP request as JSON
                  ↓
FastAPI performs the API-spec operation
                  ↓
Database reads/writes only the mapped existing table(s)
                  ↓
API result or safe error returns to the frontend
                  ↓
Page renders loading, error, empty, or returned-data state
```

The API specification does not define response schemas for most routes or
request bodies for the mutations. The frontend must not guess those contracts.
Use the routes as specified and defer affected forms/data views until the
missing contracts are clarified.

### 3.3 Dashboard data boundary

The API specification defines no dashboard-specific endpoints. Each role
dashboard is therefore a navigation landing page with links/cards for that
role's approved requirements. It must not show invented statistics, counts,
recent activity, or aggregate previews. Where a dashboard card displays
requirement data, it must call the exact mapped requirement endpoint and
respect that endpoint's clarification status.

## 4. Role navigation

Navigation contains only approved role actions and the dashboard entry point
requested for the portal.

| Admin | Faculty | Student |
| --- | --- | --- |
| Dashboard | Dashboard | Dashboard |
| Student Attendance | Class Attendance | Attendance |
| Faculty Attendance | Teaching Timetable | Class Timetable |
| Notice Board | Attendance Average | Marks / Academic Progress |
|  | Marks | Holidays / Exam Dates |
|  | Notice Board | Notice Board |

The dashboard is a frontend landing/navigation screen, not a new backend
feature. Menu labels may use the terminology in the requirement sheet and API
specification. Do not add links for functionality not listed above. Role-based
rendering is a presentation boundary; actual authorization remains a backend
responsibility.

## 5. Role flows

The requirements specify role responsibilities, but do not define a login page,
authentication protocol, or login/session API endpoint. Flows below begin with
an already established role context. The method by which that context is
established is **Requires clarification**; do not invent a login workflow.

### 5.1 Admin user flow

```text
Admin role context
  ↓
Admin Dashboard
  ↓
Student Attendance Average (ADM-01)
  ↓
Faculty Attendance (ADM-03)
  ↓
Notice Board / Create Notice (ADM-02)
```

For each selected screen: the frontend calls the existing route when its
contract is usable; FastAPI performs its documented operation; the backend
returns the result or an error; the frontend displays the applicable state.
ADM-01's average rule and ADM-02/ADM-03 data mappings require clarification.

### 5.2 Faculty user flow

```text
Faculty role context
  ↓
Faculty Dashboard
  ↓
Assigned Class Attendance (FAC-01)
  ↓
Teaching Timetable (FAC-02)
  ↓
Class Attendance Average (FAC-03)
  ↓
Marks (FAC-04)
  ↓
Notice Board (FAC-05)
```

FAC-01 create/update operations map to classes and student attendance records.
The timetable, averaging rule, marks mapping, and notices are incomplete or
blocked as identified in the API specification. The UI must not simulate
success or populate guessed data for those screens.

### 5.3 Student user flow

```text
Student role context
  ↓
Student Dashboard
  ↓
Personal Attendance (STD-01)
  ↓
Class Timetable (STD-02)
  ↓
Marks / Academic Progress (STD-03)
  ↓
Holidays / Exam Dates (STD-04)
  ↓
Notice Board (STD-05)
```

STD-01 maps to attendance records. STD-02, STD-03, STD-04, and STD-05 have
incomplete data mappings or response contracts. Keep their destinations
visible for requirement traceability but do not present unsupported data as
available.

## 6. Page-by-page screen specifications

### 6.1 Shared states and interaction contract

All API-backed pages use these states:

- **Loading:** keep page structure and navigation visible; use a content-shaped
  skeleton or table-row placeholders. Do not show an empty state before the
  initial request has resolved.
- **Error:** show a brief user-readable message without backend internals. A
  read may expose an explicit retry action. A failed mutation must not be
  presented as successful.
- **Empty:** when a mapped GET request returns no records, state that no
  records are currently available. Empty is not an error and must not imply an
  unapproved create action.
- **Success:** render only data actually returned by the documented API.
- **Blocked mapping/contract:** mark the view as **Requires clarification** in
  implementation tracking. Do not fabricate an empty result, placeholder
  records, fields, or successful operation.

### 6.2 Admin pages

#### Admin Dashboard

- **Purpose:** provide entry points to ADM-01, ADM-02, and ADM-03.
- **Content:** links/cards for Student Attendance, Faculty Attendance, and
  Notice Board. No unrelated totals or summaries.
- **Actions:** navigate to one of those screens.
- **API/data:** no dashboard API exists in `api_spec.md`; any data shown belongs
  to the relevant child screen.
- **States:** navigation shell only; child screens own API loading/error/empty
  states.

#### Student Attendance Average (ADM-01)

- **Purpose:** view the average college-wide student attendance.
- **Content:** returned average only; average is a calculated result, not an
  entity.
- **Action:** request/view the college-wide average. The API query parameters
  are fixed; no extra filters are defined.
- **API:** `GET /api/v1/admin/attendance?scope=college&aggregate=average`.
- **Database:** read `attendance_records`, calculate a read-only average.
- **Loading/error/empty/success:** summary skeleton; safe read error; empty/no
  result only if explicitly returned; display the returned value on success.
- **Requires clarification:** exact averaging rule, including the treatment of
  attendance statuses and denominator, and response shape.

#### Faculty Attendance (ADM-03)

- **Purpose:** view faculty attendance records.
- **Content:** only fields defined by a future confirmed response contract.
- **Action:** request/view records; no editing/filtering is specified.
- **API:** `GET /api/v1/admin/faculty-attendance`.
- **Database:** not defined. The architecture's `attendance_records` table
  represents student attendance and cannot stand in for faculty attendance.
- **Loading/error/empty/success:** standard states apply only after the
  endpoint/data contract is available.
- **Requires clarification:** faculty-attendance data source and response
  fields.

#### Notice Board / Create Notice (ADM-02)

- **Purpose:** allow Admin to post a global announcement.
- **Content:** a create form only after request fields are defined. No Admin
  notice-list GET endpoint is specified.
- **Action:** create/post global notice; no update/delete actions are defined.
- **API:** `POST /api/v1/admin/notices`.
- **Database:** not defined; no notice table exists in the architecture.
- **Loading/error/success:** disable the submit control while pending; show a
  safe failure while preserving user-entered form state where possible; report
  success only after confirmed API success.
- **Requires clarification:** request fields, response contract, and persistence
  mapping. Do not invent a title, body, date, or other field.

### 6.3 Faculty pages

#### Faculty Dashboard

- **Purpose:** entry points to FAC-01–FAC-05.
- **Content:** links/cards for Class Attendance, Teaching Timetable, Attendance
  Average, Marks, and Notice Board; no invented class counts or metrics.
- **Actions:** navigate to an approved Faculty requirement screen.
- **API/data:** no dashboard API is specified.
- **States:** navigation shell; child screens own data states.

#### Assigned Class Attendance (FAC-01)

- **Purpose:** take daily attendance for assigned classes and update an
  existing record, as supported by the API routes.
- **Content:** class/student attendance information only when supplied by the
  documented API. `api_spec.md` provides no roster/list GET route.
- **Actions:** create attendance; update a matching record for class, student,
  and session date.
- **API:** `POST /api/v1/faculty/classes/{class_id}/attendance`;
  `PUT /api/v1/faculty/classes/{class_id}/attendance/{student_id}?session_date={date}`.
- **Database:** select assigned class and insert/update `attendance_records`.
- **Loading/error/empty/success:** use table/form skeletons only for supported
  data loads; disable mutation submit while pending; present safe errors; show
  success only on API confirmation. Roster-empty behaviour depends on a roster
  contract that is currently absent.
- **Requires clarification:** request/response fields, whether POST is
  single-record or batch, class/student roster source, and date/body contract.
  Database attendance status values are `present`, `absent`, `late`, and
  `excused`; use these only if confirmed in the API request contract.

#### Teaching Timetable (FAC-02)

- **Purpose:** view personal teaching timetable.
- **Content:** class information returned by the route; no invented meeting
  days or times.
- **Action:** request/view timetable.
- **API:** `GET /api/v1/faculty/timetable`.
- **Database:** `classes`, filtered to the Faculty member as described by the
  API spec.
- **Loading/error/empty/success:** standard GET states; success displays only
  response fields.
- **Requires clarification:** `classes` has no meeting-day/time fields, so the
  complete timetable cannot be displayed from the documented architecture.

#### Class Attendance Average (FAC-03)

- **Purpose:** view average student attendance for a specific class.
- **Content:** returned class average, a calculated result and not a new entity.
- **Action:** request/view the average for a class ID.
- **API:** `GET /api/v1/faculty/classes/{class_id}/attendance?aggregate=average`.
- **Database:** select `classes` and its `attendance_records`, calculate a
  read-only class average.
- **Loading/error/empty/success:** summary skeleton; safe read error; show
  returned average only after a valid response.
- **Requires clarification:** average calculation rule and class-ID
  selection/source.

#### Marks (FAC-04)

- **Purpose:** assign/upload and update student test marks.
- **Content:** test/student/mark data only after a contract and mapping exist.
- **Actions:** upload marks; update marks for a student.
- **API:** `POST /api/v1/faculty/classes/{class_id}/tests/{test_id}/marks`;
  `PUT /api/v1/faculty/classes/{class_id}/tests/{test_id}/marks/{student_id}`.
- **Database:** not defined; there is no tests/marks table. `enrollments.final_grade`
  is not individual test marks.
- **Loading/error/success:** mutation progress and error states can be designed;
  no data success state or form fields may be implemented before clarification.
- **Requires clarification:** marks schema, request/response fields, and
  persistence mapping.

#### Notice Board (FAC-05)

- **Purpose:** view global Notice Board.
- **Content:** notice fields returned by a confirmed endpoint contract.
- **Action:** request/view notices only.
- **API:** `GET /api/v1/faculty/notices`.
- **Database:** not defined; no notice table exists.
- **Loading/error/empty/success:** standard GET states after a usable data
  contract exists.
- **Requires clarification:** persistence mapping and response fields.

### 6.4 Student pages

#### Student Dashboard

- **Purpose:** entry points to STD-01–STD-05.
- **Content:** links/cards for Attendance, Class Timetable, Marks / Academic
  Progress, Holidays / Exam Dates, and Notice Board. No invented personal
  statistics.
- **Actions:** navigate to an approved Student requirement screen.
- **API/data:** no dashboard API is specified.
- **States:** navigation shell; child screens own data states.

#### Personal Attendance (STD-01)

- **Purpose:** view personal attendance records.
- **Content:** records returned for the current Student; use only fields
  returned by the API.
- **Action:** request/view personal attendance.
- **API:** `GET /api/v1/students/me/attendance`.
- **Database:** `attendance_records`, restricted to current Student by backend
  operation.
- **Loading/error/empty/success:** table/list skeleton; safe read error; “no
  attendance records” for a confirmed empty result; display returned records
  only on success.

#### Class Timetable (STD-02)

- **Purpose:** view personal class timetable.
- **Content:** classes related to the Student's enrollments, limited to API
  response fields.
- **Action:** request/view timetable.
- **API:** `GET /api/v1/students/me/timetable`.
- **Database:** `enrollments` and `classes`.
- **Loading/error/empty/success:** standard GET states.
- **Requires clarification:** `classes` has no meeting days/times; complete
  timetable content cannot be derived.

#### Marks / Academic Progress (STD-03)

- **Purpose:** check test marks and academic progress.
- **Content:** the API maps to `enrollments.final_grade`; that is a final grade
  and must not be presented as an individual test mark. No independent
  AcademicProgress entity is defined.
- **Action:** request/view marks/progress.
- **API:** `GET /api/v1/students/me/marks`.
- **Database:** `enrollments`, specifically `final_grade` as noted in
  `api_spec.md`.
- **Loading/error/empty/success:** standard states only after response/display
  contract is clarified.
- **Requires clarification:** individual test-mark data and the relationship of
  academic progress to available data.

#### Holidays / Exam Dates (STD-04)

- **Purpose:** view upcoming holidays and exam dates.
- **Content/action:** upcoming dates only after API response fields and source
  data are defined.
- **API:** `GET /api/v1/students/academic-calendar`.
- **Database:** not defined; no holiday or exam-schedule table exists.
- **Loading/error/empty/success:** standard states after mapping and response
  contract are clarified.
- **Requires clarification:** database mapping and returned date fields.

#### Notice Board (STD-05)

- **Purpose:** view global Notice Board.
- **Content:** notices returned by a confirmed API contract.
- **Action:** request/view notices only.
- **API:** `GET /api/v1/students/notices`.
- **Database:** not defined; no notice table exists.
- **Loading/error/empty/success:** standard GET states after a usable data
  contract exists.
- **Requires clarification:** persistence mapping and response fields.

## 7. Dashboard and layout design

### 7.1 Shared shell

- **Header:** concise product name and current screen title.
- **Role navigation:** only the items defined in Section 4.
- **Content area:** page-specific requirement content or navigation cards.
- **Summary cards:** may group navigation or present a returned requirement
  result; do not add dashboard statistics.
- **Tables/lists:** use only where a mapped endpoint supplies records and
  confirmed response fields.
- **Filters:** do not add filters beyond parameters in `api_spec.md`. ADM-01
  query values are `scope=college` and `aggregate=average`; FAC-03 uses
  `aggregate=average`. No other filter is specified.

### 7.2 Role landing layouts

- **Admin:** links/cards for Student Attendance Average, Faculty Attendance,
  and Notice Board/Create Notice.
- **Faculty:** links/cards for Assigned Class Attendance, Teaching Timetable,
  Class Attendance Average, Marks, and Notice Board.
- **Student:** links/cards for Personal Attendance, Class Timetable, Marks /
  Academic Progress, Holidays / Exam Dates, and Notice Board.

The Admin average may be shown as a dashboard value only if retrieved from
ADM-01's endpoint; its calculation contract must first be resolved. Other
blocked areas must not display fabricated preview data.

## 8. Visual design system

The source documents do not specify a brand palette. The following tokens are
frontend presentation recommendations, not product requirements; confirm
institutional branding before implementation. Use color plus text/icon labels
for status and verify contrast in the implemented components.

| Token | Suggested value | Use |
| --- | --- | --- |
| Primary | Deep navy `#17324D` | Primary actions, navigation emphasis, links. |
| Secondary | Muted teal `#2B7A78` | Secondary emphasis and selected non-primary controls. |
| Page background | Cool off-white `#F5F7FA` | Main page canvas. |
| Surface | White `#FFFFFF` | Cards, forms, and table surfaces. |
| Main text | Dark slate `#17212B` | Body text and headings. |
| Secondary text | Slate `#526273` | Supporting text, subject to contrast checks. |
| Border | Neutral slate `#D8E0E8` | Card/table/control boundaries. |
| Success | Dark green `#247A4B` | Confirmed success status plus text/icon. |
| Warning | Dark amber `#8A5A00` | Warning status plus text/icon. |
| Error | Dark red `#B42318` | Error status plus text/icon. |
| Information | Accessible blue `#175CD3` | Informational messages plus text/icon. |

Avoid excessive gradients, decorative effects, and color-only meaning.

## 9. Typography and spacing

### Typography

- Use a system UI sans-serif stack unless a project-wide font standard is
  approved separately.
- Page title: approximately 24–32 px, semibold.
- Section title: approximately 18–22 px, semibold.
- Body/table text: approximately 14–16 px.
- Labels and buttons: approximately 14–16 px, medium weight.
- Helper/error text: approximately 13–14 px; keep legible at normal zoom.
- Use semantic heading order, readable line height, and consistent weight.

### Spacing

Use a consistent 4 px base spacing scale: 4, 8, 12, 16, 24, 32, and 48 px.
Use 16–24 px internal card padding on wide layouts and 12–16 px on narrow
layouts. These are visual implementation values, not functional behaviour.
Keep form labels, controls, and their validation messages closely associated.

## 10. shadcn/ui components

Use shadcn/ui components only where they serve a requirement screen:

| Component | Usage |
| --- | --- |
| `Button` | Role navigation and the approved create/update submission actions. |
| `Card` | Dashboard navigation cards and grouped read-only result presentation. |
| `Table` | Attendance records and other mapped record collections after response fields are confirmed. |
| `Badge` | Attendance status display when returned by the API; use the database's allowed status vocabulary only where the API contract confirms it. |
| `Input` | Form fields only after request fields have been defined by an API contract. |
| `Select` | Only for a choice set returned/defined by an API contract; do not invent class/student options or endpoints. |
| `Alert` | Accessible read errors, form errors, or clarification-blocked notices during implementation. |
| `Skeleton` | Loading state for cards, lists, and tables. |
| `Toast` | Brief mutation confirmation/error; do not treat toast appearance as success unless API confirms success. |
| `Sidebar` | Persistent desktop role navigation. |
| `Sheet` | Compact mobile role navigation. |

Do not add components to introduce extra flows. Dialog, tabs, and dropdown
actions are not required by the approved requirements.

## 11. Data presentation patterns

| Information | Presentation | Restriction |
| --- | --- | --- |
| Student attendance records | Table on wide screens; stacked/scrollable responsive form on mobile. | Show API-returned fields only. |
| Attendance averages | One labelled numeric result or summary card. | Calculated result, not entity. No formula/chart invented. |
| Faculty attendance records | Table after mapping and response fields are clarified. | Do not use student `attendance_records` as faculty records. |
| Timetables | List/table of returned class data. | Do not show invented weekday/time fields; current `classes` lacks them. |
| Marks | List/table after test-mark API/database contract exists. | `final_grade` is not individual test marks. |
| Notices | Simple notice list only for Faculty/Student if their GET contract and data mapping are defined. | Admin has no notice-list GET route; do not add one. |
| Holidays/exam dates | List of dates once mapped response exists. | No corresponding table is defined. |

Progress charts and other visualizations are not required by the source
documents and are not included.

## 12. Forms and data entry

Forms correspond only to approved create/update requirements:

| Form | Route(s) | Supported form information | Unresolved information |
| --- | --- | --- | --- |
| Admin global notice | `POST /api/v1/admin/notices` | Create/post action only. | No request fields, response schema, or notice table. Do not invent title/body/date fields. |
| Faculty class attendance | `POST /api/v1/faculty/classes/{class_id}/attendance`; `PUT /api/v1/faculty/classes/{class_id}/attendance/{student_id}?session_date={date}` | Assigned-class attendance create/update operation; DB attendance status constraint enumerates `present`, `absent`, `late`, `excused`. | Request body, single/batch shape, student roster source, response, and exact field validation. |
| Faculty test marks | `POST /api/v1/faculty/classes/{class_id}/tests/{test_id}/marks`; `PUT /api/v1/faculty/classes/{class_id}/tests/{test_id}/marks/{student_id}` | Assign/upload and update action only. | No marks/test entity/table, request fields, validation range, or response shape. |

For confirmed forms, associate errors with their input, disable the relevant
submit action while pending, preserve entered values after recoverable failure,
and confirm only on API success. These interaction practices do not expand the
approved operations.

## 13. API integration architecture and exact plug-in points

### 13.1 API client organization

- A centralized API client owns the configured `/api/v1/` base URL, JSON
  request/response handling, and user-safe error normalization.
- Organize endpoint functions by requirement/role, not as raw calls scattered
  through components.
- Use GET query hooks for documented GET routes and mutation hooks for
  documented POST/PUT routes.
- Presentation components render query/mutation states and do not implement
  HTTP details.
- Do not add endpoints. Preserve path parameters and query parameters exactly
  as specified in `api_spec.md`.
- Response schemas and most request bodies are not defined by the API source;
  do not assume payload fields.

### 13.2 Exact endpoint plug-in table

| Requirement / page | Method and exact endpoint | API operation | Database mapping | Frontend result / limitation |
| --- | --- | --- | --- | --- |
| ADM-01 Student Attendance Average | GET `/api/v1/admin/attendance?scope=college&aggregate=average` | Select records and calculate read-only average. | `attendance_records` | Display returned average; precise calculation rule/response **Requires clarification**. |
| ADM-02 Admin Create Notice | POST `/api/v1/admin/notices` | Create/post global announcement. | Not defined | Form fields and table mapping **Require clarification**. |
| ADM-03 Faculty Attendance | GET `/api/v1/admin/faculty-attendance` | Select faculty attendance records. | Not defined | Data source/response **Require clarification**. |
| FAC-01 Create class attendance | POST `/api/v1/faculty/classes/{class_id}/attendance` | Select assigned class; insert attendance. | `classes`, `attendance_records` | Request/response and roster contract **Require clarification**. |
| FAC-01 Update class attendance | PUT `/api/v1/faculty/classes/{class_id}/attendance/{student_id}?session_date={date}` | Select assigned class; update matching record. | `classes`, `attendance_records` | Request body/response **Require clarification**. |
| FAC-02 Teaching Timetable | GET `/api/v1/faculty/timetable` | Select classes assigned to faculty member. | `classes` | Meeting day/time fields are absent; complete schedule **Requires clarification**. |
| FAC-03 Class Attendance Average | GET `/api/v1/faculty/classes/{class_id}/attendance?aggregate=average` | Select class/attendance and calculate read-only class average. | `classes`, `attendance_records` | Average rule/response **Requires clarification**. |
| FAC-04 Create/upload marks | POST `/api/v1/faculty/classes/{class_id}/tests/{test_id}/marks` | Assign/upload marks. | Not defined | Test/marks mapping and request/response **Require clarification**. |
| FAC-04 Update marks | PUT `/api/v1/faculty/classes/{class_id}/tests/{test_id}/marks/{student_id}` | Update test marks. | Not defined | Test/marks mapping and request/response **Require clarification**. |
| FAC-05 Notice Board | GET `/api/v1/faculty/notices` | Select global notices. | Not defined | Notice table/response **Require clarification**. |
| STD-01 Personal Attendance | GET `/api/v1/students/me/attendance` | Select attendance records for current student. | `attendance_records` | Display current student's returned records. |
| STD-02 Class Timetable | GET `/api/v1/students/me/timetable` | Select current student's enrollments and related classes. | `enrollments`, `classes` | Meeting day/time fields absent; complete schedule **Requires clarification**. |
| STD-03 Marks / Academic Progress | GET `/api/v1/students/me/marks` | Select `final_grade`; marks/progress mapping incomplete. | `enrollments` | Do not equate final grade with individual test marks; **Requires clarification**. |
| STD-04 Holidays / Exam Dates | GET `/api/v1/students/academic-calendar` | Select upcoming calendar information. | Not defined | No holiday/exam table or response mapping; **Requires clarification**. |
| STD-05 Notice Board | GET `/api/v1/students/notices` | Select global notices. | Not defined | Notice table/response **Requires clarification**. |

### 13.3 Requirement API data flow

For every row above, frontend integration follows:

```text
Requirement screen → exact listed endpoint → documented backend operation
→ listed existing database table(s) or "not defined" → returned result/state
```

If a mapping is marked “not defined,” the route remains documented but the
frontend must not fabricate table data or claim the function is complete.

## 14. TanStack React Query: fetching and caching

Use TanStack React Query for server state unless the frontend repository later
establishes an already approved equivalent. Query caching does not alter the
backend contract or add user-visible functionality.

### Query organization

Use keys scoped by role and resource, adding route identifiers where present.
Examples:

```text
["admin", "attendance", "college", "average"]
["admin", "faculty-attendance"]
["faculty", "timetable"]
["faculty", "class-attendance", classId, "average"]
["student", "attendance"]
["student", "timetable"]
["student", "marks"]
```

Only create active queries for the exact GET routes in Section 13. Include
tenant/role context in cache isolation as provided by the eventual session
integration; the session mechanism itself is not specified.

### Freshness and refetching

- Keep server state in the query cache; do not duplicate it in a global UI
  store.
- A concrete stale-time value, background refresh interval, and freshness
  service-level target are not in the sources and **Require clarification**.
- Use normal query lifecycle/refetch on screen entry or explicit user refresh;
  the source documents do not request polling.
- Do not persist sensitive attendance or marks data to long-lived browser
  storage unnecessarily.

### Mutations and invalidation

- Mutations exist only for ADM-02 POST, FAC-01 POST/PUT, and FAC-04 POST/PUT.
- After confirmed FAC-01 mutation success, invalidate the matching
  class-specific attendance-related query keys if such a query is backed by an
  approved route. Do not invent an attendance-list GET endpoint.
- Invalidate ADM-02/FAC-04-related cache only when a confirmed read query and
  endpoint contract exist; do not assume an Admin notice-list route.
- Do not automatically retry non-idempotent POST requests.
- Mutation success state is shown only after API success.

## 15. Authentication and session integration

`database_architecture.md` defines `users`, a role field constrained to
`ADMIN`, `FACULTY`, or `STUDENT`, and tenant isolation using `college_id` and
PostgreSQL RLS context. The implementation plan requires role-based access,
security checks, and rejection of unauthorized operations. However,
`api_spec.md` defines no login, token, session, logout, or identity endpoint and
does not specify how the frontend receives the authenticated user's role or
tenant.

Therefore:

- The frontend needs an authenticated role/session context to render the
  approved navigation, but the provider, transport, and lifecycle are
  **Requires clarification**.
- Do not invent login screens, password flows, token storage, or authentication
  APIs in this specification.
- Frontend role checks only control presentation; backend authorization is
  required.
- Do not expose credentials/secrets in client code or persist sensitive data
  unnecessarily.
- Tenant selection/resolution must follow a confirmed backend/session
  integration; do not add a tenant-selection feature by assumption.

## 16. Loading, empty, and error states

### Loading

- Preserve the page shell and heading while data is requested.
- Use skeleton cards for a single calculated result and skeleton rows for
  record tables/lists.
- Disable only the relevant submission action during a mutation; expose
  progress text/indicator and retain keyboard focus.
- Do not flash an empty state before the request resolves.

### Empty

For a successful mapped request with no records, use a neutral message such as
“No attendance records are currently available.” Equivalent messages may refer
to timetable records, marks, notices, holidays, or exam dates only where the
corresponding API returns a confirmed empty result. Empty data is not an API
failure. Do not show mock records or offer unapproved actions from empty states.

### Error

- **Read/API/network error:** show a concise, user-readable failure; provide a
  retry for safe GET requests.
- **Validation error:** display only errors grounded in the confirmed API
  contract; associate errors with fields.
- **Mutation error:** preserve recoverable form values and do not report
  success.
- **Unauthorized/forbidden:** hide protected content and show an appropriate
  access message. Exact error/status contract is not specified by `api_spec.md`
  and **Requires clarification**.
- Never expose stack traces, SQL details, secrets, or internal error payloads.
- For routes with unresolved database mapping, the development specification
  says **Requires clarification**; do not make a guessed request appear as
  successful empty content.

## 17. Responsive and mobile behaviour

- **Desktop/laptop:** persistent sidebar; content region with readable maximum
  width; tables for mapped multi-record data.
- **Tablet:** compact/collapsible role navigation; cards may use two columns
  when readable.
- **Mobile:** role navigation in a keyboard-accessible sheet; one-column page
  content; stack form controls and labels.
- Tables should reflow to labelled stacked rows where clear, or use an
  explicitly labelled contained horizontal-scroll region; avoid whole-page
  horizontal overflow.
- Preserve table headers/row context for screen readers.
- Maintain readable body text and adequate touch targets; do not shrink text to
  force a wide table onto a narrow viewport.
- Keep a clear visual order when cards and data stack.

## 18. Accessibility and usability

- Use semantic HTML landmarks, one primary heading per screen, logical
  heading nesting, semantic tables, and native controls.
- Ensure all navigation and forms are keyboard-operable with visible focus and
  predictable focus order.
- Provide explicit labels, helpful field descriptions, and associated
  validation messages.
- Use clear action labels; do not rely on unlabeled icon-only buttons.
- Meet WCAG AA contrast targets and pair status colors with text/icons.
- Announce async status and validation feedback accessibly; avoid unexpectedly
  moving focus.
- Use ARIA only when native semantics are insufficient.
- Test keyboard and screen-reader use for all three roles and responsive
  navigation.
- Respect reduced-motion preferences for optional animations.

## 19. ReactBits recommendations and animation guidelines

The sources do not prescribe an animation library. Exactly two optional
ReactBits components are recommended for restrained presentation enhancement;
they do not add features or alter results.

| ReactBits component | Purpose and location | Professional/accessibility constraints |
| --- | --- | --- |
| `AnimatedContent` | A brief entrance treatment for the content area when navigating to an approved role screen. | Short, low-distance fade/translate only; do not delay data rendering or animate on every update. Disable/reduce under `prefers-reduced-motion`. |
| `CountUp` | Subtle transition of a returned attendance-average number on ADM-01/FAC-03 after the averaging result contract is confirmed. | Only animate a real API-returned value; no looping, brief duration, static value for reduced motion. It must not imply a calculation method. |

If the selected ReactBits version does not provide these components or their
accessibility/performance cannot be verified, use static UI; implementation
compatibility **Requires clarification**. No other animations are required.

General guidelines:

- Animations are optional, brief, and consistent.
- Do not interfere with focus, keyboard navigation, forms, or data loading.
- Respect `prefers-reduced-motion`.
- Avoid large movement, looping decoration, and animation used only for
  decoration.

## 20. Frontend implementation structure

The implementation plan requires a clean modular project foundation and
reusable components. The following is a frontend organization proposal, not a
backend API route map:

```text
src/
├── app/
│   ├── layouts/
│   │   ├── AdminLayout
│   │   ├── FacultyLayout
│   │   └── StudentLayout
│   └── pages/
│       ├── admin/
│       │   ├── Dashboard
│       │   ├── StudentAttendance
│       │   ├── FacultyAttendance
│       │   └── CreateNotice
│       ├── faculty/
│       │   ├── Dashboard
│       │   ├── ClassAttendance
│       │   ├── Timetable
│       │   ├── AttendanceAverage
│       │   ├── Marks
│       │   └── Notices
│       └── student/
│           ├── Dashboard
│           ├── Attendance
│           ├── Timetable
│           ├── Marks
│           ├── AcademicCalendar
│           └── Notices
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── dashboard/
│   ├── attendance/
│   ├── timetable/
│   ├── marks/
│   ├── notices/
│   ├── calendar/
│   └── shared/
└── lib/
    ├── api/
    ├── queries/
    └── utilities/
```

Clarification-blocked pages may remain page/component boundaries for
traceability, but must not implement guessed data or behavior.

## 21. Requirement-to-screen and database traceability

Every source requirement is retained below. “Not defined” means
`api_spec.md` identifies no database mapping; it does not authorize a new table.

| Requirement | Role | Screen | UI action/component | API method and endpoint | Database entity/table | Result or constraint |
| --- | --- | --- | --- | --- | --- | --- |
| ADM-01 | Admin | Student Attendance Average | View average; summary card | GET `/api/v1/admin/attendance?scope=college&aggregate=average` | `attendance_records` | Read-only average; averaging rule/response **Requires clarification**. |
| ADM-02 | Admin | Notice Board / Create Notice | Post global notice; form | POST `/api/v1/admin/notices` | Not defined | No notice table/request fields; **Requires clarification**. |
| ADM-03 | Admin | Faculty Attendance | View records; table | GET `/api/v1/admin/faculty-attendance` | Not defined | No faculty-attendance table; **Requires clarification**. |
| FAC-01 | Faculty | Assigned Class Attendance | Take/update attendance; form | POST `/api/v1/faculty/classes/{class_id}/attendance`; PUT `/api/v1/faculty/classes/{class_id}/attendance/{student_id}?session_date={date}` | `classes`, `attendance_records` | Assigned-class create/update; payload and roster source **Require clarification**. |
| FAC-02 | Faculty | Teaching Timetable | View personal timetable; list/table | GET `/api/v1/faculty/timetable` | `classes` | Days/times absent; complete timetable **Requires clarification**. |
| FAC-03 | Faculty | Class Attendance Average | View class average; summary | GET `/api/v1/faculty/classes/{class_id}/attendance?aggregate=average` | `classes`, `attendance_records` | Calculated class average; formula **Requires clarification**. |
| FAC-04 | Faculty | Marks | Assign/upload/update; form/list boundary | POST `/api/v1/faculty/classes/{class_id}/tests/{test_id}/marks`; PUT `/api/v1/faculty/classes/{class_id}/tests/{test_id}/marks/{student_id}` | Not defined | No marks/test table; **Requires clarification**. |
| FAC-05 | Faculty | Notice Board | View notices; list | GET `/api/v1/faculty/notices` | Not defined | No notice table; **Requires clarification**. |
| STD-01 | Student | Personal Attendance | View personal records; table/list | GET `/api/v1/students/me/attendance` | `attendance_records` | Current Student's attendance records. |
| STD-02 | Student | Class Timetable | View personal timetable; list/table | GET `/api/v1/students/me/timetable` | `enrollments`, `classes` | Days/times absent; complete timetable **Requires clarification**. |
| STD-03 | Student | Marks / Academic Progress | View test marks/progress | GET `/api/v1/students/me/marks` | `enrollments` (`final_grade`) | Final grade is not test marks; progress mapping **Requires clarification**. |
| STD-04 | Student | Holidays / Exam Dates | View upcoming dates; list | GET `/api/v1/students/academic-calendar` | Not defined | No holiday/exam table; **Requires clarification**. |
| STD-05 | Student | Notice Board | View notices; list | GET `/api/v1/students/notices` | Not defined | No notice table; **Requires clarification**. |

### Requirement coverage checklist

- [ ] ADM-01 — Admin average college-wide student attendance
- [ ] ADM-02 — Admin posts global Notice
- [ ] ADM-03 — Admin views Faculty attendance
- [ ] FAC-01 — Faculty takes/updates assigned-class attendance
- [ ] FAC-02 — Faculty views personal teaching timetable
- [ ] FAC-03 — Faculty views specific-class attendance average
- [ ] FAC-04 — Faculty assigns/uploads test marks
- [ ] FAC-05 — Faculty views global Notice Board
- [ ] STD-01 — Student views personal attendance
- [ ] STD-02 — Student views personal class timetable
- [ ] STD-03 — Student checks test marks and academic progress
- [ ] STD-04 — Student views upcoming holidays and exam dates
- [ ] STD-05 — Student views global Notice Board

## 22. Frontend validation and implementation alignment

The implementation plan requires modularity, role separation, security and
reliability checks, scalability/maintainability review, and requirement-based
testing. Validate the frontend by:

1. Confirming all 13 requirements have a role-specific screen and traceability
   row.
2. Verifying all role navigation entries and actions against the source role
   matrix; test role boundaries.
3. Verifying each API call uses the exact method, path, and query parameters in
   `api_spec.md`.
4. Verifying each database mapping uses only named tables/fields from the
   database architecture and API mapping.
5. Confirming absent/incomplete mappings are marked **Requires clarification**
   and do not use invented payloads, fields, results, or empty data.
6. Testing mapped forms only after request schemas have been confirmed;
   validate error, pending, and successful submission states.
7. Testing loading, empty, network/API failure, unauthorized, and unavailable
   data states.
8. Testing responsive operation at desktop, laptop, tablet, and mobile
   widths.
9. Testing keyboard access, visible focus, labels, contrast, screen-reader
   announcements, and reduced-motion behaviour.
10. Confirming optional ReactBits components do not block navigation, forms,
    or data loading.
11. Confirming no unsupported feature, role, permission, API endpoint, database
    entity, table, or workflow has been added.

The implementation plan's acceptance target is all 13 requirement scenarios
validated. Frontend tests for a source-blocked route can verify the
clarification state and role navigation, but must not claim the unmapped backend
function is complete.

## 23. Clarifications required by the supplied sources

The items below are limitations in the source API/database mappings or
unspecified integration/design contracts. They are listed to prevent frontend
assumptions.

| Requirement/area | Issue | Affected screens/integration |
| --- | --- | --- |
| ADM-01, FAC-03 | The averaging rule and response shape are not defined. | Admin and Faculty attendance average. |
| ADM-02, FAC-05, STD-05 | No notice table or notice data mapping is defined; ADM-02 request/response fields are also absent. | Admin notice form; Faculty/Student Notice Board. |
| ADM-03 | No faculty-attendance table or data mapping is defined. | Admin Faculty Attendance. |
| FAC-01 | API request/response schemas, roster source, and single-vs-batch POST contract are unspecified. | Faculty attendance form and records. |
| FAC-02, STD-02 | `classes` has no meeting days or times. | Faculty/Student timetables. |
| FAC-04 | No test/marks table or mark request/response schema exists. | Faculty Marks. |
| STD-03 | Test marks are unmapped; academic progress has no finalized mapping; `final_grade` is not test marks. | Student Marks / Academic Progress. |
| STD-04 | No holiday/exam-schedule table or data mapping is defined. | Student Holidays / Exam Dates. |
| API contracts | Most routes do not define exact JSON response schemas; mutation request bodies are largely unspecified. | Central API client and mapped forms/views. |
| Authentication/session | The database contains authenticated users and role values, but the API does not specify login/session endpoints or frontend identity transport. | Role context and application entry. |
| Caching freshness | No stale-time or freshness requirement is specified. | React Query configuration. |
| Visual identity | No brand colors, fonts, or design tokens are defined. | Styling system; values above are proposals only. |
| ReactBits compatibility | No frontend stack/version is specified to validate the component package against. | Optional animation components. |

## 24. Final frontend blueprint

```text
Approved Requirements
          ↓
Admin / Faculty / Student
          ↓
Role-specific Screens and Navigation
          ↓
Reusable UI Components
          ↓
Central API Client and React Query
          ↓
FastAPI Routes from api_spec.md
          ↓
Existing Database Tables from database_architecture.md
```

This specification preserves the 13 approved requirements, the three defined
roles, the documented API paths and database mappings, role-based presentation,
responsive behaviour, accessibility, and modular implementation. It introduces
no new API routes or database entities. Missing contracts and architecture
mappings remain explicitly **Requires clarification**.

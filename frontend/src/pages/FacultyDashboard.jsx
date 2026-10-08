function FacultyDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900">Faculty Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Manage your teaching activities through UniFlow.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Attendance</h2>
            <p className="mt-2 text-sm text-slate-500">
              Take daily attendance for assigned classes.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Timetable</h2>
            <p className="mt-2 text-sm text-slate-500">
              View your personal teaching timetable.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Marks</h2>
            <p className="mt-2 text-sm text-slate-500">
              Assign and upload student test marks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;

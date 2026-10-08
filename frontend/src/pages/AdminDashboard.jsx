function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Welcome to the UniFlow administration portal.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Student Attendance</h2>
            <p className="mt-2 text-sm text-slate-500">
              View college-wide average student attendance.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Faculty Attendance</h2>
            <p className="mt-2 text-sm text-slate-500">
              View faculty attendance records.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Notice Board</h2>
            <p className="mt-2 text-sm text-slate-500">
              Post global announcements for the college.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

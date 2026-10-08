import { apiRequest } from "@/api/client";
import { useEffect } from "react";
function StudentDashboard() {
  useEffect(() => {
    apiRequest("/student/attendance")
      .then((data) => console.log("Student attendance:", data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Access your academic information through UniFlow.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Attendance</h2>
            <p className="mt-2 text-sm text-slate-500">
              View your personal attendance records.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Timetable</h2>
            <p className="mt-2 text-sm text-slate-500">
              View your personal class timetable.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Marks & Progress</h2>
            <p className="mt-2 text-sm text-slate-500">
              Check your test marks and academic progress.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Holidays & Exams</h2>
            <p className="mt-2 text-sm text-slate-500">
              View upcoming holidays and exam dates.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Notice Board</h2>
            <p className="mt-2 text-sm text-slate-500">
              View important college announcements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;

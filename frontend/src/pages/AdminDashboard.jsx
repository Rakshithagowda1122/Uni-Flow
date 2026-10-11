import { apiRequest } from "@/api/client";
import { useEffect, useState } from "react";
import SpotlightCard from "../components/SpotlightCard";

function AdminDashboard() {
  const [stats, setStats] = useState({
    studentAttendance: "88.4%",
    facultyAttendance: "96.2%",
    totalUsers: "1,420",
    activeNotices: 4,
  });

  useEffect(() => {
    apiRequest("/admin/attendance")
      .then((data) => {
        if (data) setStats((prev) => ({ ...prev, ...data }));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Admin Portal
            </h1>
            <p className="text-sm text-slate-500">
              UniFlow College Overview & System Controls
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            System Healthy
          </span>
        </div>

        {/* 1. Key Metrics Spotlight Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <SpotlightCard spotlightColor="rgba(6, 182, 212, 0.2)">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
              Daily Avg
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">
                {stats.studentAttendance}
              </span>
            </div>
            <h3 className="mt-1 text-sm font-medium text-slate-700">
              Student Attendance
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Across all semester sections
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Faculty Log
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">
                {stats.facultyAttendance}
              </span>
            </div>
            <h3 className="mt-1 text-sm font-medium text-slate-700">
              Faculty Present
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              42 of 45 professors checked in
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(147, 51, 234, 0.2)">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">
              Accounts
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">
                {stats.totalUsers}
              </span>
            </div>
            <h3 className="mt-1 text-sm font-medium text-slate-700">
              Active Campus Users
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Students, faculty & staff
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.2)">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
              Broadcasts
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-900">
                {stats.activeNotices}
              </span>
            </div>
            <h3 className="mt-1 text-sm font-medium text-slate-700">
              Active Notices
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Circulars live on notice board
            </p>
          </SpotlightCard>
        </div>

        {/* 2. Management Quick Links */}
        <div className="grid gap-6 md:grid-cols-3">
          <SpotlightCard className="cursor-pointer">
            <h2 className="text-lg font-bold text-slate-900">
              Manage Students & Staff
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Register new enrollments, manage department assignments, and
              configure roles.
            </p>
            <span className="mt-4 inline-block text-xs font-semibold text-cyan-600">
              View Directory &rarr;
            </span>
          </SpotlightCard>

          <SpotlightCard className="cursor-pointer">
            <h2 className="text-lg font-bold text-slate-900">
              Post Campus Notice
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Create announcements for holidays, exam dates, or emergency
              notices.
            </p>
            <span className="mt-4 inline-block text-xs font-semibold text-cyan-600">
              Draft Circular &rarr;
            </span>
          </SpotlightCard>

          <SpotlightCard className="cursor-pointer">
            <h2 className="text-lg font-bold text-slate-900">
              Department Reports
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Download monthly attendance spreadsheets and academic audit
              records.
            </p>
            <span className="mt-4 inline-block text-xs font-semibold text-cyan-600">
              Generate Export &rarr;
            </span>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

import React, { useState } from "react";
import BorderBeamCard from "../components/BorderBeamCard";

export default function FacultyDashboard() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      subject: "Data Structures & Algorithms",
      section: "CS-3A",
      time: "09:00 AM - 10:30 AM",
      room: "Lab 3",
      studentsCount: 62,
      marked: true,
    },
    {
      id: 2,
      subject: "Database Management Systems",
      section: "CS-5B",
      time: "11:00 AM - 12:30 PM",
      room: "Hall 204",
      studentsCount: 58,
      marked: false, // Live / Active class
    },
    {
      id: 3,
      subject: "Operating Systems",
      section: "IT-3",
      time: "02:00 PM - 03:30 PM",
      room: "Room 102",
      studentsCount: 54,
      marked: false,
    },
  ]);

  const handleMarkAttendance = (id) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, marked: true } : c)),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Faculty Portal
            </h1>
            <p className="text-sm text-slate-500">
              Welcome back, Professor. Here is your academic schedule for today.
            </p>
          </div>
          <div className="rounded-lg bg-white px-4 py-2 border text-sm font-medium text-slate-700 shadow-sm">
            Semester:{" "}
            <span className="font-semibold text-cyan-600">Fall 2026</span>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          <BorderBeamCard accentColor="from-cyan-500 to-blue-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
              Today's Schedule
            </span>
            <div className="mt-2 text-3xl font-bold text-slate-900">
              3 Lectures
            </div>
            <p className="mt-1 text-xs text-slate-400">
              1 completed &bull; 2 remaining
            </p>
          </BorderBeamCard>

          <BorderBeamCard accentColor="from-emerald-400 to-teal-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
              Avg Class Attendance
            </span>
            <div className="mt-2 text-3xl font-bold text-slate-900">92.6%</div>
            <p className="mt-1 text-xs text-slate-400">
              Last 7 days performance
            </p>
          </BorderBeamCard>

          <BorderBeamCard accentColor="from-indigo-400 to-purple-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Student Inquiries
            </span>
            <div className="mt-2 text-3xl font-bold text-slate-900">
              5 Pending
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Assignment clarifications
            </p>
          </BorderBeamCard>
        </div>

        {/* Schedule List */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Assigned Lectures Today
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {classes.map((lecture) => (
              <BorderBeamCard
                key={lecture.id}
                active={!lecture.marked}
                className={lecture.marked ? "bg-slate-50/70" : "bg-white"}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-cyan-50 px-2 py-0.5 text-xs font-semibold text-cyan-700 border border-cyan-100">
                    {lecture.time}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {lecture.room}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-800">
                  {lecture.subject}
                </h3>
                <p className="text-xs text-slate-500">
                  Section:{" "}
                  <strong className="text-slate-700">{lecture.section}</strong>{" "}
                  &bull; {lecture.studentsCount} Students
                </p>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  {lecture.marked ? (
                    <span className="inline-flex items-center text-xs font-medium text-emerald-600 gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Attendance Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMarkAttendance(lecture.id)}
                      className="w-full rounded-lg bg-cyan-600 py-2 text-xs font-semibold text-white shadow transition hover:bg-cyan-700"
                    >
                      Record Attendance Now
                    </button>
                  )}
                </div>
              </BorderBeamCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

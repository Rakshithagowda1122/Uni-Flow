import React, { useState } from "react";
import TiltGlowCard from "../components/TiltGlowCard";
import DepthCarousel from "../components/DepthCarousel";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // 1. Personal Attendance Data
  const attendance = {
    overall: 88,
    required: 75,
    attended: 142,
    total: 161,
  };
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (attendance.overall / 100) * circumference;

  // 2. Marks Sheet Data
  const marksData = [
    {
      code: "CS501",
      subject: "Database Management Systems",
      internal: 28,
      external: 62,
      total: 90,
      grade: "A+",
    },
    {
      code: "CS502",
      subject: "Operating Systems",
      internal: 26,
      external: 58,
      total: 84,
      grade: "A",
    },
    {
      code: "CS503",
      subject: "Web Application Architecture",
      internal: 30,
      external: 65,
      total: 95,
      grade: "O",
    },
    {
      code: "CS504",
      subject: "Computer Networks",
      internal: 24,
      external: 52,
      total: 76,
      grade: "B+",
    },
  ];

  // 3. Class Plan / Schedule (Today)
  const classPlan = [
    {
      time: "09:00 AM - 10:30 AM",
      course: "Database Management Systems",
      room: "Lab 3",
      status: "Completed",
    },
    {
      time: "11:00 AM - 12:30 PM",
      course: "Operating Systems",
      room: "Room 402",
      status: "Ongoing",
    },
    {
      time: "02:00 PM - 03:30 PM",
      course: "Web Architecture Seminar",
      room: "Auditorium B",
      status: "Upcoming",
    },
  ];

  // 4. Notice Board Announcements
  const notices = [
    {
      id: 1,
      title: "Mid-Semester Examination Schedule Published",
      date: "Oct 12, 2026",
      tag: "Urgent",
      tagColor: "bg-red-50 text-red-600 border-red-200",
    },
    {
      id: 2,
      title: "Annual Technical Symposium Call for Papers",
      date: "Oct 15, 2026",
      tag: "Event",
      tagColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      id: 3,
      title: "Library Due Date Extension Notice",
      date: "Oct 18, 2026",
      tag: "General",
      tagColor: "bg-slate-50 text-slate-600 border-slate-200",
    },
  ];

  // 5. Upcoming Holidays
  const holidays = [
    {
      name: "Diwali & Festival Break",
      date: "Nov 01 - Nov 03, 2026",
      days: "3 Days",
    },
    { name: "University Sports Day", date: "Nov 14, 2026", days: "1 Day" },
    { name: "Winter Recess", date: "Dec 24 - Jan 02, 2027", days: "10 Days" },
  ];

  // 6. Custom Telemetry Data tailored for Student Dashboard
  const studentCarouselData = [
    {
      id: 1,
      title: "Mid-Term Examination Schedule",
      tag: "Exam Cell Alert",
      value: "Starts Oct 19",
      detail:
        "Seating arrangement and room allocations published on institutional mesh.",
      gradient: "from-blue-600/20 via-indigo-600/10 to-slate-900/40",
      border: "border-indigo-400/50",
      accent: "text-indigo-600",
      badgeBg: "bg-indigo-50 border-indigo-200 text-indigo-700",
      icon: "📋",
    },
    {
      id: 2,
      title: "Semester Lab Submissions",
      tag: "Record Verification",
      value: "4 of 4 Verified",
      detail:
        "Database & OS practical signatures synchronized to student ledger.",
      gradient: "from-emerald-600/20 via-teal-600/10 to-slate-900/40",
      border: "border-emerald-400/50",
      accent: "text-emerald-600",
      badgeBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      icon: "🧪",
    },
    {
      id: 3,
      title: "Technical Symposium Hackathon",
      tag: "Campus Event",
      value: "₹ 50,000 Pool",
      detail:
        "Annual National Student Innovation Challenge registrations open.",
      gradient: "from-amber-600/20 via-orange-600/10 to-slate-900/40",
      border: "border-amber-400/50",
      accent: "text-amber-600",
      badgeBg: "bg-amber-50 border-amber-200 text-amber-700",
      icon: "🏆",
    },
    {
      id: 4,
      title: "Campus Library Due Date",
      tag: "Resource Hub",
      value: "0 Overdue",
      detail:
        "Digital library passes auto-renewed for active Semester 5 courses.",
      gradient: "from-cyan-600/20 via-sky-600/10 to-slate-900/40",
      border: "border-cyan-400/50",
      accent: "text-cyan-600",
      badgeBg: "bg-cyan-50 border-cyan-200 text-cyan-700",
      icon: "📚",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 p-6 md:p-10 font-sans text-slate-800">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Student Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Enrolled
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Roll No:{" "}
            <span className="font-semibold text-slate-700 font-mono">
              2026-CS-042
            </span>{" "}
            &bull; B.Tech Computer Science (Sem 5)
          </p>
        </div>

        {/* View Academic Records Quick Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setActiveTab(activeTab === "overview" ? "records" : "overview")
            }
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {activeTab === "overview"
              ? "View Full Academic Records"
              : "Back to Overview"}
          </button>
        </div>
      </div>

      {/* Top 3 3D Tilt Animated Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Personal Attendance with Gauge */}
        <TiltGlowCard glowColor="rgba(16, 185, 129, 0.25)">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
              Personal Attendance
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-3xl font-black text-slate-900">
                {attendance.overall}%
              </p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                ✓ Met Minimum (&ge;75%)
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Present:{" "}
                <strong className="text-slate-700">
                  {attendance.attended}
                </strong>{" "}
                / {attendance.total} Classes
              </p>
            </div>
            {/* SVG Progress Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 110 110"
              >
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute text-xs font-bold text-slate-700">
                Eligible
              </span>
            </div>
          </div>
        </TiltGlowCard>

        {/* Card 2: Cumulative GPA */}
        <TiltGlowCard glowColor="rgba(99, 102, 241, 0.25)">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200">
              Academic GPA
            </span>
          </div>
          <div className="flex flex-col justify-between mt-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-indigo-600">
                  8.82
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  / 10.0 CGPA
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Sem 5 SGPA: <strong className="text-slate-800">9.10</strong>
              </p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: "88.2%" }}
              />
            </div>
          </div>
        </TiltGlowCard>

        {/* Card 3: Upcoming Holidays Alert */}
        <TiltGlowCard glowColor="rgba(245, 158, 11, 0.25)">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
              Holidays & Breaks
            </span>
          </div>
          <div className="mt-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
              Next Break
            </span>
            <p className="text-lg font-bold text-slate-900 mt-1">
              {holidays[0].name}
            </p>
            <p className="text-xs font-medium text-slate-500">
              {holidays[0].date} ({holidays[0].days})
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>View full holiday schedule</span>
              <span className="font-semibold text-amber-600">&rarr;</span>
            </div>
          </div>
        </TiltGlowCard>
      </div>

      {/* 3D Depth Carousel Animation Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Campus Highlights &amp; Telemetry Stream
            </h2>
            <p className="text-xs text-slate-500">
              Swipe or click through live updates and academic milestones
            </p>
          </div>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
            3D Depth View
          </span>
        </div>
        <DepthCarousel items={studentCarouselData} />
      </div>

      {/* Main Grid: Class Plan & Notice Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Today's Class Plan (2 Columns wide) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Today's Class Plan & Routine
              </h2>
              <p className="text-xs text-slate-500">
                Live lecture agenda & location tracker
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600">
              3 Sessions
            </span>
          </div>

          <div className="space-y-3">
            {classPlan.map((plan, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    P{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {plan.course}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {plan.time} &bull;{" "}
                      <span className="font-medium text-slate-700">
                        {plan.room}
                      </span>
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    plan.status === "Ongoing"
                      ? "bg-amber-50 text-amber-600 border border-amber-200 animate-pulse"
                      : plan.status === "Completed"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-blue-50 text-blue-600 border border-blue-200"
                  }`}
                >
                  {plan.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notice Board & Announcement Panel */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
              <h2 className="text-lg font-bold text-slate-900">Notice Board</h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Updated today
            </span>
          </div>

          <div className="space-y-4">
            {notices.map((n) => (
              <div
                key={n.id}
                className="group p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${n.tagColor}`}
                  >
                    {n.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {n.date}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {n.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Marks Sheet Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Semester Marks Sheet
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed internal and external score breakdown
            </p>
          </div>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
            Download Grade Card PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Subject</th>
                <th className="py-3.5 px-4 text-center">Internal (30)</th>
                <th className="py-3.5 px-4 text-center">External (70)</th>
                <th className="py-3.5 px-4 text-center">Total (100)</th>
                <th className="py-3.5 px-6 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {marksData.map((sub) => (
                <tr
                  key={sub.code}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-4 px-6">
                    <p className="font-semibold text-slate-800">
                      {sub.subject}
                    </p>
                    <span className="text-xs text-slate-400 font-mono">
                      {sub.code}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-slate-600">
                    {sub.internal}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-600">
                    {sub.external}
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-slate-900">
                    {sub.total}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-md ${
                        sub.grade === "O" || sub.grade === "A+"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {sub.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

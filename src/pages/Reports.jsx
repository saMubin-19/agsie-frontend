import {
  FiFileText,
  FiDownload,
  FiShare2,
  FiCalendar,
  FiChevronDown,
} from "react-icons/fi";

function Reports() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8 text-gray-900 dark:text-white">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Reports & Export</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Generate and download comprehensive reports
          </p>
        </div>

        {/* ADMIN */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-xl bg-white dark:bg-slate-800 shadow">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center font-bold">
              JF
            </div>
            <div>
              <p className="text-sm font-semibold">John Farmer</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Agricultural Officer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= GENERATE REPORT ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow mb-10">

        <h3 className="text-lg font-semibold mb-6">
          Generate New Report
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* REPORT TYPE */}
          <div>
            <label className="text-sm text-gray-500 dark:text-slate-400">
              Report Type
            </label>
            <div className="relative mt-1">
              <select className="w-full appearance-none px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border dark:border-slate-600">
                <option>Comprehensive Field Report</option>
                <option>Satellite Analysis Report</option>
                <option>Economic Impact Report</option>
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60" />
            </div>
          </div>

          {/* TIME PERIOD */}
          <div>
            <label className="text-sm text-gray-500 dark:text-slate-400">
              Time Period
            </label>
            <div className="relative mt-1">
              <select className="w-full appearance-none px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border dark:border-slate-600">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Custom Range</option>
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60" />
            </div>
          </div>

        </div>

        <div className="flex items-center gap-3">
          <button className="
            flex-1 flex items-center justify-center gap-2
            bg-gradient-to-r from-green-500 to-emerald-600
            hover:from-green-600 hover:to-emerald-700
            text-white py-3 rounded-xl font-semibold
            shadow-[0_20px_60px_rgba(16,185,129,0.45)]
          ">
            <FiFileText /> Generate PDF Report
          </button>

          <button className="p-3 rounded-xl bg-gray-100 dark:bg-slate-700">
            <FiCalendar />
          </button>
        </div>
      </div>

      {/* ================= RECENT REPORTS ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow">

        <h3 className="text-lg font-semibold mb-6">
          Recent Reports
        </h3>

        <div className="space-y-4">

          <ReportItem
            title="Field Analysis Report - Jan 2025"
            date="Generated on Jan 20, 2025"
          />

          <ReportItem
            title="Field Analysis Report - Jan 2025"
            date="Generated on Jan 19, 2025"
          />

          <ReportItem
            title="Field Analysis Report - Jan 2025"
            date="Generated on Jan 18, 2025"
          />

        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function ReportItem({ title, date }) {
  return (
    <div className="
      flex items-center justify-between
      bg-gray-50 dark:bg-slate-700/40
      p-4 rounded-2xl
      hover:shadow transition
    ">
      <div className="flex items-center gap-4">
        <div className="
          w-10 h-10 rounded-xl
          bg-gradient-to-br from-indigo-500 to-purple-600
          text-white flex items-center justify-center
        ">
          <FiFileText />
        </div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            {date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600">
          <FiDownload />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600">
          <FiShare2 />
        </button>
      </div>
    </div>
  );
}

export default Reports;


import {
  FiDroplet,
  FiTrendingUp,
  FiActivity,
  FiShield,
  FiCalendar,
  FiFilter,
} from "react-icons/fi";

function History() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8 text-gray-900 dark:text-white">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Historical Data & Decision Logs</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Timeline of AI recommendations and actions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow text-sm">
            <FiFilter /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow text-sm">
            <FiCalendar /> Date Range
          </button>

          {/* ADMIN */}
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

      {/* ================= TIMELINE ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow space-y-6">

        <TimelineCard
          icon={<FiTrendingUp />}
          title="Fertilizer Application"
          date="Jan 20, 2025"
          field="Field-A"
          accent="green"
          recommendation="Applied 45 kg/ha nitrogen as recommended"
          outcome="NDVI improved by 8%"
        />

        <TimelineCard
          icon={<FiDroplet />}
          title="Irrigation"
          date="Jan 15, 2025"
          field="Field-A"
          accent="blue"
          recommendation="Applied 25 mm water depth"
          outcome="Soil moisture increased to optimal"
        />

        <TimelineCard
          icon={<FiShield />}
          title="Pest Control"
          date="Jan 10, 2025"
          field="Field-B"
          accent="purple"
          recommendation="Applied organic pesticide"
          outcome="Pest infestation reduced by 75%"
        />

        <TimelineCard
          icon={<FiActivity />}
          title="Soil Testing"
          date="Jan 5, 2025"
          field="Field-A"
          accent="orange"
          recommendation="Conducted nutrient analysis"
          outcome="Identified nitrogen deficiency"
        />

      </div>
    </div>
  );
}

/* ================= TIMELINE CARD ================= */

function TimelineCard({
  icon,
  title,
  date,
  field,
  recommendation,
  outcome,
  accent,
}) {
  const accentMap = {
    green: {
      bg: "bg-green-50 dark:bg-green-500/10",
      icon: "bg-green-500",
      text: "text-green-600",
      badge: "bg-green-100 text-green-700",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-500/10",
      icon: "bg-blue-500",
      text: "text-blue-600",
      badge: "bg-blue-100 text-blue-700",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-500/10",
      icon: "bg-purple-500",
      text: "text-purple-600",
      badge: "bg-purple-100 text-purple-700",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-500/10",
      icon: "bg-orange-500",
      text: "text-orange-600",
      badge: "bg-orange-100 text-orange-700",
    },
  };

  const style = accentMap[accent];

  return (
    <div className={`relative rounded-2xl p-5 ${style.bg} transition hover:shadow-md`}>

      {/* ICON */}
      <div className={`absolute -left-4 top-6 w-10 h-10 rounded-full flex items-center justify-center text-white shadow ${style.icon}`}>
        {icon}
      </div>

      <div className="pl-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              {date}
            </p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full ${style.badge}`}>
            {field}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-semibold">Recommendation:</span>{" "}
            {recommendation}
          </p>
          <p className={`${style.text} font-semibold`}>
            Outcome: {outcome}
          </p>
        </div>
      </div>
    </div>
  );
}

export default History;


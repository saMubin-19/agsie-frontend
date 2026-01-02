import {
  FiRefreshCw,
  FiBell,
  FiActivity,
  FiThermometer,
  FiDroplet,
  FiGrid,
  FiClock,
  FiDownload,
} from "react-icons/fi";

function SatelliteData() {
  return (
    <div
      className="
        min-h-screen p-8 space-y-10
        bg-gradient-to-br from-gray-50 via-white to-gray-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        text-gray-900 dark:text-white
      "
    >
      {/* ================= TOP BAR ================= */}
      <div
        className="
          flex justify-between items-center
          bg-white/70 dark:bg-slate-800/70
          backdrop-blur-xl
          rounded-3xl px-8 py-5
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          border border-white/40 dark:border-slate-700
        "
      >
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Satellite Data Insights
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Multi-source satellite intelligence & analytics
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* ✅ FIXED SELECT */}
          <select
            className="
              px-4 py-2 rounded-xl
              bg-white dark:bg-slate-700
              text-gray-900 dark:text-white
              border border-gray-200 dark:border-slate-600
              focus:ring-2 focus:ring-emerald-500
              outline-none transition
            "
          >
            <option className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
              Last 7 days
            </option>
            <option className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
              Last 30 days
            </option>
          </select>

          <button
            className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              bg-gradient-to-r from-blue-500 to-indigo-600
              text-white font-semibold shadow
              hover:scale-[1.02] transition
            "
          >
            <FiRefreshCw /> Refresh
          </button>

          <div className="relative">
            <FiBell className="text-xl text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
              JF
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">John Farmer</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Agricultural Officer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SATELLITE CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SatelliteCard
          icon={<FiDroplet />}
          title="NASA SMAP"
          subtitle="Soil Moisture"
          value="44%"
          status="Moderate"
          resolution="9 km"
          updated="2 hours ago"
          gradient="from-sky-400 via-blue-500 to-indigo-600"
        />

        <SatelliteCard
          icon={<FiActivity />}
          title="Sentinel-2"
          subtitle="NDVI"
          value="0.75"
          status="Healthy"
          resolution="10 m"
          updated="1 day ago"
          gradient="from-emerald-400 via-green-500 to-teal-600"
        />

        <SatelliteCard
          icon={<FiThermometer />}
          title="MODIS"
          subtitle="Surface Temp"
          value="32°C"
          status="Moderate"
          resolution="1 km"
          updated="6 hours ago"
          gradient="from-orange-400 via-red-500 to-rose-600"
        />
      </div>

      {/* ================= HISTORY TABLE ================= */}
      <div
        className="
          bg-white/70 dark:bg-slate-800/70
          backdrop-blur-xl
          rounded-3xl p-6
          shadow-[0_30px_90px_rgba(0,0,0,0.15)]
          border border-white/40 dark:border-slate-700
        "
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold flex items-center gap-2">
            <FiGrid className="text-emerald-500" />
            Historical Measurements
          </h3>

          <button
            className="
              flex items-center gap-2 px-3 py-1.5 rounded-lg
              bg-gray-100 dark:bg-slate-700
              hover:bg-gray-200 dark:hover:bg-slate-600
              text-sm font-medium transition
            "
          >
            <FiDownload /> Export CSV
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b dark:border-slate-700 text-gray-600 dark:text-slate-400">
              <th className="py-2 text-left">Date</th>
              <th className="text-left">Source</th>
              <th className="text-left">Parameter</th>
              <th className="text-left">Value</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-slate-700">
            <HistoryRow date="Jan 25, 2025" value="0.75" status="Healthy" />
            <HistoryRow date="Jan 24, 2025" value="0.73" status="Healthy" />
            <HistoryRow date="Jan 23, 2025" value="0.71" status="Healthy" />
            <HistoryRow date="Jan 22, 2025" value="0.69" status="Moderate" />
            <HistoryRow date="Jan 21, 2025" value="0.67" status="Moderate" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= SATELLITE CARD ================= */

function SatelliteCard({
  icon,
  title,
  subtitle,
  value,
  status,
  resolution,
  updated,
  gradient,
}) {
  return (
    <div
      className={`
        relative rounded-3xl p-6 text-white
        bg-gradient-to-br ${gradient}
        shadow-[0_40px_120px_rgba(0,0,0,0.35)]
        hover:-translate-y-1 hover:shadow-[0_60px_150px_rgba(0,0,0,0.45)]
        transition-all duration-300
      `}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] rounded-3xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
              {icon}
            </div>
            <div>
              <h4 className="font-semibold">{title}</h4>
              <p className="text-sm opacity-90">{subtitle}</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-white/20 text-xs">
            {status}
          </span>
        </div>

        <p className="text-5xl font-extrabold mt-6">{value}</p>

        <div className="text-sm opacity-90 mt-4 space-y-1">
          <p>Resolution: <b>{resolution}</b></p>
          <p className="flex items-center gap-1">
            <FiClock /> {updated}
          </p>
        </div>

        <button className="w-full mt-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-sm font-semibold">
          View Details
        </button>
      </div>
    </div>
  );
}

/* ================= HISTORY ROW ================= */

function HistoryRow({ date, value, status }) {
  const map = {
    Healthy: "bg-green-100 text-green-700",
    Moderate: "bg-yellow-100 text-yellow-700",
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/40 transition">
      <td className="py-3">{date}</td>
      <td>Sentinel-2</td>
      <td>NDVI</td>
      <td className="font-semibold">{value}</td>
      <td>
        <span className={`px-2 py-1 rounded-full text-xs ${map[status]}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

export default SatelliteData;






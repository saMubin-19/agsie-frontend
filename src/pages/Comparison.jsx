import {
  FiTrendingUp,
  FiDroplet,
  FiBarChart2,
  FiLayers,
  FiArrowUpRight,
} from "react-icons/fi";

function Comparison() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-950 p-8 text-gray-900 dark:text-white space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Comparison Mode
        </h1>
        <p className="text-gray-600 dark:text-slate-400 mt-1">
          Compare fields, seasons, or scenarios
        </p>
      </div>

      {/* ================= SELECT ================= */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40 dark:border-slate-700">
        <h3 className="font-semibold mb-4">
          Select Items to Compare
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select label="Item 1" />
          <Select label="Item 2" />
        </div>
      </div>

      {/* ================= COMPARISON CARDS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CURRENT */}
        <CompareCard
          title="Field-A (Current)"
          accent="emerald"
          data={[
            ["NDVI", "0.75"],
            ["Soil Moisture", "44%"],
            ["Yield Forecast", "4.2 T/ha"],
            ["Water Usage", "1,250 m³"],
          ]}
        />

        {/* PREVIOUS */}
        <CompareCard
          title="Field-A (Previous)"
          accent="blue"
          data={[
            ["NDVI", "0.68"],
            ["Soil Moisture", "38%"],
            ["Yield Actual", "3.6 T/ha"],
            ["Water Usage", "1,570 m³"],
          ]}
        />
      </div>

      {/* ================= INSIGHTS ================= */}
      <div className="
        relative overflow-hidden
        rounded-3xl p-6
        bg-gradient-to-br from-emerald-500 to-green-600
        text-white shadow-[0_40px_120px_rgba(16,185,129,0.45)]
      ">
        <div className="relative z-10">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <FiArrowUpRight className="text-2xl" />
            Comparison Insights
          </h3>

          <ul className="space-y-2 text-sm opacity-95">
            <li>• NDVI improved by <b>10.3%</b> compared to previous season</li>
            <li>• Soil moisture management improved by <b>15.8%</b></li>
            <li>• Projected yield increase of <b>16.7%</b></li>
            <li>• Water usage reduced by <b>20.4%</b> (320 m³ saved)</li>
          </ul>
        </div>

        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Select({ label }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <select className="
        w-full px-4 py-2 rounded-xl
        bg-gray-100 dark:bg-slate-700
        border border-gray-200 dark:border-slate-600
        focus:outline-none focus:ring-2 focus:ring-emerald-500
      ">
        <option>Field-A (Current Season)</option>
        <option>Field-A (Previous Season)</option>
        <option>Field-B</option>
      </select>
    </div>
  );
}

function CompareCard({ title, data, accent }) {
  const map = {
    emerald: {
      gradient: "from-emerald-500 to-green-600",
      ring: "ring-emerald-400/40",
      icon: "text-emerald-500",
    },
    blue: {
      gradient: "from-blue-500 to-indigo-600",
      ring: "ring-blue-400/40",
      icon: "text-blue-500",
    },
  };

  return (
    <div className="
      relative rounded-3xl p-6
      bg-white dark:bg-slate-800
      shadow-[0_30px_90px_rgba(0,0,0,0.15)]
      ring-1 ring-white/50 dark:ring-slate-700
      hover:-translate-y-1 transition
    ">
      {/* TOP GRADIENT STRIP */}
      <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-3xl bg-gradient-to-r ${map[accent].gradient}`} />

      <h3 className="font-semibold flex items-center gap-2 mb-5">
        <FiLayers className={map[accent].icon} />
        {title}
      </h3>

      <div className="space-y-4">
        {data.map(([label, value]) => (
          <Row key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  const iconMap = {
    NDVI: <FiBarChart2 className="text-purple-500" />,
    "Soil Moisture": <FiDroplet className="text-blue-500" />,
    "Yield Forecast": <FiTrendingUp className="text-green-500" />,
    "Yield Actual": <FiTrendingUp className="text-orange-500" />,
    "Water Usage": <FiDroplet className="text-cyan-500" />,
  };

  return (
    <div className="
      flex justify-between items-center
      bg-gray-50 dark:bg-slate-700/40
      rounded-xl px-4 py-2
    ">
      <div className="flex items-center gap-2 text-sm">
        {iconMap[label]}
        <span className="text-gray-600 dark:text-slate-300">
          {label}
        </span>
      </div>
      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}

export default Comparison;



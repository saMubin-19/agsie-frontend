function Irrigation() {
  return (
    <div className="min-h-screen p-8 space-y-8 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Irrigation Advisory</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            AI-based irrigation recommendations
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-xl bg-white dark:bg-slate-800 shadow">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
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

      {/* ================= WHEN TO IRRIGATE ================= */}
      <div className="
        rounded-3xl p-6
        bg-gradient-to-br from-blue-500/10 to-indigo-500/10
        border border-blue-200 dark:border-blue-500/30
        shadow-[0_25px_80px_rgba(59,130,246,0.25)]
      ">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg">
            📅
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              When to Irrigate
            </p>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              In 2 days (Jan 28, 2025)
            </h2>
            <p className="text-sm mt-1 text-gray-600 dark:text-slate-400">
              Based on soil moisture trend and weather forecast
            </p>
          </div>
        </div>
      </div>

      {/* ================= WATER AMOUNT ================= */}
      <div className="
        bg-white dark:bg-slate-800
        rounded-3xl p-6
        shadow-[0_30px_90px_rgba(0,0,0,0.12)]
      ">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl">
            💧
          </div>
          <h3 className="text-lg font-semibold">
            Recommended Water Amount
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Metric
            label="Water Depth"
            value="25 mm"
            color="blue"
          />
          <Metric
            label="Total Volume"
            value="312 m³"
            color="indigo"
          />
        </div>
      </div>

      {/* ================= OPTIMAL TIMING ================= */}
      <div className="
        rounded-3xl p-6
        bg-gradient-to-br from-emerald-500/10 to-green-500/10
        border border-emerald-200 dark:border-emerald-500/30
        shadow-[0_30px_90px_rgba(16,185,129,0.25)]
      ">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center text-2xl shadow-lg">
            ⏰
          </div>

          <div>
            <h3 className="text-lg font-semibold">Optimal Timing</h3>
            <p className="text-gray-600 dark:text-slate-300">
              Early morning (5:00 AM – 8:00 AM) for minimal evaporation loss
            </p>
          </div>
        </div>

        {/* Efficiency Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-inner">
          <div className="flex justify-between text-sm mb-2">
            <span>Expected Efficiency</span>
            <span className="font-semibold text-emerald-600">94%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
              style={{ width: "94%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Metric({ label, value, color }) {
  const map = {
    blue: "text-blue-600",
    indigo: "text-indigo-600",
  };

  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-slate-400">
        {label}
      </p>
      <p className={`text-3xl font-bold mt-1 ${map[color]}`}>
        {value}
      </p>
    </div>
  );
}

export default Irrigation;


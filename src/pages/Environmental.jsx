function Environmental() {
  return (
    <div className="min-h-screen p-8 space-y-8 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Environmental Impact</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Sustainability metrics and water conservation
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-xl bg-white dark:bg-slate-800 shadow">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold">
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

      {/* ================= METRIC CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* WATER USAGE */}
        <EnvCard
          title="Water Usage"
          value="1,250 m³"
          subtitle="Current season estimation"
          icon="💧"
          color="blue"
        />

        {/* WATER SAVED */}
        <EnvCard
          title="Water Saved"
          value="320 m³"
          subtitle="vs traditional methods (-20%)"
          icon="💦"
          color="emerald"
          soft
        />

        {/* SUSTAINABILITY SCORE */}
        <div className="
          rounded-3xl p-6 text-white
          bg-gradient-to-br from-green-500 to-emerald-600
          shadow-[0_40px_100px_rgba(16,185,129,0.45)]
          flex flex-col justify-between
        ">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
              🌱
            </div>
            <p className="font-semibold">Sustainability Score</p>
          </div>

          <div className="mt-6">
            <p className="text-5xl font-extrabold">A+</p>
            <p className="mt-2 opacity-90">
              Excellent environmental practices
            </p>
          </div>
        </div>
      </div>

      {/* ================= CARBON FOOTPRINT ================= */}
      <div className="
        bg-white dark:bg-slate-800
        rounded-3xl p-6
        shadow-[0_30px_90px_rgba(0,0,0,0.12)]
      ">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-2xl">
            🍃
          </div>
          <h3 className="text-lg font-semibold">
            Carbon Footprint Reduction
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              CO₂ Emissions Reduced
            </p>
            <p className="text-3xl font-bold mt-2 text-green-600">
              2.4 tonnes
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Trees Equivalent
            </p>
            <p className="text-3xl font-bold mt-2 text-emerald-600">
              110 trees
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function EnvCard({ title, value, subtitle, icon, color, soft }) {
  const map = {
    blue: {
      bg: "from-blue-500 to-indigo-600",
      soft: "bg-blue-50 dark:bg-blue-500/10 text-blue-600",
    },
    emerald: {
      bg: "from-emerald-500 to-green-600",
      soft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600",
    },
  };

  return (
    <div className={`
      rounded-3xl p-6
      ${soft
        ? map[color].soft
        : `bg-white dark:bg-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.12)]`}
    `}>
      <div className="flex items-center gap-3">
        <div className={`
          w-12 h-12 rounded-xl
          ${soft ? "bg-white dark:bg-slate-900" : `bg-gradient-to-br ${map[color].bg} text-white`}
          flex items-center justify-center text-2xl shadow
        `}>
          {icon}
        </div>
        <p className="font-semibold">{title}</p>
      </div>

      <p className="text-3xl font-bold mt-4">{value}</p>
      <p className="text-sm mt-1 text-gray-500 dark:text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}

export default Environmental;

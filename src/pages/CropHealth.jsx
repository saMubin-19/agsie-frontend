// src/pages/CropHealth.jsx
function CropHealth() {
  return (
    <div className="min-h-screen p-8 space-y-8 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Crop Health Analysis</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            NDVI-based vegetation health monitoring
          </p>
        </div>

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

      {/* ================= NDVI SCALE ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg">
        <h3 className="font-semibold mb-4">NDVI Visual Scale</h3>

        <div className="relative h-5 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-lime-400 to-green-500" />

        <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mt-2">
          <span>0.0</span>
          <span>0.3</span>
          <span>0.5</span>
          <span>0.7</span>
          <span>1.0</span>
        </div>

        <p className="mt-3 text-sm">
          <span className="inline-block w-20 h-1 bg-green-500 mr-2 align-middle rounded-full" />
          Current NDVI: <b>0.75</b>
        </p>
      </div>

      {/* ================= HEALTH CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <HealthCard
          title="Healthy"
          percent="65%"
          desc="Field coverage with NDVI > 0.7"
          color="green"
        />

        <HealthCard
          title="Moderate"
          percent="28%"
          desc="Field coverage with NDVI 0.4 – 0.7"
          color="yellow"
        />

        <HealthCard
          title="Poor"
          percent="7%"
          desc="Field coverage with NDVI < 0.4"
          color="red"
        />

      </div>

      {/* ================= CROP SELECTION ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg">
        <h3 className="font-semibold mb-4">Crop Selection</h3>

        <div className="grid grid-cols-2 gap-4">
          <button className="py-4 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white font-semibold shadow-lg">
            Rice
          </button>
          <button className="py-4 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white">
            Wheat
          </button>
        </div>
      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function HealthCard({ title, percent, desc, color }) {
  const styles = {
    green: {
      bg: "from-green-400/20 to-green-600/20",
      border: "border-green-400/40",
      text: "text-green-600",
    },
    yellow: {
      bg: "from-yellow-400/20 to-orange-400/20",
      border: "border-yellow-400/40",
      text: "text-yellow-600",
    },
    red: {
      bg: "from-red-400/20 to-pink-500/20",
      border: "border-red-400/40",
      text: "text-red-600",
    },
  };

  const s = styles[color];

  return (
    <div className={`relative overflow-hidden rounded-3xl p-6 border ${s.border}
      bg-gradient-to-br ${s.bg}
      shadow-[0_30px_80px_rgba(0,0,0,0.15)]
      hover:-translate-y-1 transition-all`}>
      
      <h4 className="font-semibold mb-2 flex items-center gap-2">
        {title}
      </h4>

      <p className={`text-3xl font-extrabold ${s.text}`}>
        {percent}
      </p>

      <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">
        {desc}
      </p>
    </div>
  );
}

export default CropHealth;


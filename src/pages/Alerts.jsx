// src/pages/Alerts.jsx
function Alerts() {
  return (
    <div className="min-h-screen p-8 space-y-8 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Stress & Risk Alerts</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Real-time warnings and risk notifications
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
            3 Active Alerts
          </span>

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

      {/* ================= ALERT LIST ================= */}
      <div className="space-y-6">

        <AlertCard
          icon="🌡️"
          title="Heat Stress Warning"
          level="HIGH"
          description="Land surface temperature exceeding 35°C for 3 consecutive days"
          action="Consider emergency irrigation"
          time="2 hours ago"
          color="red"
        />

        <AlertCard
          icon="💧"
          title="Water Stress Alert"
          level="MEDIUM"
          description="Soil moisture below 35% threshold"
          action="Schedule irrigation within 48 hours"
          time="5 hours ago"
          color="yellow"
        />

        <AlertCard
          icon="🌿"
          title="NDVI Decline Detected"
          level="LOW"
          description="Vegetation health decreased by 5% in northern section"
          action="Monitor and assess nutrient status"
          time="1 day ago"
          color="blue"
        />

      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function AlertCard({ icon, title, level, description, action, time, color }) {
  const styles = {
    red: {
      bg: "bg-red-50 dark:bg-red-500/10",
      border: "border-red-500",
      badge: "bg-red-600 text-white",
      icon: "bg-red-100 text-red-600",
    },
    yellow: {
      bg: "bg-yellow-50 dark:bg-yellow-500/10",
      border: "border-yellow-500",
      badge: "bg-yellow-500 text-white",
      icon: "bg-yellow-100 text-yellow-600",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-500",
      badge: "bg-blue-600 text-white",
      icon: "bg-blue-100 text-blue-600",
    },
  };

  const s = styles[color];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 border-l-4 ${s.border}
      ${s.bg}
      shadow-[0_25px_70px_rgba(0,0,0,0.12)]
      hover:-translate-y-1 transition-all`}
    >
      <div className="flex justify-between items-start gap-6">
        <div className="flex gap-4">

          {/* ICON */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${s.icon}`}>
            {icon}
          </div>

          {/* CONTENT */}
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">{title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.badge}`}>
                {level}
              </span>
            </div>

            <p className="text-gray-700 dark:text-slate-300 mt-1">
              {description}
            </p>

            <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 flex items-center gap-2">
              ⚠ {action}
            </p>

            <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
              {time}
            </p>
          </div>
        </div>

        {/* ACTION */}
        <button className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow hover:bg-gray-100 dark:hover:bg-slate-700 text-sm font-semibold">
          Acknowledge
        </button>
      </div>
    </div>
  );
}

export default Alerts;


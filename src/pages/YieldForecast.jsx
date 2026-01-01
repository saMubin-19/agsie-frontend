import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function YieldForecast() {
  return (
    <div className="min-h-screen p-8 space-y-8 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Yield Forecast</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            AI-predicted crop yield estimation
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-xl bg-white dark:bg-slate-800 shadow">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold">
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

      {/* ================= HERO CARD ================= */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-[0_40px_120px_rgba(99,102,241,0.45)]">
        <div className="relative z-10">
          <p className="text-sm opacity-90">Estimated Yield</p>
          <h2 className="text-5xl font-extrabold mt-2">4.2 T/ha</h2>
          <p className="text-sm opacity-90 mt-2">🎯 Target: 4.0 T/ha</p>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
          📈
        </div>
      </div>

      {/* ================= YIELD PROGRESSION ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_30px_90px_rgba(0,0,0,0.12)]">
        <h3 className="text-lg font-semibold mb-4">
          Yield Progression
        </h3>

        {/* FIXED HEIGHT CONTAINER */}
        <div className="relative h-[220px]">
          <Line
            data={{
              labels: ["Week 8", "Week 10", "Week 12", "Week 14", "Week 16"],
              datasets: [
                {
                  label: "Yield (T/ha)",
                  data: [2.0, 2.7, 3.3, 3.9, 4.2],
                  borderColor: "#8b5cf6",
                  backgroundColor: "rgba(139,92,246,0.25)",
                  fill: true,
                  tension: 0.4,
                  pointRadius: 5,
                  pointHoverRadius: 7,
                  pointBackgroundColor: "#8b5cf6",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false, // 🔑 IMPORTANT
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: "#020617",
                  titleColor: "#c4b5fd",
                  bodyColor: "#e5e7eb",
                  borderColor: "#475569",
                  borderWidth: 1,
                  padding: 10,
                },
              },
              scales: {
                x: {
                  ticks: { color: "#94a3b8" },
                  grid: { display: false },
                },
                y: {
                  ticks: {
                    color: "#94a3b8",
                    stepSize: 1,
                  },
                  grid: {
                    color: "rgba(148,163,184,0.12)",
                    borderDash: [4, 4],
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* ================= LOWER GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* CONFIDENCE */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow">
          <h3 className="font-semibold mb-4">Confidence Level</h3>

          <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">
            Prediction Accuracy
          </p>

          <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
              style={{ width: "88%" }}
            />
          </div>

          <p className="text-sm mt-2 text-purple-600 font-semibold">
            88%
          </p>

          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
            Based on historical data and current conditions
          </p>
        </div>

        {/* SEASON COMPARISON */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow space-y-4">
          <h3 className="font-semibold">Season Comparison</h3>

          <Row label="Previous Season" value="3.6 T/ha" />
          <Row label="Current Forecast" value="4.2 T/ha" highlight />

          <div className="text-sm text-green-600 font-semibold flex items-center gap-1">
            ▲ +16.7% improvement
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */

function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500 dark:text-slate-400">
        {label}
      </span>
      <span className={`font-semibold ${highlight ? "text-green-600" : ""}`}>
        {value}
      </span>
    </div>
  );
}

export default YieldForecast;



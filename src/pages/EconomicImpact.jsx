// src/pages/EconomicImpact.jsx
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function EconomicImpact() {
  return (
    <div className="min-h-screen p-8 space-y-8 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Economic Impact Simulation</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Financial analysis and ROI projections
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

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* PROFIT / LOSS CHART */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_30px_90px_rgba(16,185,129,0.25)]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            📊 Expected Profit / Loss
          </h3>

          {/* ✅ FIXED HEIGHT WRAPPER */}
          <div className="h-[320px]">
            <Bar
              data={{
                labels: ["Current", "Optimized"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [45000, 62000],
                    backgroundColor: (ctx) => {
                      const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 320);
                      g.addColorStop(0, "#22c55e");
                      g.addColorStop(1, "#15803d");
                      return g;
                    },
                    borderRadius: 14,
                    barThickness: 44,
                  },
                  {
                    label: "Cost",
                    data: [28000, 32000],
                    backgroundColor: (ctx) => {
                      const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 320);
                      g.addColorStop(0, "#ef4444");
                      g.addColorStop(1, "#991b1b");
                      return g;
                    },
                    borderRadius: 14,
                    barThickness: 44,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#94a3b8",
                      font: { weight: "600" },
                      usePointStyle: true,
                    },
                  },
                  tooltip: {
                    backgroundColor: "#020617",
                    titleColor: "#22c55e",
                    bodyColor: "#e5e7eb",
                    borderColor: "#334155",
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 10,
                  },
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { color: "#94a3b8" },
                  },
                  y: {
                    grid: {
                      color: "rgba(148,163,184,0.15)",
                      borderDash: [6, 6],
                    },
                    ticks: {
                      color: "#94a3b8",
                      callback: (v) => `₹${v / 1000}k`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* COST vs BENEFIT */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow space-y-6">
          <h3 className="text-lg font-semibold">⚖ Cost vs Benefit</h3>

          <MetricBar label="Total Investment" value="₹32,000" percent={45} color="red" />
          <MetricBar label="Expected Revenue" value="₹62,000" percent={85} color="green" />

          <div className="border-t pt-4 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400">Net Profit</p>
            <p className="text-3xl font-bold text-green-600">₹30,000</p>
            <p className="text-sm text-green-600 mt-1">
              ▲ +67% improvement over current scenario
            </p>
          </div>
        </div>
      </div>

      {/* ================= ROI ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImpactCard icon="📈" label="ROI" value="94%" color="emerald" />
        <ImpactCard icon="⏱" label="Break-even" value="45 days" color="blue" />
        <ImpactCard icon="💰" label="Annual Savings" value="₹1.2L" color="green" />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function MetricBar({ label, value, percent, color }) {
  const map = {
    red: "bg-gradient-to-r from-red-500 to-rose-600",
    green: "bg-gradient-to-r from-green-500 to-emerald-600",
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div className={`${map[color]} h-2 rounded-full`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function ImpactCard({ icon, label, value, color }) {
  const map = {
    emerald: "from-emerald-500 to-green-600",
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
  };

  return (
    <div className={`rounded-3xl p-6 text-white shadow-[0_35px_90px_rgba(0,0,0,0.35)]
      bg-gradient-to-br ${map[color]} hover:-translate-y-1 transition`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div>
          <p className="text-sm opacity-90">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default EconomicImpact;




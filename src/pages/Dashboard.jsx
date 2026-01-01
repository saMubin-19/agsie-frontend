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

import {
  FiDroplet,
  FiTrendingUp,
  FiSun,
  FiBarChart2,
} from "react-icons/fi";
import { Bell } from "lucide-react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function Dashboard() {
  return (
    <div
      className="
        min-h-screen p-8 space-y-10
        bg-gradient-to-br from-gray-50 via-white to-gray-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        text-gray-900 dark:text-white
      "
    >
      {/* ================= TOP HEADER ================= */}
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
            AGSIE – Agri Geo Satellite Intelligence Engine
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Real-time satellite & field intelligence
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* Notification */}
          <div className="relative cursor-pointer">
            <Bell className="text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
          </div>

          {/* Admin */}
          <div className="flex items-center gap-3">
            <div
              className="
                w-10 h-10 rounded-full
                bg-gradient-to-br from-emerald-500 to-green-600
                text-white flex items-center justify-center font-bold
                shadow
              "
            >
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

      {/* ================= KPI CARDS ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          icon={<FiDroplet />}
          title="Soil Moisture"
          value="44%"
          status="Moderate"
          note="-6% from last week"
          source="NASA SMAP"
          gradient="from-blue-500 to-cyan-500"
        />

        <KpiCard
          icon={<FiTrendingUp />}
          title="Crop Health (NDVI)"
          value="0.75"
          status="Healthy"
          note="+4% improvement"
          source="Sentinel-2"
          gradient="from-emerald-500 to-green-600"
        />

        <KpiCard
          icon={<FiSun />}
          title="Heat Stress"
          value="32°C"
          status="Moderate"
          note="Above threshold"
          source="MODIS"
          gradient="from-amber-500 to-orange-600"
        />

        <KpiCard
          icon={<FiBarChart2 />}
          title="Yield Prediction"
          value="4.2 T/ha"
          status="Good"
          note="On track"
          source="AI Model"
          gradient="from-purple-500 to-indigo-600"
        />
      </section>

      {/* ================= CHARTS ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Soil Moisture Trend">
          <Line
            data={{
              labels: ["Jan 1", "Jan 5", "Jan 10", "Jan 15", "Jan 20", "Today"],
              datasets: [
                {
                  data: [45, 42, 38, 36, 50, 44],
                  borderColor: "#38bdf8",
                  backgroundColor: "rgba(56,189,248,0.25)",
                  fill: true,
                  tension: 0.4,
                },
              ],
            }}
          />
        </ChartCard>

        <ChartCard title="Crop Health (NDVI)">
          <Line
            data={{
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              datasets: [
                {
                  data: [0.65, 0.68, 0.72, 0.75],
                  borderColor: "#22c55e",
                  backgroundColor: "rgba(34,197,94,0.25)",
                  fill: true,
                  tension: 0.4,
                },
              ],
            }}
          />
        </ChartCard>
      </section>

      {/* ================= LOWER GRID ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts */}
        <div
          className="
            lg:col-span-2
            bg-white/70 dark:bg-slate-800/70
            backdrop-blur-xl
            rounded-3xl p-6
            shadow border border-white/40 dark:border-slate-700
          "
        >
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Today’s Alerts</h3>
            <span className="text-xs bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 px-2 py-1 rounded-full">
              3 Active
            </span>
          </div>

          <Alert text="Irrigation recommended in 2 days" time="2 hours ago" color="amber" />
          <Alert text="New satellite imagery available" time="5 hours ago" color="blue" />
          <Alert text="Crop health improved by 4%" time="1 day ago" color="green" />
        </div>

        {/* Weather */}
        <div
          className="
            rounded-3xl p-6 text-white
            bg-gradient-to-br from-sky-500 to-indigo-600
            shadow-[0_30px_90px_rgba(59,130,246,0.45)]
          "
        >
          <h3 className="font-semibold mb-4">Weather Summary</h3>

          <div className="text-4xl font-extrabold">28°C</div>
          <p className="text-sm opacity-90">Temperature</p>

          <div className="flex justify-between mt-6">
            <div>
              <p className="text-xl font-bold">65%</p>
              <p className="text-sm opacity-90">Humidity</p>
            </div>
            <div>
              <p className="text-xl font-bold">15%</p>
              <p className="text-sm opacity-90">Rain Chance</p>
            </div>
          </div>

          <p className="text-sm mt-6 opacity-90">
            Next 7 days: Mostly sunny with clouds
          </p>
        </div>
      </section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function KpiCard({ icon, title, value, status, note, source, gradient }) {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-3xl p-6
        bg-gradient-to-br ${gradient}
        text-white
        shadow-[0_30px_90px_rgba(0,0,0,0.35)]
        hover:-translate-y-1 transition
      `}
    >
      <div className="flex justify-between items-start">
        <div className="text-2xl bg-white/20 p-3 rounded-xl">
          {icon}
        </div>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
          {source}
        </span>
      </div>

      <h3 className="text-sm opacity-90 mt-6">{title}</h3>
      <p className="text-3xl font-extrabold">{value}</p>
      <p className="text-sm font-medium">{status}</p>
      <p className="text-xs opacity-80 mt-1">{note}</p>

      {/* glow */}
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div
      className="
        bg-white/70 dark:bg-slate-800/70
        backdrop-blur-xl
        rounded-3xl p-6
        shadow border border-white/40 dark:border-slate-700
      "
    >
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Alert({ text, time, color }) {
  const map = {
    amber: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-300",
    blue: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300",
    green: "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-300",
  };

  return (
    <div className={`border rounded-xl p-4 mb-3 ${map[color]}`}>
      <div className="flex justify-between">
        <span className="font-medium">{text}</span>
        <span className="text-xs opacity-70">{time}</span>
      </div>
    </div>
  );
}

export default Dashboard;










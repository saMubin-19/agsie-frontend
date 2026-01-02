
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FiDroplet, FiTrendingUp, FiSun, FiBarChart2 } from "react-icons/fi";
import { Bell, ChevronRight } from "lucide-react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  return (
    <div className="min-h-screen p-6 md:p-10 font-sans selection:bg-emerald-500 selection:text-white bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-white to-slate-50 dark:from-slate-900 dark:via-[#0f172a] dark:to-black">
      
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* ================= TOP HEADER (Refined Glass) ================= */}
        <header className="relative group flex flex-col md:flex-row justify-between items-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl rounded-[2.5rem] px-10 py-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/60 dark:border-white/5 transition-all">
          
          <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                Dashboard Overview
              </h2>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Real-time satellite and field intelligence
              </p>
            </div>

          <div className="flex items-center gap-8 mt-4 md:mt-0">
            <div className="relative p-3 rounded-2xl bg-slate-100 dark:bg-white/5 cursor-pointer hover:scale-110 transition-transform shadow-inner">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse" />
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-800 dark:text-white">John Farmer</p>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Agri Officer</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full rounded-[0.9rem] bg-white dark:bg-slate-900 flex items-center justify-center font-black text-slate-800 dark:text-white">
                  JF
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ================= KPI CARDS (3D Mesh Style) ================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <KpiCard
            icon={<FiDroplet />}
            title="Soil Moisture"
            value="44%"
            status="Moderate"
            note="-6% from last week"
            source="NASA SMAP"
            gradient="from-blue-600 to-cyan-500"
            shadowColor="shadow-blue-500/30"
          />
          <KpiCard
            icon={<FiTrendingUp />}
            title="Crop Health (NDVI)"
            value="0.75"
            status="Healthy"
            note="+4% improvement"
            source="Sentinel-2"
            gradient="from-emerald-600 to-green-500"
            shadowColor="shadow-emerald-500/30"
          />
          <KpiCard
            icon={<FiSun />}
            title="Heat Stress"
            value="32°C"
            status="Moderate"
            note="Above threshold"
            source="MODIS"
            gradient="from-amber-500 to-orange-600"
            shadowColor="shadow-orange-500/30"
          />
          <KpiCard
            icon={<FiBarChart2 />}
            title="Yield Prediction"
            value="4.2 T/ha"
            status="Good"
            note="On track"
            source="AI Model"
            gradient="from-purple-600 to-indigo-600"
            shadowColor="shadow-indigo-500/30"
          />
        </section>

        {/* ================= CHARTS (Ceramic Ceramic) ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="Soil Moisture Dynamics">
            <div className="h-[300px]">
              <Line
                options={chartOptions}
                data={{
                  labels: ["Jan 1", "Jan 5", "Jan 10", "Jan 15", "Jan 20", "Today"],
                  datasets: [{
                    label: "Moisture",
                    data: [45, 42, 38, 36, 50, 44],
                    borderColor: "#38bdf8",
                    backgroundColor: "rgba(56,189,248,0.1)",
                    borderWidth: 4,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                  }]
                }}
              />
            </div>
          </ChartCard>

          <ChartCard title="NDVI Vegetation Index">
            <div className="h-[300px]">
              <Line
                options={chartOptions}
                data={{
                  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                  datasets: [{
                    label: "NDVI",
                    data: [0.65, 0.68, 0.72, 0.75],
                    borderColor: "#10b981",
                    backgroundColor: "rgba(16,185,129,0.1)",
                    borderWidth: 4,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                  }]
                }}
              />
            </div>
          </ChartCard>
        </section>

        {/* ================= LOWER GRID ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
          <div className="lg:col-span-2 bg-white/60 dark:bg-slate-800/40 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white dark:border-white/5 transition-all">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black dark:text-white">Active Intelligence Alerts</h3>
              <span className="text-[10px] font-black uppercase tracking-widest bg-red-500 text-white px-3 py-1 rounded-full shadow-lg shadow-red-500/20">
                3 Urgent
              </span>
            </div>
            <div className="space-y-4">
              <Alert text="Irrigation recommended in 2 days" time="2 hours ago" color="amber" />
              <Alert text="New satellite imagery available" time="5 hours ago" color="blue" />
              <Alert text="Crop health improved by 4%" time="1 day ago" color="green" />
            </div>
          </div>

          {/* Weather Widget (4K Style) */}
          <div className="relative overflow-hidden rounded-[2.5rem] p-8 text-white bg-gradient-to-br from-sky-500 to-indigo-700 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.6)] group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
            
            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-6">Field Forecast</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-6xl font-black tracking-tighter mb-1">28°C</div>
                  <p className="text-lg font-medium opacity-90">Cloudy Intervals</p>
                </div>
                <div className="text-5xl animate-bounce">☁️</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/20">
                <div>
                  <p className="text-2xl font-black">65%</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70">Humidity</p>
                </div>
                <div>
                  <p className="text-2xl font-black">15%</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70">Precip</p>
                </div>
              </div>
              
              <div className="mt-8 py-3 px-4 bg-white/10 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-white/20 transition">
                <span className="text-sm font-bold italic">View 7-day trend</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function KpiCard({ icon, title, value, status, note, source, gradient, shadowColor }) {
  return (
    <div className={`
      relative group overflow-hidden rounded-[2.3rem] p-7
      bg-gradient-to-br ${gradient}
      text-white transition-all duration-500
      shadow-2xl ${shadowColor}
      hover:-translate-y-2 hover:scale-[1.02]
      border-t border-white/30
    `}>
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="text-2xl bg-black/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-inner">
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
          {source}
        </span>
      </div>

      <div className="relative z-10 mt-8">
        <h3 className="text-xs font-bold uppercase tracking-widest opacity-80">{title}</h3>
        <p className="text-4xl font-black tracking-tighter my-1 drop-shadow-md">{value}</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <p className="text-sm font-bold uppercase tracking-wide">{status}</p>
        </div>
        <p className="text-[11px] font-medium opacity-70 mt-3 italic">{note}</p>
      </div>

      {/* 3D Sphere Glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] border border-white dark:border-white/5">
      <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function Alert({ text, time, color }) {
  const map = {
    amber: "bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
    blue: "bg-blue-500/10 dark:bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
    green: "bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  };

  return (
    <div className={`group flex items-center justify-between border-l-4 rounded-2xl p-5 mb-4 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white dark:bg-slate-900/40 ${map[color]}`}>
      <div className="flex flex-col">
        <span className="text-sm font-black tracking-tight">{text}</span>
        <span className="text-[10px] uppercase font-bold opacity-60 mt-1 tracking-widest">{time}</span>
      </div>
      <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </div>
  );
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#c3c7cfff",
      padding: 12,
      titleFont: { size: 14, weight: 'bold' },
      cornerRadius: 12,
    }
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { weight: 'bold' } } },
    y: { grid: { borderDash: [5, 5], color: "rgba(0,0,0,0.05)" }, ticks: { font: { weight: 'bold' } } }
  }
};

export default Dashboard;










import React from "react";
import {
  FiTrendingUp,
  FiDroplet,
  FiBarChart2,
  FiLayers,
  FiArrowUpRight,
  FiChevronDown,
} from "react-icons/fi";

function Comparison() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#020617] p-6 md:p-10 text-slate-900 dark:text-white space-y-12 transition-colors duration-500">
      
      {/* ================= 4K BACKGROUND MESH ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/20 dark:bg-emerald-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-10">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
              Comparison Mode
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-2">
              Analyze performance across fields, seasons, and scenarios.
            </p>
          </div>
        </div>

        {/* ================= SELECT (Floating Glass Bar) ================= */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[2rem] p-8 shadow-xl border border-white/60 dark:border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6">
            Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
            <Select label="Baseline Dataset (Item 1)" />
            
            {/* VS Badge in the middle */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full items-center justify-center shadow-lg z-10 font-black text-xs border border-slate-100 dark:border-slate-700 text-slate-400">
              VS
            </div>

            <Select label="Comparison Target (Item 2)" />
          </div>
        </div>

        {/* ================= COMPARISON CARDS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* CURRENT (Emerald Theme) */}
          <CompareCard
            title="Field-A (Current Season)"
            accent="emerald"
            badge="Baseline"
            data={[
              ["NDVI", "0.75"],
              ["Soil Moisture", "44%"],
              ["Yield Forecast", "4.2 T/ha"],
              ["Water Usage", "1,250 m³"],
            ]}
          />

          {/* PREVIOUS (Blue Theme) */}
          <CompareCard
            title="Field-A (Previous Season)"
            accent="blue"
            badge="Comparison"
            data={[
              ["NDVI", "0.68"],
              ["Soil Moisture", "38%"],
              ["Yield Actual", "3.6 T/ha"],
              ["Water Usage", "1,570 m³"],
            ]}
          />
        </div>

        {/* ================= INSIGHTS (Holographic Card) ================= */}
        <div className="
          relative overflow-hidden group
          rounded-[2.5rem] p-8 md:p-10
          bg-gradient-to-br from-emerald-600 to-teal-700
          text-white shadow-[0_30px_80px_-20px_rgba(16,185,129,0.5)]
        ">
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md shadow-inner border border-white/20">
               <FiArrowUpRight className="text-4xl" />
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-2">AI Comparison Insights</h3>
                <p className="text-emerald-100 font-medium">Key performance indicators suggest significant efficiency gains.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InsightPill text="NDVI improved by 10.3%" highlight="10.3%" />
                <InsightPill text="Soil moisture +15.8% efficiency" highlight="15.8%" />
                <InsightPill text="Yield forecast +16.7% increase" highlight="16.7%" />
                <InsightPill text="Water usage reduced by 20.4%" highlight="20.4%" />
              </div>
            </div>
          </div>

          {/* Decorative Glows */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-1/4 w-96 h-32 bg-teal-400/30 blur-3xl" />
        </div>

      </div>
    </div>
  );
}

/* ================= PREMIUM COMPONENTS ================= */

function Select({ label }) {
  return (
    <div className="group">
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 ml-1">
        {label}
      </label>
      <div className="relative">
        <select className="
          w-full px-6 py-4 rounded-2xl appearance-none cursor-pointer
          bg-slate-50 dark:bg-slate-950/50
          text-slate-900 dark:text-white font-bold text-lg
          border border-slate-200 dark:border-slate-800
          shadow-inner
          focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
          focus:bg-white dark:focus:bg-slate-900
          transition-all duration-300
        ">
          <option>Field-A (Current Season)</option>
          <option>Field-A (Previous Season)</option>
          <option>Field-B</option>
        </select>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-emerald-500 transition-colors">
          <FiChevronDown className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function CompareCard({ title, data, accent, badge }) {
  const styles = {
    emerald: {
      gradient: "from-emerald-500 to-green-400",
      shadow: "shadow-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    blue: {
      gradient: "from-blue-500 to-indigo-400",
      shadow: "shadow-blue-500/10",
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
  };

  const activeStyle = styles[accent];

  return (
    <div className={`
      relative rounded-[2.5rem] p-8
      bg-white/80 dark:bg-slate-800/60
      backdrop-blur-2xl
      shadow-2xl ${activeStyle.shadow}
      border border-white/60 dark:border-white/5
      group hover:-translate-y-2 transition-transform duration-500
    `}>
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1.5 rounded-b-xl bg-gradient-to-r ${activeStyle.gradient}`} />

      <div className="flex justify-between items-start mb-8">
        <div>
           <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${activeStyle.bg} ${activeStyle.text} mb-3 inline-block`}>
             {badge}
           </span>
          <h3 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <FiLayers className={activeStyle.text} />
            {title}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
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
    "Yield Forecast": <FiTrendingUp className="text-emerald-500" />,
    "Yield Actual": <FiTrendingUp className="text-orange-500" />,
    "Water Usage": <FiDroplet className="text-cyan-500" />,
  };

  return (
    <div className="
      flex justify-between items-center
      bg-slate-50 dark:bg-slate-900/40
      border border-slate-100 dark:border-slate-700
      rounded-2xl px-5 py-4
      group/row hover:bg-white dark:hover:bg-slate-800
      transition-colors duration-300 shadow-sm
    ">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm group-hover/row:scale-110 transition-transform">
           {iconMap[label]}
        </div>
        <span className="font-bold text-sm text-slate-600 dark:text-slate-300">
          {label}
        </span>
      </div>
      <span className="font-black text-lg text-slate-900 dark:text-white tracking-tight">
        {value}
      </span>
    </div>
  );
}

function InsightPill({ text, highlight }) {
    // Splits text to bold the highlight
    const parts = text.split(highlight);
    return (
        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
            <span>
                {parts[0]} <span className="font-black text-white">{highlight}</span> {parts[1]}
            </span>
        </div>
    )
}

export default Comparison;



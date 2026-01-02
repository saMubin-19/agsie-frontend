// src/pages/AIDecision.jsx


/* ==============================
   LOGIC UTILITIES (UNCHANGED)
============================== */
function classifyNDVI(ndvi) {
  // Adjusted text colors for better visibility in Light vs Dark
  if (ndvi > 0.65) return { level: "Healthy", color: "text-emerald-600 dark:text-emerald-400" };
  if (ndvi > 0.45) return { level: "Mild Stress", color: "text-lime-600 dark:text-lime-400" };
  if (ndvi > 0.3) return { level: "Moderate Stress", color: "text-yellow-600 dark:text-yellow-400" };
  return { level: "Severe Stress", color: "text-red-600 dark:text-red-400" };
}

function classifyHeatStress(temp) {
  const base = 32;
  if (temp <= base) return { level: "No Heat Stress", loss: 0 };
  const excess = temp - base;
  return {
    level: excess < 3 ? "Moderate Heat Stress" : "Severe Heat Stress",
    loss: Math.min(excess * 4, 40),
  };
}

function calculateEconomics({ areaHa, waterMM, yieldLoss }) {
  const waterCostPerMM = 12;
  const baseYield = 4.5;
  const cropPrice = 320;
  const irrigationCost = waterMM * areaHa * waterCostPerMM;
  const finalYield = baseYield * (1 - yieldLoss / 100);
  const revenue = finalYield * cropPrice;
  return {
    irrigationCost: irrigationCost.toFixed(0),
    revenue: revenue.toFixed(0),
    profit: (revenue - irrigationCost).toFixed(0),
  };
}

/* ==============================
   MAIN COMPONENT
============================== */
function AIDecision({ fieldData }) {
  const data = fieldData || {
    ndvi: 0.42,
    areaHa: 2.1,
    temperatureC: 35,
    waterMM: 25,
  };

  const ndvi = classifyNDVI(data.ndvi);
  const heat = classifyHeatStress(data.temperatureC);
  const yieldLoss = Math.min((data.ndvi < 0.45 ? 15 : 0) + heat.loss, 50);
  const economics = calculateEconomics({
    areaHa: data.areaHa,
    waterMM: data.waterMM,
    yieldLoss,
  });

  return (
    // 1. MAIN BACKGROUND:
    // Light Mode: Subtle "Ceramic" Gradient (Gray-50 to White)
    // Dark Mode: Deep "Cosmic" Gradient (Slate-900 to Black)
    <div className="min-h-screen p-6 md:p-12 font-sans transition-colors duration-500 bg-[#f8fafc] dark:bg-slate-900 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white dark:from-slate-800 dark:via-[#0f172a] dark:to-black text-slate-900 dark:text-white selection:bg-emerald-500 selection:text-white">
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* ================= TOP BAR ================= */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              {/* Online Indicator: Dark green ring (Light) vs Glowing Dot (Dark) */}
              <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase">System Online</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-200 dark:to-slate-500 drop-shadow-sm">
              AI Decision<span className="text-emerald-500">.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-light tracking-wide">
              Prescriptive analytics for <span className="font-bold text-slate-800 dark:text-white">Field Sector 7</span>
            </p>
          </div>

          {/* Profile Card: White Ceramic (Light) vs Glass (Dark) */}
          <div className="flex items-center gap-4 p-2 pr-6 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] dark:shadow-2xl backdrop-blur-md transition-all">
             <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 p-[2px]">
                   <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden transition-colors">
                      <span className="font-bold text-xl text-slate-800 dark:text-white">JF</span>
                   </div>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full transition-colors"></div>
             </div>
             <div>
                <p className="font-bold text-slate-800 dark:text-white leading-tight">John Farmer</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase">Senior Agronomist</p>
             </div>
          </div>
        </div>

        {/* ================= GRID LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (Visuals) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* HERO CARD: 
                We keep this Dark/Vibrant even in Light Mode because "Data Screens" look better as high-contrast elements.
                This acts as the visual anchor of the page.
            */}
            <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-teal-900 p-1 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] dark:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.5)] transform transition hover:scale-[1.01] duration-500">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
               
               <div className="relative h-full rounded-[2.3rem] bg-slate-900/40 backdrop-blur-md p-10 flex flex-col justify-between border-t border-white/20">
                  <div>
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-4 text-emerald-300 shadow-sm">
                      Live Analysis
                    </span>
                    <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-md">
                      Mid-Growth Phase
                    </h2>
                    <p className="text-emerald-100/90 text-lg font-medium">Rice Crop · Day 45/120</p>
                  </div>

                  <div className="mt-8 flex gap-6">
                     <div className="flex-1 bg-black/20 rounded-2xl p-4 border border-white/10 backdrop-blur-md shadow-inner">
                        <p className="text-xs text-emerald-300 uppercase tracking-wider mb-1 font-semibold">NDVI Score</p>
                        <p className={`text-3xl font-bold ${ndvi.color.includes('emerald') ? 'text-emerald-400' : ndvi.color.includes('lime') ? 'text-lime-400' : 'text-yellow-400'} drop-shadow-sm`}>{data.ndvi}</p>
                     </div>
                     <div className="flex-1 bg-black/20 rounded-2xl p-4 border border-white/10 backdrop-blur-md shadow-inner">
                        <p className="text-xs text-orange-200 uppercase tracking-wider mb-1 font-semibold">Temp</p>
                        <p className="text-3xl font-bold text-white">{data.temperatureC}°C</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* RECOMMENDATION ENGINE: 
                Light Mode: Clean White Card + Soft Blur Shadow 
                Dark Mode: Dark Glass + Neon Shadow
            */}
            <div className="relative rounded-[2.5rem] bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-white/5 p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-2xl backdrop-blur-xl overflow-hidden transition-all">
               
               {/* Decorative Gradient Blob */}
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-100 dark:bg-emerald-500/20 rounded-full blur-[80px] opacity-60 dark:opacity-100 transition-opacity"></div>
               
               <div className="absolute top-10 right-10 animate-pulse">
                  <span className="px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-100 dark:border-emerald-500/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase shadow-sm">
                    92% Confidence
                  </span>
               </div>

               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">AI Recommendation</h3>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-cyan-400">Nitrogen Injection</span> <br/>
                  + Precision Irrigation
               </h2>

               <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Detected <span className="text-slate-900 dark:text-white font-semibold">NDVI drops</span> and incoming heat wave. 
                  Apply <span className="text-emerald-600 dark:text-emerald-400 font-bold border-b-2 border-emerald-500/30">45 kg/ha nitrogen</span> immediately, 
                  followed by <span className="text-cyan-600 dark:text-cyan-400 font-bold border-b-2 border-cyan-500/30">{data.waterMM}mm irrigation</span>.
               </p>

               {/* Action Bar */}
               <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg shadow-lg shadow-emerald-200 dark:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                     Initialize Protocol
                  </button>
                  <button className="px-8 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition font-semibold backdrop-blur-md">
                     Simulate
                  </button>
               </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Data & Metrics) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Economic Impact */}
            <div className="space-y-4">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-2">Projected Economics</h3>
               
               <MetricCard 
                  label="Irrigation Cost" 
                  value={`$${economics.irrigationCost}`} 
                  icon="💧" 
                  color="text-cyan-600 dark:text-cyan-400"
                  iconBg="bg-cyan-50 dark:bg-white/5"
               />
               <MetricCard 
                  label="Expected Revenue" 
                  value={`$${economics.revenue}`} 
                  icon="💰" 
                  color="text-emerald-600 dark:text-emerald-400"
                  iconBg="bg-emerald-50 dark:bg-white/5"
               />
               
               {/* Profit Card - Vibrant in both modes */}
               <div className="relative rounded-3xl p-6 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl shadow-indigo-200 dark:shadow-[0_15px_40px_-10px_rgba(79,70,229,0.5)] border-t border-white/20 text-white">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider mb-1">Net Profit Prediction</p>
                        <p className="text-4xl font-bold tracking-tight">${economics.profit}</p>
                     </div>
                     <div className="text-3xl opacity-30 rotate-12 bg-white/10 rounded-lg p-2">📈</div>
                  </div>
               </div>
            </div>

            {/* Alternatives */}
            <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-8 border border-gray-100 dark:border-white/5 shadow-lg shadow-gray-200/50 dark:shadow-none backdrop-blur-sm transition-colors">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Alternative Scenarios</h3>
               
               <div className="space-y-3">
                  <AltOption title="Delay fertilization (7 days)" confidence="76%" color="bg-yellow-400" />
                  <AltOption title="Split application" confidence="84%" color="bg-blue-400" />
                  <AltOption title="Organic compost route" confidence="68%" color="bg-purple-400" />
               </div>
            </div>
            
             {/* Yield Loss Warning */}
             <div className="rounded-3xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-6 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-500 dark:text-red-400 text-xl">
                   ⚠️
                </div>
                <div>
                   <p className="text-red-500 dark:text-red-400 text-xs font-bold uppercase tracking-wider">Risk Assessment</p>
                   <p className="text-slate-600 dark:text-slate-300 text-sm">Action prevents <span className="text-slate-900 dark:text-white font-bold">{yieldLoss}% yield loss</span> estimated.</p>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ==============================
   SUB-COMPONENTS (STYLED FOR DUAL MODE)
============================== */

function MetricCard({ label, value, icon, color, iconBg }) {
   return (
      <div className="group flex items-center justify-between p-6 rounded-3xl bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-white/5 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-none hover:border-emerald-200 dark:hover:bg-slate-800/60 transition-all cursor-default">
         <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
            <p className={`text-2xl font-black ${color} drop-shadow-sm`}>{value}</p>
         </div>
         <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300`}>
            {icon}
         </div>
      </div>
   );
}

function AltOption({ title, confidence, color }) {
   return (
      <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-white hover:shadow-md dark:hover:bg-white/10 border border-transparent hover:border-gray-100 dark:border-white/5 transition-all cursor-pointer group">
         <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${color} shadow-sm`}></div>
            <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-emerald-600 dark:group-hover:text-white transition">{title}</span>
         </div>
         <div className="text-xs font-bold text-slate-500 bg-white dark:bg-black/30 px-2 py-1 rounded-lg border border-gray-200 dark:border-white/5">
            {confidence}
         </div>
      </div>
   );
}

export default AIDecision;







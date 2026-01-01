// src/pages/AIDecision.jsx

/* ==============================
   NDVI STRESS CLASSIFICATION
============================== */
function classifyNDVI(ndvi) {
  if (ndvi > 0.65) return { level: "Healthy", color: "text-emerald-400" };
  if (ndvi > 0.45) return { level: "Mild Stress", color: "text-lime-400" };
  if (ndvi > 0.3) return { level: "Moderate Stress", color: "text-yellow-400" };
  return { level: "Severe Stress", color: "text-red-400" };
}

/* ==============================
   HEAT STRESS
============================== */
function classifyHeatStress(temp) {
  const base = 32;
  if (temp <= base) return { level: "No Heat Stress", loss: 0 };
  const excess = temp - base;
  return {
    level: excess < 3 ? "Moderate Heat Stress" : "Severe Heat Stress",
    loss: Math.min(excess * 4, 40),
  };
}

/* ==============================
   ECONOMIC MODEL
============================== */
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

  const yieldLoss = Math.min(
    (data.ndvi < 0.45 ? 15 : 0) + heat.loss,
    50
  );

  const economics = calculateEconomics({
    areaHa: data.areaHa,
    waterMM: data.waterMM,
    yieldLoss,
  });

  return (
    <div className="min-h-screen p-10 space-y-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 text-gray-900 dark:text-white">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold">
            AI Prescriptive Decision Support
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Data-driven recommendations for optimal farm management
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center font-bold">
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

      {/* ================= CURRENT STAGE ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.35)] text-white">
        <p className="uppercase tracking-wide opacity-80">
          Current Crop Stage
        </p>
        <h2 className="text-3xl font-bold mt-2">
          Mid-Growth Phase
        </h2>
        <p className="opacity-90 mt-1">
          Day 45 of 120 · Rice Crop
        </p>

        <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl">
          ↗
        </div>
      </div>

      {/* ================= RECOMMENDATION ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.15)] border border-emerald-400/40">
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
          High Priority
        </span>

        <h3 className="text-2xl font-bold text-emerald-500">
          Apply Nitrogen Fertilizer + Irrigation
        </h3>

        <p className="mt-4 text-gray-700 dark:text-slate-300">
          Based on NDVI ({data.ndvi}), soil moisture (44%), and heat stress,
          apply <b>45 kg/ha nitrogen</b> within 3 days followed by
          <b> {data.waterMM} mm irrigation</b>.
        </p>

        <div className="mt-6">
          <p className="text-sm mb-1">Confidence Level</p>
          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-700">
            <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-600 w-[92%]" />
          </div>
          <p className="text-right text-xs mt-1">92%</p>
        </div>
      </div>

      {/* ================= WHY THIS ACTION ================= */}
      <div className="rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-300/40">
        <h3 className="font-semibold mb-4 text-lg">
          Why This Action?
        </h3>
        <ul className="space-y-2 text-sm">
          <li>✅ NDVI Status: <span className={ndvi.color}>{ndvi.level}</span></li>
          <li>✅ Heat stress manageable in next 5 days</li>
          <li>✅ Yield loss prevented: ~{yieldLoss}%</li>
          <li>✅ Profit optimized using historical data</li>
        </ul>
      </div>

      {/* ================= ALTERNATIVES ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg">
        <h3 className="font-semibold mb-4 text-lg">
          Alternative Options
        </h3>

        <AltOption title="Delay fertilization by 7 days" confidence="76%" />
        <AltOption title="Split fertilizer application" confidence="84%" />
        <AltOption title="Organic compost application" confidence="68%" />
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex gap-4">
        <button className="flex-1 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg hover:scale-[1.01] transition">
          Implement Recommendation
        </button>
        <button className="px-6 py-4 rounded-xl border dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700">
          Save for Later
        </button>
      </div>

      {/* ================= ECONOMIC SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Metric title="Irrigation Cost" value={`$${economics.irrigationCost}`} />
        <Metric title="Expected Revenue" value={`$${economics.revenue}`} />
        <Metric title="Net Profit" value={`$${economics.profit}`} highlight />
      </div>

    </div>
  );
}

/* ==============================
   SMALL COMPONENTS
============================== */
function AltOption({ title, confidence }) {
  return (
    <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-700/40 p-4 rounded-xl mb-3">
      <span>{title}</span>
      <span className="text-sm text-gray-500">
        Confidence {confidence}
      </span>
    </div>
  );
}

function Metric({ title, value, highlight }) {
  return (
    <div className={`rounded-3xl p-6 text-center shadow-lg ${
      highlight
        ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white"
        : "bg-white dark:bg-slate-800"
    }`}>
      <p className="text-sm opacity-80">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default AIDecision;







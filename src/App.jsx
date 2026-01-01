import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

/* ICONS (Lucide) */
import {
  LayoutDashboard,
  Map,
  Satellite,
  Sprout,
  Bell,
  Brain,
  DollarSign,
  Leaf,
  Droplet,
  TrendingUp,
  Cloud,
  Clock,
  FileText,
  BarChart3,
  Settings
} from "lucide-react";

/* CORE PAGES */
import Dashboard from "./pages/Dashboard";
import FieldMap from "./pages/FieldMap";
import SatelliteData from "./pages/SatelliteData";
import AIDecision from "./pages/AIDecision";

/* ADDITIONAL FEATURE PAGES */
import CropHealth from "./pages/CropHealth";
import Alerts from "./pages/Alerts";
import EconomicImpact from "./pages/EconomicImpact";
import Environmental from "./pages/Environmental";
import Irrigation from "./pages/Irrigation";
import YieldForecast from "./pages/YieldForecast";
import Weather from "./pages/Weather";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Comparison from "./pages/Comparison";
import SettingsPage from "./pages/Settings";

function App() {
  const [fieldData, setFieldData] = useState(null);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white">


      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-green-700 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Leaf size={24} />
          AGSIE
        </h1>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">

            <MenuLink to="/" icon={LayoutDashboard} label="Dashboard" />
            <MenuLink to="/field-map" icon={Map} label="Field Map" />
            <MenuLink to="/satellite-data" icon={Satellite} label="Satellite Data" />
            <MenuLink to="/crop-health" icon={Sprout} label="Crop Health" />
            <MenuLink to="/alerts" icon={Bell} label="Alerts" />
            <MenuLink to="/ai-decision" icon={Brain} label="AI Decision" />
            <MenuLink to="/economic-impact" icon={DollarSign} label="Economic Impact" />
            <MenuLink to="/environmental" icon={Leaf} label="Environmental" />
            <MenuLink to="/irrigation" icon={Droplet} label="Irrigation" />
            <MenuLink to="/yield-forecast" icon={TrendingUp} label="Yield Forecast" />
            <MenuLink to="/weather" icon={Cloud} label="Weather" />
            <MenuLink to="/history" icon={Clock} label="History" />
            <MenuLink to="/reports" icon={FileText} label="Reports" />
            <MenuLink to="/notifications" icon={Bell} label="Notifications" />
            <MenuLink to="/comparison" icon={BarChart3} label="Comparison" />
            <MenuLink to="/settings" icon={Settings} label="Settings" />

          </ul>
        </nav>

        <p className="text-xs text-green-200 mt-6">
          © AGSIE Platform
        </p>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route
            path="/field-map"
            element={<FieldMap setFieldData={setFieldData} />}
          />

          <Route path="/satellite-data" element={<SatelliteData />} />
          <Route path="/crop-health" element={<CropHealth />} />
          <Route path="/alerts" element={<Alerts />} />

          <Route
            path="/ai-decision"
            element={<AIDecision fieldData={fieldData} />}
          />

          <Route path="/economic-impact" element={<EconomicImpact />} />
          <Route path="/environmental" element={<Environmental />} />
          <Route path="/irrigation" element={<Irrigation />} />
          <Route path="/yield-forecast" element={<YieldForecast />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/history" element={<History />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/settings" element={<SettingsPage />} />

        </Routes>
      </main>

    </div>
  );
}

/* ================= MENU LINK COMPONENT ================= */

function MenuLink({ to, icon: Icon, label }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-green-800 transition"
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    </li>
  );
}

export default App;




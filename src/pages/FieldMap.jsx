import * as turf from "@turf/turf";
import { useState } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
} from "react-leaflet";

import {
  FiUpload,
  FiBell,
  FiMap,
  FiLayers,
  FiInfo,
  FiDownload,
} from "react-icons/fi";

import { analyzeField } from "../services/agsieApi"; // 🔥 BACKEND API

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";

/* ================= FIX LEAFLET ICON ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FieldMap({ setFieldData }) {
  const [areaHa, setAreaHa] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null); // 🔥 backend data
  const [analyzing, setAnalyzing] = useState(false); // 🔥 loading
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div
      className="
        min-h-screen p-8 space-y-8
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
            Field Intelligence Map
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Draw boundaries & analyze satellite layers
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="
              flex items-center gap-2 px-4 py-2 rounded-xl
              bg-gradient-to-r from-emerald-500 to-green-600
              text-white font-semibold shadow
            "
          >
            <FiUpload /> Upload GeoJSON
          </button>

          <div className="relative">
            <FiBell className="text-xl text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* ================= MAP LAYOUT ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* SIDEBAR */}
        <div className="space-y-5">
          <GlassPanel icon={<FiMap />} title="Select Field">
            <select className="select">
              <option>Field-A</option>
              <option>Field-B</option>
            </select>
          </GlassPanel>

          <GlassPanel icon={<FiLayers />} title="Layer Controls">
            <Layer label="Soil Moisture" color="blue" checked />
            <Layer label="NDVI" color="emerald" />
            <Layer label="Heat Stress" color="amber" />
          </GlassPanel>

          <GlassPanel icon={<FiInfo />} title="Field Info">
            <InfoRow label="Area" value={areaHa ? `${areaHa} ha` : "--"} />
            <InfoRow
              label="NDVI"
              value={analysisResult?.ndvi_status || "--"}
            />
            <InfoRow
              label="Recommendation"
              value={analysisResult?.recommendation || "--"}
            />
            {analyzing && (
              <p className="text-xs text-emerald-500 mt-2">
                Analyzing field…
              </p>
            )}
          </GlassPanel>

          <button
            className="
              w-full py-2 rounded-xl flex items-center justify-center gap-2
              bg-gray-100 dark:bg-slate-800
              hover:bg-gray-200 dark:hover:bg-slate-700
              font-semibold transition
            "
          >
            <FiDownload /> Export Map
          </button>
        </div>

        {/* MAP */}
        <div className="xl:col-span-3 relative">
          <div
            className="
              h-[560px] rounded-3xl overflow-hidden
              shadow-[0_40px_120px_rgba(0,0,0,0.25)]
            "
          >
            <MapContainer
              center={[23.685, 90.3563]}
              zoom={9}
              className="h-full w-full"
            >
              <TileLayer
                url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                opacity={0.9}
              />

              <TileLayer
                url={
                  isDark
                    ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                }
                opacity={0.45}
              />

              <Polygon
                positions={[
                  [23.72, 90.35],
                  [23.72, 90.45],
                  [23.65, 90.45],
                  [23.65, 90.35],
                ]}
                pathOptions={{
                  color: "#22c55e",
                  weight: 3,
                  fillOpacity: 0.25,
                }}
              >
                <Popup>Farm Boundary</Popup>
              </Polygon>

              <FeatureGroup>
                <EditControl
                  position="topright"
                  draw={{
                    rectangle: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: false,
                    polygon: true,
                  }}
                  edit={{ remove: true }}
                  onCreated={async (e) => {
                    const geojson = e.layer.toGeoJSON();

                    // frontend area calculation
                    const areaSqM = turf.area(geojson);
                    const hectares = (areaSqM / 10000).toFixed(2);
                    setAreaHa(hectares);

                    try {
                      setAnalyzing(true);

                      // 🔥 BACKEND ANALYSIS
                      const result = await analyzeField(geojson);
                      setAnalysisResult(result);

                      setFieldData({
                        ...result,
                        areaHa: hectares,
                        geojson,
                      });
                    } catch (err) {
                      alert("Backend analysis failed");
                    } finally {
                      setAnalyzing(false);
                    }
                  }}
                />
              </FeatureGroup>
            </MapContainer>
          </div>

          {/* LEGEND */}
          <div
            className="
              absolute bottom-6 right-6
              bg-white/80 dark:bg-slate-800/80
              backdrop-blur-xl
              rounded-2xl p-4 shadow
            "
          >
            <p className="font-semibold mb-2">NDVI Legend</p>
            <Legend color="bg-red-500" label="Low" />
            <Legend color="bg-yellow-400" label="Moderate" />
            <Legend color="bg-green-500" label="High" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function GlassPanel({ icon, title, children }) {
  return (
    <div
      className="
        bg-white/70 dark:bg-slate-800/70
        backdrop-blur-xl
        rounded-3xl p-5
        shadow border border-white/40 dark:border-slate-700
      "
    >
      <h3 className="flex items-center gap-2 font-semibold mb-4">
        <span className="text-emerald-500">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Layer({ label, color, checked }) {
  const map = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
  };

  return (
    <label className="flex items-center gap-3 text-sm mb-2">
      <input type="checkbox" defaultChecked={checked} />
      <span className={`w-2.5 h-2.5 rounded-full ${map[color]}`} />
      {label}
    </label>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-500 dark:text-slate-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`w-3 h-3 rounded ${color}`} />
      {label}
    </div>
  );
}

export default FieldMap;









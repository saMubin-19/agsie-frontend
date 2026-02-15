import * as turf from "@turf/turf";
import { useState, useEffect } from "react";
import { FeatureGroup, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import {
  analyzeField,
  fetchFields,
  deleteField,
  exportFieldGeoJSON,
  exportFieldShapefile,
  updateField,
} from "../services/agsieApi";


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

/* ================= MAP ZOOM HELPER ================= */
function FlyToField({ geometry }) {
  const map = useMap();

  useEffect(() => {
    if (!geometry) return;

    const coords = geometry.coordinates[0].map(
      ([lng, lat]) => [lat, lng]
    );

    map.fitBounds(coords, { padding: [40, 40] });
  }, [geometry, map]);

  return null;
}

function FieldMap({ setFieldData }) {
  const [areaHa, setAreaHa] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [savedFields, setSavedFields] = useState([]);

  const [selectedField, setSelectedField] = useState(null);
   
   /* ================= EXPORT FIELD ================= */
const handleExportField = async () => {
  if (!selectedField) {
    alert("Please select a field to export");
    return;
  }

  try {
    const geojson = await exportFieldGeoJSON(selectedField.id);

    const blob = new Blob(
      [JSON.stringify(geojson, null, 2)],
      { type: "application/geo+json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `field-${selectedField.id}.geojson`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    alert("Failed to export field");
  }
};


  const [selectedFieldId, setSelectedFieldId] = useState("");

  const isDark = document.documentElement.classList.contains("dark");

  /* ================= LOAD SAVED FIELDS ================= */
  useEffect(() => {
    async function loadFields() {
      try {
        const data = await fetchFields();
        setSavedFields(data);
      } catch (err) {
        console.error("Failed to load fields", err);
      }
    }

    loadFields();
  }, []);

  
  const handleExportShapefile = async () => {
  if (!selectedField) {
    alert("Please select a field to export");
    return;
  }

  try {
    const blob = await exportFieldShapefile(selectedField.id);

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `field-${selectedField.id}.zip`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    alert("Failed to export Shapefile");
  }
};


  /* ================= DELETE FIELD ================= */
  const handleDeleteField = async () => {
    if (!selectedField) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this field? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await deleteField(selectedField.id);

      const updated = await fetchFields();
      setSavedFields(updated);

      setSelectedField(null);
      setSelectedFieldId("");
      setAreaHa(null);
      setAnalysisResult(null);
    } catch (err) {
      alert("Failed to delete field");
    }
  };

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
            <select
              value={selectedFieldId}
              onChange={(e) => {
                const id = Number(e.target.value);
                setSelectedFieldId(e.target.value);

                const field = savedFields.find((f) => f.id === id);
                setSelectedField(field || null);
              }}
              className="
                select
                bg-white text-gray-900
                dark:bg-slate-800 dark:text-white
                dark:border-slate-600
              "
            >
              <option value="">Select a field</option>
              {savedFields.map((field) => (
                <option key={field.id} value={field.id}>
                  Field #{field.id}
                </option>
              ))}
            </select>
          </GlassPanel>

          <GlassPanel icon={<FiLayers />} title="Layer Controls">
            <Layer label="Soil Moisture" color="blue" checked />
            <Layer label="NDVI" color="emerald" />
            <Layer label="Heat Stress" color="amber" />
          </GlassPanel>

          <GlassPanel icon={<FiInfo />} title="Field Info">
            <InfoRow
              label="Area"
              value={
                selectedField
                  ? `${selectedField.area_hectares} ha`
                  : areaHa
                  ? `${areaHa} ha`
                  : "--"
              }
            />
    <InfoRow
  label="NDVI"
  value={
    selectedField
      ? selectedField.ndvi_status
      : analysisResult?.ndvi_status || "--"
  }
/>


            <InfoRow
  label="Recommendation"
  value={
    selectedField
      ? selectedField.ndvi_status === "Healthy"
        ? "Maintain irrigation"
        : selectedField.ndvi_status === "Moderate"
        ? "Monitor crop stress"
        : "Immediate action required"
      : analysisResult
      ? analysisResult.ndvi_status === "Healthy"
        ? "Maintain irrigation"
        : analysisResult.ndvi_status === "Moderate"
        ? "Monitor crop stress"
        : "Immediate action required"
      : "--"
  }
/>


            {analyzing && (
              <p className="text-xs text-emerald-500 mt-2">
                Analyzing field…
              </p>
            )}

            {/* 🔥 DELETE BUTTON */}
            {selectedField && (
              <button
                onClick={handleDeleteField}
                className="
                  mt-4 w-full flex items-center justify-center gap-2
                  py-2 rounded-xl font-semibold
                  bg-gradient-to-r from-red-500 to-rose-600
                  text-white shadow
                  hover:opacity-90 transition
                "
              >
                🗑️ Delete Field
              </button>
            )}
          </GlassPanel>

          <button
  onClick={handleExportField}
  disabled={!selectedField}
  className={`
    w-full py-2 rounded-xl flex items-center justify-center gap-2
    font-semibold transition
    ${
      selectedField
        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
        : "bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed"
    }
  `}
>
  <FiDownload /> Export GeoJSON
</button>

<button
  onClick={handleExportShapefile}
  disabled={!selectedField}
  className={`
    w-full py-2 rounded-xl flex items-center justify-center gap-2
    font-semibold transition
    ${
      selectedField
        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
        : "bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed"
    }
  `}
>
  🗺️ Export Shapefile
</button>


        </div>



        {/* MAP */}
        <div className="xl:col-span-3 relative">
          <div className="h-[560px] rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
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

              {selectedField && (
                <FlyToField geometry={selectedField.geometry} />
              )}

              {savedFields.map((field) => (
                <Polygon
                  key={field.id}
                  positions={field.geometry.coordinates[0].map(
                    ([lng, lat]) => [lat, lng]
                  )}
                  pathOptions={{
                    color:
                      field.ndvi_status === "Healthy"
                        ? "#22c55e"
                        : field.ndvi_status === "Moderate"
                        ? "#facc15"
                        : "#ef4444",
                    weight: selectedField?.id === field.id ? 5 : 3,
                    fillOpacity: 0.3,
                  }}
                  eventHandlers={{
                    click: () => {
                      setSelectedField(field);
                      setSelectedFieldId(String(field.id));
                    },
                  }}
                >
                  <Popup>
                    <b>Area:</b> {field.area_hectares} ha <br />
                    <b>NDVI:</b> {field.ndvi_status}
                  </Popup>
                </Polygon>
              ))}

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
                    setSelectedField(null);
                    setSelectedFieldId("");

                    const geojson = e.layer.toGeoJSON();
                    const areaSqM = turf.area(geojson);
                    const hectares = (areaSqM / 10000).toFixed(2);
                    setAreaHa(hectares);

                    try {
                      setAnalyzing(true);

                      const result = await analyzeField(geojson);
                      setAnalysisResult(result);

                      const updated = await fetchFields();
                      setSavedFields(updated);

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
        </div>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function GlassPanel({ icon, title, children }) {
  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-5 shadow border border-white/40 dark:border-slate-700">
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
 













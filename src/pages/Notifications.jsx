import { useState } from "react";
import {
  FiAlertCircle,
  FiInfo,
  FiCheckCircle,
  FiCloudRain,
} from "react-icons/fi";

function Notifications() {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "high",
      title: "Heat Stress Warning",
      message: "Temperature exceeding threshold in Field-A",
      time: "2 hours ago",
      icon: <FiAlertCircle />,
      color: "red",
      unread: true,
    },
    {
      id: 2,
      type: "info",
      title: "New Satellite Data Available",
      message: "Sentinel-2 imagery updated for your fields",
      time: "5 hours ago",
      icon: <FiInfo />,
      color: "blue",
      unread: true,
    },
    {
      id: 3,
      type: "success",
      title: "Action Completed",
      message: "Irrigation recommendation successfully implemented",
      time: "1 day ago",
      icon: <FiCheckCircle />,
      color: "green",
      unread: false,
    },
    {
      id: 4,
      type: "info",
      title: "Weather Update",
      message: "Rain expected in 3 days, adjust irrigation schedule",
      time: "1 day ago",
      icon: <FiCloudRain />,
      color: "indigo",
      unread: false,
    },
  ];

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return n.unread;
    if (filter === "high") return n.type === "high";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8 text-gray-900 dark:text-white">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications Center</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            All alerts and updates in one place
          </p>
        </div>

        <button className="text-sm font-semibold text-green-600 hover:underline">
          Mark all as read
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex gap-3 mb-6">
        <FilterButton label="All" active={filter === "all"} onClick={() => setFilter("all")} />
        <FilterButton label="Unread" active={filter === "unread"} onClick={() => setFilter("unread")} />
        <FilterButton label="High Priority" active={filter === "high"} onClick={() => setFilter("high")} />
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow overflow-hidden">

        {filtered.map((n) => (
          <NotificationItem key={n.id} data={n} />
        ))}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No notifications found
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl text-sm font-semibold transition
        ${active
          ? "bg-green-600 text-white shadow"
          : "bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600"}
      `}
    >
      {label}
    </button>
  );
}

function NotificationItem({ data }) {
  const colorMap = {
    red: "bg-red-50 dark:bg-red-500/10 text-red-600",
    blue: "bg-blue-50 dark:bg-blue-500/10 text-blue-600",
    green: "bg-green-50 dark:bg-green-500/10 text-green-600",
    indigo: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600",
  };

  return (
    <div className="flex items-start gap-4 p-6 border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition">

      {/* ICON */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[data.color]}`}>
        {data.icon}
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <p className="font-semibold">{data.title}</p>
        <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
          {data.message}
        </p>
        <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">
          ⏱ {data.time}
        </p>
      </div>

      {/* STATUS */}
      {data.unread && (
        <span className="w-2.5 h-2.5 bg-green-500 rounded-full mt-2" />
      )}
    </div>
  );
}

export default Notifications;


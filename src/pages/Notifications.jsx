import { useState } from "react";
import {
  FiAlertCircle,
  FiInfo,
  FiCheckCircle,
  FiCloudRain,
  FiCheck,
  FiBell,
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
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#020617] p-6 md:p-12 text-slate-900 dark:text-white transition-colors duration-500">
      
      {/* ================= 4K BACKGROUND MESH ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
              Notification Center
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-2">
              Stay updated with critical alerts and field insights.
            </p>
          </div>

          <button className="
            group flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm
            bg-white/50 dark:bg-slate-800/50 backdrop-blur-md
            border border-slate-200 dark:border-slate-700
            hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400
            hover:border-emerald-200 dark:hover:border-emerald-800
            transition-all duration-300 shadow-sm
          ">
            <FiCheck className="w-4 h-4 group-hover:scale-125 transition-transform" />
            Mark all as read
          </button>
        </div>

        {/* ================= CONTROLS & LIST CONTAINER ================= */}
        <div className="
          relative
          bg-white/60 dark:bg-slate-900/60
          backdrop-blur-3xl
          rounded-[2.5rem]
          shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
          border border-white/60 dark:border-slate-700/60
          overflow-hidden
        ">
          
          {/* TAB FILTERS */}
          <div className="flex items-center gap-2 p-4 border-b border-slate-200/60 dark:border-slate-800/60 overflow-x-auto no-scrollbar">
            <FilterButton label="All Notifications" active={filter === "all"} onClick={() => setFilter("all")} />
            <FilterButton label="Unread" active={filter === "unread"} onClick={() => setFilter("unread")} count={notifications.filter(n=>n.unread).length} />
            <FilterButton label="High Priority" active={filter === "high"} onClick={() => setFilter("high")} />
          </div>

          {/* LIST AREA */}
          <div className="p-4 md:p-6 space-y-4 min-h-[400px]">
            {filtered.map((n) => (
              <NotificationItem key={n.id} data={n} />
            ))}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-3xl">
                   <FiBell />
                </div>
                <p className="font-semibold text-lg">No notifications found</p>
                <p className="text-sm opacity-70">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= PREMIUM COMPONENTS ================= */

function FilterButton({ label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap
        flex items-center gap-2
        ${active
          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 scale-[1.02]"
          : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50"}
      `}
    >
      {label}
      {count !== undefined && count > 0 && (
        <span className={`
          px-1.5 py-0.5 rounded-md text-[10px]
          ${active ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}
        `}>
          {count}
        </span>
      )}
    </button>
  );
}

function NotificationItem({ data }) {
  // Gradients for the 3D Icons
  const colorMap = {
    red: {
      grad: "from-red-500 to-rose-600",
      shadow: "shadow-red-500/30",
      lightBg: "bg-red-50 dark:bg-red-900/10",
      border: "border-red-100 dark:border-red-900/30",
    },
    blue: {
      grad: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/30",
      lightBg: "bg-blue-50 dark:bg-blue-900/10",
      border: "border-blue-100 dark:border-blue-900/30",
    },
    green: {
      grad: "from-emerald-500 to-green-500",
      shadow: "shadow-emerald-500/30",
      lightBg: "bg-emerald-50 dark:bg-emerald-900/10",
      border: "border-emerald-100 dark:border-emerald-900/30",
    },
    indigo: {
      grad: "from-indigo-500 to-purple-500",
      shadow: "shadow-indigo-500/30",
      lightBg: "bg-indigo-50 dark:bg-indigo-900/10",
      border: "border-indigo-100 dark:border-indigo-900/30",
    },
  };

  const style = colorMap[data.color];

  return (
    <div className={`
      group relative overflow-hidden
      flex items-start gap-5 p-5
      rounded-[1.5rem]
      bg-white/40 dark:bg-slate-800/40
      hover:bg-white dark:hover:bg-slate-800
      border border-transparent hover:border-slate-200 dark:hover:border-slate-600
      transition-all duration-300
      ${data.unread ? "pl-5" : "pl-5 opacity-80 hover:opacity-100"}
    `}>
      
      {/* UNREAD GLOW STRIP */}
      {data.unread && (
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-500 to-transparent opacity-80" />
      )}

      {/* 3D ICON */}
      <div className={`
        relative z-10 w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center
        text-white text-xl
        bg-gradient-to-br ${style.grad}
        shadow-lg ${style.shadow}
        group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
      `}>
        {data.icon}
        
        {/* Shine effect on icon */}
        <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 pt-1">
        <div className="flex justify-between items-start">
            <h4 className={`
                text-lg font-bold truncate pr-4
                ${data.unread ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}
            `}>
                {data.title}
            </h4>
            
            {/* Unread Indicator Dot */}
            {data.unread && (
                <span className="relative flex h-3 w-3 mt-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                </span>
            )}
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed text-sm md:text-base">
          {data.message}
        </p>
        
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-3 flex items-center gap-1">
          <span>⏱</span> {data.time}
        </p>
      </div>
      
      {/* Background Hover Decoration */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-r from-transparent via-transparent to-white/50 dark:to-slate-700/50 pointer-events-none
      `} />
    </div>
  );
}

export default Notifications;


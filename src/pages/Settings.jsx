import {
  FiUser,
  FiMapPin,
  FiBell,
  FiMoon,
  FiSun,
  FiSave,
} from "react-icons/fi";
import useTheme from "../useTheme";

function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="
        min-h-screen p-8 space-y-10
        bg-gradient-to-br from-slate-50 via-white to-slate-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        text-gray-900 dark:text-white
      "
    >
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Settings & Profile
        </h1>
        <p className="text-gray-600 dark:text-slate-400 mt-1">
          Manage your account, preferences, and appearance
        </p>
      </div>

      {/* ================= USER PROFILE ================= */}
      <Section icon={<FiUser />} title="User Profile" accent="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" defaultValue="John Farmer" />
          <Select
            label="Role"
            options={[
              "Smallholder Farmer",
              "Agricultural Officer",
              "Admin",
            ]}
          />
          <Input label="Email" defaultValue="farmer@agsie.com" />
          <Input label="Phone" defaultValue="+91 9876543210" />
        </div>
      </Section>

      {/* ================= LOCATION ================= */}
      <Section icon={<FiMapPin />} title="Location" accent="blue">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Region" defaultValue="Punjab, India" />
          <Input
            label="Coordinates"
            defaultValue="30.7333° N, 76.7794° E"
          />
        </div>
      </Section>

      {/* ================= PREFERENCES ================= */}
      <Section icon={<FiBell />} title="Preferences" accent="purple">
        <div className="space-y-6">

          <RowBlock>
            <div>
              <p className="font-semibold">Units</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Measurement system
              </p>
            </div>

            <select
              className="
                px-4 py-2.5 rounded-xl
                bg-white dark:bg-slate-700
                text-gray-900 dark:text-white
                border border-gray-200 dark:border-slate-600
                focus:ring-2 focus:ring-emerald-500
                outline-none transition
              "
            >
              <option className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
                Metric (SI)
              </option>
              <option className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
                Imperial
              </option>
            </select>
          </RowBlock>

          <Toggle
            label="Email Notifications"
            desc="Receive alerts via email"
            defaultChecked
          />

          <Toggle
            label="Push Notifications"
            desc="Mobile alerts for critical updates"
            defaultChecked
          />
        </div>
      </Section>

      {/* ================= THEME MODE (FIXED VISIBILITY) ================= */}
      <div
        className="
          relative overflow-hidden rounded-3xl p-7
          bg-gradient-to-br from-emerald-500 via-green-500 to-lime-500
          text-white
          shadow-[0_50px_140px_rgba(16,185,129,0.55)]
        "
      >
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h3 className="font-bold flex items-center gap-2 text-lg">
              {theme === "light" ? <FiSun /> : <FiMoon />}
              Theme Mode
            </h3>
            <p className="text-sm opacity-95">
              Switch between Light & Dark appearance
            </p>
          </div>

          {/* ✅ HIGH-CONTRAST BUTTON */}
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className={`
              px-6 py-2.5 rounded-xl font-semibold
              transition-all duration-300
              shadow-lg border
              ${
                theme === "light"
                  ? "bg-slate-900 text-white border-white/30 hover:bg-slate-800"
                  : "bg-white text-slate-900 border-white/40 hover:bg-slate-100"
              }
            `}
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        {/* glow effects */}
        <Glow className="-top-24 -right-24 bg-white/30" />
        <Glow className="bottom-0 left-1/4 bg-lime-300/30" />
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex justify-end gap-4">
        <button
          className="
            px-6 py-3 rounded-xl
            bg-gray-200 dark:bg-slate-700
            hover:opacity-80 transition
          "
        >
          Cancel
        </button>

        <button
          className="
            px-7 py-3 rounded-xl
            bg-gradient-to-r from-emerald-500 to-green-600
            text-white font-semibold
            shadow-[0_20px_60px_rgba(16,185,129,0.45)]
            flex items-center gap-2
            hover:scale-[1.02] transition
          "
        >
          <FiSave />
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({ icon, title, children, accent }) {
  const accents = {
    emerald: "from-emerald-500/10 to-green-500/5",
    blue: "from-blue-500/10 to-indigo-500/5",
    purple: "from-purple-500/10 to-fuchsia-500/5",
  };

  return (
    <div
      className={`
        rounded-3xl p-6
        bg-gradient-to-br ${accents[accent]}
        bg-white/70 dark:bg-slate-800/70
        backdrop-blur-xl
        shadow-[0_30px_90px_rgba(0,0,0,0.15)]
        border border-white/40 dark:border-slate-700
      `}
    >
      <h3 className="font-bold flex items-center gap-2 mb-6">
        <span className="text-emerald-600">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Input({ label, defaultValue }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        className="
          w-full px-4 py-2.5 rounded-xl
          bg-white dark:bg-slate-700
          text-gray-900 dark:text-white
          border border-gray-200 dark:border-slate-600
          focus:ring-2 focus:ring-emerald-500
          outline-none transition
        "
      />
    </div>
  );
}

function Select({ label, options }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <select
        className="
          w-full px-4 py-2.5 rounded-xl
          bg-white dark:bg-slate-700
          text-gray-900 dark:text-white
          border border-gray-200 dark:border-slate-600
          focus:ring-2 focus:ring-emerald-500
          outline-none transition
        "
      >
        {options.map((o) => (
          <option
            key={o}
            className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          >
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({ label, desc, defaultChecked }) {
  return (
    <RowBlock>
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          {desc}
        </p>
      </div>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="w-11 h-6 accent-emerald-500 cursor-pointer"
      />
    </RowBlock>
  );
}

function RowBlock({ children }) {
  return (
    <div className="flex justify-between items-center">
      {children}
    </div>
  );
}

function Glow({ className }) {
  return (
    <div
      className={`absolute w-72 h-72 rounded-full blur-3xl ${className}`}
    />
  );
}

export default Settings;






import {
  FiUser,
  FiMapPin,
  FiBell,
  FiMoon,
  FiSun,
  FiSave,
  FiCheck,
} from "react-icons/fi";
import useTheme from "../useTheme";

function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="
        min-h-screen p-6 md:p-12 space-y-12
        bg-slate-50 dark:bg-[#020617]
        text-slate-900 dark:text-slate-100
        transition-colors duration-500
        overflow-hidden relative
      "
    >
      {/* ================= 4K BACKGROUND MESH ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-400/20 dark:bg-emerald-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-10">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
              Settings
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-2">
              Manage your digital profile & preferences
            </p>
          </div>
        </header>

        {/* ================= USER PROFILE (Glass Card) ================= */}
        <Section icon={<FiUser />} title="Personal Information" accent="emerald">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input label="Full Name" defaultValue="John Farmer" />
            <Select
              label="Role"
              options={[
                "Smallholder Farmer",
                "Agricultural Officer",
                "Admin",
              ]}
            />
            <Input label="Email Address" defaultValue="farmer@agsie.com" type="email" />
            <Input label="Phone Number" defaultValue="+91 9876543210" type="tel" />
          </div>
        </Section>

        {/* ================= LOCATION (Glass Card) ================= */}
        <Section icon={<FiMapPin />} title="Geographic Data" accent="blue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input label="Region / State" defaultValue="Punjab, India" />
            <div className="relative">
              <Input
                label="GPS Coordinates"
                defaultValue="30.7333° N, 76.7794° E"
              />
              <div className="absolute bottom-3 right-3 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                LIVE
              </div>
            </div>
          </div>
        </Section>

        {/* ================= PREFERENCES (Glass Card) ================= */}
        <Section icon={<FiBell />} title="System Preferences" accent="purple">
          <div className="space-y-8">
            <RowBlock
              title="Measurement Units"
              desc="Select your preferred system for data display."
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <select
                  className="
                    relative
                    w-40 px-4 py-3 rounded-xl appearance-none cursor-pointer
                    bg-slate-50 dark:bg-slate-900
                    text-slate-900 dark:text-white font-bold
                    border border-slate-200 dark:border-slate-700
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                  "
                >
                  <option>Metric (SI)</option>
                  <option>Imperial</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  ▼
                </div>
              </div>
            </RowBlock>

            <div className="h-px bg-slate-200 dark:bg-slate-700/50" />

            <Toggle
              label="Email Notifications"
              desc="Receive daily summaries and alerts."
              defaultChecked={true}
            />

            <Toggle
              label="Push Notifications"
              desc="Instant alerts for critical weather events."
              defaultChecked={true}
            />
          </div>
        </Section>

        {/* ================= THEME MODE (3D FEATURE CARD) ================= */}
        <div
          className="
            relative overflow-hidden rounded-[2.5rem] p-8 md:p-10
            bg-gradient-to-br from-slate-900 to-slate-800
            dark:from-slate-100 dark:to-white
            text-white dark:text-slate-900
            shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]
            dark:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.3)]
            group
          "
        >
          {/* Animated Background Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/30 rounded-full blur-[80px] group-hover:bg-emerald-500/50 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/30 rounded-full blur-[80px] group-hover:bg-blue-500/50 transition-all duration-700" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-black flex items-center gap-3">
                {theme === "light" ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-indigo-600" />}
                Appearance Mode
              </h3>
              <p className="opacity-80 mt-2 font-medium max-w-md">
                Customize your interface experience. Choose light mode for clarity or dark mode for reduced eye strain.
              </p>
            </div>

            {/* 3D Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`
                relative px-8 py-4 rounded-2xl font-bold text-lg
                transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0
                shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                flex items-center gap-3
                ${theme === 'light' 
                  ? 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20' 
                  : 'bg-slate-900/10 backdrop-blur-md border border-slate-900/20 hover:bg-slate-900/20'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${theme === 'light' ? 'bg-indigo-500 text-white' : 'bg-yellow-400 text-slate-900'}
                shadow-lg
              `}>
                {theme === 'light' ? <FiMoon /> : <FiSun />}
              </div>
              <span>Switch to {theme === 'light' ? "Dark" : "Light"}</span>
            </button>
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-4">
          <button
            className="
              px-8 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-300
              hover:bg-slate-200 dark:hover:bg-slate-800
              transition-all duration-200
            "
          >
            Discard Changes
          </button>

          <button
            className="
              group relative px-10 py-4 rounded-2xl font-bold text-white
              bg-gradient-to-r from-emerald-500 to-green-600
              shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)]
              hover:shadow-[0_25px_50px_-10px_rgba(16,185,129,0.6)]
              hover:-translate-y-1 active:translate-y-0
              transition-all duration-300
              flex items-center justify-center gap-2
              overflow-hidden
            "
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md" />
            <FiSave className="w-5 h-5" />
            <span>Save Configuration</span>
          </button>
        </div>

      </div>
    </div>
  );
}

/* ================= PREMIUM 3D COMPONENTS ================= */

function Section({ icon, title, children, accent }) {
  // Gradients for the icon glow
  const accents = {
    emerald: "from-emerald-500 to-green-400",
    blue: "from-blue-500 to-cyan-400",
    purple: "from-purple-500 to-fuchsia-400",
  };
  
  // Shadow colors
  const shadows = {
    emerald: "shadow-emerald-500/10",
    blue: "shadow-blue-500/10",
    purple: "shadow-purple-500/10",
  };

  return (
    <div
      className={`
        relative group
        rounded-[2.5rem] p-8 md:p-10
        bg-white/60 dark:bg-slate-900/60
        backdrop-blur-2xl
        border-t border-white/60 dark:border-slate-700/60
        border-b border-black/5 dark:border-black/30
        shadow-2xl ${shadows[accent]}
        transition-all duration-500
      `}
    >
      <div className="flex items-center gap-4 mb-10">
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl
          bg-gradient-to-br ${accents[accent]}
          shadow-lg shadow-black/5 dark:shadow-black/20
          transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
        `}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function Input({ label, defaultValue, type = "text" }) {
  return (
    <div className="group">
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 ml-1 group-focus-within:text-emerald-500 transition-colors">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          defaultValue={defaultValue}
          className="
            w-full px-6 py-4 rounded-2xl
            bg-slate-50/50 dark:bg-slate-950/50
            text-slate-900 dark:text-white font-semibold text-lg
            border border-slate-200 dark:border-slate-800
            shadow-inner
            focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
            focus:bg-white dark:focus:bg-slate-900
            transition-all duration-300
          "
        />
        {/* Decorative corner glow on focus */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/5 pointer-events-none" />
      </div>
    </div>
  );
}

function Select({ label, options }) {
  return (
    <div className="group">
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 ml-1 group-focus-within:text-emerald-500 transition-colors">
        {label}
      </label>
      <div className="relative">
        <select
          className="
            w-full px-6 py-4 rounded-2xl appearance-none cursor-pointer
            bg-slate-50/50 dark:bg-slate-950/50
            text-slate-900 dark:text-white font-semibold text-lg
            border border-slate-200 dark:border-slate-800
            shadow-inner
            focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
            focus:bg-white dark:focus:bg-slate-900
            transition-all duration-300
          "
        >
          {options.map((o) => (
            <option key={o} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              {o}
            </option>
          ))}
        </select>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, desc, defaultChecked }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div>
        <p className="font-bold text-lg text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors">
          {label}
        </p>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-500 mt-1">
          {desc}
        </p>
      </div>
      
      {/* Custom CSS-only 3D Toggle */}
      <div className="relative">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer sr-only"
          id={`toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <label
          htmlFor={`toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="
            block w-16 h-9 rounded-full cursor-pointer
            bg-slate-200 dark:bg-slate-800
            peer-checked:bg-emerald-500
            shadow-inner transition-all duration-300
            border border-slate-300 dark:border-slate-700
            peer-checked:border-emerald-600
          "
        >
          <div
            className="
              absolute top-1 left-1 w-7 h-7 rounded-full bg-white
              shadow-[0_2px_5px_rgba(0,0,0,0.2)]
              transition-all duration-300
              peer-checked:translate-x-7
              flex items-center justify-center
            "
          >
             <div className="w-2 h-2 rounded-full bg-slate-300 peer-checked:bg-emerald-500 transition-colors" />
          </div>
        </label>
      </div>
    </div>
  );
}

function RowBlock({ title, desc, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p className="font-bold text-lg text-slate-800 dark:text-slate-200">
          {title}
        </p>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-500 mt-1">
          {desc}
        </p>
      </div>
      {children}
    </div>
  );
}

export default Settings;





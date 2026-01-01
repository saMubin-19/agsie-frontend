import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiStrongWind,
  WiHumidity,
  WiRaindrop,
} from "react-icons/wi";

function Weather() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8 space-y-8 text-gray-900 dark:text-white">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Weather Forecast</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            7-day weather outlook for your location
          </p>
        </div>

        {/* RIGHT ADMIN */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-xl bg-white dark:bg-slate-800 shadow">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
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

      {/* ================= CURRENT WEATHER ================= */}
      <div className="
        relative overflow-hidden
        rounded-3xl p-8
        bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
        text-white shadow-[0_40px_120px_rgba(79,70,229,0.45)]
      ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">

          <div>
            <p className="text-sm opacity-90">Current Weather</p>
            <p className="text-sm opacity-90">Punjab, India</p>
            <h2 className="text-5xl font-extrabold mt-4">28°C</h2>
            <p className="text-sm opacity-90">Temperature</p>
          </div>

          <WeatherMetric icon={<WiHumidity />} label="Humidity" value="65%" />
          <WeatherMetric icon={<WiStrongWind />} label="Wind Speed" value="12 km/h" />
          <WeatherMetric icon={<WiRaindrop />} label="Rain Chance" value="15%" />

        </div>

        <WiDaySunny className="absolute right-6 top-6 text-[80px] opacity-30" />
      </div>

      {/* ================= 7 DAY FORECAST ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow">
        <h3 className="text-lg font-semibold mb-6">7-Day Forecast</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          <DayCard day="Mon" temp="28°C" rain="15%" icon={<WiDaySunny />} />
          <DayCard day="Tue" temp="27°C" rain="25%" icon={<WiCloud />} />
          <DayCard day="Wed" temp="26°C" rain="45%" icon={<WiRain />} />
          <DayCard day="Thu" temp="25°C" rain="60%" icon={<WiRain />} />
          <DayCard day="Fri" temp="27°C" rain="20%" icon={<WiCloud />} />
          <DayCard day="Sat" temp="29°C" rain="10%" icon={<WiDaySunny />} />
          <DayCard day="Sun" temp="30°C" rain="5%" icon={<WiDaySunny />} />
        </div>
      </div>

      {/* ================= TEMPERATURE TREND ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow">
        <h3 className="text-lg font-semibold mb-3">Temperature Trend</h3>
        <p className="text-gray-600 dark:text-slate-400 text-sm">
          Next week: Temperatures ranging from 25°C to 30°C with occasional rain mid-week
        </p>
      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function WeatherMetric({ icon, label, value }) {
  return (
    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-sm opacity-90">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function DayCard({ day, temp, rain, icon }) {
  return (
    <div className="
      bg-gray-50 dark:bg-slate-700/40
      rounded-2xl p-4 text-center
      shadow hover:-translate-y-1 transition
    ">
      <p className="font-semibold">{day}</p>
      <div className="text-4xl my-2 text-blue-500">{icon}</div>
      <p className="font-bold">{temp}</p>
      <p className="text-xs text-blue-600 mt-1">💧 {rain}</p>
    </div>
  );
}

export default Weather;


/**
 * Settings page - App settings and preferences
 */
import { useState, useEffect } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    saveHistory: true,
    maxHistoryItems: 50,
    showConfidence: true,
    theme: "gradient",
    notifications: true,
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("appSettings", JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    if (window.confirm("Reset all settings to default?")) {
      const defaultSettings = {
        saveHistory: true,
        maxHistoryItems: 50,
        showConfidence: true,
        theme: "gradient",
        notifications: true,
      };
      setSettings(defaultSettings);
      localStorage.setItem("appSettings", JSON.stringify(defaultSettings));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10 animate-fadeIn">
          <div className="inline-block mb-3 animate-bounce-slow">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center mx-auto transform hover:scale-110 transition-transform duration-300">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 mb-2 sm:mb-3 drop-shadow-2xl">
            ⚙️ Settings
          </h1>
          <p className="text-sm sm:text-lg text-blue-100 px-2 font-medium drop-shadow-lg">
            Customize your app experience
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4 sm:space-y-6">
          {/* History Settings */}
          <div className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border border-white/30 backdrop-blur-xl animate-slideInLeft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-xl">
                <span className="text-2xl">🕐</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                History Settings
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/80 rounded-xl p-4 border-2 border-blue-200">
                <div>
                  <h3 className="font-bold text-gray-800">
                    Save Prediction History
                  </h3>
                  <p className="text-sm text-gray-600">
                    Store predictions in browser storage
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.saveHistory}
                    onChange={(e) =>
                      handleChange("saveHistory", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
                </label>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800">Max History Items</h3>
                  <span className="text-lg font-bold text-purple-600">
                    {settings.maxHistoryItems}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={settings.maxHistoryItems}
                  onChange={(e) =>
                    handleChange("maxHistoryItems", parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Maximum number of predictions to store
                </p>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎨</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Display Settings
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/80 rounded-xl p-4 border-2 border-purple-200">
                <div>
                  <h3 className="font-bold text-gray-800">
                    Show Confidence Score
                  </h3>
                  <p className="text-sm text-gray-600">
                    Display prediction confidence percentage
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showConfidence}
                    onChange={(e) =>
                      handleChange("showConfidence", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
                </label>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border-2 border-purple-200">
                <h3 className="font-bold text-gray-800 mb-3">Theme</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleChange("theme", "gradient")}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      settings.theme === "gradient"
                        ? "border-purple-500 bg-gradient-to-r from-purple-100 to-pink-100"
                        : "border-gray-300 bg-white hover:border-purple-300"
                    }`}>
                    <div className="w-full h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-2"></div>
                    <p className="text-sm font-semibold">Gradient</p>
                  </button>
                  <button
                    onClick={() => handleChange("theme", "solid")}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      settings.theme === "solid"
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300 bg-white hover:border-blue-300"
                    }`}>
                    <div className="w-full h-8 bg-blue-500 rounded-lg mb-2"></div>
                    <p className="text-sm font-semibold">Solid</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-slideInRight"
            style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🔔</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Notifications
              </h2>
            </div>

            <div className="flex items-center justify-between bg-white/80 rounded-xl p-4 border-2 border-green-200">
              <div>
                <h3 className="font-bold text-gray-800">
                  Enable Notifications
                </h3>
                <p className="text-sm text-gray-600">
                  Show success and error messages
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    handleChange("notifications", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-scaleIn"
            style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🔧</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Actions
              </h2>
            </div>

            <div className="space-y-3">
              <button
                onClick={resetSettings}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold shadow-xl hover:scale-105 transition-transform">
                🔄 Reset to Default Settings
              </button>

              <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">💡 Note:</span> Settings are saved
                  locally in your browser. Clearing browser data will reset all
                  settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

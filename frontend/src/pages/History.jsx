/**
 * History page - View prediction history
 */
import { useState, useEffect } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem("predictionHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      localStorage.removeItem("predictionHistory");
      setHistory([]);
    }
  };

  const deleteItem = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    localStorage.setItem("predictionHistory", JSON.stringify(newHistory));
  };

  const getClusterColor = (cluster) => {
    const colors = [
      { bg: "from-blue-400 to-blue-600", icon: "💎" },
      { bg: "from-green-400 to-emerald-600", icon: "🌟" },
      { bg: "from-purple-400 to-purple-600", icon: "👑" },
      { bg: "from-orange-400 to-red-500", icon: "🔥" },
      { bg: "from-pink-400 to-rose-600", icon: "✨" },
    ];
    return colors[cluster % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10 animate-fadeIn">
          <div className="inline-block mb-3 animate-bounce-slow">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center mx-auto transform hover:scale-110 transition-transform duration-300">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 mb-2 sm:mb-3 drop-shadow-2xl">
            🕐 Prediction History
          </h1>
          <p className="text-sm sm:text-lg text-blue-100 px-2 font-medium drop-shadow-lg">
            View your past customer segment predictions
          </p>
        </div>

        {/* Actions */}
        {history.length > 0 && (
          <div className="flex justify-end mb-4 animate-slideInRight">
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform">
              🗑️ Clear All History
            </button>
          </div>
        )}

        {/* History List */}
        {history.length === 0 ? (
          <div className="glass rounded-2xl shadow-2xl p-8 sm:p-12 text-center border-2 border-white/20 animate-fadeIn">
            <div className="animate-float">
              <svg
                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              📭 No History Yet
            </h3>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">
              Make some predictions to see them here!
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 rounded-xl font-bold text-white text-lg shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all">
              🚀 Make a Prediction
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => {
              const clusterStyle = getClusterColor(item.cluster);
              return (
                <div
                  key={index}
                  className="glass rounded-2xl shadow-2xl p-4 sm:p-6 border-2 border-white/20 animate-slideInLeft card-hover"
                  style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`px-4 py-2 rounded-xl bg-gradient-to-r ${clusterStyle.bg} text-white shadow-lg`}>
                          <span className="font-bold text-sm">
                            {clusterStyle.icon} {item.cluster_name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 bg-white/80 px-3 py-1 rounded-lg">
                          {new Date(item.timestamp).toLocaleString()}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        <div className="bg-white/80 rounded-lg p-2">
                          <p className="text-xs text-gray-600">Sex</p>
                          <p className="font-bold text-sm">
                            {item.customer_data.sex}
                          </p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-2">
                          <p className="text-xs text-gray-600">Age</p>
                          <p className="font-bold text-sm">
                            {item.customer_data.age}
                          </p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-2">
                          <p className="text-xs text-gray-600">Income</p>
                          <p className="font-bold text-sm">
                            ${item.customer_data.annual_income}k
                          </p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-2">
                          <p className="text-xs text-gray-600">Spending</p>
                          <p className="font-bold text-sm">
                            {item.customer_data.spending_score}
                          </p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-2">
                          <p className="text-xs text-gray-600">Frequency</p>
                          <p className="font-bold text-sm">
                            {item.customer_data.purchase_frequency}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-700">
                            Confidence:
                          </span>
                          <div className="flex-grow bg-gray-200 rounded-full h-2 max-w-xs">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              style={{
                                width: `${(item.confidence * 100).toFixed(0)}%`,
                              }}></div>
                          </div>
                          <span className="text-xs font-bold text-purple-600">
                            {(item.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteItem(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold shadow-lg hover:bg-red-600 hover:scale-105 transition-all text-sm">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;

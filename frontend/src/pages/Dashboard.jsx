/**
 * Dashboard page - Cluster statistics and visualizations
 */
import { useState, useEffect } from "react";
import ClusterChart from "../components/ClusterChart";
import { trainModel, getClusters, healthCheck } from "../services/api";

const Dashboard = () => {
  const [clusters, setClusters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [training, setTraining] = useState(false);
  const [error, setError] = useState(null);
  const [trainResult, setTrainResult] = useState(null);
  const [apiStatus, setApiStatus] = useState("checking");

  // Check API health on mount
  useEffect(() => {
    checkApiHealth();
    loadClusters();
  }, []);

  const checkApiHealth = async () => {
    try {
      await healthCheck();
      setApiStatus("connected");
    } catch (err) {
      setApiStatus("disconnected");
    }
  };

  // Load cluster data
  const loadClusters = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getClusters();
      setClusters(data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to load clusters. Train the model first."
      );
    } finally {
      setLoading(false);
    }
  };

  // Train model
  const handleTrain = async () => {
    setTraining(true);
    setError(null);
    setTrainResult(null);

    try {
      const result = await trainModel();
      setTrainResult(result);
      // Reload clusters after training
      setTimeout(() => {
        loadClusters();
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to train model");
    } finally {
      setTraining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute top-1/3 right-1/3 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Header */}
        <div className="mb-4 sm:mb-8 animate-fadeIn">
          <div className="inline-block mb-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-purple rounded-2xl shadow-2xl flex items-center justify-center mx-auto animate-bounce-slow transform hover:scale-110 transition-transform duration-300">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold gradient-text-purple mb-2 drop-shadow-lg">
            📊 Analytics Dashboard
          </h1>
          <p className="text-sm sm:text-lg text-text-secondary font-medium">
            View cluster statistics and train the ML model
          </p>
        </div>

        {/* API Status */}
        <div className="mb-6 animate-slideInLeft">
          <div
            className={`inline-flex items-center px-4 sm:px-5 py-2 sm:py-3 rounded-xl shadow-lg border-2 ${
              apiStatus === "connected"
                ? "glass border-green-300 text-green-800"
                : apiStatus === "disconnected"
                ? "glass border-red-300 text-red-800"
                : "glass border-yellow-300 text-yellow-800"
            }`}>
            <div
              className={`w-3 h-3 rounded-full mr-3 ${
                apiStatus === "connected"
                  ? "bg-green-500 animate-pulse"
                  : apiStatus === "disconnected"
                  ? "bg-red-500"
                  : "bg-yellow-500 animate-pulse"
              }`}></div>
            <span className="text-sm sm:text-base font-bold">
              {apiStatus === "connected"
                ? "✅ API Connected"
                : apiStatus === "disconnected"
                ? "❌ API Disconnected"
                : "⏳ Checking API..."}
            </span>
          </div>
        </div>

        {/* Training Section */}
        <div className="glass rounded-2xl shadow-2xl p-4 sm:p-6 mb-6 border border-white/30 backdrop-blur-xl animate-scaleIn">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                  🤖 Model Training
                </h2>
              </div>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Train the K-Means clustering model with the customer dataset
              </p>
            </div>
            <button
              onClick={handleTrain}
              disabled={training || apiStatus !== "connected"}
              className={`px-6 py-3 sm:py-4 rounded-xl font-bold text-white text-base sm:text-lg shadow-lg transition-all transform ${
                training || apiStatus !== "connected"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-primary hover:scale-105 hover:shadow-xl"
              }`}>
              {training ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Training...
                </span>
              ) : (
                "🚀 Train Model"
              )}
            </button>
          </div>

          {/* Training Result */}
          {trainResult && (
            <div className="mt-4 p-4 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-lg animate-success">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-green-800 font-bold text-base sm:text-lg">
                  ✅ {trainResult.message}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white rounded-xl p-3 shadow-md border-2 border-blue-200">
                  <p className="text-xs text-blue-600 font-semibold mb-1">
                    🎯 Clusters
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {trainResult.n_clusters}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-md border-2 border-purple-200">
                  <p className="text-xs text-purple-600 font-semibold mb-1">
                    📊 Score
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {trainResult.silhouette_score.toFixed(3)}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-md border-2 border-pink-200">
                  <p className="text-xs text-pink-600 font-semibold mb-1">
                    ⚡ Inertia
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {trainResult.inertia.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 animate-slideInLeft">
            <div className="glass bg-red-50 border-2 border-red-300 text-red-800 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-xl">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-bold text-sm sm:text-base mb-1">
                    ⚠️ Error
                  </p>
                  <p className="text-xs sm:text-sm">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 animate-fadeIn">
            <div className="inline-block relative">
              <div className="w-16 h-16 border-4 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-accent-purple rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="mt-4 text-text-primary font-bold text-lg">
              ✨ Loading cluster data...
            </p>
          </div>
        )}

        {/* Cluster Statistics */}
        {!loading && clusters && (
          <div>
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass rounded-2xl shadow-2xl p-5 sm:p-6 border border-white/30 backdrop-blur-xl card-hover animate-slideInLeft">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-xl">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm font-bold">
                      👥 Total Customers
                    </p>
                  </div>
                  <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    {clusters.total_customers.toLocaleString()}
                  </p>
                </div>
                <div className="glass rounded-2xl shadow-2xl p-5 sm:p-6 border border-white/30 backdrop-blur-xl card-hover animate-slideInRight">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-xl">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm font-bold">
                      🎯 Clusters
                    </p>
                  </div>
                  <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {clusters.n_clusters}
                  </p>
                </div>
              </div>
            </div>

            <ClusterChart clusters={clusters.clusters} />
          </div>
        )}

        {/* Empty State */}
        {!loading && !clusters && !error && (
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              📭 No Data Available
            </h3>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">
              Train the model first to view cluster statistics and insights
            </p>
            <button
              onClick={handleTrain}
              disabled={training || apiStatus !== "connected"}
              className={`px-8 py-4 rounded-xl font-bold text-white text-lg shadow-xl transition-all transform ${
                training || apiStatus !== "connected"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl"
              }`}>
              {training ? "Training..." : "🚀 Train Model Now"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

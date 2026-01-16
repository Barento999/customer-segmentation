/**
 * Home page - Customer prediction interface
 */
import { useState } from "react";
import CustomerForm from "../components/CustomerForm";
import ResultCard from "../components/ResultCard";
import { predictSegment } from "../services/api";

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle prediction
  const handlePredict = async (customerData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const prediction = await predictSegment(customerData);
      setResult(prediction);

      // Save to history
      const settings = JSON.parse(
        localStorage.getItem("appSettings") ||
          '{"saveHistory": true, "maxHistoryItems": 50}'
      );
      if (settings.saveHistory) {
        const history = JSON.parse(
          localStorage.getItem("predictionHistory") || "[]"
        );
        const newPrediction = {
          ...prediction,
          timestamp: new Date().toISOString(),
        };
        history.unshift(newPrediction);

        // Keep only max items
        const trimmedHistory = history.slice(0, settings.maxHistoryItems);
        localStorage.setItem(
          "predictionHistory",
          JSON.stringify(trimmedHistory)
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to predict. Make sure the model is trained first."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="inline-block mb-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-cool rounded-2xl shadow-2xl flex items-center justify-center mx-auto transform hover:scale-110 transition-transform duration-300">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg"
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
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold gradient-text mb-2 sm:mb-3 drop-shadow-lg">
            Customer Segmentation AI
          </h1>
          <p className="text-sm sm:text-lg text-text-secondary px-2 font-medium">
            🚀 Predict customer segments instantly with Machine Learning
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-4 sm:mb-6">
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
                    ⚠️ Oops! Something went wrong
                  </p>
                  <p className="text-xs sm:text-sm">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {/* Form */}
          <div>
            <CustomerForm onSubmit={handlePredict} loading={loading} />
          </div>

          {/* Result */}
          <div>
            {loading ? (
              <div className="glass rounded-2xl shadow-2xl p-6 h-full animate-pulse">
                <div className="space-y-4">
                  <div className="h-8 bg-gradient-cool rounded-lg w-3/4 opacity-20"></div>
                  <div className="h-24 bg-gradient-purple rounded-xl opacity-20"></div>
                  <div className="h-4 bg-gradient-cool rounded w-1/2 opacity-20"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-gradient-primary rounded-lg opacity-20"></div>
                    <div className="h-16 bg-gradient-secondary rounded-lg opacity-20"></div>
                    <div className="h-16 bg-gradient-warm rounded-lg opacity-20"></div>
                    <div className="h-16 bg-gradient-purple rounded-lg opacity-20"></div>
                  </div>
                </div>
              </div>
            ) : result ? (
              <ResultCard result={result} />
            ) : (
              <div className="glass rounded-2xl shadow-2xl p-6 sm:p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="relative">
                    <svg
                      className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-4 text-accent-purple opacity-80"
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
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-purple rounded-full animate-ping"></div>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                    ✨ Ready to Predict
                  </p>
                  <p className="text-sm sm:text-base text-text-secondary">
                    Fill out the form to discover customer segments
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mt-6 sm:mt-8">
          <div className="glass rounded-2xl shadow-2xl p-4 sm:p-6 card-hover border border-white/30 backdrop-blur-xl">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                ⚡ Fast Predictions
              </h3>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Get instant customer segment predictions powered by K-Means
              clustering AI
            </p>
          </div>

          <div className="glass rounded-2xl shadow-2xl p-4 sm:p-6 card-hover border border-white/30 backdrop-blur-xl">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                🎯 High Accuracy
              </h3>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              ML model trained with optimal clusters using silhouette score
              analysis
            </p>
          </div>

          <div className="glass rounded-2xl shadow-2xl p-4 sm:p-6 card-hover-purple border border-white/30 backdrop-blur-xl">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-gradient-purple rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                📊 Visual Insights
              </h3>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Explore cluster statistics and visualizations in the dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

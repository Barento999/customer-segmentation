/**
 * Documentation page - How to use the application
 */

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10 animate-fadeIn">
          <div className="inline-block mb-3 animate-bounce-slow">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold gradient-text mb-2 sm:mb-3 drop-shadow-lg">
            📚 Documentation
          </h1>
          <p className="text-sm sm:text-lg text-text-secondary px-2 font-medium">
            Complete guide to using Customer Segmentation AI
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Getting Started */}
          <div className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border border-white/30 backdrop-blur-xl animate-slideInLeft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-xl">
                <span className="text-2xl">🚀</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Getting Started
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-xl">1️⃣</span> Train the Model
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Before making predictions, you need to train the ML model with
                  the customer dataset.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>
                    Navigate to the{" "}
                    <span className="font-semibold">Dashboard</span> page
                  </li>
                  <li>
                    Click the{" "}
                    <span className="font-semibold">"🚀 Train Model"</span>{" "}
                    button
                  </li>
                  <li>
                    Wait for training to complete (usually takes a few seconds)
                  </li>
                  <li>View the training results and cluster statistics</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-xl">2️⃣</span> Make Predictions
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Once the model is trained, you can predict customer segments.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>
                    Go to the <span className="font-semibold">Home</span> page
                  </li>
                  <li>Fill in the customer information form</li>
                  <li>
                    Click{" "}
                    <span className="font-semibold">"🚀 Predict Segment"</span>
                  </li>
                  <li>View the predicted segment and confidence score</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📝</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Form Fields Explained
              </h2>
            </div>
            <div className="space-y-3">
              <div className="bg-white/80 rounded-xl p-4 border-2 border-blue-200">
                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span>👥</span> Sex
                </h3>
                <p className="text-sm text-gray-700">
                  Customer's gender (Male or Female). This helps identify
                  gender-based purchasing patterns.
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border-2 border-purple-200">
                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span>🎂</span> Age
                </h3>
                <p className="text-sm text-gray-700">
                  Customer's age (18-100 years). Age groups often have different
                  spending behaviors.
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border-2 border-green-200">
                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span>💰</span> Annual Income
                </h3>
                <p className="text-sm text-gray-700">
                  Customer's yearly income in thousands (e.g., 65.5 for
                  $65,500). Higher income often correlates with higher spending.
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border-2 border-orange-200">
                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span>🛍️</span> Spending Score
                </h3>
                <p className="text-sm text-gray-700">
                  A score from 1-100 indicating how much the customer spends.
                  Higher scores mean more spending.
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border-2 border-pink-200">
                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span>📊</span> Purchase Frequency
                </h3>
                <p className="text-sm text-gray-700">
                  Number of purchases per year. Indicates customer loyalty and
                  engagement.
                </p>
              </div>
            </div>
          </div>

          {/* Understanding Results */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-slideInRight"
            style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Understanding Results
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                <h3 className="font-bold text-gray-800 mb-2">
                  Customer Segment
                </h3>
                <p className="text-sm text-gray-700">
                  The predicted cluster/segment the customer belongs to (e.g.,
                  Cluster 0, Cluster 1). Each cluster represents a group of
                  customers with similar characteristics.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                <h3 className="font-bold text-gray-800 mb-2">
                  Confidence Score
                </h3>
                <p className="text-sm text-gray-700">
                  A percentage (0-100%) indicating how confident the model is
                  about the prediction. Higher scores mean the customer clearly
                  fits into that segment.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                <h3 className="font-bold text-gray-800 mb-2">
                  Customer Profile
                </h3>
                <p className="text-sm text-gray-700">
                  A summary of the input data showing all the customer
                  characteristics used for prediction.
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Features */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-scaleIn"
            style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Dashboard Features
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-xl p-4 border-2 border-blue-200 card-hover">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>📈</span> Cluster Size Distribution
                </h3>
                <p className="text-sm text-gray-700">
                  Pie chart showing the percentage of customers in each segment.
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border-2 border-green-200 card-hover">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>📊</span> Average Metrics
                </h3>
                <p className="text-sm text-gray-700">
                  Bar chart comparing average values across different clusters.
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border-2 border-purple-200 card-hover">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>🎯</span> Cluster Profiles
                </h3>
                <p className="text-sm text-gray-700">
                  Radar chart showing normalized characteristics of each
                  cluster.
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border-2 border-pink-200 card-hover">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>📋</span> Statistics Table
                </h3>
                <p className="text-sm text-gray-700">
                  Detailed table with all cluster statistics and averages.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-fadeIn"
            style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">💡</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Tips & Best Practices
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3 bg-yellow-50 rounded-xl p-3 border-2 border-yellow-200">
                <span className="text-xl flex-shrink-0">✅</span>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Train regularly:</span> Retrain
                  the model when you have new customer data for better accuracy.
                </p>
              </div>

              <div className="flex gap-3 bg-blue-50 rounded-xl p-3 border-2 border-blue-200">
                <span className="text-xl flex-shrink-0">✅</span>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Check confidence:</span> Higher
                  confidence scores indicate more reliable predictions.
                </p>
              </div>

              <div className="flex gap-3 bg-green-50 rounded-xl p-3 border-2 border-green-200">
                <span className="text-xl flex-shrink-0">✅</span>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Analyze patterns:</span> Use the
                  dashboard to understand what makes each segment unique.
                </p>
              </div>

              <div className="flex gap-3 bg-purple-50 rounded-xl p-3 border-2 border-purple-200">
                <span className="text-xl flex-shrink-0">✅</span>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Validate inputs:</span> Ensure all
                  customer data is accurate before making predictions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;

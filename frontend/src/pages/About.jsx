/**
 * About page - Information about the ML model and application
 */

const About = () => {
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold gradient-text mb-2 sm:mb-3 drop-shadow-lg">
            About Customer Segmentation AI
          </h1>
          <p className="text-sm sm:text-lg text-text-secondary px-2 font-medium">
            Learn about our ML-powered customer segmentation solution
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* What is it */}
          <div className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border border-white/30 backdrop-blur-xl animate-slideInLeft">
            <div className="flex items-center gap-3 mb-4">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                🤖 What is Customer Segmentation?
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
              Customer segmentation is the process of dividing customers into
              groups based on common characteristics. Our AI-powered solution
              uses{" "}
              <span className="font-bold text-purple-600">
                K-Means clustering
              </span>
              , an unsupervised machine learning algorithm, to automatically
              identify distinct customer segments based on their behavior and
              demographics.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-purple-600">💡 Fun Fact:</span>{" "}
                K-Means clustering can process thousands of customer records in
                seconds, identifying patterns that would take humans hours to
                discover!
              </p>
            </div>
          </div>

          {/* How it works */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
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
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                ⚙️ How It Works
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    📊 Data Collection
                  </h3>
                  <p className="text-sm text-gray-700">
                    We collect customer data including age, income, spending
                    score, and purchase frequency.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    🔧 Data Preprocessing
                  </h3>
                  <p className="text-sm text-gray-700">
                    Data is normalized using StandardScaler to ensure all
                    features contribute equally to clustering.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    🎯 K-Means Clustering
                  </h3>
                  <p className="text-sm text-gray-700">
                    The algorithm groups similar customers together, creating
                    distinct segments.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    ✨ Prediction
                  </h3>
                  <p className="text-sm text-gray-700">
                    New customers are instantly classified into the most
                    appropriate segment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-slideInRight"
            style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                ✨ Key Features
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200 card-hover">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚡</span>
                  <h3 className="font-bold text-gray-800">
                    Real-time Predictions
                  </h3>
                </div>
                <p className="text-sm text-gray-700">
                  Get instant customer segment predictions in milliseconds
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200 card-hover">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎯</span>
                  <h3 className="font-bold text-gray-800">High Accuracy</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Optimized using Elbow Method and Silhouette Score
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200 card-hover">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📊</span>
                  <h3 className="font-bold text-gray-800">Visual Analytics</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Interactive charts and comprehensive statistics
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border-2 border-pink-200 card-hover">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔄</span>
                  <h3 className="font-bold text-gray-800">Retrainable Model</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Update the model with new data anytime
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-scaleIn"
            style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                💻 Technology Stack
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/80 p-3 rounded-xl text-center border-2 border-blue-200 card-hover">
                <div className="text-3xl mb-2">⚛️</div>
                <p className="font-bold text-sm text-gray-800">React</p>
                <p className="text-xs text-gray-600">Frontend</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl text-center border-2 border-green-200 card-hover">
                <div className="text-3xl mb-2">🐍</div>
                <p className="font-bold text-sm text-gray-800">FastAPI</p>
                <p className="text-xs text-gray-600">Backend</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl text-center border-2 border-purple-200 card-hover">
                <div className="text-3xl mb-2">🤖</div>
                <p className="font-bold text-sm text-gray-800">Scikit-learn</p>
                <p className="text-xs text-gray-600">ML Library</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl text-center border-2 border-pink-200 card-hover">
                <div className="text-3xl mb-2">🎨</div>
                <p className="font-bold text-sm text-gray-800">Tailwind CSS</p>
                <p className="text-xs text-gray-600">Styling</p>
              </div>
            </div>
          </div>

          {/* Dataset Info */}
          <div
            className="glass rounded-2xl shadow-2xl p-5 sm:p-8 border-2 border-white/20 animate-fadeIn"
            style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                📁 Dataset Information
              </h2>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Records</p>
                  <p className="text-2xl font-bold text-purple-600">5,000</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Features</p>
                  <p className="text-2xl font-bold text-purple-600">5</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-800">
                  Features Used:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white rounded-lg text-xs font-semibold text-gray-700 border border-gray-300">
                    👥 Sex
                  </span>
                  <span className="px-3 py-1 bg-white rounded-lg text-xs font-semibold text-gray-700 border border-gray-300">
                    🎂 Age
                  </span>
                  <span className="px-3 py-1 bg-white rounded-lg text-xs font-semibold text-gray-700 border border-gray-300">
                    💰 Annual Income
                  </span>
                  <span className="px-3 py-1 bg-white rounded-lg text-xs font-semibold text-gray-700 border border-gray-300">
                    🛍️ Spending Score
                  </span>
                  <span className="px-3 py-1 bg-white rounded-lg text-xs font-semibold text-gray-700 border border-gray-300">
                    📊 Purchase Frequency
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

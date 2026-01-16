/**
 * Result card component to display prediction results
 */
const ResultCard = ({ result }) => {
  if (!result) return null;

  // Color based on cluster
  const getClusterColor = (cluster) => {
    const colors = [
      "bg-blue-100 text-blue-800 border-blue-300",
      "bg-green-100 text-green-800 border-green-300",
      "bg-purple-100 text-purple-800 border-purple-300",
      "bg-orange-100 text-orange-800 border-orange-300",
      "bg-pink-100 text-pink-800 border-pink-300",
    ];
    return colors[cluster % colors.length];
  };

  const confidencePercentage = (result.confidence * 100).toFixed(0);

  return (
    <div className="glass rounded-2xl shadow-2xl p-4 sm:p-6 animate-fadeIn border border-white/30 backdrop-blur-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        🎯 Prediction Result
      </h2>

      {/* Cluster Badge */}
      <div className="mb-6">
        <div
          className={`inline-block px-6 py-3 rounded-xl border-2 shadow-xl ${getClusterColor(
            result.cluster
          )}`}>
          <p className="text-sm font-medium">Customer Segment</p>
          <p className="text-2xl font-bold">{result.cluster_name}</p>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Confidence Score
          </span>
          <span className="text-sm font-bold text-gray-900">
            {confidencePercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500 shadow-lg"
            style={{ width: `${confidencePercentage}%` }}></div>
        </div>
      </div>

      {/* Customer Data Summary */}
      <div className="border-t border-gray-200 pt-3 sm:pt-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
          📋 Customer Profile
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-3 rounded-xl border border-blue-200 shadow-md">
            <p className="text-xs text-blue-600 font-semibold">Sex</p>
            <p className="text-sm sm:text-lg font-bold text-gray-900">
              {result.customer_data.sex}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-2 sm:p-3 rounded-xl border border-purple-200 shadow-md">
            <p className="text-xs text-purple-600 font-semibold">Age</p>
            <p className="text-sm sm:text-lg font-bold text-gray-900">
              {result.customer_data.age}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-2 sm:p-3 rounded-xl border border-green-200 shadow-md">
            <p className="text-xs text-green-600 font-semibold">
              Annual Income
            </p>
            <p className="text-sm sm:text-lg font-bold text-gray-900">
              ${result.customer_data.annual_income}k
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-2 sm:p-3 rounded-xl border border-orange-200 shadow-md">
            <p className="text-xs text-orange-600 font-semibold">
              Spending Score
            </p>
            <p className="text-sm sm:text-lg font-bold text-gray-900">
              {result.customer_data.spending_score}/100
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-2 sm:p-3 rounded-xl col-span-2 border border-pink-200 shadow-md">
            <p className="text-xs text-pink-600 font-semibold">
              Purchase Frequency
            </p>
            <p className="text-sm sm:text-lg font-bold text-gray-900">
              {result.customer_data.purchase_frequency}/year
            </p>
          </div>
        </div>
      </div>

      {/* Cluster ID */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Cluster ID:{" "}
          <span className="font-bold text-purple-600">{result.cluster}</span>
        </p>
      </div>
    </div>
  );
};

export default ResultCard;

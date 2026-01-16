/**
 * Cluster visualization component using Recharts
 */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const ClusterChart = ({ clusters }) => {
  if (!clusters || clusters.length === 0) {
    return (
      <div className="glass rounded-2xl shadow-2xl p-6 border border-white/30 backdrop-blur-xl">
        <p className="text-gray-600 text-center">No cluster data available</p>
      </div>
    );
  }

  // Prepare data for charts
  const barChartData = clusters.map((cluster) => ({
    name: cluster.cluster_name,
    Age: cluster.avg_age.toFixed(1),
    Income: cluster.avg_income.toFixed(1),
    "Spending Score": cluster.avg_spending_score.toFixed(1),
    Frequency: cluster.avg_purchase_frequency.toFixed(1),
  }));

  const pieChartData = clusters.map((cluster) => ({
    name: cluster.cluster_name,
    value: cluster.size,
  }));

  // Radar chart data - normalize values for better visualization
  const radarChartData = clusters.map((cluster) => ({
    cluster: cluster.cluster_name,
    Age: (cluster.avg_age / 100) * 100,
    Income: (cluster.avg_income / 150) * 100,
    Spending: cluster.avg_spending_score,
    Frequency: (cluster.avg_purchase_frequency / 50) * 100,
  }));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Cluster Size Distribution */}
      <div className="glass rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/30 backdrop-blur-xl animate-fadeIn">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-xl">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
            📊 Cluster Size Distribution
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value">
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Average Metrics by Cluster */}
      <div
        className="glass rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/30 backdrop-blur-xl animate-fadeIn"
        style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-xl">
            <svg
              className="w-6 h-6 text-white"
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
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
            📈 Average Metrics by Cluster
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Age" fill="#8884d8" />
            <Bar dataKey="Income" fill="#82ca9d" />
            <Bar dataKey="Spending Score" fill="#ffc658" />
            <Bar dataKey="Frequency" fill="#ff8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart - Cluster Profiles */}
      <div
        className="glass rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/30 backdrop-blur-xl animate-fadeIn"
        style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-xl">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
            🎯 Cluster Profiles (Normalized)
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarChartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="cluster" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Age"
              dataKey="Age"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
            <Radar
              name="Income"
              dataKey="Income"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.3}
            />
            <Radar
              name="Spending"
              dataKey="Spending"
              stroke="#ffc658"
              fill="#ffc658"
              fillOpacity={0.3}
            />
            <Radar
              name="Frequency"
              dataKey="Frequency"
              stroke="#ff8042"
              fill="#ff8042"
              fillOpacity={0.3}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Cluster Statistics Table */}
      <div
        className="glass rounded-2xl shadow-2xl p-4 sm:p-6 overflow-x-auto border border-white/30 backdrop-blur-xl animate-fadeIn"
        style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
            📋 Detailed Cluster Statistics
          </h3>
        </div>
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gradient-to-r from-purple-100 to-pink-100">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-purple-800 uppercase tracking-wider">
                  Cluster
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-purple-800 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-purple-800 uppercase tracking-wider">
                  Avg Age
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-purple-800 uppercase tracking-wider">
                  Avg Income
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-purple-800 uppercase tracking-wider">
                  Avg Spending
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-purple-800 uppercase tracking-wider">
                  Avg Frequency
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-gray-200">
              {clusters.map((cluster, index) => (
                <tr
                  key={cluster.cluster_id}
                  className="hover:bg-white/80 transition-colors">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2 shadow-md"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}></div>
                      <span className="font-bold text-gray-900">
                        {cluster.cluster_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {cluster.size.toLocaleString()}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {cluster.avg_age.toFixed(1)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${cluster.avg_income.toFixed(1)}k
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {cluster.avg_spending_score.toFixed(1)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {cluster.avg_purchase_frequency.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClusterChart;

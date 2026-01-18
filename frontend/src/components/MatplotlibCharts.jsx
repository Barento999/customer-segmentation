/**
 * Component to display matplotlib-generated charts from backend
 */
import { useState, useEffect } from "react";
import api from "../services/api";

const MatplotlibCharts = () => {
  const [charts, setCharts] = useState(null);
  const [elbowChart, setElbowChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = async () => {
    setLoading(true);
    setError("");

    try {
      // Fetch cluster charts
      const clusterResponse = await api.get("/charts/clusters");
      setCharts(clusterResponse.data);

      // Fetch elbow chart
      const elbowResponse = await api.get("/charts/elbow");
      setElbowChart(elbowResponse.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load charts");
    } finally {
      setLoading(false);
    }
  };

  const downloadChart = (base64Data, filename) => {
    // Convert base64 to blob and download
    const link = document.createElement("a");
    link.href = base64Data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <button
          onClick={fetchCharts}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">
          📊 Cluster Visualizations (Matplotlib)
        </h2>
        <button
          onClick={fetchCharts}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          🔄 Refresh Charts
        </button>
      </div>

      {charts && (
        <>
          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-purple-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Total Customers</p>
                <p className="text-3xl font-bold text-purple-600">
                  {charts.total_customers.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Number of Clusters</p>
                <p className="text-3xl font-bold text-blue-600">
                  {charts.n_clusters}
                </p>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                🥧 Segment Distribution
              </h3>
              <button
                onClick={() =>
                  downloadChart(
                    charts.charts.pie_chart,
                    "segment-distribution.png",
                  )
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                💾 Download
              </button>
            </div>
            <img
              src={charts.charts.pie_chart}
              alt="Cluster Distribution Pie Chart"
              className="w-full h-auto"
            />
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                📊 Cluster Characteristics
              </h3>
              <button
                onClick={() =>
                  downloadChart(
                    charts.charts.bar_chart,
                    "cluster-characteristics.png",
                  )
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                💾 Download
              </button>
            </div>
            <img
              src={charts.charts.bar_chart}
              alt="Cluster Characteristics Bar Chart"
              className="w-full h-auto"
            />
          </div>

          {/* Heatmap */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                🔥 Feature Heatmap
              </h3>
              <button
                onClick={() =>
                  downloadChart(charts.charts.heatmap, "feature-heatmap.png")
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                💾 Download
              </button>
            </div>
            <img
              src={charts.charts.heatmap}
              alt="Cluster Feature Heatmap"
              className="w-full h-auto"
            />
          </div>

          {/* Size Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                👥 Customer Count by Segment
              </h3>
              <button
                onClick={() =>
                  downloadChart(charts.charts.size_chart, "customer-count.png")
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                💾 Download
              </button>
            </div>
            <img
              src={charts.charts.size_chart}
              alt="Customer Count by Segment"
              className="w-full h-auto"
            />
          </div>
        </>
      )}

      {/* Elbow Chart */}
      {elbowChart && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                📈 Elbow Method Analysis
              </h3>
              <p className="text-gray-600 mt-1">
                Optimal number of clusters:{" "}
                <span className="font-bold text-purple-600">
                  {elbowChart.optimal_k}
                </span>
              </p>
            </div>
            <button
              onClick={() =>
                downloadChart(elbowChart.chart, "elbow-method.png")
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
              💾 Download
            </button>
          </div>
          <img
            src={elbowChart.chart}
            alt="Elbow Method Chart"
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h4 className="font-bold text-blue-900 mb-2">ℹ️ About These Charts</h4>
        <p className="text-blue-800 text-sm">
          These charts are generated using <strong>Matplotlib</strong> and{" "}
          <strong>Seaborn</strong> on the Python backend. They provide detailed
          visualizations of customer segments including distribution,
          characteristics, and optimal cluster analysis.
        </p>
      </div>
    </div>
  );
};

export default MatplotlibCharts;

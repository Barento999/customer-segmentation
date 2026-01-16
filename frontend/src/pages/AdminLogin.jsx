import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(formData);

      // Check if user is admin
      if (response.user.role !== "admin") {
        setError("Access denied. Admin credentials required.");
        setLoading(false);
        return;
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="inline-block p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-5xl">👑</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            Admin Portal
          </h2>
          <p className="text-gray-600 text-lg">Administrator Access Only</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2">
                Admin Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter admin username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all transform ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:scale-[1.02] hover:shadow-xl"
              }`}>
              {loading ? "Verifying..." : "👑 Admin Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Regular user?{" "}
              <Link
                to="/login"
                className="font-semibold text-orange-600 hover:text-orange-800 transition-colors">
                User login here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 shadow-md">
            <p className="text-orange-900 text-sm mb-2 font-semibold">
              ⚠️ Authorized Personnel Only
            </p>
            <p className="text-orange-700 text-xs">
              This portal is restricted to administrators
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

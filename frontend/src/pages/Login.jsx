import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
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

      // Prevent admin from logging in through user portal
      if (response.user.role === "admin") {
        setError("Please use the admin portal to login.");
        setLoading(false);
        return;
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-5xl">🔐</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600 text-lg">Sign in to your account</p>
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
                Username or Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all transform ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-[1.02] hover:shadow-xl"
              }`}>
              {loading ? "Signing in..." : "🚀 Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-purple-600 hover:text-purple-800 transition-colors">
                Sign up here
              </Link>
            </p>
            <p className="text-gray-600">
              Administrator?{" "}
              <Link
                to="/admin/login"
                className="font-semibold text-orange-600 hover:text-orange-800 transition-colors">
                Admin login
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 shadow-md">
            <p className="text-blue-900 text-sm mb-2 font-semibold">
              Demo Account:
            </p>
            <p className="text-blue-700 text-xs">
              Username: testuser | Password: test123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

/**
 * API service for communicating with FastAPI backend
 */
import axios from "axios";

// Base URL for API
const API_BASE_URL = "http://localhost:8000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      // Redirect to login if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

/**
 * Health check endpoint
 */
export const healthCheck = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
};

/**
 * Train the ML model
 */
export const trainModel = async () => {
  try {
    const response = await api.post("/train");
    return response.data;
  } catch (error) {
    console.error("Training failed:", error);
    throw error;
  }
};

/**
 * Predict customer segment
 * @param {Object} customerData - Customer information
 * @param {number} customerData.age - Customer age
 * @param {number} customerData.annual_income - Annual income in thousands
 * @param {number} customerData.spending_score - Spending score (1-100)
 * @param {number} customerData.purchase_frequency - Purchase frequency per year
 */
export const predictSegment = async (customerData) => {
  try {
    const response = await api.post("/predict", customerData);
    return response.data;
  } catch (error) {
    console.error("Prediction failed:", error);
    throw error;
  }
};

/**
 * Get cluster statistics
 */
export const getClusters = async () => {
  try {
    const response = await api.get("/clusters");
    return response.data;
  } catch (error) {
    console.error("Failed to get clusters:", error);
    throw error;
  }
};

/**
 * Get elbow method data
 */
export const getElbowData = async () => {
  try {
    const response = await api.get("/elbow");
    return response.data;
  } catch (error) {
    console.error("Failed to get elbow data:", error);
    throw error;
  }
};

/**
 * Get prediction history
 */
export const getPredictionHistory = async (skip = 0, limit = 50) => {
  try {
    const response = await api.get(`/history?skip=${skip}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get prediction history:", error);
    throw error;
  }
};

// ============================================
// Authentication API
// ============================================

/**
 * Login user
 */
export const login = async (credentials) => {
  try {
    // FastAPI OAuth2PasswordRequestForm expects form data, not JSON
    const formData = new URLSearchParams();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const response = await api.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

/**
 * Register new user
 */
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Failed to get current user:", error);
    throw error;
  }
};

/**
 * Get user profile with stats
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/me/profile");
    return response.data;
  } catch (error) {
    console.error("Failed to get user profile:", error);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put("/users/me", userData);
    return response.data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
};

export default api;

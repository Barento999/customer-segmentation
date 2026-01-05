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

export default api;

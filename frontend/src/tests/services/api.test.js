import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import api from "../../services/api";

vi.mock("axios");

describe("API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("healthCheck", () => {
    it("calls GET / endpoint", async () => {
      const mockResponse = { data: { status: "healthy" } };
      axios.get.mockResolvedValue(mockResponse);

      const result = await api.healthCheck();

      expect(axios.get).toHaveBeenCalledWith("/");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("trainModel", () => {
    it("calls POST /train endpoint", async () => {
      const mockResponse = {
        data: {
          message: "Model trained successfully",
          n_clusters: 4,
          silhouette_score: 0.65,
          inertia: 1234.56,
        },
      };
      axios.post.mockResolvedValue(mockResponse);

      const result = await api.trainModel();

      expect(axios.post).toHaveBeenCalledWith("/train");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("predictSegment", () => {
    it("calls POST /predict endpoint with customer data", async () => {
      const customerData = {
        sex: "Male",
        age: 35,
        annual_income: 65.0,
        spending_score: 75,
        purchase_frequency: 12,
      };

      const mockResponse = {
        data: {
          cluster: 2,
          cluster_name: "High Value Customers",
          confidence: 85.5,
          customer_data: customerData,
        },
      };
      axios.post.mockResolvedValue(mockResponse);

      const result = await api.predictSegment(customerData);

      expect(axios.post).toHaveBeenCalledWith("/predict", customerData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getClusters", () => {
    it("calls GET /clusters endpoint", async () => {
      const mockResponse = {
        data: {
          total_customers: 5000,
          n_clusters: 3,
          clusters: [],
        },
      };
      axios.get.mockResolvedValue(mockResponse);

      const result = await api.getClusters();

      expect(axios.get).toHaveBeenCalledWith("/clusters");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getElbowData", () => {
    it("calls GET /elbow endpoint", async () => {
      const mockResponse = {
        data: {
          optimal_k: 4,
          k_range: [2, 3, 4, 5],
          inertias: [1000, 800, 600, 500],
          silhouette_scores: [0.5, 0.6, 0.65, 0.6],
        },
      };
      axios.get.mockResolvedValue(mockResponse);

      const result = await api.getElbowData();

      expect(axios.get).toHaveBeenCalledWith("/elbow");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("error handling", () => {
    it("throws error when API call fails", async () => {
      const errorMessage = "Network Error";
      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(api.healthCheck()).rejects.toThrow(errorMessage);
    });
  });
});

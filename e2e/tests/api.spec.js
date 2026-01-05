import { test, expect } from "@playwright/test";

test.describe("API Integration", () => {
  const API_BASE_URL = "http://localhost:8000";

  test("API health check endpoint works", async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.status).toBe("healthy");
    expect(data.message).toContain("Customer Segmentation API");
  });

  test("train model endpoint works", async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/train`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data).toHaveProperty("message");
    expect(data).toHaveProperty("n_clusters");
    expect(data).toHaveProperty("silhouette_score");
    expect(data).toHaveProperty("inertia");

    expect(data.n_clusters).toBeGreaterThanOrEqual(2);
    expect(data.silhouette_score).toBeGreaterThanOrEqual(-1);
    expect(data.silhouette_score).toBeLessThanOrEqual(1);
  });

  test("predict endpoint works with valid data", async ({ request }) => {
    // Train model first
    await request.post(`${API_BASE_URL}/train`);

    // Make prediction
    const customerData = {
      sex: "Male",
      age: 35,
      annual_income: 65.0,
      spending_score: 75,
      purchase_frequency: 12,
    };

    const response = await request.post(`${API_BASE_URL}/predict`, {
      data: customerData,
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data).toHaveProperty("cluster");
    expect(data).toHaveProperty("cluster_name");
    expect(data).toHaveProperty("confidence");
    expect(data).toHaveProperty("customer_data");

    expect(typeof data.cluster).toBe("number");
    expect(typeof data.cluster_name).toBe("string");
    expect(data.confidence).toBeGreaterThanOrEqual(0);
    expect(data.confidence).toBeLessThanOrEqual(100);
  });

  test("predict endpoint rejects invalid data", async ({ request }) => {
    const invalidData = {
      sex: "Male",
      age: 150, // Invalid
      annual_income: -10, // Invalid
      spending_score: 150, // Invalid
      purchase_frequency: -5, // Invalid
    };

    const response = await request.post(`${API_BASE_URL}/predict`, {
      data: invalidData,
    });

    expect(response.status()).toBe(422); // Validation error
  });

  test("clusters endpoint works after training", async ({ request }) => {
    // Train model first
    await request.post(`${API_BASE_URL}/train`);

    // Get clusters
    const response = await request.get(`${API_BASE_URL}/clusters`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data).toHaveProperty("total_customers");
    expect(data).toHaveProperty("n_clusters");
    expect(data).toHaveProperty("clusters");

    expect(Array.isArray(data.clusters)).toBeTruthy();
    expect(data.clusters.length).toBe(data.n_clusters);

    // Check cluster structure
    data.clusters.forEach((cluster) => {
      expect(cluster).toHaveProperty("cluster_id");
      expect(cluster).toHaveProperty("cluster_name");
      expect(cluster).toHaveProperty("size");
      expect(cluster).toHaveProperty("avg_age");
      expect(cluster).toHaveProperty("avg_income");
      expect(cluster).toHaveProperty("avg_spending_score");
      expect(cluster).toHaveProperty("avg_purchase_frequency");
    });
  });

  test("elbow endpoint returns optimization data", async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/elbow`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data).toHaveProperty("optimal_k");
    expect(data).toHaveProperty("k_range");
    expect(data).toHaveProperty("inertias");
    expect(data).toHaveProperty("silhouette_scores");

    expect(Array.isArray(data.k_range)).toBeTruthy();
    expect(Array.isArray(data.inertias)).toBeTruthy();
    expect(Array.isArray(data.silhouette_scores)).toBeTruthy();

    expect(data.k_range.length).toBe(data.inertias.length);
    expect(data.k_range.length).toBe(data.silhouette_scores.length);
  });

  test("CORS headers are present", async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/`);
    const headers = response.headers();

    expect(headers["access-control-allow-origin"]).toBeDefined();
  });
});

import { test, expect } from "@playwright/test";

test.describe("Full User Workflow", () => {
  test("complete workflow: train model and make prediction", async ({
    page,
  }) => {
    // Step 1: Go to Dashboard
    await page.goto("/dashboard");
    await expect(page.getByText(/analytics dashboard/i)).toBeVisible();

    // Step 2: Train the model
    await page.getByRole("button", { name: /train model/i }).click();

    // Wait for training to complete
    await page.waitForTimeout(10000);

    // Verify training completed
    const trainingSuccess =
      (await page
        .getByText(/model trained successfully/i)
        .isVisible()
        .catch(() => false)) ||
      (await page
        .getByText(/cluster/i)
        .isVisible()
        .catch(() => false));
    expect(trainingSuccess).toBeTruthy();

    // Step 3: Navigate to Home page
    await page.getByRole("link", { name: /home/i }).click();
    await expect(page).toHaveURL("/");

    // Step 4: Fill in customer data
    await page.getByLabel("Sex").selectOption("Female");
    await page.getByLabel("Age").fill("28");
    await page.getByLabel(/Annual Income/i).fill("55.0");
    await page.getByLabel(/Spending Score/i).fill("80");
    await page.getByLabel(/Purchase Frequency/i).fill("18");

    // Step 5: Submit prediction
    await page.getByRole("button", { name: /predict segment/i }).click();

    // Wait for prediction result
    await page.waitForTimeout(3000);

    // Step 6: Verify prediction result is displayed
    const hasCluster = await page
      .getByText(/cluster/i)
      .isVisible()
      .catch(() => false);
    const hasSegment = await page
      .getByText(/segment/i)
      .isVisible()
      .catch(() => false);

    expect(hasCluster || hasSegment).toBeTruthy();

    // Step 7: Check History page
    await page.getByRole("link", { name: /history/i }).click();
    await expect(page).toHaveURL("/history");

    // History might be empty or have predictions depending on localStorage
    await expect(page.getByText(/prediction history/i)).toBeVisible();
  });

  test("navigate through all pages", async ({ page }) => {
    // Home
    await page.goto("/");
    await expect(page.getByText(/customer information/i)).toBeVisible();

    // Dashboard
    await page.getByRole("link", { name: /dashboard/i }).click();
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByText(/analytics dashboard/i)).toBeVisible();

    // History
    await page.getByRole("link", { name: /history/i }).click();
    await expect(page).toHaveURL("/history");
    await expect(page.getByText(/prediction history/i)).toBeVisible();

    // About
    await page.getByRole("link", { name: /about/i }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByText(/customer segmentation/i)).toBeVisible();

    // Documentation
    await page.getByRole("link", { name: /documentation/i }).click();
    await expect(page).toHaveURL("/documentation");
    await expect(
      page.getByText(/getting started|documentation/i)
    ).toBeVisible();

    // Settings
    await page.getByRole("link", { name: /settings/i }).click();
    await expect(page).toHaveURL("/settings");
    await expect(page.getByText(/settings/i)).toBeVisible();
  });

  test("mobile navigation works", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/");

    // Open mobile menu
    const menuButton = page.getByRole("button").first();
    await menuButton.click();

    // Check if navigation links are visible
    await page.waitForTimeout(500);

    // Navigate to dashboard via mobile menu
    await page.getByRole("link", { name: /dashboard/i }).click();
    await expect(page).toHaveURL("/dashboard");
  });

  test("form validation works across different scenarios", async ({ page }) => {
    await page.goto("/");

    // Scenario 1: All fields empty
    await page.getByRole("button", { name: /predict segment/i }).click();
    await expect(page.getByText(/age must be between/i)).toBeVisible();

    // Scenario 2: Invalid age
    await page.getByLabel("Age").fill("200");
    await page.getByRole("button", { name: /predict segment/i }).click();
    await expect(page.getByText(/age must be between/i)).toBeVisible();

    // Scenario 3: Valid data
    await page.getByLabel("Sex").selectOption("Male");
    await page.getByLabel("Age").fill("45");
    await page.getByLabel(/Annual Income/i).fill("85.0");
    await page.getByLabel(/Spending Score/i).fill("70");
    await page.getByLabel(/Purchase Frequency/i).fill("25");

    await page.getByRole("button", { name: /predict segment/i }).click();

    // Should not show validation errors
    await page.waitForTimeout(1000);
    const hasAgeError = await page
      .getByText(/age must be between/i)
      .isVisible()
      .catch(() => false);
    expect(hasAgeError).toBeFalsy();
  });
});

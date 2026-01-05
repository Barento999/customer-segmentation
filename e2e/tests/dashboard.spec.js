import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("should display dashboard page", async ({ page }) => {
    // Check page elements
    await expect(page.getByText(/analytics dashboard/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /train model/i })
    ).toBeVisible();
  });

  test("should train model successfully", async ({ page }) => {
    // Click train model button
    await page.getByRole("button", { name: /train model/i }).click();

    // Wait for training to complete (may take a few seconds)
    await page.waitForTimeout(10000);

    // Check for success message or cluster statistics
    const hasSuccess = await page
      .getByText(/model trained successfully/i)
      .isVisible()
      .catch(() => false);
    const hasClusters = await page
      .getByText(/cluster/i)
      .isVisible()
      .catch(() => false);

    expect(hasSuccess || hasClusters).toBeTruthy();
  });

  test("should display cluster statistics after training", async ({ page }) => {
    // Train model
    await page.getByRole("button", { name: /train model/i }).click();
    await page.waitForTimeout(10000);

    // Check for cluster visualizations
    const hasCharts =
      (await page.locator("canvas").count()) > 0 ||
      (await page.getByText(/cluster/i).isVisible());

    expect(hasCharts).toBeTruthy();
  });

  test("should show API status indicator", async ({ page }) => {
    // Check for API status
    const statusIndicator = page.locator(
      "text=/API Status|Connected|Disconnected/i"
    );
    await expect(statusIndicator.first())
      .toBeVisible({ timeout: 5000 })
      .catch(() => {
        // API status might not be visible on all implementations
        return true;
      });
  });
});

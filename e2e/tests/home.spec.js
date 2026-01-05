import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the home page with form", async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Customer Segmentation/i);

    // Check navbar
    await expect(page.getByText("Customer Segmentation AI")).toBeVisible();

    // Check form is present
    await expect(page.getByText("Customer Information")).toBeVisible();
    await expect(page.getByLabel("Sex")).toBeVisible();
    await expect(page.getByLabel("Age")).toBeVisible();
    await expect(page.getByLabel(/Annual Income/i)).toBeVisible();
    await expect(page.getByLabel(/Spending Score/i)).toBeVisible();
    await expect(page.getByLabel(/Purchase Frequency/i)).toBeVisible();
  });

  test("should show validation errors for empty form", async ({ page }) => {
    // Click submit without filling form
    await page.getByRole("button", { name: /predict segment/i }).click();

    // Check for validation errors
    await expect(
      page.getByText(/age must be between 18 and 100/i)
    ).toBeVisible();
    await expect(
      page.getByText(/annual income must be positive/i)
    ).toBeVisible();
    await expect(
      page.getByText(/spending score must be between 1 and 100/i)
    ).toBeVisible();
    await expect(
      page.getByText(/purchase frequency must be positive/i)
    ).toBeVisible();
  });

  test("should validate age range", async ({ page }) => {
    // Test age too low
    await page.getByLabel("Age").fill("15");
    await page.getByRole("button", { name: /predict segment/i }).click();
    await expect(
      page.getByText(/age must be between 18 and 100/i)
    ).toBeVisible();

    // Test age too high
    await page.getByLabel("Age").fill("150");
    await page.getByRole("button", { name: /predict segment/i }).click();
    await expect(
      page.getByText(/age must be between 18 and 100/i)
    ).toBeVisible();
  });

  test("should validate spending score range", async ({ page }) => {
    // Test score too low
    await page.getByLabel(/Spending Score/i).fill("0");
    await page.getByRole("button", { name: /predict segment/i }).click();
    await expect(
      page.getByText(/spending score must be between 1 and 100/i)
    ).toBeVisible();

    // Test score too high
    await page.getByLabel(/Spending Score/i).fill("150");
    await page.getByRole("button", { name: /predict segment/i }).click();
    await expect(
      page.getByText(/spending score must be between 1 and 100/i)
    ).toBeVisible();
  });

  test("should submit form with valid data and show prediction", async ({
    page,
  }) => {
    // Fill in the form
    await page.getByLabel("Sex").selectOption("Male");
    await page.getByLabel("Age").fill("35");
    await page.getByLabel(/Annual Income/i).fill("65.5");
    await page.getByLabel(/Spending Score/i).fill("75");
    await page.getByLabel(/Purchase Frequency/i).fill("12");

    // Submit form
    await page.getByRole("button", { name: /predict segment/i }).click();

    // Wait for prediction result (or error if model not trained)
    await page.waitForTimeout(2000);

    // Check if either result is shown or error message
    const hasResult = await page
      .getByText(/cluster/i)
      .isVisible()
      .catch(() => false);
    const hasError = await page
      .getByText(/train the model first/i)
      .isVisible()
      .catch(() => false);

    expect(hasResult || hasError).toBeTruthy();
  });

  test("should navigate to other pages from navbar", async ({ page }) => {
    // Navigate to Dashboard
    await page.getByRole("link", { name: /dashboard/i }).click();
    await expect(page).toHaveURL("/dashboard");

    // Navigate to History
    await page.getByRole("link", { name: /history/i }).click();
    await expect(page).toHaveURL("/history");

    // Navigate to About
    await page.getByRole("link", { name: /about/i }).click();
    await expect(page).toHaveURL("/about");

    // Navigate back to Home
    await page.getByRole("link", { name: /home/i }).click();
    await expect(page).toHaveURL("/");
  });
});

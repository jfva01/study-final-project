import { test, expect } from "@playwright/test";
import { url } from "./utils/url";

test("should test favorite feature" , async ({ page }) => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="pokemon-card"]');
    await page.click('[data-testid="favorite-button"]');
    await page.goto(`${url}favorite`);
    const element = await page.waitForSelector('[data-testid="pokemon-card"]');
    expect(element).toBeTruthy();
    await page.reload();
    const elementAfterReload = await page.waitForSelector('[data-testid="pokemon-card"]');
    expect(elementAfterReload).toBeTruthy();
});
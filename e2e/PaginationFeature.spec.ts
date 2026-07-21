import { test, expect } from "@playwright/test";
import { url } from "./utils/url";

test("should test pagination feature", async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector(`[data-testid="pokemon-card"]`);
  
  // Navegar a la siguiente página
  const nextButton = await page.waitForSelector(`[data-testid="next-button"]`);
  await nextButton.click();

  // Esperar a que cargue la nueva página
  await page.waitForSelector(`[data-testid="pokemon-card"]`);
  
  // Bulbasaur no debería estar en la segunda página
  const nextElement = await page.$('text="Bulbasaur"');
  expect(nextElement).toBeNull();
  
  // Volver a la página anterior
  const previousButton = await page.waitForSelector(`[data-testid="previous-button"]`);
  await previousButton.click();

  // Esperar a que cargue la primera página
  await page.waitForSelector(`[data-testid="pokemon-card"]`);

  // Bulbasaur debería estar en la primera página
  const previousElement = await page.$('text="Bulbasaur"');
  expect(previousElement).not.toBeNull();
  
})
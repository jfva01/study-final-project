import { test, expect } from "@playwright/test";
import { url } from "./utils/url";

test("should test pokemon info feature", async ({ page }) => {
    await page.goto(url);
    await page.waitForSelector(`[data-testid="pokemon-card"]`);

    const firstElement = await page.$(`[data-testid="pokemon-card"]`);
    await firstElement?.click();
    await page.waitForSelector(`[data-testid="pokemon-info"]`);
    await page.waitForSelector(`[data-testid="pokemon-sprites"]`);

    const pokemonInfo = await page.$(`[data-testid="pokemon-info"]`);
    const pokemonImage = await pokemonInfo?.$("img");
    const pokemonImageSrc = await pokemonImage?.getAttribute("src");
    const pokemonImageAlt = await pokemonImage?.getAttribute("alt");
    expect(pokemonImageSrc).not.toBeNull();
    expect(pokemonImageAlt).not.toBeNull();

    const pokemonName = await pokemonInfo?.$("h1");
    const pokemonNameText = await pokemonName?.textContent();
    expect(pokemonNameText).toEqual("Bulbasaur");

    const typeIcon = await pokemonInfo?.$(`[data-testid="type-icon"] > img`);
    const typeIconAlt = await typeIcon?.getAttribute("alt");
    expect(typeIconAlt).toEqual("grass icon");

    const sprites = await page.$(`[data-testid="pokemon-sprites"]`);
    const spriteImages = await sprites?.$$("img");
    expect(spriteImages?.length).toBe(4);
})
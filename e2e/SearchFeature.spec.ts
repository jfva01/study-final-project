import { test, expect } from "@playwright/test";
import { url } from "./utils/url";

test("should test search feature", async ({ page }) => {
    await page.goto(url);
    const searchButton = await page.waitForSelector(`[data-testid='search-button']`);
    await searchButton.click();
    
    await page.waitForSelector(`[data-testid='search-input']`);
    const searchInput = await page.$("[data-testid='search-input']");
    await searchInput?.fill("bulbasaur");
    
    const searchSubmitButton = await page.$("[data-testid='search-submit-button']");
    await searchSubmitButton?.click();
    
    await page.waitForSelector(`[data-testid='pokemon-card']`);
    const pokemonCard = await page.waitForSelector(".ReactModalPortal [data-testid='pokemon-card']");
    await pokemonCard?.click();
    
    await page.waitForSelector(`[data-testid='pokemon-info']`);
    await page.waitForSelector(`[data-testid='pokemon-sprites']`);
    const pokemonInfo = await page.$("[data-testid='pokemon-info']");
    const pokemonImage = await pokemonInfo?.$("img");
    const pokemonImageAlt = await pokemonImage?.getAttribute("alt");
    expect(pokemonImageAlt).toEqual("bulbasaur");
})
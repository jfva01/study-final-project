import { test, expect } from "@playwright/test";
import { url } from "./utils/url";

test("should test filter by type feature" , async ({ page }) => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="type-icon"]');
    const firstCardTypeIcon = await page.$('[data-testid="type-icon"]');
    await firstCardTypeIcon?.click();
    await page.waitForSelector('[data-testid="pokemon-card"]');
    const pokemonCard = await page.$$('[data-testid="pokemon-card"]');
    
    const firstPokemonCard = pokemonCard[0];
    const secondPokemonCard = pokemonCard[1];
    const thirdPokemonCard = pokemonCard[2];
    
    const firstPokemonCardIcon = await firstPokemonCard.$('[data-testid="type-icon"] > img');
    const secondPokemonCardIcon = await secondPokemonCard.$('[data-testid="type-icon"] > img');
    const thirdPokemonCardIcon = await thirdPokemonCard.$('[data-testid="type-icon"] > img');

    const firstPokemonCardAlt = await firstPokemonCardIcon?.getAttribute('alt');
    const secondPokemonCardAlt = await secondPokemonCardIcon?.getAttribute('alt');
    const thirdPokemonCardAlt = await thirdPokemonCardIcon?.getAttribute('alt');

    expect(firstPokemonCardAlt).toContain("grass icon");
    expect(secondPokemonCardAlt).toContain("grass icon");
    expect(thirdPokemonCardAlt).toContain("grass icon"); 
})

// This test checks if the filter by type feature is working correctly. 
// It navigates to the page, clicks on the first type icon, and then verifies 
// that the first three pokemon cards displayed have the correct type 
// icon (grass in this case).
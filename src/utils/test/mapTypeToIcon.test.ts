import { describe, it, expect } from "vitest"
import { mapTypeToIcon } from "../mapTypeToIcon"
import { PokemonType } from "../../interfaces/PokemonData"

const testData =["fire","water","grass","ice","electric"]

describe("mapTypeToIcon", () => {
    // Caso 1: tipo válido → debe retornar algo truthy (el SVG)
    it.each(testData)("should return a valid icon for the type %s", (type) => {
        const pokemonType = { type: { name: type, url: "" } }
        expect(mapTypeToIcon(pokemonType as PokemonType)).toBeTruthy();
    });
    // Caso 2: tipo no reconocido → debe retornar string vacío
    it("should return empty string if the type is not found", () => {
        const pokemonType = { type: { name: "unknown_type", url: "" } }
        expect(mapTypeToIcon(pokemonType as PokemonType)).toBe("");
    });
});

/*
¿Qué se quiere testear?

La función mapTypeToIcon recibe un PokemonType y devuelve el ícono SVG correspondiente 
a ese tipo de Pokémon. El objetivo era verificar que el routing interno del switch funciona 
correctamente — es decir, que cada tipo (fire, water, grass, etc.) retorna algo, y que un 
tipo no reconocido retorna un string vacío.

1. Para tipos válidos, la función retorna algo (un ícono existe para ese tipo)
2. Para tipos inválidos, la función retorna un string vacío (el default del switch)

toBeTruthy() verifica que el valor existe y no es falsy (null, undefined, "", 0, false) 
— no le importa cuál es el contenido exacto del SVG, solo que la función retornó algo para 
ese tipo. Esto hace el test agnóstico al contenido del asset, lo cual es correcto porque el 
contenido de un SVG no es responsabilidad de mapTypeToIcon.
*/
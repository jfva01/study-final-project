import { describe, it, expect } from "vitest"
import { capitalizeFirstLetter } from "../capitalizeFirstLetter"

describe("capitalizeFirstLetter", () =>{
    it("should capitalize first letter",  () =>{
        expect(capitalizeFirstLetter("hello")).toBe("Hello")
    });

    it("shouldnt modify a string thats already capitalized", () => {
        expect(capitalizeFirstLetter("Charizard")).toBe("Charizard");
    });

    it("should handle an empty string without error", () => {
        expect(capitalizeFirstLetter("")).toBe("");
    });

    it("should handle a one letter only string", () => {
        expect(capitalizeFirstLetter("a")).toBe("A");
    });
});

// Las pruebas unitarias solo se hace para confirmar que la estructura
// no tiene errores y retorna lo que se espera.
import { describe, it, expect, vi, afterEach, beforeEach} from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../testUtils/renderWithProviders";
import { PokemonSprites } from "./PokemonSprites";
import { useGetPokemon } from "../../hooks/useGetPokemon";

// Mock de useGetPokemonListByType para simular la respuesta de la API
vi.mock("../../hooks/useGetPokemon", () => ({
    useGetPokemon: vi.fn()
}));

describe("PokemonSprites", () => {
    afterEach(() => { vi.clearAllMocks() });

    // Test para verificar que se rendericen los cuatro sprites del pokémon
    it("should render all four pokemon sprites", () => {
        vi.mocked(useGetPokemon).mockReturnValue({
            pokemonData: {
                name: "Pikachu",
                id: 25,
                height: 4,
                weight: 60,
                types: [{ slot: 1, type: { name: "electric", url: "" } }],
                sprites: {
                    front_default: "front_default",
                    back_default: "back_default",
                    front_shiny: "front_shiny",
                    back_shiny: "back_shiny"
                },
            },
            isLoading: false,
            error: null
        });

        renderWithProviders(<PokemonSprites />);
        
        const frontDefaultSprite = screen.getByAltText("Pikachu front default");
        expect(frontDefaultSprite).toBeInTheDocument();
        expect(frontDefaultSprite).toHaveAttribute("src", "front_default");
        
        const backDefaultSprite = screen.getByAltText("Pikachu back default");
        expect(backDefaultSprite).toBeInTheDocument();
        expect(backDefaultSprite).toHaveAttribute("src", "back_default");
        
        const frontShinySprite = screen.getByAltText("Pikachu front shiny");
        expect(frontShinySprite).toBeInTheDocument();
        expect(frontShinySprite).toHaveAttribute("src", "front_shiny");
        
        const backShinySprite = screen.getByAltText("Pikachu back shiny");
        expect(backShinySprite).toBeInTheDocument();
        expect(backShinySprite).toHaveAttribute("src", "back_shiny");
    });

    // Test para verificar que no se rendericen secciones si los sprites son undefined
    it("should render no sections if sprites are undefined", () => {
        vi.mocked(useGetPokemon).mockReturnValue({
            pokemonData: {
                name: "Pikachu",
                id: 25,
                height: 4,
                weight: 60,
                types: [{ slot: 1, type: { name: "electric", url: "" } }],
                sprites: {
                    front_default: undefined,
                    back_default: undefined,
                    front_shiny: undefined,
                    back_shiny: undefined
                }
            },
            isLoading: false,
            error: null
        });

        renderWithProviders(<PokemonSprites />);

        const frontDefaultSprite = screen.queryByAltText("Pikachu front default");
        expect(frontDefaultSprite).not.toBeInTheDocument();

        const backDefaultSprite = screen.queryByAltText("Pikachu back default");
        expect(backDefaultSprite).not.toBeInTheDocument();

        const frontShinySprite = screen.queryByAltText("Pikachu front shiny");
        expect(frontShinySprite).not.toBeInTheDocument();

        const backShinySprite = screen.queryByAltText("Pikachu back shiny");
        expect(backShinySprite).not.toBeInTheDocument();

        expect(screen.queryByText("Normal")).not.toBeInTheDocument();
        expect(screen.queryByText("Shiny")).not.toBeInTheDocument();
    });
})

/*
¿Qué se quería testear?

PokemonSprites muestra los cuatro sprites de un Pokémon: frontal normal,
trasero normal, frontal shiny y trasero shiny. Los tests verifican dos
escenarios: que los cuatro sprites se renderizan cuando los datos existen,
y que no se renderiza ninguna sección cuando los sprites son undefined.

Decisiones tomadas:

1. Mock de useGetPokemon con factory function explícita
   Al igual que en PokemonCard y PokemonInfo, se necesita la factory function
   en vi.mock para garantizar que useGetPokemon sea un vi.fn() con
   mockReturnValue disponible. Sin ella, Vitest no convierte automáticamente
   la función en un mock.

2. Valores de src simplificados en el mock
   En lugar de URLs reales de la PokéAPI, se usan strings simples
   ("front_default", "back_default", etc.) como valores de src. Esto hace
   el test más legible y evita depender de URLs externas que podrían cambiar.
   Lo que se verifica es que el componente pasa el valor correcto al atributo
   src, no que la URL sea válida.

3. getByAltText para identificar cada sprite individualmente
   Cada imagen tiene un alt text descriptivo y único ("Pikachu front default",
   "Pikachu back default", etc.), lo que permite identificarlas sin necesidad
   de data-testid. Además de verificar presencia con toBeInTheDocument(),
   se verifica el atributo src con toHaveAttribute() para confirmar que cada
   sprite recibe su URL correcta y no están intercambiadas.

4. queryByAltText en lugar de getByAltText para el segundo test
   getByAltText lanza una excepción si no encuentra el elemento, interrumpiendo
   el test antes del expect. queryByAltText devuelve null cuando el elemento
   no existe, permitiendo usar not.toBeInTheDocument() para verificar ausencia.

5. Verificación de secciones "Normal" y "Shiny"
   Además de verificar que las imágenes no se renderizan, el segundo test
   comprueba que los títulos de sección ("Normal", "Shiny") tampoco aparecen
   cuando los sprites son undefined. Esto verifica que el componente elimina
   completamente las secciones en lugar de renderizarlas vacías.

6. afterEach(() => vi.clearAllMocks())
   Limpia el estado de los mocks entre tests para que el mockReturnValue
   definido en el primer test no afecte al segundo.
*/
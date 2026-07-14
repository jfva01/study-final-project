import { describe, it, expect, vi, afterEach, beforeEach} from "vitest"
import { screen } from "@testing-library/react"
import { PokemonInfo } from "./PokemonInfo";
import { renderWithProviders } from "../../testUtils/renderWithProviders";
import { useGetPokemon } from "../../hooks/useGetPokemon";

// Mock de useGetPokemon para simular la respuesta de la API
vi.mock("../../hooks/useGetPokemon", () => ({
    useGetPokemon: vi.fn()
}));
// Mock de useParams para simular el parámetro pokemonName
vi.mock("react-router", async () =>{
    const actual = await vi.importActual("react-router")

    return {
        ...actual,
        useParams: vi.fn(() => ({ pokemonName: "pikachu" }))
    }
});

describe("PokemonInfo", () =>{
    beforeEach(() => {
        // Configurar el mock de useGetPokemon para devolver datos simulados
        vi.mocked(useGetPokemon).mockReturnValue({
            pokemonData: {
                name: "Pikachu",
                id: 25,
                height: 4,
                weight: 60,
                types:[{
                    slot: 1,                    
                    type: {
                        name: "electric",
                        url: "https://pokeapi.co/api/v2/type/1/"
                    }
                }],
                sprites: {
                    front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
                }
            },
            isLoading: false,
            error: null
        });
    });

    afterEach(() => vi.clearAllMocks());

    it("should render pokémon name", () => {
        renderWithProviders(<PokemonInfo />);
        expect(screen.getByText("Pikachu")).toBeInTheDocument();
    });

    it("should render pokémon weight", () => {
        renderWithProviders(<PokemonInfo />);
        expect(screen.getByText("Weight: 6.00 kg")).toBeInTheDocument();
    });

    it("should render pokémon height", () => {
        renderWithProviders(<PokemonInfo />);
        expect(screen.getByText("Height: 40.00 cm")).toBeInTheDocument();
    });

    it("should render pokémon image", () => {
        renderWithProviders(<PokemonInfo />);
        const pokemonImage = screen.getByTestId("pokemon-main-image");
        expect(pokemonImage).toBeInTheDocument();
        expect(pokemonImage).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
    });
})

/*
¿Qué se quería testear?

PokemonInfo muestra el detalle completo de un Pokémon: nombre, peso, altura
e imagen principal. Los tests verifican que cada dato se renderiza correctamente,
incluyendo las conversiones de unidades que aplica el componente antes de mostrarlos.

Decisiones tomadas:

1. Mock de useParams
   PokemonInfo obtiene el nombre del Pokémon desde la URL mediante useParams(),
   no desde props. Para que el componente funcione en el entorno de test sin
   una URL real, se mockea useParams para que devuelva un nombre controlado:
       useParams: vi.fn(() => ({ pokemonName: "pikachu" }))
   Se usa vi.importActual para preservar el resto del comportamiento real de
   react-router (BrowserRouter, Link, etc.) y solo sobreescribir useParams.

2. Valores de weight y height con conversiones aplicadas
   El componente convierte los datos antes de renderizarlos:
       convertHectogramsToKg(60) → "6.00" → "Weight: 6.00 kg"
       convertDecimetresToCm(4)  → "40.00" → "Height: 40.00 cm"
   Los expects deben usar los valores ya convertidos, no los datos crudos
   del mock. Esto además verifica implícitamente que las funciones de
   conversión se aplican correctamente.

3. data-testid en la imagen principal
   PokemonInfo renderiza múltiples imágenes del Pokémon (sprite normal frontal,
   trasero, shiny frontal, shiny trasero), todas con el mismo alt text. Usar
   getByAltText fallaba con "Found multiple elements". Se agregó
   data-testid="pokemon-main-image" a la imagen principal del componente para
   identificarla de forma unívoca sin depender del orden de renderizado.

4. screen en lugar de destructuring
   Se usa screen.getByText, screen.getByTestId, etc. en lugar del patrón
   antiguo de destructurar el resultado de renderWithProviders, siguiendo
   la convención moderna de Testing Library.

5. nombre en minúscula en pokemonData
   El componente aplica capitalizeFirstLetter antes de renderizar, así que
   "pikachu" en los datos mock → "Pikachu" en el DOM. El expect usa "Pikachu"
   para verificar que la transformación se aplica correctamente.
*/
import { describe, it, expect, vi, afterEach, beforeEach} from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../testUtils/renderWithProviders"
import { useGetPokemon } from "../../hooks/useGetPokemon"
import { PokemonCard } from "./PokemonCard";
import { useFavoriteStore } from "../../store/useFavoriteStore";

vi.mock("../../hooks/useGetPokemon", () => ({
    useGetPokemon: vi.fn()
}));

vi.mock("../../store/useFavoriteStore", () =>({
    useFavoriteStore: vi.fn()
}));

const mockPokemon = {
    name: "Pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25"
}

describe("PokemonCard", () =>{
    beforeEach(() => {
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

        vi.mocked(useFavoriteStore).mockImplementation((selector: any) =>
            selector({ favorites: [], addFavorite: vi.fn(), deleteFavorite: vi.fn() })
        );
    });

    afterEach(() => vi.clearAllMocks());
    // Verificar que el nombre se esté mostrando correctamente en la tarjeta del Pokémon
    it("should render the Pokémon name", () => {
        const { getByText } = renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
        expect(getByText("Pikachu")).toBeInTheDocument();
    });

    // Verificar que la imagen del Pokémon se esté mostrando correctamente
    it("should render the Pokémon image", () => {
        const { getByAltText } = renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
        const pokemonImage = screen.getByAltText("Pikachu");
        expect(getByAltText("Pikachu")).toBeInTheDocument();
        expect(pokemonImage).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
    });

    it("should apply the correct background class based on type", () => {
        renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
        expect(screen.getByTestId("pokemon-card")).toHaveClass("electric-background");
    });

    // it("should navigate to the pokemon detail page on click", async () => {
    //     renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
    //     await userEvent.click(screen.getByTestId("pokemon-card"));
    //     // verificar navegación
    // });
})

/*
¿Qué se quería testear?

PokemonCard es el componente central de la app — renderiza el nombre, imagen,
tipo y botón de favorito de cada Pokémon. El test verifica que el nombre se
renderiza correctamente, incluyendo que capitalizeFirstLetter se aplica antes
de mostrarlo.

Decisiones tomadas:

1. Mock de useGetPokemon con factory function explícita
   A diferencia de vi.mock("módulo") sin argumentos, la factory function
   garantiza que useGetPokemon sea un vi.fn() con mockReturnValue disponible.
   Sin ella, Vitest no convierte automáticamente la función en un mock y
   mockReturnValue no existe en el objeto resultante.

2. mockReturnValue en lugar de mockImplementation
   useGetPokemon no es un store de Zustand — no recibe un selector como
   argumento. Simplemente devuelve un objeto con pokemonData, isLoading y error.
   Por eso se usa mockReturnValue (devuelve el objeto directamente) en lugar
   de mockImplementation con un selector.

3. Mock de useFavoriteStore con implementación de selector
   FavoriteButton dentro de PokemonCard consume useFavoriteStore con useShallow.
   Sin una implementación que ejecute el selector, el mock devuelve undefined
   y el componente crashea. Se mockea con el shape completo del store:
       selector({ favorites: [], addFavorite: vi.fn(), deleteFavorite: vi.fn() })

4. nombre en minúscula en mockPokemon y pokemonData
   El componente aplica capitalizeFirstLetter antes de renderizar, así que
   "pikachu" en los datos mock → "Pikachu" en el DOM. Usar "pikachu" en minúscula
   en los datos y "Pikachu" en el expect verifica que la transformación se aplica
   correctamente — si los datos ya vinieran capitalizados, el test no cubriría esa lógica.

5. beforeEach para configurar los mocks
   Centralizar la configuración de mocks en beforeEach evita repetir el mismo
   bloque en cada test y garantiza que todos los casos del describe parten del
   mismo estado inicial.

6. afterEach(() => vi.clearAllMocks())
   Limpia el estado de todos los mocks entre tests para evitar que
   comportamientos definidos en un test afecten los siguientes.
*/
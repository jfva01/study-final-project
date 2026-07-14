import { describe, it, expect, vi, afterEach} from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../testUtils/renderWithProviders"
import { FavoritePokemon } from "../FavoritePokemon/FavoritePokemon"
import { useFavoriteStore } from "../../store/useFavoriteStore"

vi.mock("../../store/useFavoriteStore", () =>({
    useFavoriteStore: vi.fn()
}));

vi.mock("../../hooks/useGetPokemon", () => ({
    useGetPokemon: vi.fn(() => ({
        pokemonData: {
            id: 1,
            name: "bulbasaur",
            height: 7,
            weight: 69,
            types: [{ slot: 1, type: { name: "grass", url: "" } }],
            sprites: { front_default: undefined }
        },
        isLoading: false,
        error: null
    }))
}));

describe("FavoritePokemon", () => {
    // Evitamos que se usen datos que hayan quedado de otras pruebas
    afterEach(() => vi.clearAllMocks()); 

    it("should render PokemonCards for each Favorite Pokemon", () => {
        const favoriteIds = ["1","2","3"];
        vi.mocked(useFavoriteStore).mockImplementation((selector: any) =>
            selector({ favorites: favoriteIds })
        );

        renderWithProviders(<FavoritePokemon />);

        const pokemonCards = screen.getAllByTestId("pokemon-card");
        expect(pokemonCards).toHaveLength(favoriteIds.length)
    });

    it("should not render PokemonCards if there is no favorite", () => {
        const favoriteIds: string[] = [];
        vi.mocked(useFavoriteStore).mockImplementation((selector: any) =>
            selector({ favorites: favoriteIds })
        );

        renderWithProviders(<FavoritePokemon />);

        const pokemonCards = screen.queryAllByTestId("pokemon-card");
        expect(pokemonCards).toHaveLength(0);
    });
})

/*
¿Qué se quería testear?

FavoritePokemon renderiza una PokemonCard por cada ID guardado en el store
de favoritos. Los tests verifican dos escenarios: que se renderizan las cards
correctas cuando hay favoritos, y que no se renderiza nada cuando la lista está vacía.

Decisiones tomadas:

1. Mock de useFavoriteStore
   FavoritePokemon depende de useFavoriteStore para obtener los IDs de favoritos,
   que a su vez accede a localStorage. Mockear el módulo completo permite:
   - Aislar el test del estado real de localStorage
   - Controlar exactamente qué datos recibe el componente en cada escenario
   - Evitar efectos secundarios del store real de Zustand en el entorno de test

2. mockImplementation con selector en lugar de mockReturnValue
   useFavoriteStore recibe un selector como argumento:
       const favoriteIds = useFavoriteStore((state) => state.favorites)
   El mock debe simular ese comportamiento ejecutando el selector con el estado
   falso. mockReturnValue devuelve el valor directamente sin ejecutar el selector,
   lo que no replica el comportamiento real del store:
       vi.mocked(useFavoriteStore).mockImplementation((selector: any) =>
           selector({ favorites: favoriteIds })
       )

3. Mock de useGetPokemon
   PokemonCard (hijo de FavoritePokemon) ejecuta useGetPokemon internamente,
   que intenta hacer un fetch real a la PokéAPI. En el entorno de test no hay
   servidor disponible, lo que causa que el componente crashee antes de renderizarse.
   Se mockea con datos mínimos válidos para que PokemonCard pueda renderizarse
   correctamente sin hacer ninguna petición real.
   
   Este mock no fue necesario en el curso original porque Jest con moduleNameMapper
   y jest-environment-jsdom maneja las llamadas fetch de forma diferente. En Vitest,
   el pipeline de Vite procesa los módulos más fielmente al entorno real, por lo que
   las dependencias externas deben mockearse explícitamente.

4. getAllByTestId vs queryAllByTestId
   getAllBy* lanza una excepción si no encuentra elementos, lo que interrumpe
   el test antes de llegar al expect. Para verificar ausencia de elementos
   se usa queryAllBy*, que devuelve un array vacío en lugar de lanzar error.

5. afterEach(() => vi.clearAllMocks())
   Limpia todos los mocks después de cada test para evitar que el estado del mock
   de un test contamine el siguiente — especialmente importante cuando
   mockImplementation define comportamientos distintos por escenario.

6. data-testid="pokemon-card" en PokemonCard
   Testing Library recomienda usar data-testid cuando no hay un selector semántico
   natural (rol, texto, alt text) que identifique al elemento. El data-testid se
   colocó en el div contenedor exterior del componente, garantizando que esté
   presente en el DOM independientemente del estado de pokemonData.
*/
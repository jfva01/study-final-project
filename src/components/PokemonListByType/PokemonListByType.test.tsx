import { describe, it, expect, vi, afterEach, beforeEach} from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../testUtils/renderWithProviders";
import { useGetPokemonListByType } from "../../hooks/useGetPokemonListByType"
import { PokemonByTypeList } from "./PokemonListByType";
import { useParams } from "react-router";

// Mock de useGetPokemonListByType para simular la respuesta de la API
vi.mock("../../hooks/useGetPokemonListByType", () => ({
    useGetPokemonListByType: vi.fn()
}));

// Mock de useParams para simular el parámetro pokemonName
vi.mock("react-router", async () =>{
    const actual = await vi.importActual("react-router")

    return {
        ...actual,
        useParams: vi.fn(() => ({ typeName: "fire" }))
    }
});

describe("PokemonByTypeList", () => {
    beforeEach(() => {
        vi.mocked(useParams).mockReturnValue({ typeName: "fire" });
        vi.mocked(useGetPokemonListByType).mockReturnValue({
            pokemonList:[
                { pokemon: { name: "Charmander" } },
                { pokemon: { name: "Charizard" } }
            ],
            isLoading: false,
            error: null
        });
    });

    afterEach(() => vi.clearAllMocks());

    it("should render a list of PokemonCards", () => {
        renderWithProviders(<PokemonByTypeList />);
        expect(screen.queryAllByTestId("pokemon-card")).toHaveLength(2);
    });
});
import { describe, it, expect, vi, afterEach, beforeEach} from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../testUtils/renderWithProviders";
import { useGetPokemonList } from "../../hooks/useGetPokemonList"
import { PokemonList } from "./PokemonList";

vi.mock("../../hooks/useGetPokemonList", () => ({
    useGetPokemonList: vi.fn()
}));

describe("PokemonList", () => {
    beforeEach(() => {
        vi.mocked(useGetPokemonList).mockReturnValue({
            pokemonList: [
                { pokemon: { name: "Pikachu" } },
                { pokemon: { name: "Charmander" } }
            ],
            goToNextPage: vi.fn(),
            goToPreviousPage: vi.fn(),
            isLoading: false,
            error: null
        });
    });

    afterEach(() => vi.clearAllMocks());

    it("should render list of Pokémon Cards", () => {
        renderWithProviders(<PokemonList />);
        expect(screen.queryAllByTestId("pokemon-card")).toHaveLength(2);
    });

    it("should call the goToNextPage function when the next button is clicked", () => {
        const { getByText } = renderWithProviders(<PokemonList />);
        getByText("Next").click();
        expect(vi.mocked(useGetPokemonList).mock.results[0].value.goToNextPage).toHaveBeenCalledTimes(1);
    });

    it("should call the goToPreviousPage function when the previous button is clicked", () => {
        const { getByText } = renderWithProviders(<PokemonList />);
        getByText("Previous").click();
        expect(vi.mocked(useGetPokemonList).mock.results[0].value.goToPreviousPage).toHaveBeenCalledTimes(1);
    });
});
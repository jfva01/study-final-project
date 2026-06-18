import { useGetPokemonList } from "../../hooks/useGetPokemonList"
import { PokemonCard } from "../PokemonCard/PokemonCard";
import { Grid } from "../Shared/Grid/Grid";

const PokemonList = () => {
    const { pokemonList, goToNextPage, goToPreviousPage } = useGetPokemonList();

    return(
        <Grid goToPreviousPage={goToPreviousPage} goToNextPage={goToNextPage}>
            {pokemonList.map((pokemon) => 
                <PokemonCard 
                    key={ pokemon?.name } 
                    pokemon={ pokemon } 
                />
            )}
        </Grid>
    )
}

export default PokemonList;
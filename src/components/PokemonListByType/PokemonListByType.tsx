import { useParams } from "react-router";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import { useGetPokemonListByType } from "../../hooks/useGetPokemonListByType";
import { Grid } from "../Shared/Grid/Grid"

export const PokemonByTypeList = () =>{
    const { typeName } = useParams();
    const { pokemonList } = useGetPokemonListByType(typeName ?? "");

    return(
        <Grid>
            {pokemonList?.map((pokemon) => 
                <PokemonCard 
                    key={pokemon?.pokemon.name} 
                    pokemon={pokemon?.pokemon} />
                )}          
        </Grid>
    )
}
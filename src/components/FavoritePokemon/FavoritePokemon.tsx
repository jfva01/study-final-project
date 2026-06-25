import { useFavoriteStore } from "../../store/useFavoriteStore";
import { Grid } from "../Shared/Grid/Grid"
import { PokemonCard } from "../PokemonCard/PokemonCard"

export const FavoritePokemon = () => {
    const favoriteIds = useFavoriteStore((state) => state.favorites);

    return(
        <Grid>
            {favoriteIds.map((favoriteId) => 
                <PokemonCard 
                    key={favoriteId}
                    pokemonId={Number(favoriteId)}
                />
            )}
        </Grid>
    )
}
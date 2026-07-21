import { useGetPokemon } from "../../hooks/useGetPokemon";

interface PokemonSpritesProps{
    pokemonName?: string;
}

export const PokemonSprites = ({ pokemonName }: PokemonSpritesProps) =>{
    const { pokemonData } = useGetPokemon(pokemonName);

    return(
        <div data-testid="pokemon-sprites" className="flex flex-row">
            <div>
                {pokemonData?.sprites?.front_default && (
                    <>
                        <h6 className="text-2xl text-center">Normal</h6>
                        <div className="flex">
                            <img
                                src={pokemonData?.sprites?.front_default}
                                alt={`${pokemonData?.name ?? ""} front default`}
                                className="mx-auto"
                            />
                            <img
                                src={pokemonData?.sprites?.back_default}
                                alt={`${pokemonData?.name ?? ""} back default`}
                                className="mx-auto"
                            />
                        </div>
                    </>
                )}
            </div>
            <div>
                {pokemonData?.sprites?.front_shiny && (
                    <>
                        <h6 className="text-2xl text-center">Shiny</h6>
                        <div className="flex">
                            <img
                                src={pokemonData?.sprites?.front_shiny}
                                alt={`${pokemonData?.name ?? ""} front shiny`}
                                className="mx-auto"
                            />
                            <img
                                src={pokemonData?.sprites?.back_shiny}
                                alt={`${pokemonData?.name ?? ""} back shiny`}
                                className="mx-auto"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
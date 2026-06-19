import { useParams } from "react-router"
import { useGetPokemon } from "../../hooks/useGetPokemon"
import { getMainPokemonType } from "../../utils/getMainPokemonType"
import { useMemo } from "react"
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter"
import { convertHectogramsToKg } from "../../utils/convertHectogramsToKg"
import { convertDecimetresToCm } from "../../utils/convertDecimetresToCm"


export const PokemonInfo = () =>{
    const { pokemonName } = useParams();
    const { pokemonData } = useGetPokemon(pokemonName);
    const mainType = useMemo(() => pokemonData && getMainPokemonType(pokemonData), [pokemonData]);

    return (
        <div className="flex flex-row justify-between shadow-lg bg-gray-100 rounded-lg">
            <div className={`${mainType}-background w-72 h-72 rounded-l-lg items-center`}>
                <img
                    src={pokemonData?.sprites?.front_default}
                    alt={pokemonData?.name ?? ""} className="mx-auto w-72 h-72"
                />
            </div>
            <div className="flex flex-col grow p-5 gap-3">
                <h1 className="text-3xl">{capitalizeFirstLetter(pokemonData?.name ?? "")}</h1>
                <p>{`Weight: ${convertHectogramsToKg(pokemonData?.weight ?? 0)} kg`}</p>
                <p>{`Height: ${convertDecimetresToCm(pokemonData?.height ?? 0)} cm`}</p>
            </div>
        </div>
    )
}
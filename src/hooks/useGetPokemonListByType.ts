import { useQuery } from "@tanstack/react-query"
import { BASE_URL } from "../constants/urls";
import { PokemonListItem } from "../interfaces/PokemonListItem";

interface Pokemon{
    pokemon: PokemonListItem;
}

interface TypeListInfo{
    pokemon: Pokemon[]
}

export const useGetPokemonListByType = (typeName: string) => {
    const { data, isLoading, error } = useQuery<TypeListInfo>({
        queryKey: ["pokemonListByType", typeName],
        queryFn: async()=>{
            const response = await fetch(`${BASE_URL}type/${typeName}`);
            if(!response.ok)
                throw new Error('Network response was not ok.')
            return response.json()
        }
    });

    return{
        pokemonList: data?.pokemon ?? [],
        isLoading,
        error: error?.message ?? null
    }
}
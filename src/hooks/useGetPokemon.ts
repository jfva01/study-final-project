import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../constants/urls'
import { PokemonData } from '../interfaces/PokemonData';

export const useGetPokemon = (pokemonName?: string, pokemonId?: number) => {
    const identifier = pokemonName ?? pokemonId;

    const { data: pokemonData, isLoading, error } = useQuery<PokemonData>({
        queryKey: ['pokemon', identifier],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}pokemon/${identifier}`);
            if(!response.ok){
                throw new Error('Network response was not ok.');
            }
            return response.json();
        },
        enabled: !!identifier
    });

    return { 
        pokemonData, 
        isLoading, 
        error: error?.message ?? null };
}
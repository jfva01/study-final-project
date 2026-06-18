import { PokemonData } from "../interfaces/PokemonData";

export const getPokemonType = (pokemon: PokemonData) => 
    pokemon.types.find(type => type.slot === 1) ?.type.name;
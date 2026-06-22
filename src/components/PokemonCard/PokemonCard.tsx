import { useMemo } from 'react';
import { useGetPokemon } from '../../hooks/useGetPokemon'
import { PokemonListItem } from '../../interfaces/PokemonListItem';
import { getMainPokemonType } from '../../utils/getMainPokemonType';
import { Label } from '../Shared/Label/Label';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { FavoriteButton } from '../Shared/Button/FavoriteButton';
import { useNavigate } from 'react-router';
import { TypeIcons } from '../Shared/TypeIcons/TypeIcons';

interface PokemonCardProps{
    pokemon?: PokemonListItem;
    pokemonId?: number;
}

export const PokemonCard = ({ pokemon, pokemonId }: PokemonCardProps ) => {
    const { pokemonData } = useGetPokemon(pokemon?.name, pokemonId);
    const mainType = useMemo(() => pokemonData && getMainPokemonType(pokemonData),[pokemonData]);
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/pokemon/${pokemonData?.name}`);
    }

    return(
        <div className={`${mainType}-background relative w-56 h-56 rounded-lg shadow-lg p-4 cursor-pointer`} onClick={onClick}>
            <FavoriteButton pokemonId={pokemonData?.id ?? 0} />
            <TypeIcons types={pokemonData?.types ?? []} />
            <div className='flex flex-col items-center mx-auto'>
                <Label>{ pokemonData?.name ? capitalizeFirstLetter(pokemonData?.name) : "" }</Label>
                <img 
                    src={ pokemonData?.sprites?.front_default }
                    alt={ pokemonData?.name ?? "" } 
                />
            </div>
        </div>
    )
}
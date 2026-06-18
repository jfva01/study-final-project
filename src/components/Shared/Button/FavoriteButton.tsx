import { useMemo } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { useFavoriteStore } from "../../../store/useFavoriteStore"
import { useShallow } from "zustand/shallow"

interface FavoriteButtonProps {
    pokemonId: number
}

export const FavoriteButton = ({ pokemonId }: FavoriteButtonProps) => {
    const [favorites, addFavorite, deleteFavorite] = useFavoriteStore(useShallow((state)=>
        [state.favorites, state.addFavorite, state.deleteFavorite]))

    const isFavorite = useMemo(() =>
        favorites.includes(pokemonId.toString()), [favorites, pokemonId])

    const onClick = () => {
        const idToModify = pokemonId.toString();
        isFavorite ? deleteFavorite(idToModify) : addFavorite(idToModify);
    }

    return(
        <button className="cursor-pointer bg-white p-1 rounded-full absolute top-2 left-2" onClick={onClick}>
            { isFavorite ? <FaHeart fill="#ef4444" /> : <FaRegHeart  fill="#ef4444"/> }
        </button>
    )
};

// Zustand v5 exporta useShallow hace una comparación superficial del contenido en vez 
// de comparar la referencia del array. Si el selector de Zustand devuelve un array u 
// objeto literal {} o [], siempre se usa useShallow. Si devuelve un valor primitivo 
// (string, number, boolean) o una sola referencia, no es necesario.
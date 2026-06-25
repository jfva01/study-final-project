import { create } from "zustand"

// Zustand store

interface FavoriteStore{
    favorites: string[];
    addFavorite: (id: string) => void;
    deleteFavorite: (id:string) => void;
}

const storedFavorites = localStorage.getItem("favorite-pokemons");
const favorites: string[] = storedFavorites ? storedFavorites.split(",").filter(Boolean) : [];

export const useFavoriteStore = create<FavoriteStore>((set) =>({
    favorites,
    addFavorite: (id: string) => { 
        set((state) => {
            const favorites = [...state.favorites, id];
            localStorage.setItem("favorite-pokemons", favorites.join(","));
            return { favorites };
        });
    },
    deleteFavorite: (id:string) => {
        set((state) => {
            const favorites = state.favorites.filter((favorite) => favorite !== id);
            localStorage.setItem("favorite-pokemons", favorites.join(","));
            return { favorites };
        });
    }
}))
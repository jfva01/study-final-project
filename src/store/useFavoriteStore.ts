import { create } from "zustand"

// Zustand store

interface FavoriteStore{
    favorites: string[];
    addFavorite: (id: string) => void;
    deleteFavorite: (id:string) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) =>({
    favorites: localStorage.getItem("favorite-pokemons")?.split(",") || [],
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
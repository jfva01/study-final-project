import { create } from "zustand"

interface SearchStore{
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useSearchStore = create<SearchStore>(
    (set) =>({
        isOpen: false,
        
        openModal: () => set({ isOpen: true }),
        closeModal: () => set({ isOpen: false })
    })
);
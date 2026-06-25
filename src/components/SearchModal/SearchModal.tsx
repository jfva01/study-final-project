import { useState } from "react";
import { useGetPokemon } from "../../hooks/useGetPokemon";
import Modal from "react-modal";
import { PokemonCard } from "../PokemonCard/PokemonCard"
import { useSearchStore } from "../../store/useSearchStore";
import { useShallow } from "zustand/shallow";

export const SearchModal = () =>{
    const [isOpen, closeModal] = useSearchStore(useShallow((state) => [
        state.isOpen,
        state.closeModal
    ]));
    const [filter, setFilter] = useState("");
    const [currentSearch, setCurrentSearch] = useState("");
    const { pokemonData } = useGetPokemon(currentSearch);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setFilter(event.target.value);

    const onClickSearch = () => 
        setCurrentSearch(filter.toLowerCase());

    const handleCloseModal = () =>{
        setFilter("");
        setCurrentSearch("");
        closeModal();
    }

    return(
        <Modal isOpen={isOpen} onRequestClose={handleCloseModal}
            className="w-6/12 h-auto bg-white mx-auto p-5 mt-5 flex flex-col gap-5 items-center shadow-lg rounded-lg">
            <h6>Search by Pokémon name</h6>
            <input 
                type="text"
                value={filter}
                onChange={handleInputChange}
                className="border border-slate-600 p-2 rounded-md w-100"
            />
            <button 
                onClick={onClickSearch} 
                className="bg-amber-400 text-slate-600 font-bold w-50 h-10 rounded-md cursor-pointer shadow-md hover:text-white hover:bg-amber-500 transition duration-200 ">Search</button>
            {pokemonData?.id && <PokemonCard pokemonId={pokemonData.id} />}
        </Modal>
    );
}
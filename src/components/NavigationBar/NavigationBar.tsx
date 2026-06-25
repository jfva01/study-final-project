import { Link } from "react-router"
import pokeball from "../../assets/pokeball.png"
import { SearchButton } from "../Shared/Button/SearchButton"

export const NavigationBar = () =>{
    return(
        <nav className="mx-auto bg-yellow-400 flex justify-between h-12 items-center shadow-md">
            <div className="mx-auto flex justify-between items-center w-9/12">
                <Link to="/">
                    <img 
                        className="w-10 h-10"
                        src={ pokeball }
                        alt="Poke Logo"
                    />
                </Link>
                <div className="flex gap-5 items-center">
                    <Link className="font-bold hover:text-black text-slate-600 transition duration-200" to="/">Pokedex</Link>
                    <Link className="font-bold hover:text-black text-slate-600 transition duration-200" to="/favorite">Favorite</Link>
                    <SearchButton />
                </div>
            </div>
        </nav>
    )
}
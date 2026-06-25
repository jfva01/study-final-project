import { Link } from "react-router"
import pokeball from "../../assets/pokeball.png"

const NavigationBar = () =>{

    return(
        <nav className="mx-auto bg-yellow-400 flex justify-between h-12 items-center shadow-lg">
            <div className="mx-auto flex justify-between items-center w-9/12">
                <Link to="/">
                    <img 
                        className="w-10 h-10"
                        src={ pokeball }
                        alt="Poke Logo"
                    />
                </Link>
                <div className="flex gap-5 items-center">
                    <Link className="text-black hover:text-slate-600 transition duration-200" to="/">Pokedex</Link>
                    <Link className="text-black hover:text-slate-600 transition duration-200" to="/favorite">Favorite</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavigationBar
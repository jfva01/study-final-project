import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

const Pokedex = lazy(() => import("../views/Pokedex"));
const PokemonProfile = lazy(() => import("../views/PokemonProfile"));
const PokemonByType = lazy(() => import("../views/PokemonType"))

const AppRoutes = () => {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route 
                    path="/" 
                    element = {<Pokedex />} />
                <Route 
                    path="/pokemon/:pokemonName" 
                    element = {<PokemonProfile />} />
                <Route 
                    path="/type/:typeName" 
                    element = {<PokemonByType />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes;
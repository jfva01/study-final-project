import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

const Pokedex = lazy(() => import("../views/Pokedex"));

const AppRoutes = () => {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route 
                    path="/" 
                    element = {<Pokedex />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes;
import { screen } from "@testing-library/react"
import { NavigationBar } from "../NavigationBar/NavigationBar"
import { renderWithProviders } from "../../testUtils/renderWithProviders"
import { describe, it, expect} from "vitest"

describe("NavigationBar", () => {
    it("should render without error", () => {
        renderWithProviders(<NavigationBar />);
    });

    it("should render the logo", () => {
        renderWithProviders(<NavigationBar />);
        expect(screen.getByAltText("Poke Logo")).toBeInTheDocument();
    });

    it("should render the navigation links", () =>{
        renderWithProviders(<NavigationBar />);
        expect(screen.getByText("Pokedex")).toBeInTheDocument();
        expect(screen.getByText("Favorite")).toBeInTheDocument();
    });

    it("should render the search button", () =>{
        renderWithProviders(<NavigationBar />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    })
})

/*
¿Qué se quiere testear?

El componente NavigationBar es la barra de navegación principal de la app. 
Los tests verifican que sus tres elementos esenciales se renderizan correctamente:
el logo (imagen), y los dos links de navegación (Pokedex y Favorite).

1. renderWithProviders en lugar de render directo
   NavigationBar usa Link de React Router y SearchButton que accede a un store 
   de Zustand. Sin los providers correspondientes (BrowserRouter, QueryClientProvider),
   el componente crashea al intentar renderizarse. renderWithProviders encapsula 
   toda esa configuración para que los tests no tengan que repetirla.

   Además, renderWithProviders crea un QueryClient nuevo por cada render con 
   retry: false — esto evita contaminación de cache entre tests y que los reintentos 
   automáticos de TanStack Query alarguen innecesariamente la ejecución de los tests.

2. screen en lugar de destructuring
   El patrón antiguo de Testing Library era:
       const { getByAltText } = renderWithProviders(<NavigationBar />);
   La forma moderna usa screen, que da acceso a los mismos queries sin necesidad 
   de destructurar el resultado del render:
       screen.getByAltText("Poke Logo")
   Esto hace los tests más legibles y consistentes, especialmente cuando se 
   necesitan múltiples queries en el mismo test.

3. toBeInTheDocument como matcher
   Este matcher viene de @testing-library/jest-dom, no de Vitest. A pesar del nombre,
   es compatible con Vitest y es necesario para verificar presencia de elementos en 
   el DOM — Vitest por sí solo no incluye matchers específicos del DOM.

Lecciones
   El render es siempre el primer paso — sin llamar a renderWithProviders() antes 
   del expect, screen no tiene ningún DOM que consultar y el test falla con 
   "Unable to find element". screen.debug() es la herramienta indicada para 
   diagnosticar estos casos, ya que imprime el HTML completo que está disponible 
   en ese momento.
*/
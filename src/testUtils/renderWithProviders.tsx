import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { render } from "@testing-library/react"
import { ReactNode } from "react";

export const renderWithProviders = (children: ReactNode) =>{
    const queryClient = new QueryClient({
        defaultOptions:{
            queries: { retry: false }
        }
    });

    return render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </QueryClientProvider>
    );
}

/*
¿Qué es renderWithProviders y por qué existe?

Testing Library renderiza componentes de forma aislada, fuera del árbol real de la app.
Esto significa que los providers que normalmente envuelven toda la aplicación 
(BrowserRouter, QueryClientProvider) no están disponibles durante los tests.

Si un componente usa useNavigate, Link, useQuery, o cualquier hook que dependa 
de esos providers, crasheará al intentar renderizarse en un test sin ellos.

renderWithProviders es una utilidad compartida que encapsula esa configuración,
permitiendo que cualquier test la reutilice con una sola línea en lugar de 
repetir el mismo boilerplate de providers en cada archivo de test.

Decisiones tomadas:

1. QueryClient creado dentro de la función, no fuera
   Crear el QueryClient fuera de la función (a nivel de módulo) lo haría compartido 
   entre todos los tests. Si un test hace una query y cachea el resultado, el siguiente 
   test recibiría ese cache en lugar de un estado limpio, causando tests que pasan 
   o fallan dependiendo del orden de ejecución — uno de los peores tipos de bugs 
   en testing. Crearlo dentro garantiza un estado fresco por cada render.

2. retry: false en defaultOptions
   Por defecto, TanStack Query reintenta las queries fallidas 3 veces antes de 
   marcarlas como error. En un entorno de tests donde no hay servidor real, esto 
   haría que cada query fallida esperara 3 reintentos antes de continuar, alargando 
   significativamente la duración de la suite. Con retry: false, las queries 
   fallidas fallan inmediatamente.

3. BrowserRouter incluido
   Cualquier componente que use Link, useNavigate, o useParams requiere estar 
   dentro de un Router. Incluirlo en renderWithProviders evita tener que recordar 
   agregarlo en cada test individualmente.

Uso:
   // En lugar de esto en cada test:
   render(
       <QueryClientProvider client={queryClient}>
           <BrowserRouter>
               <MiComponente />
           </BrowserRouter>
       </QueryClientProvider>
   );

   // Se usa esto:
   renderWithProviders(<MiComponente />);
*/
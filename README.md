# Pokedex App — Resumen Técnico

Aplicación web tipo Pokedex construida con **React 19 + TypeScript**, que consume la [PokéAPI](https://pokeapi.co/) para mostrar un listado paginado de Pokémon con su información y sprites.

## Stack tecnológico

| Categoría | Tecnología | Versión |
|---|---|---|
| Librería UI | React | 19 |
| Lenguaje | TypeScript | 6 |
| Build tool | Vite | 8 |
| Data fetching / cache | TanStack Query | 5 |
| Enrutamiento | React Router | 7 |
| Estilos | Tailwind CSS | 4 (vía `@tailwindcss/vite`) |
| Estado global | Zustand | 5 |

---

## Arquitectura general

```
src/
├── components/
│   ├── PokemonCard/
│   ├── PokemonList/
│   └── Shared/
│       ├── Grid/
│       └── Label/
├── hooks/
│   ├── useGetPokemon.ts
│   └── useGetPokemonList.ts
├── interfaces/
│   ├── PokemonListItem.ts
│   └── PokemonData.ts
├── views/
│   └── Pokedex.tsx
├── routes/
│   └── index.tsx
├── constants/
│   └── urls.ts
├── providers.tsx
├── App.tsx
└── index.tsx
```

La estructura separa responsabilidades en capas claras: **vistas** (páginas), **componentes** (UI reutilizable), **hooks** (lógica de datos), **interfaces** (contratos de tipos) y **providers/routes** (configuración transversal de la app).

---

## Funcionalidades implementadas

### 1. Listado paginado de Pokémon

**Qué hace:** Consume el endpoint `pokemon` de la PokéAPI y muestra 36 resultados por página, con navegación "Anterior" / "Siguiente".

**Cómo se implementó:** Un hook personalizado (`useGetPokemonList`) combina `useState` para guardar la URL activa con `useQuery` de TanStack Query para hacer el fetch. La PokéAPI devuelve URLs `next`/`previous` listas para usar, por lo que la paginación es *cursor-based* en vez de basarse en números de página manuales.

**Por qué:** Delegar el fetching y el cacheo a TanStack Query evita reimplementar manualmente estados de carga, error y revalidación. Al usar las URLs que la propia API entrega, se evita lógica adicional de cálculo de offsets.

### 2. Detalle individual de cada Pokémon

**Qué hace:** Cada tarjeta (`PokemonCard`) hace un fetch independiente para obtener sprite, tipos, altura y peso de un Pokémon específico.

**Cómo se implementó:** Un segundo hook (`useGetPokemon`) recibe nombre o ID y usa `useQuery` con la opción `enabled`, para que la petición solo se dispare cuando exista un identificador válido.

**Por qué:** Separar el listado (datos livianos) del detalle (datos completos) reduce el peso de la respuesta inicial y aprovecha el cacheo independiente de TanStack Query por `queryKey`, evitando refetch innecesario si el mismo Pokémon vuelve a renderizarse.

### 3. Code splitting con `React.lazy` + `Suspense`

**Qué hace:** Las vistas (rutas) se cargan de forma diferida en lugar de incluirse en el bundle principal.

**Cómo se implementó:**
```tsx
const Pokedex = lazy(() => import("../views/Pokedex"));

<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/" element={<Pokedex />} />
  </Routes>
</Suspense>
```

**Por qué:** Aunque hoy existe una sola ruta, el proyecto está diseñado para crecer (vista de detalle, búsqueda, etc.). Colocar `Suspense` a nivel de `AppRoutes` (y no repetido en cada `Route`) permite que toda nueva ruta `lazy` quede cubierta automáticamente, manteniendo el bundle inicial liviano a medida que la app escala.

### 4. Gestión de datos remotos con TanStack Query

**Qué hace:** Maneja cacheo, estados de carga/error, y revalidación de las peticiones a la PokéAPI.

**Por qué:** En vez de usar `useEffect` + `fetch` manual (patrón antiguo y propenso a errores como condiciones de carrera o falta de cleanup), TanStack Query centraliza el ciclo de vida de los datos remotos: cachea por `queryKey`, evita peticiones duplicadas, y expone `isLoading`/`error` de forma declarativa.

### 5. Componentes reutilizables con patrón de composición

**Qué hace:** `Grid` y `Label` son componentes de presentación genéricos, sin lógica de negocio, que envuelven contenido (`children`).

**Cómo se implementó:** Ambos reciben `children: ReactNode` vía props tipadas, sin usar `React.FC`:
```tsx
const Grid = ({ children, goToPreviousPage, goToNextPage }: GridProps) => (...)
```

**Por qué:**
- El **patrón de composición** (envolver `children` en vez de hardcodear contenido) permite reutilizar `Grid` para cualquier listado futuro, no solo Pokémon.
- Evitar `React.FC` sigue la convención actual de la comunidad: tipar las props directamente es más explícito y evita que TypeScript agregue `children` implícitamente a interfaces que no lo declaran.

### 6. Tipado fuerte y compartido con TypeScript

**Qué hace:** Las formas de los datos (`PokemonListItem`, `PokemonData`, tipos/sprites) están definidas como interfaces en `interfaces/`, reutilizadas tanto en los hooks como en los componentes.

**Por qué:** Centralizar los tipos evita duplicar definiciones (un error común detectado durante el desarrollo) y garantiza que un cambio en la forma de los datos de la API se refleje automáticamente en todos los lugares que los consumen, con errores de compilación si algo no coincide.

### 7. Estilizado con Tailwind CSS v4

**Qué hace:** Define la apariencia visual (grid responsivo, cards, botones) usando clases utilitarias.

**Cómo se implementó:** Integración vía el plugin oficial `@tailwindcss/vite`, sin necesidad de `postcss.config.js` ni `tailwind.config.js` adicionales (cambio respecto a versiones anteriores de Tailwind).

**Por qué:** Tailwind permite iterar rápido sobre el diseño sin escribir CSS separado por componente, y la integración nativa con Vite en la v4 simplifica la configuración del proyecto.

### 8. Providers centralizados

**Qué hace:** Un único componente `Providers` envuelve la app con `QueryClientProvider` y `BrowserRouter`.

**Por qué:** Separar la configuración de providers de `App.tsx` mantiene este último enfocado solo en el layout, y facilita agregar nuevos providers (por ejemplo, un store de Zustand a nivel global) sin tocar la lógica de la app.

---

## Buenas prácticas aplicadas

- **Custom hooks** para abstraer el acceso a datos (`useGetPokemon`, `useGetPokemonList`), siguiendo el principio de separación entre lógica y presentación.
- **Tipado explícito de props** en cada componente, sin `React.FC`.
- **`key` único** en listas renderizadas con `.map()`.
- **Manejo defensivo de URLs** mediante template literals y validación de identificadores antes de hacer fetch (`enabled` en TanStack Query).
- **Componentes de presentación puros** (`Grid`, `Label`) desacoplados de la lógica de datos.

---

## Roadmap / próximas funcionalidades

- Manejo visual de estados `isLoading` y `error` en `PokemonList`
- Búsqueda de Pokémon por nombre
- Vista de detalle individual (nueva ruta)
- Modal de detalle con `react-modal`
- Estado global con Zustand (favoritos, filtros, etc.)
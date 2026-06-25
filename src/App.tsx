import Providers from "./providers";
import AppRoutes from "./routes";
import { NavigationBar } from "./components/NavigationBar/NavigationBar"
import { SearchModal } from "./components/SearchModal/SearchModal";

function App() {
  return (
    <Providers>
      <NavigationBar />
      <div className="mt-5 w-9/12 mx-auto">
        <AppRoutes />
      </div>
      <SearchModal />
    </Providers>
  );
}

export default App;

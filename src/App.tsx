import Providers from "./providers";
import AppRoutes from "./routes";
import Navbar from "./components/NavigationBar/NavigationBar"

function App() {
  return (
    <Providers>
      <Navbar />
      <div className="mt-5 w-9/12 mx-auto">
        <AppRoutes />
      </div>
    </Providers>
  );
}

export default App;

import Providers from './providers';
import AppRoutes from './routes';

function App() {
  return (
    <Providers>
      <div className="mt-5 w-9/12 mx-auto">
        <AppRoutes />
      </div>
    </Providers>
  );
}

export default App;

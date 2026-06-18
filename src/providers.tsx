import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";

interface ProviderProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({ children }: ProviderProps) => (
    <QueryClientProvider client = { queryClient }>
        <BrowserRouter>{ children }</BrowserRouter>
    </QueryClientProvider>
);

export default Providers;
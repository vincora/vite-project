import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const customQueryWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

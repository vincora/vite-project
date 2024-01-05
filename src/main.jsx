import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Layout.jsx';
import ErrorPage from './ErrorPage.jsx';
import Converter from './components/Converter';
import ExchangeRates from './components/ExchangeRates';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <ExchangeRates /> },
            {
                path: '/list',
                element: <ExchangeRates />,
            },
            {
                path: '/converter',
                element: <Converter />,
            },
        ],
    },
]);

const queryClient = new QueryClient();

async function enableMocking() {
    if (import.meta.env.PROD) {
        return;
    }

    const { worker } = await import('./mocks/browser');

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start();
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </React.StrictMode>,
    );
});

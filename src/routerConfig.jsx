import App from '@/App';
import ErrorPage from '@/ErrorPage';
import Converter from '@/components/converter';
import ExchangeRates from '@/components/rates-list';

export const routerConfig = [
    {
        path: '/',
        element: <App />,
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
];

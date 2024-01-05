import App from "@/App";
import ErrorPage from "@/ErrorPage";
import Converter from "@/components/Converter";
import ExchangeRates from "@/components/ExchangeRates";


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

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { quertClient } from './api/useQuery.ts';
import store from './store/store.ts';
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <QueryClientProvider client={quertClient}>
            <StrictMode>
                <App />
            </StrictMode>
        </QueryClientProvider>
        ,
    </Provider>,
);

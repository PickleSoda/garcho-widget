import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App'
import { UserProvider } from './features/auth/context/UserContext';
import './styles.css';


const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('Garcho') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <UserProvider>
        <App domElement={document.getElementById('Garcho')} />
      </UserProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App'
import { UserProvider } from './features/auth/context/UserContext';
import { ChatSessionProvider } from './features/chat/context/ChatSessionContext';
import './styles.css';


const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('Garcho') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <UserProvider>
        <ChatSessionProvider>
          <App domElement={document.getElementById('Garcho')} />
        </ChatSessionProvider>
      </UserProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
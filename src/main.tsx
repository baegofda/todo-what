import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App.tsx';
import '@/app/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Toaster />
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </StrictMode>,
);

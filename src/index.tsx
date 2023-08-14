import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FakeDataProvider } from 'context/FakeDataContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FakeDataProvider>
      <App />
    </FakeDataProvider>
  </React.StrictMode>
);
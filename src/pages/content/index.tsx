import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './app/App';


const root = document.body.appendChild(document.createElement("div"));
createRoot(root).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './app/App';


const container = document.createElement('div');
container.id = 'mache-tools'
container.style.position = 'absolute';
container.style.top = '0';
container.style.left = '0';
container.style.width = '100%';
const root = document.body.appendChild(container);
createRoot(root).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

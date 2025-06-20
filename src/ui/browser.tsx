import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './scss/bootstrap-minimal.scss';
import './scss/figma-styles.scss';
import './scss/column-layout.scss';
import './scss/components.scss';

// Render the React app
const root = createRoot(document.getElementById('root')!);
root.render(<App />);

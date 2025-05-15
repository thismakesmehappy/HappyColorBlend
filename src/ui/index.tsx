import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/figma-styles.scss';
import './scss/layout-helpers.scss';
import './scss/debug-colors.scss';
import './scss/column-layout.scss';

// Render the React app
const root = createRoot(document.getElementById('root')!);
root.render(<App />);

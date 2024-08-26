import * as React from "react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from "react-redux";
import { store } from "./lib/redux/store/index.jsx";
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Create the root element for React
const root = createRoot(document.getElementById('root'));

// Render the React application
root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
); 


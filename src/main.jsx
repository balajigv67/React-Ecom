import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { CartProvider } from './state/context';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CartProvider>
    <App />
  </CartProvider>
  // </React.StrictMode >,
)

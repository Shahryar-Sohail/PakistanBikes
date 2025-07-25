import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
// import 'flowbite/dist/flowbite.min.js'
import 'flowbite';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

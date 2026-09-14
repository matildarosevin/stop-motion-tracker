import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
) //find the div with with id 'root' and put the <App /> component inside it. 
// <App /> is a react component, - a reusable piece of UI, like a building block  (a JS functions that returns HTML)

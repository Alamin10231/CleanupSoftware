import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router/Router';
import { BrowserRouter } from 'react-router';
createRoot(document.getElementById('root')!).render(
 
  <BrowserRouter>
    <Router />
  </BrowserRouter>
)

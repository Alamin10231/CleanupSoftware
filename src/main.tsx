import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router/Router';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <Provider store={store}>
      <Router />
   </Provider>
  </BrowserRouter>
)

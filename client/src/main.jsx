import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <StrictMode>
        <App />
        <Toaster richColors position="top-right" />
      </StrictMode>
    </Provider>
  </BrowserRouter>
)

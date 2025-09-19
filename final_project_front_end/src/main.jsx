import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login_Form from './components/Login_Form.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login_Form/>
  </StrictMode>,
)

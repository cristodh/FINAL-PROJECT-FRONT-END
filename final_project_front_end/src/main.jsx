import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Global.css'
import Login_Form from './components/LoginForm.jsx'
import Routing from './routes/Routing.jsx'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing/>
  </StrictMode>,
)

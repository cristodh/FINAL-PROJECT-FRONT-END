import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Global.css'
import Routing from './routes/Routing.jsx'
import "toastify-js/src/toastify.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing/>
  </StrictMode>,
)

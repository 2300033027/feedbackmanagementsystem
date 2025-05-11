import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import App from './App'
import Dashboard from './Dashboard'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path='/'  element={<App></App>}></Route>
        <Route path='/Dashboard'element={<Dashboard/>}></Route>
    </Routes>
  </BrowserRouter>
)

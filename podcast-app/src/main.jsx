import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
 import App from './App.jsx'
// import PodcastPage from './components/Browse.jsx'
// import TopCharts from './components/TopCharts.jsx'
//import HomePage from './components/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './context/dataContext.jsx'
import ReactAudioPlayer from './ReactAudioPlayer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
       <DataProvider>
              <App />
             <ReactAudioPlayer/>
        </DataProvider>  
    </BrowserRouter>
  </StrictMode>,
)

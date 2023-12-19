import {BrowserRouter } from 'react-router-dom';

import { BackgroundProvider } from './contexts/BackgroundContext'
import Routes from './routes'
import './App.css'
function App() {


  return (
    <BackgroundProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </BackgroundProvider>
  )
}

export default App

import {BrowserRouter } from 'react-router-dom';

import { BackgroundProvider } from './contexts/BackgroundContext'
import './App.css'
import { WrapperRoutes } from './MainRoutes';
function App() {


  return (
    <BackgroundProvider>
      <BrowserRouter>
        <WrapperRoutes/>
      </BrowserRouter>
    </BackgroundProvider>
  )
}

export default App

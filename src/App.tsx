import {BrowserRouter, Route } from 'react-router-dom';
import './App.css'

import { AppContextProvider } from './contexts/AppContextProvider';
import { RouteWithNotFound } from './routes/RoutesWithNotFound';
import { AuthGuard } from './routes/AuthGuard';
import { PrivateRoutes } from './routes/PrivateRoutes';

import { Auth } from './components/auth';
function App() {


  return (
    <AppContextProvider>
      <BrowserRouter>
        <RouteWithNotFound>
          <Route path='/login' element={<Auth />} />
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path='/*' element={<PrivateRoutes />}></Route>
          </Route>
        </RouteWithNotFound>
      </BrowserRouter>
   
      </AppContextProvider>
  )
}

export default App

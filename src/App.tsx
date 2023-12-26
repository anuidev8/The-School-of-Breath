import {BrowserRouter, Route } from 'react-router-dom';
import './App.css'

import { AppContextProvider } from './contexts/AppContextProvider';
import { RouteWithNotFound } from './routes/RoutesWithNotFound';
import { AuthGuard } from './routes/AuthGuard';
import { PrivateRoutes } from './routes/PrivateRoutes';
import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import { Auth } from './components/auth';

const queryClient = new QueryClient()
function App() {


  return (
    <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
  )
}

export default App

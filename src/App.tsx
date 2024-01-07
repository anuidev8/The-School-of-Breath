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
import { ResetPassword } from './components/pages/ResetPassword';
import { ChangePassword } from './components/pages/ChangePassword';


const queryClient = new QueryClient()
function App() {


  return (
    <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <BrowserRouter>
        <RouteWithNotFound>
          <Route index path='/login' element={<Auth />} />
    {/*       <Route path='/' element={<Home />} /> */}
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/change-password/:token' element={<ChangePassword/>} />
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

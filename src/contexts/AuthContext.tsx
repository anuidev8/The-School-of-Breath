import React, { createContext, useState, useContext, useEffect, FC } from 'react';
import { getPersistData } from '../utils/localstore';


export interface User{
  _id: string
  email: string
  fullName: string
  suscription: boolean
  isStartSubscription: boolean
  createdAt: string
  updatedAt: string
  __v: number
  promotionDays: number
  id: string
}
interface AuthContextType {
  isAuthenticated: boolean;
  user:User | null
  setUser: (user:User | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}


export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setUser: () => {},
  user:null
});

interface AuthProviderProps {
  children: React.JSX.Element;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user , setUser] = useState<User | null>(null)
  //const navigate = useNavigate();

  useEffect(() => {
    // Fetch the authentication state from your API
    
      // Replace with your API call
      //const response = await fetch('/api/check-auth');
    
     
      const auth = getPersistData('isAuth')
      const authorization = getPersistData('authorization')
    
      
      if (auth && authorization) {
        setIsAuthenticated(true);
       // navigate('/menu');
      } else {
        //navigate('/login');
        setIsAuthenticated(false);
      }
    

  
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated ,user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

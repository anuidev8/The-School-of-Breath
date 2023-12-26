import React, { createContext, useState, useContext, useEffect, FC } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}


export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

interface AuthProviderProps {
  children: React.JSX.Element;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  //const navigate = useNavigate();

  useEffect(() => {
    // Fetch the authentication state from your API
    
      // Replace with your API call
      //const response = await fetch('/api/check-auth');
    
     
      const auth = localStorage.getItem('isAuth')
      const authorization = localStorage.getItem('authorization')
    
      
      if (auth && authorization) {
        setIsAuthenticated(true);
       // navigate('/menu');
      } else {
        //navigate('/login');
        setIsAuthenticated(false);
      }
    

  
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

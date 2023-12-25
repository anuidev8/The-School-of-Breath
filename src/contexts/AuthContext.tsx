import React, { createContext, useState, useContext, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';


interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}


const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the authentication state from your API
    const checkAuthStatus = async () => {
      // Replace with your API call
      //const response = await fetch('/api/check-auth');
      const response = {
        ok:false
      }
     
      
      if (response.ok) {
        setIsAuthenticated(true);
        navigate('/menu');
      } else {
        navigate('/login');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

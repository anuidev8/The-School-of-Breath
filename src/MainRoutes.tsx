import {  Routes, Route } from "react-router-dom";
import MenuPage from "./components/MenuPage";
import { Auth } from "./components/auth"; // Assuming this is the login component
import { AuthContext } from "./contexts/AuthContext";
import MainPage from "./components/MainPage";
import { WelcomePage } from "./components/WelcomePage";
import { useContext } from "react";

export const WrapperRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  
  return (
  
      
        <Routes>
          {isAuthenticated ? (
            // Protected routes
            <>
              <Route path="/" element={<MenuPage />} />
              <Route path="/main" element={<MainPage />} />
           
              <Route path="/welcome" element={<WelcomePage />} />
            </>
          ) : (
            // Public routes
            <>

            <Route path="/" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />
            </>
          )}
          {/* Redirect to /menu or /login based on authentication status */}
          <Route path="/login" element={<Auth />} />
         
        </Routes>
      
 
  );
};



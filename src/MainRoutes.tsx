import {  Routes, Route } from "react-router-dom";
import MenuPage from "./components/MenuPage";
import { Auth } from "./components/auth"; // Assuming this is the login component
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainPage from "./components/MainPage";
import FavoritePage from "./components/FavoritePage";
import { WelcomePage } from "./components/WelcomePage";

export const WrapperRoutes = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  
  return (
  
      <AuthProvider>
        <Routes>
          {isAuthenticated ? (
            // Protected routes
            <>
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/welcome" element={<WelcomePage />} />
            </>
          ) : (
            // Public routes
            <>
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />
            </>
          )}
          {/* Redirect to /menu or /login based on authentication status */}
         
        </Routes>
      </AuthProvider>
 
  );
};



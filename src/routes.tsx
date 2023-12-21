
import { Routes ,Route} from 'react-router-dom';
import MenuPage from './components/MenuPage';
import MainPage from './components/MainPage';
import FavoritePage from './components/FavoritePage';
import { Auth } from './components/auth';
import { WelcomePage } from './components/WelcomePage';

const MainRoutes = () => {
  
  return (
    <Routes>
      
        <Route  path="/menu" element={<MenuPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/" element={<Auth />} />
        <Route path="/welcome" element={<WelcomePage/>} />
        {/* Add other routes as needed */}
        
    </Routes>
  );
};

export default MainRoutes;
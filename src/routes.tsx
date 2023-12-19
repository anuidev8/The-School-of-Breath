
import { Routes ,Route} from 'react-router-dom';
import MenuPage from './components/MenuPage';
import MainPage from './components/MainPage';

const MainRoutes = () => {
  return (
    <Routes>
      
        <Route  path="/" element={<MenuPage />} />
        <Route path="/main" element={<MainPage />} />
        {/* Add other routes as needed */}
        
    </Routes>
  );
};

export default MainRoutes;
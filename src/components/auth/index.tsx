

import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';


export const Auth = () => {
    const navigate = useNavigate()
  const handleLogin = () => {
    // Implement logic to handle user login
    navigate('/welcome')
  };

/*   const handleRegister = (email, password) => {
    // Implement logic to handle user registration
  }; */

  return (
    <div>
     
      <LoginPage onLogin={handleLogin} />
    {/*   <RegisterPage onRegister={handleRegister} /> */}
    </div>
  );
};



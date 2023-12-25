

import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { useState } from 'react';


export const Auth = () => {
    const navigate = useNavigate()
    const [typeLogin,setTypeLogin] = useState('register')
  const handleLogin = () => {
    // Implement logic to handle user login
    navigate('/welcome')
  };

  

  const changeType = (type:string) =>{
    setTypeLogin(type)
  }

  
  

  return (
    <div className='login-page'>
      {
        typeLogin === 'login' ?
        <LoginPage onLogin={handleLogin} />
        : <RegisterPage  /> 

      }
     
     {
      typeLogin === 'login' &&
       <button className='register-btn' onClick={()=>changeType('register')} >Register</button>
     }
     {
      typeLogin === 'register' &&
       <button className='register-btn' onClick={()=>changeType('login')} >Login</button>
     }
    </div>
  );
};



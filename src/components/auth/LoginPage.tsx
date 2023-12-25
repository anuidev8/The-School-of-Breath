import React, { useState } from 'react';
import '../../styles/AuthPage.css'

// Define an interface for the props
interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <main >
        <figure>
            <img width="210" height="210" src='/logo.png' />
        </figure>
         <h1 className='title-login'>Welcome to Our App</h1>
    <form className='form' onSubmit={handleSubmit} style={{  marginTop: '20px' }}>
      <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       
      />
      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       
      />
      <div>

      <button  className='login-btn' type="submit" >Login</button>
     
      </div>
    </form>
    </main>
  );
  
};

export default LoginPage;

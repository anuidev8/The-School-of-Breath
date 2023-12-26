import React, { useState } from 'react';
import '../../styles/AuthPage.css'

// Define an interface for the props
interface LoginProps {
  onLogin: (email: string, password: string) => void;
  isLoading:boolean
}

const LoginPage: React.FC<LoginProps> = ({ onLogin,isLoading }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <main style={{ width:'100%' }} >
        <figure>
            <img width="210" height="210" src='https://res.cloudinary.com/dnmjmjdsj/image/upload/v1702506419/audios/logo_vsw2tl.png' />
        </figure>
         <h1 className='title-login'>Welcome</h1>
    <form className='form' onSubmit={handleSubmit} style={{  marginTop: '20px' }}>
    <div className="form-input">
      <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       
      />
      </div>
      <div className="form-input">
      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       
      />
      </div>
      <div>

      <button  className='login-btn' type="submit" >{!isLoading ? 'Login' : 'Entering..'}</button>
     
      </div>
    </form>
    </main>
  );
  
};

export default LoginPage;

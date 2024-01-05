import React, { useState } from 'react';
import {Input,Button} from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons';

// Define an interface for the props
interface LoginProps {
  onLogin: (email: string, password: string) => void;
  isLoading:boolean
}

const LoginPage: React.FC<LoginProps> = ({ onLogin,isLoading }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <main className=''  >
        <figure className='flex justify-center align-center  '>
            <img width="210" height="210" src='https://res.cloudinary.com/dnmjmjdsj/image/upload/v1702506419/audios/logo_vsw2tl.png' />
        </figure>
         <h1 className='title-login'>Welcome</h1>
    <form className='flex justify-center items-center flex-col ' onSubmit={handleSubmit} style={{  marginTop: '20px' }}>
    
    <Input
      isRequired
      type="email"
      label="Email"
      defaultValue="junior@nextui.org"
      className="max-w-sm mb-4"
      value={email}
        onValueChange={setEmail}
    />
      
      <Input
      label="Password"
      value={password}
      onValueChange={setPassword}
      placeholder="Enter your password"
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className='max-w-sm'
    />
   

      <Button type='submit'  className='w-full bg-main  max-w-sm mt-8' isLoading={isLoading}>
     Login
    </Button>
     
     
    </form>
    </main>
  );
  
};

export default LoginPage;

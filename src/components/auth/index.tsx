

import { Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import {Button} from "@nextui-org/react";
interface ResponseType {
  info:string
}
export const Auth = () => {
    const navigate = useNavigate()
    const [typeLogin,setTypeLogin] = useState('login')
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext)

  if(isAuthenticated){
    return <Navigate replace to={"/menu"} />
  }

  const handleLogin = async(email: string, password: string) => {
    try {
      setIsLoading(true)
      if(email && password) { 
        
          const saveUserData = {
            "email":email,
            "password":password,
          
          }
          const saveUserInDb = await axios.post('https://api-music-two.vercel.app/auth/login',saveUserData)
          const getUserFromSystemIo = await axios.get(`https://api-music-two.vercel.app/contact?email=${email}`)
        if(saveUserInDb.data.success){
          
          if(getUserFromSystemIo.data.success && getUserFromSystemIo.data.data.items.length > 0){
            const userToValidate = getUserFromSystemIo.data.data.items[0] ?? []
            localStorage.setItem('userFromSystemeIo',JSON.stringify(userToValidate ))

          }

          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER
          });
          localStorage.setItem('isAuth','true')
          localStorage.setItem('authorization',`${saveUserInDb.data.token}`)
          localStorage.setItem('user',JSON.stringify(saveUserInDb.data.user))
          setIsAuthenticated(true)
          setIsLoading(false)
          navigate('/menu')
        }
          
       
        
    
      }
    } catch (error) {
      const t = error as AxiosError
      const d:ResponseType = t.response?.data as ResponseType
      setIsLoading(false)
      setIsAuthenticated(false)
      toast.error(d?.info ?? 'something is wrong',{
        position: toast.POSITION.TOP_CENTER
      })
    }
    
  };

  

  const changeType = (type:string) =>{
    setTypeLogin(type)
  }

  
  

  return (
    <div className='flex justify-center -center flex-col h-screen' >
      {
        typeLogin === 'login' ?
        <LoginPage onLogin={handleLogin} isLoading={isLoading} />
        : <RegisterPage  /> 

      }
     
     {
      typeLogin === 'login' &&
      <div className='flex justify-center items-center' >

        <Button  className='w-full bg-secondary  max-w-sm mt-4' onClick={()=>changeType('register')} isLoading={isLoading}>Register</Button>
      </div>
     }
     {
      typeLogin === 'register' &&
      <div className=''>
       <button className='' onClick={()=>changeType('login')} >Login</button>
       </div>
     }
      <ToastContainer />
    </div>
  );
};



import React, { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
// Define an interface for the props


export const RegisterPage: React.FC= () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [isLoading,setIsloading] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsloading(true)
      if(email && password) {
        /*  const data = 
          {
            "email": email,
            "locale": "en",
            "fields": [
              {
                "fieldName": "First name",
                "slug": "first_name",
                "value": firstName
            },
              ],
            "tags": [
                  {
                      "id": 691956,
                      "name": "Free Gift - Ebook"
                  }
              ]
          } */
        
        const res = await axios.get('https://api.systeme.io/api/contacts',{
          headers:{
     
              "x-api-key":'qmryzuqh25l5glxyrncs6yktyqjpyk3l90bn8004letbxxm7nuygb05gsqivr1la',
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
           
          
          }
        }) 
        console.log(res);
       
        if(res){
          const saveUserData = {
            "email":email,
            "password":password,
            "fullName":firstName
          }
          const saveUserInDb = await axios.post('https://angel.sorfin.com.co/auth/register',saveUserData)
        if(saveUserInDb.data.success){
          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER
          });
          setIsloading(false)
          navigate('/welcome')
        }
          
        }
        
       
        
  
  
      }
    } catch (error) {
  
      const info = 'email registered'
      toast.error(info ?? 'something is wrong',{
        position: toast.POSITION.TOP_CENTER
      })
    }
    
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
      required
        type="text" 
        placeholder="First Name" 
        value={firstName} 
        onChange={(e) => setFirstName(e.target.value)} 
      />
      <input 
      required
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
      required
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">{ isLoading ? 'Registering' : 'Register' }</button>
      <ToastContainer />
    </form>
  );
};



import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// Define an interface for the props
import "../../styles/AuthPage.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";
import { urlApi } from "../../utils/api";
import { persistData } from "../../utils/localstore";

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const {setIsAuthenticated} = useContext(AuthContext)
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsloading(true);
      if (email && password) {
      

        const saveUserData = {
          email: email,
          password: password,
          fullName: firstName,
        };
        const saveUserInDb = await axios.post(
          `${urlApi}/auth/register`,
          saveUserData
        );
        if (saveUserInDb.data.success) {
          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
          persistData('isAuth','true')
          persistData('authorization',`${saveUserInDb.data.token}`)
          persistData('user',saveUserInDb.data.user)
          setIsAuthenticated(true)
          setIsloading(false)
          navigate('/')
        
        }
      }
    } catch (error) {
      const info = "email registered";
      toast.error(info ?? "something is wrong", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <main >
       <figure className='flex justify-center align-center  '>
            <img width="210" height="210" src='https://res.cloudinary.com/dnmjmjdsj/image/upload/v1702506419/audios/logo_vsw2tl.png' />
        </figure>
        <h2 className='title-login mt-4 text-xl'>Start to relax</h2>
      <form className='flex justify-center items-center flex-col mt-6' onSubmit={handleSubmit}>
      <Input
      isRequired
      type="string"
      label="fullName"
      className="max-w-sm mb-4"
      value={firstName}
        onValueChange={setFirstName}
    />
      <Input
      isRequired
      type="email"
      label="Email"
     
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
       
      <Button type='submit'  className='w-full bg-secondary  max-w-sm mt-8' isLoading={isLoading}>
     Register
    </Button>
      </form>
      <ToastContainer />
    </main>
  );
};

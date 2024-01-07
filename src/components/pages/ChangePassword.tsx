import { Button, Input } from "@nextui-org/react"
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { urlApi } from "../../utils/api";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";

interface ResponseType {
    message: string;
  }
export const ChangePassword = () =>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [isVisible, setIsVisible] = useState(false);
  
    const navigate = useNavigate()
    const { token } = useParams();
    
    const toggleVisibility = () => setIsVisible(!isVisible);
    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        setIsLoading(false)
     
        try {
            setIsLoading(true)
            if(token){
              const data = {
                "token":token,
                "newPassword":password
            }
              const res =  await axios.post(`${urlApi}/auth/resetPassword`,data)  
              setIsLoading(false)
               if(res.data){
                 toast.success(res.data?.message)
                 navigate('/login')
  
               } 
            }else{
              toast.error("token no validate", {
                position: toast.POSITION.TOP_CENTER,
              });
            }
           
           
        } catch (error) {
            setIsLoading(false)
      
            const t = error as AxiosError;
            const d: ResponseType = t.response?.data as ResponseType;
            toast.error(d?.message ?? "something is  , try again", {
                position: toast.POSITION.TOP_CENTER,
              });
            
        }
    }

    useEffect(()=>{
        localStorage.clear()
    },[])
    return (
        <main className="h-screen">
       
        <form
          className="flex justify-center items-center flex-col h-screen -translate-y-24"
          onSubmit={handleSubmit}
         
        >
             <h1 className="title-login text-xl mb-4">Type your new password</h1>
             
         <Input
          label="Password"
          value={password}
          onValueChange={setPassword}
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-sm"
        />
  
       
  
          <Button
            type="submit"
            className="w-full bg-primary  max-w-sm mt-4"
            isLoading={isLoading}
          >
            Change password
          </Button>
        </form>
          <ToastContainer />
      </main>
    )
}


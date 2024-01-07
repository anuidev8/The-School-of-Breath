import { Button, Input } from "@nextui-org/react"
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { urlApi } from "../../utils/api";
import { toast,ToastContainer } from "react-toastify";

interface ResponseType {
    message: string;
  }
export const ResetPassword = () =>{
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [validateEmail,setValidateEmail] = useState<boolean>(false)
    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        setIsLoading(false)
        setValidateEmail(false)
        try {
            setIsLoading(true)
            const res =  await axios.post(`${urlApi}/auth/generateResetToken`,{email})
            setIsLoading(false)
            res.data && setValidateEmail(true)
        } catch (error) {
            setIsLoading(false)
            setValidateEmail(false)
            console.log(error);
            
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
             <h1 className="title-login text-xl mb-4">Recovery password by email</h1>
             {
                validateEmail &&
             <div className="bg-success/20 border border-success max-w-sm w-sm w-full h-14 rounded mb-4 font-bold flex justify-center items-center"><p>Check your email, for change the password</p></div>
             }
          <Input
            isRequired
            type="email"
            label="Email"
            className="max-w-sm mb-4"
            value={email}
            onValueChange={setEmail}
          />
  
       
  
          <Button
            type="submit"
            className="w-full bg-secondary  max-w-sm mt-4"
            isLoading={isLoading}
          >
            Send email
          </Button>
        </form>
          <ToastContainer />
      </main>
    )
}


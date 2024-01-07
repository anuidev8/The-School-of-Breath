
import { useNavigate } from "react-router-dom";
import welcomebg from '../assets/welcomebg.gif'
import  '../styles/WelcomePage.css'
import { Button } from "@nextui-org/react";
import {  updateSubscriptionStatus } from "./adapters/updatedUserActive";
import { ToastContainer, toast } from 'react-toastify';
import {  useState } from "react";
import { getPersistData, persistData } from "../utils/localstore";
export const WelcomePage = () =>{
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
  
    const onNavigate = async () => {
     
       try {
        setIsLoading(true)
        const data = {
            token:getPersistData('authorization') ?? '',
            isStartSubscription:true
        }
        const activeResponse = await updateSubscriptionStatus(data)
        setIsLoading(false)
    
        if(activeResponse.success){
            persistData('user',activeResponse.user)
            navigate('/menu')
            
        }else{
            toast.error(`${activeResponse.info} try again` ?? 'something error try again',{
                position: toast.POSITION.TOP_CENTER
              }) 
        }
       } catch (error) {
           console.log(error);
           setIsLoading(false)
        toast.error('something is wrong,try again',{
            position: toast.POSITION.TOP_CENTER
          })
        
       }
    }
    return(
        <main className="welcome-page">

                <figure className="bg-welcome-cover">
                <img src={welcomebg} width={'100%'} height={'100%'} />
                </figure>
                <h2 className="text-white relative z-50 -translate-y-28 text-lg font-light">Embark on a serene journey with us </h2>
               <Button  isLoading={isLoading} className="mt-32 bg-secondary" onClick={onNavigate}>Start relaxing now</Button>
               <ToastContainer />
        </main>
    )
}

import Lottie from "lottie-react";
import sleepicon from '../assets/sleep.json'
import { Button } from "@nextui-org/react";

export const UnsubscribedPage= () =>{
   

    const onNavigate = () => {
        localStorage.clear()
       window.location.href = 'https://www.meditatewithabhi.com/order-app'
    }
    return(
        <main className="welcome-page unsubscribe-page">
            <div style={{ width:'280px' }} >
            <Lottie color="yellow"  animationData={sleepicon} loop={true} />

            </div>
               <h1>Renewal Required for MusicApp Subscription 🌙✨"</h1> 
               <p>Your MusicApp subscription has expired. Rekindle your wellness journey by renewing your subscription today.</p>
               <Button className="unsubscribed-button" onClick={onNavigate}>Payment"</Button>
        </main>
    )
}

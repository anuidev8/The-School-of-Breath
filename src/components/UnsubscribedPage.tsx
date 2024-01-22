
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
               <h1>"Renew Your Journey of Tranquility 🌙✨"</h1> 
               <p>Your MusicApp subscription has expired. Continue your journey with uninterrupted, soul-soothing music.</p>
               <Button className="unsubscribed-button" onClick={onNavigate}>Payment</Button>
        </main>
    )
}

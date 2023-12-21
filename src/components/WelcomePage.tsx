
import Lottie from "lottie-react";
import sleepicon from '../assets/sleep.json'
import { useNavigate } from "react-router-dom";
export const WelcomePage = () =>{
    const navigate = useNavigate()

    const onNavigate = () => {
        navigate('/menu')
    }
    return(
        <main className="welcome-page">
            <div style={{ width:'280px' }} >
            <Lottie   animationData={sleepicon} loop={true} />

            </div>
               <h1>Welcome aboard! 🌙✨"</h1> 
               <p>Enjoy 7 days of free soothing tunes for your best sleep ever.</p>
               <button onClick={onNavigate}>Start relaxing now!"</button>
        </main>
    )
}
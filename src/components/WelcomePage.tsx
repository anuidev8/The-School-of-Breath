
import { useNavigate } from "react-router-dom";
import welcomebg from '../assets/welcomebg.gif'
import  '../styles/WelcomePage.css'
export const WelcomePage = () =>{
    const navigate = useNavigate()

    const onNavigate = () => {
        localStorage.setItem('isWelcome','true')
        navigate('/menu')
    }
    return(
        <main className="welcome-page">
          
                <figure className="bg-welcome-cover">
                <img src={welcomebg} width={'100%'} height={'100%'} />
                </figure>
               <button  className="welcome-button" onClick={onNavigate}>Start relaxing now</button>
        </main>
    )
}
import Lottie from "lottie-react"
import feedbackAnimation from '../assets/meditate.json'

export const AppWebScreen = () =>{
    return(
        <div className="h-screen  max-w-sm w-full py-7">
            <div className="bg-transparent rounded flex justify-center items-center flex-col h-full">
            <div>
            <Lottie color="yellow"  animationData={feedbackAnimation} loop={true} />
            </div>
            <h1 className="text-white text-2xl mb-4">Welcome to sleep app music</h1>
         
            <h2 className="text-white 2xl">We're working in a web version , for now enjoy the mobile version</h2>

            </div>
        </div>
    )
}
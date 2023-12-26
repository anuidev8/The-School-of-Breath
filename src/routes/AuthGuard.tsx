import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"


interface Props {
    privateValidation : boolean
}


const PrivateValidationFragment = <Outlet />
export const AuthGuard = ({privateValidation}:Props) =>{
    const {isAuthenticated} = useContext(AuthContext)
   
    
    return  isAuthenticated && privateValidation ? (
        PrivateValidationFragment
    ): (
        <Navigate replace to='login' />
    )
}
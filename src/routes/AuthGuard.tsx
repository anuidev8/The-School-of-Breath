import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "../components/adapters/getUserInfo"
import { getPersistData } from "../utils/localstore"


interface Props {
    privateValidation : boolean
}


const PrivateValidationFragment = <Outlet />
export const AuthGuard = ({privateValidation}:Props) =>{
    const {isAuthenticated} = useContext(AuthContext)
    const token = getPersistData('authorization') ?? null

    
    const { data,isLoading} = useQuery({ queryKey: ['user'], queryFn:async ()=> getUser({token:token?? ''}),enabled:!!token })
     
    if(isLoading){
        return <h2>Loading</h2>
    }
        
    return  isAuthenticated && privateValidation && data ? (
        PrivateValidationFragment
    ): (
        <Navigate replace to='login' />
    )
}
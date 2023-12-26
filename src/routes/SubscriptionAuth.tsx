import { Navigate, Outlet } from "react-router-dom"

export const SubscriptionAuth = () =>{
    const isWelcome = localStorage.getItem('isWelcome')
    const userFromSystemeIo = localStorage.getItem('userFromSystemeIo')
    const user = localStorage.getItem('user')
    const usefrFromDb = user ?  JSON.parse(`${user}`) : false
    const userActive = userFromSystemeIo ? JSON.parse(`${userFromSystemeIo}`) : false
    
    
   
    if(userActive && userActive.unsubscribed && userActive.needsConfirmation){
        return <Navigate to={'/unsubscribed'} />
    }
    if(userActive && userActive.unsubscribed ){
        return <Navigate to={'/unsubscribed'} />
    }
    if(usefrFromDb && !usefrFromDb.suscription && !usefrFromDb.promotionDays){
        return <Navigate to={'/unsubscribed'} />
    }
    if(!isWelcome){
        return <Navigate to={'/welcome'} />
    }

    
    return <Outlet />

}
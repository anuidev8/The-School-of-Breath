
import { Navigate, Outlet } from "react-router-dom"
import { getPersistData } from "../utils/localstore"

interface TagsType {
    id:number,
    name:string
}

export const filterByName = (array:TagsType[],name:string) =>{
    const filter = array.filter(item => item.name === name)
    return filter .length > 0 ? true : false
}


export const SubscriptionAuth = () =>{
    const userFromSystemeIo = getPersistData('userFromSystemeIo')
    const user = getPersistData('user') 
    const useRFromDb = user ?? false
    const isStartSubscription = useRFromDb?.isStartSubscription ?? null
    const userActive = userFromSystemeIo ?? false
     
    const tags = userActive.tags
    if(userActive && userActive.unsubscribed && !filterByName(tags,'Enrolled_to_Membership') ){
        return <Navigate to={'/unsubscribed'} />
    }
   
     if(userActive && !filterByName(tags,'Enrolled_to_Membership') ){
        return <Navigate to={'/unsubscribed'} />
    } 
    if(userActive && userActive.unsubscribed ){
        return <Navigate to={'/unsubscribed'} />
    } 
   
    
   if(useRFromDb && useRFromDb.promotionDays > 7 && !filterByName(tags,'Enrolled_to_Membership')  ){
        return <Navigate to={'/unsubscribed'} />
    } 
    
  
  
    
    if(!isStartSubscription){
        return <Navigate to={'/'} />
    }

    
    return <Outlet />

}
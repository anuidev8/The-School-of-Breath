import { Button } from "@nextui-org/react"
import { useLocation, useNavigate } from "react-router-dom"


export const NavBarBottom = () =>{
    const navigate = useNavigate()
    const location = useLocation()
    
    
   return(
    <div className="fixed bottom-0 left-0 w-full h-16 bg-main z-10">
    <ul className="flex justify-evenly items-center h-full">
        <li>
            <Button onClick={()=>navigate('/menu')} className={`${location.pathname === "/menu" ? 'bg-white/10' : 'bg-black/30' } `}>All</Button>
        </li>
        <li>
        <Button onClick={()=>navigate('/favorites')} className={`${location.pathname === "/favorites" ? 'bg-white/10' : 'bg-black/30' } `}>Favorites</Button>
        </li>
    </ul>
    </div>
   )
}
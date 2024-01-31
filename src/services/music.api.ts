import axios from "axios"
import { Music } from "../types/music"
import { urlApi } from "../utils/api"



class MusiCol {
    public async getAll():Promise<Music[]> {
        
        const res =  await axios.get<Music[]>(`${urlApi}/musics`)
        return res.data
    }
    public async getMusicByCategory({category}:{category:string }):Promise<Music[]> {
     
        
    
            const res =  await axios.get<Music[]>(`${urlApi}/musics/category?category=${category}`)
            return res.data
        

    
       
    }

    public async getFavorites({category,token}:{category:string,token:string}):Promise<Music[]> {
        
        
        const res =  await axios.get<Music[]>(`${urlApi}/musics/favorites/category?category=${category}`,{
            headers:{
                ssid:token
            }
        })
        return res.data
    }
}

export default new MusiCol()
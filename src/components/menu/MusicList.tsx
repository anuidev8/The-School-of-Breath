
import React, { useRef, useState } from "react";
import { Music } from "../../types/music";

import { getPersistData } from "../../utils/localstore";

import { urlApi } from "../../utils/api";

import LikeIcon from  '../../assets/animation.json'
import Lottie from "lottie-react";
import LikeButton from "./LikeButton";
import useToggleFavorite from "../../hooks/useToggleFavorite";


interface MusicItemType {
  music:Music;
  hasFavorite:boolean;
  handleSelectBackground:(music: Music)=>void;
  onDataRefetch:() => void

}

const MusicItem = ({ music,hasFavorite ,handleSelectBackground,onDataRefetch}:MusicItemType) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isImgLoading,setIsImgLoading] = useState(false)
  /* const isVisible = useLazyLoad(imgRef); */
  const imageUrl = `${urlApi}/uploadFiles/file/${music.imageFilename}` 
  const { toggleFavorite,isMutating} = useToggleFavorite(urlApi,onDataRefetch)
  

  return (
    <li  className="music-list-audio min-h-64 relative z-50" >
    
      <button className="music-option" onClick={()=>handleSelectBackground(music)}>
        <div className="music-image h-48 flex justify-center items-center relative">
          {
            !isImgLoading &&
            <div className="   p-4  w-full  h-48 flex justify-center absolute w-full top-0 left-0">
            <div className="animate-pulse flex flex-col space-x-4 w-full items-center ">
              <div className="rounded-lg  bg-blue-400/30 h-52 w-full "></div>
            
              <div className="h-14  bg-blue-400/30 rounded-lg w-full mt-2"></div> 
            </div>
          </div>
          }
          <img
            ref={imgRef}
           /*  src={isImgLoading ? imageUrl : 'images/placeholder.jpg'} */
           src={ imageUrl }
            alt={music.name}
            loading="lazy"
            width={"100%"}
            height={"80%"}
            onLoad={()=>setIsImgLoading(true)}
            style={isImgLoading ? {}: {opacity:0}}
            
           /*  onError={(e) => e.currentTarget.src = 'path_to_default_image'} */
          />
        </div>
      
      </button>
      <p className="w-full music-item-p relative z-50 pr-12">
        { isMutating &&
         <div className="like-button">
         <Lottie className="-translate-y-10 translate-x-5" animationData={LikeIcon} loop={true}   />
     </div>
      }
      {
        !isMutating&& 
        <LikeButton onToggle={()=>toggleFavorite(music.id)} isFavorite={hasFavorite} className="like-button" />
      }
          {music.description}
          </p>
    </li>
  );
};


export const MusicList: React.FC<{ musics:Music[],handleSelectBackground:(music: Music)=>void,onDataRefetch:() => void }> = ({ musics,handleSelectBackground,onDataRefetch }) => {
   

 
  const user = getPersistData('user') ?? null

    const isFavorite = (favorites:string[]) =>{
      return favorites?.includes(user.id) ?? false
    }
    
    return (
      <ul className="pb-20 px-6">
        {musics?.map(music => (

          <MusicItem key={music.id} music={music} handleSelectBackground={handleSelectBackground}  onDataRefetch={onDataRefetch}  hasFavorite={isFavorite(music.favorites)} />
        ))}
      </ul>
    );
  };
  
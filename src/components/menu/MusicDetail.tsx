import { useRef } from "react";
import { Music } from "../../types/music"
import useLazyLoadWithHorizontal from "../../hooks/useLazyLoadWithHorizontal";
import { urlApi } from "../../utils/api";


export const MusicDetail = ({music}:{music:Music}) => {
    const imgRef = useRef<HTMLImageElement>(null);
  const isVisible = useLazyLoadWithHorizontal(imgRef, '0px', true);

  const imageUrl = isVisible ? `${urlApi}/uploadFiles/file/${music.imageFilename}` : '';
    return(
        <figure className=" flex justify-center m-0 bg-black w-full ">
                    <img className="object-contain w-80 h-80" src={imageUrl} alt={music.name} />
        </figure>
    )
}
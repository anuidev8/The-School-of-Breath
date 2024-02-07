
import { Music } from "../../types/music"



export const MusicDetail = ({music}:{music:Music}) => {
    /* const imgRef = useRef<HTMLImageElement>(null); */
/*   const isVisible = useLazyLoadWithHorizontal(imgRef, '0px', true); */
/* 
  const imageUrl = isVisible ? `${urlApi}/uploadFiles/file/${music.imageFilename}` : ''; */
    return(
        <figure className=" flex justify-center m-0 bg-black w-full ">
                    <img className="object-contain w-80 h-80" loading="lazy" src={music.imageFilename} alt={music.name} />
        </figure>
    )
}
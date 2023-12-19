// Import navigation and state management libraries

import { useBackground} from "../contexts/BackgroundContext";
import { useNavigate } from 'react-router-dom';

export const menuList = [
  {
    name:'ANXIETY RELIEF',
    image:'bg-card.png',
    audio:'https://res.cloudinary.com/dnmjmjdsj/video/upload/v1702486267/audios/bg/MWAA0015_and0v7.mp3'
  },
  {
    name:'CHAKRA BALANCE',
    image:'bg-card.png',
    audio:'https://res.cloudinary.com/dnmjmjdsj/video/upload/v1702505835/audios/bg/MWAA0016_1_z6qzdz.mp3'
  },
  {
    name:'REDUCE ANXIETY',
    image:'bg-card.png',
    audio:'https://res.cloudinary.com/dnmjmjdsj/video/upload/v1702508030/audios/MWAA0032_1_vdhyfa.mp3'
  },
  {
    name:'FALL ASLEEP FAST',
    image:'bg-card.png',
    audio:'https://res.cloudinary.com/dnmjmjdsj/video/upload/v1702508030/audios/MWAA0032_1_vdhyfa.mp3'
  },
  
]
const MenuPage = () => {
    const history = useNavigate ();
    const { selectBackground,handleUserInteraction } = useBackground();
  
    const handleSelectBackground = (background: string) => {
      selectBackground(background);
      handleUserInteraction();
      history('/main');
    };

  return (
    <div className="menu-page" style={{minHeight:'100vh',}}>
      <h1 className="menu-title">Select Sleep Music Background</h1>
      <div style={{
        display:'flex',
        flexDirection:'column'
      }}>
        <ul className="musicList">
          {
            menuList.map((item,key)=>(
              <li key={key} className="music-list-audio music-list-audio-1">
              <button onClick={()=>handleSelectBackground(item.name)} >
                            <h3>{item.name}</h3>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                                height="1.8rem" width="1.8rem" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z">
                                </path>
                            </svg>
                            <div className={`cover cover-${key}`}></div>
                        </button>
              </li>
            ))
          }
        
        </ul>


   
      </div>
     
    </div>
  );
};

export default MenuPage;

// Import navigation and state management libraries

import {  useEffect, useState } from "react";
import { useBackground } from "../contexts/BackgroundContext";
import { useNavigate } from "react-router-dom";
import "../styles/MenuPage.css";




import { Layout } from "./layout/Layout";
import { CategorySelector } from "./menu/CategorySelector";
import { MusicList } from "./menu/MusicList";
import { useQuery } from "@tanstack/react-query";
import { Music } from "../types/music";
import musicApi from "../services/music.api";
import { NavBarBottom } from "../layout/NavBarBottom";
import { MdOutlineMusicOff } from "react-icons/md";
import { Button } from "@nextui-org/react";
import {CircularProgress} from "@nextui-org/react";



const MenuPage = () => {
  const history = useNavigate();
  const { selectBackground, handleUserInteraction,setCategorySelected } = useBackground();

  const handleSelectBackground = (music: Music) => {
    selectBackground(music);
    handleUserInteraction();
    history("/main");
  };
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data:musics,isLoading ,refetch} = useQuery<Music[]>({
    queryKey: ['categoriesfilter',selectedCategory],
    queryFn: async () => musicApi.getMusicByCategory({category:selectedCategory}),refetchOnWindowFocus:false,
  })
 
  
  const onSetSelectedCategory = (category:string) =>{
    setCategorySelected(category)
    setSelectedCategory(category)
  }
  
  
  useEffect(()=>{
    const category =  localStorage.getItem('categorySelected') ?? ''
    setSelectedCategory(category)
  },[])
  return (
    <Layout title="Sleep Music">
      <div className="menu-page">
        <div className="relative w-full z-50">
          <div className="pt-5 ">
       
          <CategorySelector  categorySelected={selectedCategory} onSelectCategory={onSetSelectedCategory} />
          {isLoading && <CircularProgress />}
          {  musics && musics?.length > 0 &&  <MusicList  onDataRefetch={refetch} handleSelectBackground={handleSelectBackground} musics={musics ?? []} /> }
          {
          musics?.length == 0 &&
          <div className="flex justify-center flex-col items-center">
            <i className="text-5xl">
            <MdOutlineMusicOff /> 
            </i>
            <h2 className="mt-6">List no found , tyy view the complete</h2>
            <Button onClick={()=>history('/menu')} className="mt-7 bg-white text-main">view menu</Button>
          </div>
        }
          </div>
        </div>
        <NavBarBottom  />
      </div>
    </Layout>
  );
};

export default MenuPage;

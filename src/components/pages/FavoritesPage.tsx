// Import navigation and state management libraries

import {  useEffect, useMemo, useState } from "react";
import {  useNavigate } from "react-router-dom";
import "../../styles/MenuPage.css";
import { useQuery } from "@tanstack/react-query";
import { Music } from "../../types/music";
import { Layout } from "../layout/Layout";
import { CategorySelector } from "../menu/CategorySelector";
import { MusicList } from "../menu/MusicList";
import { NavBarBottom } from "../../layout/NavBarBottom";
import musicApi from "../../services/music.api";
import { useBackground } from "../../contexts/BackgroundContext";
import { getPersistData } from "../../utils/localstore";
import { MdOutlineMusicOff } from "react-icons/md";
import { Button, CircularProgress } from "@nextui-org/react";





const FavoritesPage = () => {
  const history = useNavigate();
  const { selectBackground, handleUserInteraction,setCategorySelected } = useBackground();
  
  const handleSelectBackground = (music: Music) => {
    selectBackground(music);
    handleUserInteraction();
    history("/main");
  };
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const getToken = useMemo(()=>{
    const token = getPersistData('authorization')?? '' 
    return token
  },[])

  const { data:musics,isLoading,refetch } = useQuery<Music[]>({
    queryKey: ['favorites',selectedCategory],
    queryFn: async () => musicApi.getFavorites({category:selectedCategory,token:getToken}),refetchOnWindowFocus:false,
  })
 
  
  const onSetSelectedCategory = (category:string) =>{
    setCategorySelected(category)
    setSelectedCategory(category)
  }



  useEffect(()=>{
    const category =  localStorage.getItem('categorySelected') ??  '' 
    setSelectedCategory(category)
  },[])
 
  return (
    <Layout title="Favorites">
    <div className="menu-page">
      <div className="relative z-10">
        <div className="pt-5 ">
        
        <CategorySelector  categorySelected={selectedCategory} onSelectCategory={onSetSelectedCategory} />
        {isLoading && <CircularProgress />}
        {  musics && musics?.length > 0 && <MusicList onDataRefetch={refetch} handleSelectBackground={handleSelectBackground} musics={musics ?? []} /> }
        {
          musics?.length == 0 &&
          <div className="flex justify-center flex-col items-center mt-10 ">
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

export default FavoritesPage;

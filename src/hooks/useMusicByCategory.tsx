import { useQuery } from '@tanstack/react-query';
import { Music } from '../types/music';
import musicApi from '../services/music.api';



export const useMusicByCategory = (category: string ) => {

    const { data,isLoading,error,refetch } = useQuery<Music[]>({
        queryKey: ['musicsbycstegory',category],
        queryFn: async () => musicApi.getMusicByCategory({category}),enabled:!!category,
      })
     console.log( {category,data});
     
  return {
    data,
    error,
    isLoading,
    refetch

  }
};
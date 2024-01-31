import { useQuery } from '@tanstack/react-query';
import { Music } from '../types/music';
import musicApi from '../services/music.api';



export const useMusics = () => {

    const { data,isLoading,error } = useQuery<Music[]>({
        queryKey: ['musics'],
        queryFn: async () => musicApi.getAll(),
      })
  return {
    data,
    error,
    isLoading,

  }
};
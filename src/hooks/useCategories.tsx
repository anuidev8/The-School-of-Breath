import { useQuery } from '@tanstack/react-query';
import { CategoryType } from '../components/menu/CategorySelector';
import categoriesApi from '../services/categories.api';



export const useCategories = () => {

    const { data,isLoading,error } = useQuery<CategoryType[]>({
        queryKey: ['categories'],
        queryFn: async ()=> categoriesApi.getCategories(),
      })
  return {
    data,
    error,
    isLoading,

  }
};
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { getPersistData } from '../utils/localstore'; // Adjust the import path as needed

interface ToggleFavoriteParams {
  musicId: string;
  token: string;
}

interface ToggleFavoriteResponse {
  success: boolean;
  // Add other response fields if necessary
}

const useToggleFavorite = (urlApi: string, onDataRefetch: () => void): { 
  toggleFavorite: (musicId: string) => Promise<void>, 
  isMutating: boolean 
} => {
  const mutation: UseMutationResult<AxiosResponse<ToggleFavoriteResponse>, unknown, ToggleFavoriteParams> = useMutation({
    mutationFn: async ({ musicId, token }: ToggleFavoriteParams) => {
      return await axios.put<ToggleFavoriteResponse>(`${urlApi}/user/add-favorite/music/${musicId}`, {}, {
        headers: {
          ssid: token
        }
      });
    },
  });

  const toggleFavorite = async (musicId: string): Promise<void> => {
    try {
      const user = getPersistData('user');
      const token = getPersistData('authorization');
      if (!user || !token) {
        toast.error("User not logged in or token missing");
        return;
      }

      const response = await mutation.mutateAsync({ musicId, token });
      if (response.data.success) {
        onDataRefetch();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(errorMessage);
    }
  };

  return { toggleFavorite, isMutating: mutation.isPending };
};

export default useToggleFavorite;

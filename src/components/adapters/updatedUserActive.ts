import  { AxiosError } from "axios";
import { axiosInstance } from "../../utils/api";
import { User } from "../../contexts/AuthContext";

export interface PostData {
    isStartSubscription: boolean;
    token: string;
}

export interface ResponseType {
    success: boolean;
    info: string;
    user : User | null
}

export const updateSubscriptionStatus = async (data: PostData): Promise<ResponseType> => {
    try {
        const response = await axiosInstance.put<ResponseType>('/user/updateSubscriptionStatus', {
            isStartSubscription: data.isStartSubscription
        }, {
            headers: {
                'ssid': data.token
            }
        });

        return response.data; // Use the actual response data
    } catch (error) {
        const axiosError = error as AxiosError;
        // Handle different types of errors accordingly
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Server responded with an error:", axiosError.response.data);
            return { success: false, info: 'Server error',user:null };
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error("No response received:", axiosError.request);
            return { success: false, info: 'No response from server',user:null };
        } else {
            // Something happened in setting up the request that triggered an error
            console.error("Error setting up request:", axiosError.message);
            return { success: false, info: 'Request setup failed',user:null };
        }
    }
};

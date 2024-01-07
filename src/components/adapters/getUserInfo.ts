import { urlApi } from "../../utils/api";

export const getUser = async ({token}:{token:string}) => {
    const response = await fetch(`${urlApi}/user/me`,{
        headers:{
            'ssid':token
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

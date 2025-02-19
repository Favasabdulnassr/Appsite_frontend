import { BASE_URL } from "./constant";
import axios from "axios";



export const fetchNewAccessToken = async () => {
    try {
        const token = JSON.parse(localStorage.getItem('authTokens'))
        
        const refreshToken = token?.refresh

        if (!refreshToken){
            throw new Error("No refresh Token Found");
            
        }

        const response = await axios.post(BASE_URL + '/token/refresh/',{refresh:refreshToken});
        return response;
        
    } catch (error) {
        console.log('error happened when calling referesh',error)
        throw error
    }
}
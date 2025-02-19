import  axios   from 'axios'
import { BASE_URL } from './constant'

export const handleRegister = async(data) => {
    try {
        const response = await axios.post(BASE_URL + '/register/',data);
        return response.data
        
    } catch (error) {
        throw error
        
    }
}
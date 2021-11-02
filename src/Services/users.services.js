import axios from "axios";

export const registerUser = async (user) => {
   try {
    const response = await axios.post('https://esalas.me/api/users/', user);
       return response.data;
    } catch (error) {
        console.log(`Error: ${error}`);
        return error;
    } 
};
export const loginUser = async (credentials) => {
    try {
     const response = await axios.post('https://esalas.me/api/users/credenciales', credentials);
        return response.data;
     } catch (error) {
         console.log(`Error: ${error}`);
         return error;
     } 
 };


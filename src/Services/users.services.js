import axios from "axios";

const url = "https://esalas.me/api";
export const registerUser = async (user) => {
   try {
    const response = await axios.post('https://esalas.me/api/users/', user);
       return response.data;
    } catch (error) {
        console.log(`Error: ${error}`);
        return error;
    } 
};
export const updateUser = async (user) => {
    try {
     const response = await axios.put('https://esalas.me/api/users/', user);
        return response.data;
     } catch (error) {
         console.log(`Error: ${error}`);
         return error;
     } 
 };
export const loginUser = async (credentials) => {
    try {
     const response = await axios.post(`${url}/users/credenciales`, credentials);
        return response.data;
     } catch (error) {
         console.log(`Error: ${error}`);
         return error;
     } 
 };

export const getById = async (id) => {
    try {
        const response = await axios.get(`${url}/users/${id}/id` );
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const changePassword = async (password) => {
    try {
     const response = await axios.put('https://esalas.me/api/users/password', password);
        return response.data;
     } catch (error) {
         console.log(`Error: ${error}`);
         return error;
     } 
 };

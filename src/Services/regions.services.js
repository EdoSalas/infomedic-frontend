import axios from "axios";


export const getAll = async () => {
    try {
        const response = axios.get('https://esalas.me/api/regions');
        const data = (await response).data;
        return data;
    } catch (error) {
        console.log(`Error: ${error}`);
        return error;
    }
};
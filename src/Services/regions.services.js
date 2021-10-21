import axios from "axios";
import config from "../config";

export const getAll = async () => {
    try {
        const response = axios.get(`${config.BACKEND_URI}/regions`);
        const data = (await response).data;
        return data;
    } catch (error) {
        console.log(`Error: ${error}`);
        return error;
    }
};
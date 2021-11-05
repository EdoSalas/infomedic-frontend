import axios from "axios";

const url = "https://esalas.me/api";

export const getAll = async () => {
    try {
        const response = await axios.get(`${url}/provinces/`);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
import axios from "axios";

const url = "https://esalas.me/api";

export const getAll = async () => {
    try {
        const response = await axios.get(`${url}/diseases/`);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const saveDisease = async (disease) => {
    try {
        const response = await axios.post(`${url}/diseases/`, disease);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
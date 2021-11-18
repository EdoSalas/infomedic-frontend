import axios from "axios";

const url = "https://esalas.me/api";

export const getAll = async () => {
    try {
        const response = await axios.get(`${url}/medical/`);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const deleteRecomendation = async (id) => {
    try {
        const response = await axios.put(`${url}/medical/delete`, { id });
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const saveRecomendation = async (recomendation) => {
    try {
        const response = await axios.post(`${url}/medical/`, recomendation);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const updateRecomendation = async (recomendation) => {
    try {
        const response = await axios.put(`https://esalas.me/api/medical/`, recomendation);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};


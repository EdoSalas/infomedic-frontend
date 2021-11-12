import axios from "axios";

const url = "https://esalas.me/api";

export const getAll = async () => {
    try {
        const response = await axios.get(`${url}/riskFactor/`);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const deleteFactor = async (id) => {
    try {
        const response = await axios.put(`${url}/riskFactor/delete`, {id});
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const saveFactor = async (factor) => {
    try {
        const response = await axios.post(`${url}/riskFactor/`, factor);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const updateFactor = async (factor) => {
    try {
        const response = await axios.put(`https://esalas.me/api/riskFactor/`, factor);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};


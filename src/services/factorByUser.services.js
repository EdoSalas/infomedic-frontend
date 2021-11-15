import axios from "axios";

const url = "https://esalas.me/api";

export const addFactorForUser = async (factor) => {
    try {
        const response = await axios.post(`${url}/riskFactorForUser/`, factor);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const removeFactorForUser = async (factor) => {
    try {
        const response = await axios.put(`${url}/riskFactorForUser/delete`, factor);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
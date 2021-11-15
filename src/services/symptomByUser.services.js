import axios from "axios";

const url = "https://esalas.me/api";

export const addSymptomsForUser = async (symptom) => {
    try {
        const response = await axios.post(`${url}/symptomsForUser/`, symptom);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const removeSymptomsForUser = async (symptom) => {
    try {
        const response = await axios.put(`${url}/symptomsForUser/delete`, symptom);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
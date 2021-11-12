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
export const deleteDisease = async (id) => {
    try {
        const response = await axios.put(`https://esalas.me/api/diseases/delete`, {id});
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const updateDisease = async (disease) => {
    try {
        const response = await axios.put(`https://esalas.me/api/diseases/`, disease);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const addSymptomsForDisease = async (symptom) => {
    try {
        const response = await axios.post(`${url}/symptomsForDisease/`, symptom);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const removeSymptomsForDisease = async (symptom) => {
    try {
        const response = await axios.put(`${url}/symptomsForDisease/delete/symptomDisease`, symptom);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
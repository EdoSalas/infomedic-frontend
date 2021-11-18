
import axios from "axios";
import { toast } from "react-toastify";
const url = "https://esalas.me/api";

export const getAll = async () => {
    try {
        const response = await axios.get(`${url}/symptoms/`);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const getByDisease = async (symptomID) => {
    try {
        const response = await axios.get(`${url}/symptomsForDisease/${symptomID}/disease`);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const getByUser = async (userID) => {
    try {
        const response = await axios.get(`${url}/symptomsForUser/${userID}/user`);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
}
export const saveSymptom = async (symptom) => {
    try {
        const response = await axios.post(`${url}/symptoms/`, symptom);
        console.log(response, "response")
        return await response.data;

    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const deleteSymptom = async (id) => {
    try {
        const response = await axios.put(`${url}/symptoms/delete`, { id });
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const updateSymptom = async (symptom) => {
    try {
        const response = await axios.put(`https://esalas.me/api/symptoms/`, symptom);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
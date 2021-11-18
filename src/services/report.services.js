import axios from "axios";

const url = "https://esalas.me/api";

export const diseasesForRegions = async (params) => {
    try {
        const response = await axios.post(`${url}/reports/diseasesForRegion`, params);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const symptomsForRegions = async (params) => {
    try {
        const response = await axios.post(`${url}/reports/regionsWithMoreSymptoms`, params);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const symptomsForDisease = async (params) => {
    try {
        const response = await axios.post(`${url}/reports/symptomsForDisease`, params);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
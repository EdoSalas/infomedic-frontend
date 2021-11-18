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
export const symptomsForProvinces = async (params) => {
    try {
        const response = await axios.post(`${url}/reports/provinceWithMoreSymptoms`, params);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const symptomsForCantones = async (params) => {
    try {
        const response = await axios.post(`${url}/reports/cantonWithMoreSymptoms`, params);
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

export const diseasesBysymptoms = async (params) => {
    try {
        const response = await axios.post(`${url}/reports/diseaseForSymptoms`, params);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const riskForRegion = async (params) => {
    try {
        const response = await axios.post(`${url}/reports/regionWithRiskFactor`, params);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const riskForProvince = async (params) => {
    try {
        const response = await axios.post(`${url}/reports/provinceWithRiskFactor`, params);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const sintomasPorGenero = async (params) => {
    try {
        const response = await axios.post(`${url}/reports/genderWithMoreSymptoms`, params);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};

export const edadesAfectadas = async (params) => {
    try {
        const response = await axios.post(`${url}/reports/ageMostAffected`, params);
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
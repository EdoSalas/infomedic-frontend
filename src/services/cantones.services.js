import axios from "axios";

const url = "https://esalas.me/api";

export const getCantonesByIdProvince = async (idProvince) => {
    try {
        const response = await axios.get(`${url}/cantons/${idProvince}/province` );
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
export const getCantonById = async (id) => {
    try {
        const response = await axios.get(`${url}/cantons/${id}/id` );
        return await response.data;
    } catch (error) {
        console.log("Error: ", error);
        return error;
    }
};
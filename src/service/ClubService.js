import axios from "axios";
import {BASE_URL, GetUri} from "../config/ApplicationConfig";

export const getClubById = async (id) => {
    return await axios.get(BASE_URL + "/api/club/" + id).then((response) => {
        return response.data
    });
};

export const getClubsByUserId = async (id, user) => {
    return await axios.get(BASE_URL + "/api/clubs/" +id, {
        params: {
            id: id,
            user: user
        },
    }).then((response) => {
        return response.data
    });
};


export const getSimilarClubsByCategoryName = async (id, categoryName, cityName) => {
    return await axios.get(BASE_URL + "/api/clubs/search/similar", {
        params: {
            id: id,
            categoryName: categoryName,
            cityName: cityName
        },
    }).then((response) => {
        return response.data
    });
};

export const getClubsByParameters = async (parameters) => {
    return await axios.get(BASE_URL + "/api/clubs/search", {
        params: parameters,
    }).then((response) => {
        return response.data
    });
};
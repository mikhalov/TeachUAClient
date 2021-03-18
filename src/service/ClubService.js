import axios from "axios";
import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";
import { replaceCommaToSemicolon } from "../util/CategoryUtil";
import { searchParameters } from "../context/SearchContext";

export const addClub = async (data) => {
    return await axios.post(BASE_URL + "/api/club", {
        categoriesName: data.categories,
        name: data.name,
        ageFrom: data.ageFrom,
        ageTo: data.ageTo,
        cityName: data.cityName,
        description: data.description,
        address: data.address.value.structured_formatting.main_text,
        latitude: data.latitude,
        longitude: data.longitude,
        districtName: data.districtName,
        urlLogo: data.urlLogo && data.urlLogo.file.response,
        urlBackground: data.urlBackground && data.urlBackground.file.response
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const updateClubBuId = async (data) => {
    return await axios.put(BASE_URL + "/api/club/" + data.id, {
        categoriesName: data.categories,
        name: data.name,
        ageFrom: data.ageFrom,
        ageTo: data.ageTo,
        cityName: data.cityName,
        description: data.description,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        districtName: data.districtName,
        urlLogo: data.urlLogo,
        urlBackground: data.urlBackground
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getClubById = async (id) => {
    return await axios.get(BASE_URL + "/api/club/" + id).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getClubsByUserId = async (id, page) => {
    return await axios.get(BASE_URL + "/api/clubs/" + id + "?page=" + page).then((response) => {
        return response.data
    });
};

export const getSimilarClubsByCategoryName = async (id, categoriesName, cityName) => {
    return await axios.get(BASE_URL + "/api/clubs/search/similar", {
        params: {
            id: id,
            categoriesName: replaceCommaToSemicolon(categoriesName),
            cityName: cityName
        },
    }).then((response) => {
        return response.data
    });
};

export const getClubsByCategoryAndCity = async (mapSearchParameters) => {
    return await fetchRequest.get(BASE_URL + "/api/clubs/search/simple", {
        params: {
            cityName: mapSearchParameters.cityName,
            categoryName: mapSearchParameters.categoryName
        },
    }).then((response) => {
        return response.data
    });
};

export const getClubsByAdvancedSearch = async (parameters, page) => {
    return await axios.get(BASE_URL + "/api/clubs/search/advanced", {
        params: {
            ageFrom: parameters.ageFrom,
            ageTo: parameters.ageTo,
            cityName: parameters.cityName ? parameters.cityName : searchParameters.cityName,
            districtName: parameters.districtName,
            stationName: parameters.stationName,
            categoriesName: parameters.categoriesName && replaceCommaToSemicolon(parameters.categoriesName),
            isCenter: parameters.isCenter,
            page: page,
        },
    }).then((response) => {
        return response.data
    });
};

export const getClubsByParameters = async (parameters, page) => {
    return await axios.get(BASE_URL + "/api/clubs/search", {
        params: {
            clubName: parameters.clubName,
            cityName: parameters.cityName,
            categoryName: parameters.categoryName,
            page: page,
        },

    }).then((response) => {
        return response.data
    });
};

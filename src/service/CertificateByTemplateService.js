import {BASE_URL} from "./config/ApiConfig";
import fetchRequest from "./FetchRequest";

export const loadDataCertificatesByTemplateToDB = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/certificate-by-template/load-to-db",
        data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const loadTemplateName = async (value) => {
    return await fetchRequest.post(BASE_URL + "/api/certificate-by-template/pdf", {
            filePath: value
        }
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const validateCertificateExcelData = async (data) => {
    return await fetchRequest.post(BASE_URL + "/api/certificate-by-template/validate", data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

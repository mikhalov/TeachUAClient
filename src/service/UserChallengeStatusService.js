import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";

export const getAllUserChallengeStatus = async () => {

    return await fetchRequest.get(BASE_URL + "/api/user-challenge/status")
        .then((response) => {
            return response.data
        }).catch((error) => {
        });
};
export const getAllUserChallengeStatusOptions = async () => {

    return await fetchRequest.get(BASE_URL + "/api/user-challenge/status/options")
        .then((response) => {
            return response.data
        }).catch((error) => {
        });
};

export const addUserChallengeStatus = async (statusName) => {
    console.log("addUserChallengeStatus is working")

    return await fetchRequest.post(BASE_URL + "/api/user-challenge/status", {
        statusName: statusName
    })
        .then((response) => {
            console.log("addUserChallengeStatus ", response.data)
            return response.data
        }).catch((error) => {
        });
};

export const updateUserChallengeStatus = async (id, statusName) => {
    console.log("updateUserChallengeStatus is working")

    return await fetchRequest.put(BASE_URL + "/api/user-challenge/status/edit", {
        id: id,
        statusName: statusName,
    })
        .then((response) => {
            console.log("updateUserChallengeStatus ", response.data)
            return response.data
        }).catch((error) => {
        });
};

export const deleteUserChallengeStatus = async (id) => {
    return await fetchRequest.delete(BASE_URL + "/api/user-challenge/status/" + id)
        .then((response) => {
            return response.data
        }).catch((error) => {
        });
};
export const checkIfUserChallengeStatusIdExist = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/user-challenge/status/exist/" + id)
        .then((response) => {
            return response.data['userExist'];
        }).catch((error) => {
        });
};
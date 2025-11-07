import { API_PATH } from "./apiPath"
import axiosInstance from "./axios"

export const updateProfileImage = async (profileImage) => {
    try {
        const response = await axiosInstance.put(API_PATH.AUTH.UPDATE_IMAGE, profileImage);
        return response.data;
    } catch (error) {
        console.error("Error updating image: ", error);
        throw error;
    }
}
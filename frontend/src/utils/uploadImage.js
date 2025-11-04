import axiosInstance from './axios.js';
import { API_PATH } from './apiPath.js';

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // Append image file to form data
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATH.UPLOAD.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (err) {
        console.error('Error uploading image', err);
        throw err; // Rethrow for handling error
    }
}

export default uploadImage;
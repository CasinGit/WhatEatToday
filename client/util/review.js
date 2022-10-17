import axios from "axios";
// import { SERVER_URL } from '@env';
const SERVER_URL = "http://192.168.4.13:8080"

export async function getStoreReviews(storeId) {
    const response = await axios.get(`${SERVER_URL}/api/review/getReviews?rstrId=` + storeId);
    return response.data;
}

export async function writeStoreReview(formData) {
    const response = await axios.postForm(`${SERVER_URL}/api/review/writeReview`, formData,
        { headers: { 'content-type': 'multipart/form-data' } }
    );
    return response.data;
}
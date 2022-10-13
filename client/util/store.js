import axios from "axios";
import { SERVER_URL } from '@env';

// const SERVER_URL = "http://192.168.4.13:8080";
// const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// const SERVER_URL = "http://192.168.0.18:8080"; // 개발용 URL

export async function getStoreNameRequest(storeName) {
    const response = await axios.get(`${SERVER_URL}/api/openApi/getRstrNm?rstrNm=` + storeName);
    return response.data;
}

export async function getStoreInfoRequest() {
    const response = await axios.get(`${SERVER_URL}/api/openApi/getAllRstr`);
    return response.data;
}

export async function getCategoryStore(category) {
    const response = await axios.get(`${SERVER_URL}/api/openApi/getCategoryRstr?category=${category}`);
    return response.data;
}

export async function getSearchMenu(query) {
    const response = await axios.get(`${SERVER_URL}/api/openApi/getSearchMenu?menu=${query}`);
    return response.data;
}
 
export async function getStoreImageRequest(storeId) {
    const response = await axios.get(`${SERVER_URL}/api/openApi/getRstrImg?rstrId=` + storeId);
    return response.data;
}

export async function getStoreMenuRequest(storeId) {
    const response = await axios.get(`${SERVER_URL}/api/openApi/getRstrMenus?rstrId=` + storeId);
    return response.data;
}

export async function getStoreOperRequest(storeId) {
    const response = await axios.get(`${SERVER_URL}/api/openApi/getRstrOprt?rstrId=` + storeId);
    return response.data;
}

export async function getStoreReviews(storeId) {
    const response = await axios.get(`${SERVER_URL}/api/review/getReviews?rstrId=` + storeId);
    return response.data;
}
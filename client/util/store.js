import axios from "axios";

const SERVER_URL = "http://192.168.4.13:8080";

export async function getStoreNameRequest(storeName) {
    const response = await axios.get(`${SERVER_URL}/api/openApi/getRstrNm?rstrNm=`+storeName);
    return response.data;
}

export async function getStoreInfoRequest(storeId) {
    const response = await axios.get(`${SERVER_URL}/api/openApi/getAllRstr`);
    return response.data;
}
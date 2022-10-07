import axios from "axios";

const SERVER_URL = "http://192.168.4.13:8080";

export async function getStoreNameRequest(storeName) {
    const response = await axios.get(`${SERVER_URL}/api/openApi/getRstrNm?search=`+storeName);
    return response.data;
}
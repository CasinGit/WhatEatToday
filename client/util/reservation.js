import axios from "axios";
import { SERVER_URL } from '@env';

// const SERVER_URL = "http://192.168.4.13:8080";
// const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// const SERVER_URL = "http://192.168.0.18:8080"; // 개발용 URL

export async function createReservationRequest(storeId, email, date, time, person, message) {
    const response = await axios.post(`${SERVER_URL}/api/reservation/addReservation `, {
        RSTR_ID: storeId,
        email: email,
        date: date,
        time: time,
        num: person,
        message: message
    });
    return response.data;
}
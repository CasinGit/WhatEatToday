import axios from "axios";
import { SERVER_URL } from '@env';

export async function getReservationHistory(email) {
    const response = await axios.get(`${SERVER_URL}/api/reservation/getReservationHistory?email=` + email);
    return response.data;
}

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

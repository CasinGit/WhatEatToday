import axios from "axios";
import { SERVER_URL } from '@env';

export async function getReservationHistory(email) {
    const response = await axios.get(`${SERVER_URL}/api/reservation/getReservationHistory?email=` + email);
    return response.data;
}

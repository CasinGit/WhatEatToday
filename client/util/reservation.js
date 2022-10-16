import axios from "axios";
import { SERVER_URL } from '@env';
// const SERVER_URL = "http://118.40.42.217:8080"

// 해당 계정에서 예약한 리스트 가져오기
export async function getReservationHistory(email) {
    const response = await axios.get(`${SERVER_URL}/api/reservation/getReservationHistory?email=` + email);
    return response.data;
}

// 예약 등록할때
export async function createReservationRequest(storeId, email, date, time, person, message) {
    const response = await axios.post(`${SERVER_URL}/api/reservation/addReservation`, {
        RSTR_ID: storeId,
        email: email,
        date: date,
        time: time,
        num: person,
        message: message
    });
    return response.data;
}

// 예약한 가게 이용 후 리뷰 등록했을때
export async function writeReviewData(_id) {
    const response = await axios.patch(`${SERVER_URL}/api/reservation/writeReview?id=` + _id);
    return response.data;
}

// 사장님 계정에서 가게 예약 목록 가져올때
export async function getReservationList(rstrId) {
    const response = await axios.get(`${SERVER_URL}/api/reservation/getReservation?rstrId=${rstrId}`);
    return response.data;
}
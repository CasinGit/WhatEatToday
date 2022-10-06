import mongoose from 'mongoose';

let reservationSchema = new mongoose.Schema({
    RSTR_ID: { // 가게 ID
        type: String,
        required: true,
    },
    reserveEmail: { // 예약자 이메일
        type: String,
        required: true,
    },
    reserveDate: { // 예약 방문 날짜
        type: Date,
        required: true,
    },
    reserveTime: { // 예약 방문 시간
        type: String,
        required: true,
    },
    num: { // 예약 방문할 인원
        type: Number,
        required: true,
    },
    message: { // 사장님에게 남길 메세지
        type: String,
    }
})

export default mongoose.model('Reservation', reservationSchema);
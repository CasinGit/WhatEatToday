import mongoose from 'mongoose';

let reservationSchema = new mongoose.Schema({
    RSTR_ID: { // 가게 ID
        type: Number,
        required: true,
    },
    email: { // 예약자 이메일
        type: String,
        required: true,
    },
    date: { // 예약 방문 날짜
        type: String,
        required: true,
    },
    time: { // 예약 방문 시간
        type: String,
        required: true,
    },
    num: { // 예약 방문할 인원
        type: Number,
        required: true,
    },
    message: { // 사장님에게 남길 메세지
        type: String,
        efault: ""
    },
    review: { // 리뷰 등록 여부
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

reservationSchema.virtual("getRstr", {
    localField: "RSTR_ID", // 비교할 로컬 필드(Col)
    ref: "rstr", // 비교해야하는 컬렉션(Table)
    foreignField: "RSTR_ID", // 비교해야하는 컬렉션의 필드
    justOne: true // 한개의 행만 받아와야 할때
});


export default mongoose.model('Reservation', reservationSchema);
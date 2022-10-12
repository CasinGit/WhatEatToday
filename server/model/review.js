import mongoose from 'mongoose';

let reviewSchema = new mongoose.Schema({
    RSTR_ID: { // 가게 ID
        type: String,
        required: true,
    },
    email: { // 리뷰 등록자 이메일
        type: String,
        required: true,
    },
    score: { // 리뷰 별점 number (최대 5점 만점)
        type: Number,
        required: true,
    },
    img: { // 리뷰 이미지
        type: String,
        default: ""
    },
    comment: { // 리뷰 내용 (최대 400자 이하)
        type: String,
    },
})

export default mongoose.model('Review', reviewSchema);
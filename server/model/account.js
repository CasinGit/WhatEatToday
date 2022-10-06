import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    email: { // 유저 이메일
        type: String,
        required: true,
        unique: true,
    },
    password: { // 유저 비밀번호
        type: String,
        required: true,
    },
    ph: { // 연락처
        type: String
    },
    bookmark: { // 즐겨찾기 (찜한가게)
        type: [],
        default: []
    },
    RSTR_ID: { // 가게 ID (사장님 전용)
        type: String,
        default: ""
    },
})

export default mongoose.model('User', userSchema);
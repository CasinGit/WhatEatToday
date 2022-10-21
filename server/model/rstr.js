import mongoose from 'mongoose';

let rstrSchema = new mongoose.Schema({
    RSTR_ID: Number,
    RSTR_NM: String,
    BSNS_STATM_BZCND_NM: String,
})

rstrSchema.virtual("rstrImg", { // 가게 이미지 가져오기
    localField: "RSTR_NM",
    ref: "rstr_img",
    foreignField: "RSTR_NM",
    justOne: true
});

rstrSchema.virtual("getMenu", { // 가게 메뉴 가져오기
    localField: "RSTR_ID",
    ref: "menu",
    foreignField: "RSTR_ID",
});

export default mongoose.model('rstr', rstrSchema, "rstr");
import mongoose from 'mongoose';

let rstrSchema = new mongoose.Schema({
    RSTR_NM: String,
    BSNS_STATM_BZCND_NM: String,
})

rstrSchema.virtual("rstrImg", {
    localField: "RSTR_NM", // 비교할 로컬 필드(Col)
    ref: "rstr_img", // 비교해야하는 컬렉션(Table)
    foreignField: "RSTR_NM", // 비교해야하는 컬렉션의 필드
    justOne: true // 한개의 행만 받아와야 할때
});

export default mongoose.model('rstr', rstrSchema, "rstr");
import mongoose from 'mongoose';

let menuSchema = new mongoose.Schema({
    RSTR_ID: Number,
    MENU_ID: Number,
})

menuSchema.virtual("dscrn", {
    localField: "MENU_ID", // 비교할 로컬 필드(Col)
    ref: "menu_dscrn", // 비교해야하는 컬렉션(Table)
    foreignField: "MENU_ID", // 비교해야하는 컬렉션의 필드
    justOne: true // 한개의 행만 받아와야 할때
});

menuSchema.virtual("foodImg", {
    localField: "MENU_ID", // 비교할 로컬 필드(Col)
    ref: "food_img", // 비교해야하는 컬렉션(Table)
    foreignField: "MENU_ID", // 비교해야하는 컬렉션의 필드
    justOne: true // 한개의 행만 받아와야 할때
});

export default mongoose.model('menu', menuSchema, "menu");
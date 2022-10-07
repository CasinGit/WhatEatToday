import mongoose from 'mongoose';

let foodImgSchema = new mongoose.Schema({
    MENU_ID: Number,
})


export default mongoose.model('food_img', foodImgSchema, "food_img");
import mongoose from 'mongoose';

let rstrImgSchema = new mongoose.Schema({
    RSTR_ID: Number
})

export default mongoose.model('rstr_img', rstrImgSchema, "rstr_img");
import mongoose from 'mongoose';

let rstrSchema = new mongoose.Schema({
    RSTR_NM: String
})

export default mongoose.model('rstr', rstrSchema, "rstr");
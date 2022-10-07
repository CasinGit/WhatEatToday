import mongoose from 'mongoose';

let rstrOprtSchema = new mongoose.Schema({
    RSTR_ID: Number
})

export default mongoose.model('rstr_oprt', rstrOprtSchema, "rstr_oprt");
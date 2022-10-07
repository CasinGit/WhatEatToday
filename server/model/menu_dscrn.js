import mongoose from 'mongoose';

let menuDscrnSchema = new mongoose.Schema({
    MENU_ID: Number,
})


export default mongoose.model('menu_dscrn', menuDscrnSchema, "menu_dscrn");
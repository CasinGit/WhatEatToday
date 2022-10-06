import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_APP_KEY = process.env.GOOGLE_APP_KEY;

export function createStaticMapUri(lat, lng) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=800x450&markers=color:red%7Clabel:S%7C11211%7C11206%7C11222&key=${GOOGLE_APP_KEY}`;
}

export async function getAddresses(lat, lng) {
    const endPoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_APP_KEY}&language=ko`;
    const response = await axios.get(endPoint);
    return response.data.results[0].formatted_address;
}
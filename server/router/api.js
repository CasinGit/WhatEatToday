import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv'; // .env
dotenv.config(); // .env
const API_URL = process.env.API_URL;
const API_TOKEN = process.env.OPEN_API_TOKEN;

import RSTR from '../data/rstr.js'

const router = express.Router();
router
    // 식당명으로 검색
    .get("/getRstrNm", async (req, res) => {
        // console.log(req.query);
        const search = req.query.search;

        const find = RSTR.datas.filter(one => {
            if (String(one.RSTR_NM).match(search)) {
                return one;
            }
        });
        // console.log(find);

        res.status(200).json({ result: true, datas: find });
    })


export default router;
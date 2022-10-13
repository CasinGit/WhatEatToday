import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Token
import dotenv from 'dotenv'; // .env
dotenv.config(); // .env
const JWT_SECRET = process.env.JWT_SECRET; // .env + Token

import Reservation from '../model/reservation.js';
const __dirname = path.resolve(); // import 환경에서는 __dirname을 만들어줘야함

let logon = "Anonymous";
const avatarUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            const filePath = path.join(__dirname, "./public/img");
            console.log(filePath);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
                //? recursive 프로퍼티를 추가하면 중간에 존재하지 않는 디렉토리도 자동으로 생성해줌.
            }
            callback(null, filePath);
        },
        filename(req, file, callback) {
            const ext = path.extname(file.originalname);
            callback(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    fileFilter: function (req, file, callback) {
        if (file.mimetype.startsWith("image")) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 파일 사이즈 제한 (5MB)
});


const router = express.Router();
router
    // 예약 가져오기 (가게 예약 리스트)
    .get("/getReservation", async (req, res) => {
        console.log(req.query);

        Reservation.find({ RSTR_ID: req.query.rstrId }).then((result) => {
            return res.status(200).json({ result: true, datas: result });
        }).catch((err) => {
            return res.status(400).json({ result: false, message: err });
        })
    })

    // 예약 등록    
    .post("/addReservation", async (req, res) => {
        console.log(req.body);

        Reservation.create(req.body).then((result) => {
            return res.status(200).json({ result: true, data: result });
        }).catch((err) => {
            return res.status(400).json({ result: false, message: err });
        })
    })

    // 사용자 이용 내역 가져오기 (사용자 예약 리스트)
    .get("/getReservationHistory", (req, res) => {
        console.log(req.query);

        Reservation.find({ email: req.query.email }).populate("getRstr").lean().then((result) => {
            return res.status(200).json({ result: true, datas: result });
        }).catch((err) => {
            return res.status(400).json({ result: false, message: err });
        })
    })

    //! 사용자 토큰 인증 (이후 라우터는 토큰 필요)
    .use((req, res, next) => {
        console.log("review router 사용자 토큰 인증 실행");
        const authorization = req.get("Authorization");
        if (!authorization || !authorization.startsWith("Bearer")) {
            return res.status(401).json({ result: false, message: "invalid token" });
        }

        const token = authorization.split(/\s/)[1];
        try {
            const payload = jwt.verify(token, JWT_SECRET);
            req.logonId = payload.id; // req.logonId에 토큰 id 입력
            logon = payload.id; // logon 변수에 토큰 id 입력
            console.log("토근 인증 성공!");
        } catch (e) {
            return res.status(401).json({ result: false, message: "unauthorized token" });
        }

        next();
    })


export default router;
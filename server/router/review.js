import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Token
import dotenv from 'dotenv'; // .env
dotenv.config(); // .env
const JWT_SECRET = process.env.JWT_SECRET; // .env + Token

import Review from '../model/review.js';
const __dirname = path.resolve(); // import 환경에서는 __dirname을 만들어줘야함

const imageUpload = multer({
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
    // 리뷰 데이터 요청
    .get('/getReviews', (req, res) => {
        console.log("리뷰 데이터 요청", req.query);

        Review.find({ RSTR_ID: req.query.rstrId }).then((result) => {
            return res.status(200).json({ result: true, datas: result });
        }).catch((err) => {
            return res.status(400).json({ result: false, message: err });
        })
    })

    // 리뷰 데이터 등록
    .post("/writeReview", imageUpload.single("file"), async (req, res) => {
        console.log(req.body);
        console.log(req.file);
        const fileUri = req.file ? `/img/${req.file.filename}` : null;
        const bodyData = JSON.parse(req.body.data);

        const mergeData = {
            ...bodyData,
            img: fileUri
        };

        console.log(mergeData);

        Review.create(mergeData).then((result) => {
            return res.status(200).json({ result: true, data: result });
        }).catch((err) => {
            return res.status(400).json({ result: false, message: err });
        })
        // return res.status(200).json({ result: true });
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
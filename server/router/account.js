import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Token
import dotenv from 'dotenv'; // .env
dotenv.config(); // .env
const JWT_SECRET = process.env.JWT_SECRET; // .env + Token

import Account from '../model/account.js';

const router = express.Router();
router
    // 로그인 요청
    .post('/auth', (req, res) => {
        console.log(req.body);

        if (req.body.email && req.body.password) { // email AND password
            Account.findOne({ email: req.body.email }).then((result) => {
                console.log(result);
                const chk = bcrypt.compareSync(req.body.password, result.password);
                if (chk) {
                    const token = jwt.sign({ email: req.body.email }, JWT_SECRET, {
                        // expiresIn: 60 * 60 * 12 // 토근 유효기간 => 12시간
                    });
                    res.status(200).json({ result: chk, datas: result, token });
                } else {
                    res.status(409).json({ result: chk, message: "비밀번호가 다릅니다." });
                }
            }).catch(err => {
                console.log("아이디를 찾을 수 없음.");
                res.status(409).json({ result: false, message: "아이디를 찾을 수 없습니다." });
            })
        } else {
            res.status(409).json({ result: false, message: "이메일 또는 비밀번호가 입력되지 않음" });
        }
    })

    // 회원가입 요청
    .post('/register', async (req, res) => {
        console.log(req.body);

        const password = String(req.body.password).replace(/ /g, "");

        if (!password) {
            res.status(400).json({ result: false, message: "Null Password" });
            console.log("패스워드 비어있음");
        } else {
            const data = await bcrypt.hash(req.body.password, 10);
            const userObj = { ...req.body, password: data };

            Account.create(userObj).then(() => {
                res.status(201).json({ result: true, message: "User Register!", datas: userObj });
                console.log("User Register!");
            }).catch(err => {
                res.status(409).json({ result: false, message: err.message })
                console.log("데이터 등록 중 문제가 발생했습니다. (code:-32): " + err.message);
            });
        }
    })

    .get("/getFav", async (req, res) => {
        console.log(req.query);

        Account.findOne({ email: req.query.email }).select(["bookmark", "-_id"]).then((result) => {
            res.status(201).json({ result: true, datas: result.bookmark });
        }).catch(err => {
            res.status(409).json({ result: false, message: err.message })
        });
    })

    .post("/addFav", async (req, res) => {
        console.log(req.body);

        Account.findOneAndUpdate({ email: req.body.email }, { $addToSet: { bookmark: req.body.rstrId } }, { returnDocument: "after" }).then((result) => {
            res.status(201).json({ result: true, datas: result.bookmark });
        }).catch(err => {
            res.status(409).json({ result: false, message: err.message })
        });
    })

    .post("/removeFav", async (req, res) => {
        console.log(req.body);

        Account.findOneAndUpdate({ email: req.body.email }, { $pull: { bookmark: req.body.rstrId } }, { returnDocument: "after" }).then((result) => {
            res.status(201).json({ result: true, datas: result.bookmark });
        }).catch(err => {
            res.status(409).json({ result: false, message: err.message })
        });
    })

    //! 사용자 토큰 인증 (이후 라우터는 토큰 필요)
    .use((req, res, next) => {
        console.log("사용자 토큰 인증 실행");
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
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import account from './router/account.js';
const __dirname = path.resolve(); // import 환경에서는 __dirname을 만들어줘야함

const app = express();
app.use(cors()); // Cross Origin Resource Sharing 허용
app.use(morgan("dev")) //? morgan 미들웨어
app.use(express.json()); // express에서 JSON 요청 받기
app.use(express.urlencoded({ "extended": true })); // POST 요청 받기
app.use(express.static("public")); // public 폴더 스태틱
app.use("/api/account", account); //? api/account 라우터 설정

dotenv.config(); // .env config
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, { dbName: "TeamProject" })
    .then(() => {
        console.log("connected MONGODB");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use((err, req, res, next) => {
    res.send(err.message);
})

/////////////////////////////////////////////////////////////////
app.listen(8080, () => {
    console.clear(); // console clearing...
    console.log('[LOG] Express Server Starting...');
    console.log(".env cwd 경로 => ", process.cwd());
});
import express from 'express';
import dotenv from 'dotenv'; // .env
import fs from 'fs'
dotenv.config(); // .env
const API_URL = process.env.API_URL;
const API_TOKEN = process.env.OPEN_API_TOKEN;

import RSTR from '../model/rstr.js' // mongo 식당 기본 정보
import RSTR_OPRT from '../model/rstr_oprt.js' // 식당 운영 정보
import RSTR_IMG from '../model/rstr_img.js' // 식당 이미지 정보
import MENU from '../model/menu.js' // 식당 메뉴 정보
import MENU_DSCRN from '../model/menu_dscrn.js' // 메뉴 설명 정보
import FOOD_IMG from '../model/food_img.js' // 음식 이미지 정보
// import FOOD_IMG from '../data/food_img.js' // 음식 이미지 정보
// import test from '../data/test.json'

const router = express.Router();
router
    // 식당명으로 검색
    .get("/getRstrNm", async (req, res) => {
        // console.log(req.query);
        const search = req.query.rstrNm;
        if (!search) return res.status(400).json({ result: false, message: "Not Found Query" });

        const find = await RSTR.find({ RSTR_NM: { $regex: search } });

        res.status(200).json({ result: true, length: find.length, datas: find });
    })

    // 전체 식당 가져오기
    .get("/getAllRstr", async (req, res) => {
        const filter = ['제과점영업', '분식', '다방', '김밥(도시락)', '기타 휴게음식점', '패스트푸드', '정종/대포집/소주방', '백화점', '기타(편의점)', '철도역구내', '커피숍', '푸드트럭', '아이스크림', '전통찻집', '라이브카페', '외국음식전문점(인도,태국등)'];

        RSTR.find({ BSNS_STATM_BZCND_NM: { $nin: filter } }).lean().then((result) => {
            const cates = new Set();
            result.forEach((elm) => {
                if (elm.BSNS_STATM_BZCND_NM) cates.add(elm.BSNS_STATM_BZCND_NM);
            })
            console.log(cates);

            res.status(200).json({ result: true, length: result.length, datas: result });
        }).catch((err) => {
            res.status(501).json({ result: false, message: err });
        });
    })

    // 식당 운영 정보 가져오기
    .get("/getRstrOprt", async (req, res) => {
        // console.log(req.query);
        const search = req.query.rstrId;
        if (!search) return res.status(400).json({ result: false, message: "Not Found Query" });

        const find = await RSTR_OPRT.find({ RSTR_ID: search });
        res.status(200).json({ result: true, length: find.length, datas: find });
    })

    // 식당 이미지 정보 가져오기
    .get("/getRstrImg", async (req, res) => {
        // console.log(req.query);
        const search = req.query.rstrId;
        console.log(search)
        if (!search) return res.status(400).json({ result: false, message: "Not Found Query" });

        const find = await RSTR_IMG.find({ RSTR_ID: search });
        res.status(200).json({ result: true, length: find.length, datas: find });
    })

    // 식당 메뉴 불러오기 (식당 메뉴 불러오면서 메뉴설명정보, 음식 이미지 데이터 같이 가져옴)
    .get("/getRstrMenus", async (req, res) => {
        // console.log(req.query);
        const search = req.query.rstrId;
        if (!search) return res.status(400).json({ result: false, message: "Not Found Query" });

        // const find = await MENU.find({ RSTR_ID: search }).populate(["dscrn", "foodImg"]).lean();
        const find = await MENU.find({ RSTR_ID: search }).populate("dscrn").populate("foodImg").lean();
        res.status(200).json({ result: true, length: find.length, datas: find });
    })

    // 카테고리별 식당 불러오기
    .get("/getCategoryRstr", async (req, res) => {
        console.log(req.query);

        RSTR.find({ BSNS_STATM_BZCND_NM: req.query.category }).populate("rstrImg").lean().then((result) => {
            res.status(200).json({ result: true, length: result.length, datas: result });
        }).catch((err) => {
            res.status(501).json({ result: false, message: err });
        });
    })

    //! 개발 전용 기능
    .get("/getAPI", async (req, res) => {
        // https://gwangju.openapi.redtable.global/api/menu/korean : 메뉴 정보
        // https://gwangju.openapi.redtable.global/api/menu-dscrn/korean : 메뉴 설명 정보
        const targetURL = "https://gwangju.openapi.redtable.global/api/menu-dscrn/korean";
        const serviceKey = "rIl1Ih78d0tmCmOB7kD4Yfraw8DNfGqePfQHTlVAOkriV6iSmW8BLMETQRLkZamG";

        const response = await axios.get(`${targetURL}`, {
            params: { serviceKey }
        });
        // console.log(response);

        const cnt = response.data.header.totalCount; // 토탈 행 카운터
        // console.log(cnt);

        let result = [];
        let roofCnt = 0;
        for (let i = 0; i < cnt; i = i + 1000) {
            roofCnt++;
            const response = await axios.get(`${targetURL}`, {
                params: { serviceKey, pageNo: roofCnt }
            });
            // datas = [...datas, response.data.body];
            result.push(...response.data.body);
        }

        // console.log(result.length);
        fs.writeFileSync("test.json", JSON.stringify(result));

        res.status(200).json({ result: true, length: result.length, message: "API 데이터 불러오기&병합 완료" });
    })

export default router;
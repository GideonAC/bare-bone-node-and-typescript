"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const axios_1 = __importDefault(require("axios"));
//import pupeteer from "pupeteer";
const cheerio = __importStar(require("cheerio"));
let description = '';
const createServer = (req, res) => {
    let datas = "";
    req.on("data", (chunk) => {
        datas += chunk.toString();
    });
    req.on("end", async () => {
        let work = JSON.parse(datas);
        let url = JSON.parse(datas);
        try {
            axios_1.default.get(url).then((response) => {
                let imageArray = [];
                if (response.status === 200) {
                    const $ = cheerio.load(response.data);
                    let title = $('title').text();
                    let meta = $('meta[name="description"]').attr('content');
                    console.log(meta);
                    if (meta) {
                        description = meta;
                    }
                    else
                        description = "";
                    let parsedImage = $('img');
                    if (parsedImage.length > 0) {
                        for (let single of parsedImage) {
                            let image = $(single).attr('src');
                            image ? imageArray.push(image) : imageArray = [""];
                        }
                    }
                    res.write(`The title is :${title}\n`);
                    res.write(`description: ${description}\n`);
                    res.end(`imageArray: ${imageArray}`);
                }
                else
                    throw new Error('Invalid url');
            });
        }
        catch (error) {
        }
        // //const browser =await pupeteer.launch()
        // const page = await browser.newPage()
        // console.log(work)
        // await page.goto(url)
        // const title = await page.title()
        // const description = await page.evaluate(() => {
        //     const metaDescription = document.querySelector('meta[name = "description"]');
        //     return metaDescription ? metaDescription.getAttribute("content") : "";
        // })
        // const imageUrl =await page.evaluate(()=>{
        //     let srcs = Array.from(document.querySelectorAll("img")).map((a)=>a.getAttribute("src"))
        //     return srcs
        // })
        // work = {
        //     title: title,
        //     description: description,
        //     imageUrl: imageUrl
        // }
        // res.writeHead(200, {"Content-Type": "application/json"})
        // res.end(JSON.stringify({
        //     success: true,
        //     message: work
        // }))
    });
};
exports.createServer = createServer;

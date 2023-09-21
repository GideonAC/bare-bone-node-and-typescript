import fs from "fs";
import axios from "axios";
import { IncomingMessage, ServerResponse } from "http";
//import pupeteer from "pupeteer";
import  * as cheerio  from "cheerio";
let description:any = ''
export const createServer = (req: IncomingMessage, res: ServerResponse) => {
    let datas = "";

    req.on("data", (chunk)=>{
        datas += chunk.toString();
    })
    req.on("end", async()=>{
          let work = JSON.parse(datas)
        
         let url = JSON.parse(datas)
        try {
            axios.get(url).then((response)=>{
                let imageArray: string[] = []
                if(response.status === 200){

                    const $ = cheerio.load(response.data)
                   
                    let title = $('title').text()
                    let meta = $('meta[name="description"]').attr('content')
                    console.log(meta)
                    if(meta){
                        description = meta
                    }else description = ""

                    let parsedImage = $('img')
                    
                    if(parsedImage.length > 0){
                        for(let single of parsedImage){
                            let image = $(single).attr('src')
                            image ? imageArray.push(image) : imageArray = [""]
                        }
                    }
                    res.write(`The title is :${title}\n`)
                    res.write(`description: ${description}\n`)
                    res.end(`imageArray: ${imageArray}`)
                }else throw new Error('Invalid url')
            })
        } catch (error) {
            
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
    })
}
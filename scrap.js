import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'

const url = "https://oilprice.com/oil-price-charts/"

async function scrappingOilPrices() {
    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        let data1 = []
        let data2 = []
        let theads, cols, col
        let rows = $('[data-id="34"] tbody tr')

        rows.each((index, el) => {
            theads = $(el).find('td.sub_heading').text().trim().replace(/[\n\r]+/g, '')
            data2 = []
            cols = $(el).find('td').each((colidx, colel) => {
                col = $(colel).text().replace(/[\n\r]+/g, '')
                data2.push(col)
            })
            data1.push({ theads, ...data2 })
        })

        fs.writeFile("oil_prices.json", JSON.stringify(data1, null, 2), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Successfully written data to file");
        })
    } catch (err) {
        console.log(err)
    }
}

fs.readFile("oil_prices.json", 'utf-8', (err, data) => {
    if (data) {
        const data11 = JSON.parse(data)
        let datam = []
        data11.filter((val, index) => {
            if (val.theads === "") {
                return
            }
            else {
                datam.push(val)
            }
        })
        // data11
        datam.map((val) => {
            console.log(val.theads)
        })

        // data11.map((val) => {
        //     console.log(val["0"], val["1"], val["2"])
        // })
        // console.log("oil price data: ", data)
        // console.log("oil price data: ", datam[1])
    }
    else {
        console.log("error at reading oil prices data: ", err)
    }

    // console.log("data here: ", data)

    // const names = [];
    // console.log(data11.length)

    // for (let i = 0; i < data11.length; i++) {

    //     if (!data11[i].hasOwnProperty("2")) {
    //         continue;
    //     }

    //     names.push(data11[i]["2"]);
    // }

    // data11.map((val) => {
    //     console.log("value goes here: ", val)
    //     // for (let i = 0; i <= index; i++)
    //     // {
    //     // }

    //     // for (var i = 0; i < Object.keys.length; i++) {
    //     //     map.set(Object.keys[i], Object.values[i]);
    //     // } 
    // })
    // console.log("parsed data : ", data11)

    // Loop to insert key & value in this object one by one
})

scrappingOilPrices()
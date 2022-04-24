import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const url = "https://oilprice.com/oil-price-charts/";


async function scrappingOilPrices() {
    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        let data1 = [];
        let data2 = [];
        let theads, cols, col;
        let rows = $('[data-id="1"] tbody tr');

        rows.each((index, el) => {
            theads = $(el).find('th').text().trim().replace(/[\n\r]+/g, '');
            data2 = [];
            cols = $(el).find('td').each((colidx, colel) => {
                col = $(colel).text().replace(/[\n\r]+/g, '');
                data2.push(col)
            })
            data1.push({ theads, ...data2 })
        })

        // console.log(listItems.length)
        // for (let i = 0; i < listItems.length; i++) {
        //     if (i === 0) {
        //         oil_prices = listItems[i]
        //         console.log(oil_prices)
        //     }
        //     return
        // }
        // console.log(oil_prices)

        // // const oil_prices = [];
        // listItems.each((idx, el) => {
        //     const oil_price = { featrures_and_indexes: "", last: "", changes: "", change_percent: "" };
        //     oil_price.featrures_and_indexes = $(el).children("span").text();
        //     oil_price.last = $(el).addClass('last_price').text();
        //     oil_price.changes = $(el).addClass('change_up flat_change_cell').text();
        //     oil_price.change_percent = $(el).addClass('change_up_percent percent_change_cell').text()

        //     oil_prices.push(oil_price)
        // })
        // console.dir(oil_prices)

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
        data11.map((val) => {
            console.log(val["1"], val["2"])
        })
    }
    else {
        console.log("error at reading oil prices data: ", err)
    }



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
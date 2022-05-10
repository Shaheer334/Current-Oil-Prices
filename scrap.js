import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import countries_name from './api/db/models/countryModel.js'
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

// Reading files for countries name and storing data into dummy database
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
        let countries
        datam.map((val) => {
            console.log("data before", val[1])
             countries = new countries_name({
                country_name: val.theads
            })
            countries.save()
            console.log("countries saved", countries)
        })
    }
    else {
        console.log("error at reading oil prices data: ", err)
    }
})

scrappingOilPrices()
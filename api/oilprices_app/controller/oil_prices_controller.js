import countries_name from '../../db/models/countryModel.js'
import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'

export const scrappingOilPrices = async (req, res) => {
    try {
        // let tabledata = await countries_name.countDocuments();
        // if (tabledata !== 0) {
        //     await countries_name.deleteMany();
        //     console.log(tabledata, 'documents deleted successfully')
        // }
        const url = "https://oilprice.com/oil-price-charts/"
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
                console.error(err)
                return
            }
            console.log("Successfully written data to file")
        })

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
                datam.map(async (val) => {
                    // console.log("data before", val[1])
                    countries = new countries_name({
                        country_name: val.theads
                    })
                    await countries.save()
                    console.log("countries saved", countries)
                })
                return res.send({
                    code: res.statusCode,
                    msg: 'Data has been read successfully',
                    data: { countries },
                })
            }
            else {
                return res.send({
                    code: res.statusCode,
                    msg: `error at country: ${err}`,
                    data: {}
                })
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

export const veiw_all_oil_prices = async (req, res) => {
    try {
        const prices = await current_oil_prices.find({})
        res.status(200).json({
            code: res.statusCode,
            msg: 'current oil prices',
            data: prices,
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            code: res.statusCode,
            msg: 'something wrong while getting OIL Prices',
            data: {},
            success: false
        })
    }

} 
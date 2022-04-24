import current_oil_prices from '../../db/models/oilPricesModel.js'
import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'

export const scrappingOilPrices = async (req, res) => {
    try {
        let tabledata = await current_oil_prices.countDocuments();
        if (tabledata !== 0) {
            await current_oil_prices.deleteMany();
            console.log(tabledata, 'documents deleted successfully')
        }
        const url = "https://oilprice.com/oil-price-charts/"
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        let data1 = []
        let data2 = []
        let cols, col
        let rows = $('[data-id="1"] tbody tr')

        rows.each((index, el) => {
            // theads = $(el).find('th').text().trim().replace(/[\n\r]+/g, '')
            data2 = []
            cols = $(el).find('td').each((colidx, colel) => {
                col = $(colel).text().replace(/[\n\r]+/g, '')
                data2.push(col)
            })
            data1.push({ ...data2 })
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
                let oilPricee;
                const data11 = JSON.parse(data)
                data11.map(async (val) => {
                    // console.log(val["1"], val["2"])
                    oilPricee = new current_oil_prices({
                        t_name: val["1"],
                        last_oil_price: val["2"]
                    })
                    await oilPricee.save()
                });
                return res.send({
                    code: res.sendStatus,
                    msg: 'Data has been read successfully',
                    data: { oilPricee },
                })
            }
            else {
                return res.send({
                    code: res.sendStatus,
                    msg: 'error at reading oil prices data',
                    data: {}
                })
                // console.log("error at reading oil prices data: ", err)
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
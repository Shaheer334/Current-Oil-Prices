import express from 'express'
import { scrappingOilPrices, veiw_all_oil_prices } from '../controller/oil_prices_controller.js'

const oil_prices_router = express.Router()

oil_prices_router.get('/oil-price', veiw_all_oil_prices)
oil_prices_router.post('/current-oil-prices', scrappingOilPrices)

export default oil_prices_router
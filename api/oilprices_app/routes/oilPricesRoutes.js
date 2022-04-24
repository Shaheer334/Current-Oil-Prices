import express from 'express'
import { scrappingOilPrices } from '../controller/oil_prices_controller.js'

const oil_prices_router = express.Router()

oil_prices_router.post('/current-oil-prices', scrappingOilPrices)

export default oil_prices_router
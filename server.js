import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import oil_prices_router from './api/oilprices_app/routes/oilPricesRoutes.js'
import morgan from 'morgan'
import databaseConnection from './api/db/db.js'
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'))

app.use('/oilprices', oil_prices_router);

const port = process.env.PORT || 5000;
const host = process.env.HOST || '127.0.0.1';
const api = process.env.API;

app.get('/', (req, res) => res.send('app is running'));


// database connection will go here
databaseConnection()
// global error handler will ho here

// port connection
const server = app.listen(port, () => console.log(`server is running at http://${host}:${port}`))
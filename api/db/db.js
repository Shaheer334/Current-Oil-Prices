import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectionOptions = { useNewUrlParser: true }

const databaseConnection = () => {
    try {
        mongoose.connect(process.env.LOCAL_DB, connectionOptions)
        console.log("Oil Prices DB has connected")
    } catch (err) {
        console.log("DB is not connected" + err)
    }
}

export default databaseConnection
import mongoose from "mongoose"
const Schema = mongoose.Schema

const oilPricesSchema = new Schema({
    t_name: {
        type: String,
        trim: true
    },
    last_oil_price: {
        type: String,
        trim: true
    }
}, {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id
            delete ret.__v
            delete ret.createAt
            delete ret.updateAt
            delete ret.hash
        }
    },
    timestamps: true
})

const current_oil_prices = mongoose.model('oilprices', oilPricesSchema)

export default current_oil_prices
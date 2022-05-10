import mongoose from "mongoose"
const Schema = mongoose.Schema


const country_wise_price_data = new Schema({
    oil_product_name: {
        type: String,
        trim: true
    },
    current_oil_price: {
        type: String,
        trim: true
    },
    change_oil_price: {
        type: String,
        trim: true
    },
    countryId: {
        type: mongoose.Types.ObjectId,
        ref: 'country'
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

export const country_wise_data = mongoose.model('oilprice', country_wise_price_data)
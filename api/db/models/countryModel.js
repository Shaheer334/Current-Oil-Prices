import mongoose from "mongoose";

const Schema = mongoose.Schema

const country_name_model = new Schema({
    country_name: {
        type: String,
        trim: true
    },
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


const countries_name = mongoose.model('country', country_name_model)

export default countries_name
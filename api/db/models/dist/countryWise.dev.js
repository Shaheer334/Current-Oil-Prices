"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.country_wise_data = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var country_wise_price_data = new Schema({
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
    type: _mongoose["default"].Types.ObjectId,
    ref: 'country'
  }
}, {
  toJSON: {
    virtuals: true,
    transform: function transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.createAt;
      delete ret.updateAt;
      delete ret.hash;
    }
  },
  timestamps: true
});

var country_wise_data = _mongoose["default"].model('oilprice', country_wise_price_data);

exports.country_wise_data = country_wise_data;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.country_name = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var country_name_model = new Schema({
  country_name: {
    type: String,
    trim: true
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

var country_name = _mongoose["default"].model('country', country_name_model);

exports.country_name = country_name;
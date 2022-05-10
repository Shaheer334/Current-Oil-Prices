"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var countries_name = _mongoose["default"].model('country', country_name_model);

var _default = countries_name;
exports["default"] = _default;
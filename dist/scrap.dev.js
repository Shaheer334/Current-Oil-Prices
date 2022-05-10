"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _axios = _interopRequireDefault(require("axios"));

var cheerio = _interopRequireWildcard(require("cheerio"));

var _fs = _interopRequireDefault(require("fs"));

var _countryModel = _interopRequireDefault(require("./api/db/models/countryModel.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var url = "https://oilprice.com/oil-price-charts/";

function scrappingOilPrices() {
  var _ref, data, $, data1, data2, theads, cols, col, rows;

  return regeneratorRuntime.async(function scrappingOilPrices$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get(url));

        case 3:
          _ref = _context.sent;
          data = _ref.data;
          $ = cheerio.load(data);
          data1 = [];
          data2 = [];
          rows = $('[data-id="34"] tbody tr');
          rows.each(function (index, el) {
            theads = $(el).find('td.sub_heading').text().trim().replace(/[\n\r]+/g, '');
            data2 = [];
            cols = $(el).find('td').each(function (colidx, colel) {
              col = $(colel).text().replace(/[\n\r]+/g, '');
              data2.push(col);
            });
            data1.push(_objectSpread({
              theads: theads
            }, data2));
          });

          _fs["default"].writeFile("oil_prices.json", JSON.stringify(data1, null, 2), function (err) {
            if (err) {
              console.error(err);
              return;
            }

            console.log("Successfully written data to file");
          });

          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

_fs["default"].readFile("oil_prices.json", 'utf-8', function (err, data) {
  if (data) {
    var data11 = JSON.parse(data);
    var datam = [];
    data11.filter(function (val, index) {
      if (val.theads === "") {
        return;
      } else {
        datam.push(val);
      }
    }); // data11

    var countries;
    datam.map(function (val) {
      console.log("data before", val[1]);
      countries = new _countryModel["default"]({
        country_name: val.theads
      });
      countries.save();
      console.log("countries saved", countries);
    });
  } else {
    console.log("error at reading oil prices data: ", err);
  }
});

scrappingOilPrices();
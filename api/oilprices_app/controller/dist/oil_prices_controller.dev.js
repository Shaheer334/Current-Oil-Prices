"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.veiw_all_oil_prices = exports.scrappingOilPrices = void 0;

var _countryModel = _interopRequireDefault(require("../../db/models/countryModel.js"));

var _axios = _interopRequireDefault(require("axios"));

var cheerio = _interopRequireWildcard(require("cheerio"));

var _fs = _interopRequireDefault(require("fs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var scrappingOilPrices = function scrappingOilPrices(req, res) {
  var url, _ref, data, $, data1, data2, theads, cols, col, rows;

  return regeneratorRuntime.async(function scrappingOilPrices$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // let tabledata = await countries_name.countDocuments();
          // if (tabledata !== 0) {
          //     await countries_name.deleteMany();
          //     console.log(tabledata, 'documents deleted successfully')
          // }
          url = "https://oilprice.com/oil-price-charts/";
          _context2.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get(url));

        case 4:
          _ref = _context2.sent;
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
              datam.map(function _callee(val) {
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        // console.log("data before", val[1])
                        countries = new _countryModel["default"]({
                          country_name: val.theads
                        });
                        _context.next = 3;
                        return regeneratorRuntime.awrap(countries.save());

                      case 3:
                        console.log("countries saved", countries);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              });
              return res.send({
                code: res.statusCode,
                msg: 'Data has been read successfully',
                data: {
                  countries: countries
                }
              });
            } else {
              return res.send({
                code: res.statusCode,
                msg: "error at country: ".concat(err),
                data: {}
              });
            }
          });

          _context2.next = 19;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send(_context2.t0.message);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.scrappingOilPrices = scrappingOilPrices;

var veiw_all_oil_prices = function veiw_all_oil_prices(req, res) {
  var prices;
  return regeneratorRuntime.async(function veiw_all_oil_prices$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(current_oil_prices.find({}));

        case 3:
          prices = _context3.sent;
          res.status(200).json({
            code: res.statusCode,
            msg: 'current oil prices',
            data: prices,
            success: true
          });
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json({
            code: res.statusCode,
            msg: 'something wrong while getting OIL Prices',
            data: {},
            success: false
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.veiw_all_oil_prices = veiw_all_oil_prices;
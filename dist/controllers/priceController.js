"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const priceModel_1 = __importDefault(require("../models/priceModel"));
const { API_SERVER_HOST, PORT } = process.env;
const getProductByBarcode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { barcode } = req.params;
    const result = yield priceModel_1.default.getProductByBarcode(barcode);
    let cleanDate = result[0].registered_date.getFullYear() + '-' + result[0].registered_date.getMonth() + '-' + result[0].registered_date.getDate();
    const readablePrice = String(result[0].price).split("").reverse().reduce((prev, cur, idx) => {
        if (idx !== 0 && idx % 3 === 0)
            prev.push(',');
        prev.push(cur);
        return prev;
    }, []).reverse().reduce((prev, cur) => {
        return prev + cur;
    }, '');
    result[0] = Object.assign(Object.assign({}, result[0]), { registered_date: cleanDate, price: readablePrice });
    const env = {
        API_SERVER_HOST: API_SERVER_HOST,
        PORT: PORT
    };
    return res.render('priceTag', { product: result[0], env: env });
});
module.exports = {
    getProductByBarcode: getProductByBarcode,
};

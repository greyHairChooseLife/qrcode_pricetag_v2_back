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
//import db from '../config/db';
//db.promise();
const db = require('../config/db').promise();
const getProductByBarcode = (barcode) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db.query(`SELECT product.*, supplier.margin_ratio FROM product JOIN supplier ON product.supplier_id=supplier.id WHERE barcode=?`, [barcode]);
    result[0] = Object.assign(Object.assign({}, result[0]), { price: Math.round(result[0].purchased_cost * (1 + Number(result[0].margin_ratio)) / 100) * 100 });
    if (result == undefined) {
        return null;
    }
    else {
        return result;
    }
});
module.exports = {
    getProductByBarcode: getProductByBarcode,
};

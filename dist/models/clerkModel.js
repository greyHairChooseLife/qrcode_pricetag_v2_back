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
const getCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    let [result] = yield db.query(`SELECT mobile, created_date FROM customer WHERE created_date >= date_add(NOW(), interval -12 hour)`);
    result = result.reduce((prev, cur) => {
        if (prev.find(e => { return e.mobile === cur.mobile; }) === undefined)
            prev.push(cur);
        return prev;
    }, []);
    if (result == undefined) {
        return null;
    }
    else {
        return result;
    }
});
const getCustomerByMobile = (mobile) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db.query(`SELECT product.*, customer.quantity FROM product JOIN customer ON product.barcode=customer.barcode WHERE customer.mobile=${mobile} AND created_date >= date_add(NOW(), interval -12 hour)`);
    for (var i = 0; i < result.length; i++) {
        result[i].margin_ratio = yield db.query(`SELECT supplier.margin_ratio FROM supplier JOIN customer ON supplier.id=${result[i].supplier_id}`);
        result[i].margin_ratio = result[i].margin_ratio[0][0].margin_ratio;
        result[i].price = Math.round(result[i].purchased_cost * (1 + Number(result[i].margin_ratio)) / 100) * 100;
    }
    if (result == undefined) {
        return null;
    }
    else {
        return result;
    }
});
module.exports = {
    getCustomers: getCustomers,
    getCustomerByMobile: getCustomerByMobile,
};

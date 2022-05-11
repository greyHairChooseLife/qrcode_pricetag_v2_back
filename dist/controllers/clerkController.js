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
const clerkModel_1 = __importDefault(require("../models/clerkModel"));
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield clerkModel_1.default.getCustomers();
    return res.render('clerk', { customers: result });
});
const getCustomerByMobile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield clerkModel_1.default.getCustomerByMobile(req.params.mobile);
    const total = result.reduce((prev, cur) => { return prev + cur.price * cur.quantity; }, 0);
    const readableTotal = String(total).split("").reverse().reduce((prev, cur, idx) => {
        if (idx !== 0 && idx % 3 === 0)
            prev.push(',');
        prev.push(cur);
        return prev;
    }, []).reverse().reduce((prev, cur) => {
        return prev + cur;
    }, '');
    return res.render('clerkByMobile', { data: result, mobile: req.params.mobile, totalAmount: readableTotal });
});
module.exports = {
    getCustomers: getCustomers,
    getCustomerByMobile: getCustomerByMobile,
};

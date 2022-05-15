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
const customerModel_1 = __importDefault(require("../models/customerModel"));
const { API_SERVER_HOST, PORT } = process.env;
const getCartByMobile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // generate cookie if it's needed
    const cookies = req.headers.cookie;
    let clientId;
    if (cookies !== undefined) {
        const cookiesParsed = cookies.split('; ').map(ele => {
            return ele.split('=');
        });
        clientId = cookiesParsed.find(ele => {
            if (ele[0] === 'JEIL')
                return true;
        });
        if (clientId !== undefined) {
            clientId = clientId[1];
        }
        else {
            res.cookie('JEIL', req.params.clientId, {
                maxAge: 1000 * 60 * 60 * 10,
            });
        }
    }
    else {
        res.cookie('JEIL', req.params.clientId, {
            maxAge: 1000 * 60 * 60 * 10,
        });
    }
    let result = yield customerModel_1.default.getCartByMobile(req.params.clientId);
    const env = {
        API_SERVER_HOST: API_SERVER_HOST,
        PORT: PORT
    };
    return res.render('customerCart', { clientId: req.params.clientId, products: result, env: env });
});
const postCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile, productBarcode, productCount } = req.body;
    // generate cookie if it's needed
    const cookies = req.headers.cookie;
    if (cookies !== undefined) {
        const cookiesParsed = cookies.split('; ').map(ele => {
            return ele.split('=');
        });
        let found = cookiesParsed.find(ele => {
            if (ele[0] === 'JEIL')
                return true;
        });
        if (found === undefined) {
            res.cookie('JEIL', mobile, {
                maxAge: 1000 * 60 * 60 * 10,
            });
        }
    }
    else {
        res.cookie('JEIL', mobile, {
            maxAge: 1000 * 60 * 60 * 10,
        });
    }
    yield customerModel_1.default.postCart({
        clientId: mobile,
        barcode: productBarcode,
        quantity: productCount,
    });
    return res.redirect(`http://${API_SERVER_HOST}:${PORT}/customerCart/${mobile}`);
});
const putCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customerModel_1.default.putCart(req.body);
    return res.redirect(`http://${API_SERVER_HOST}:${PORT}/customerCart/${req.body.mobile}`);
});
const deleteCart = (req, res) => {
    customerModel_1.default.deleteCart(req.body);
    return res.redirect(`http://${API_SERVER_HOST}:${PORT}/customerCart/${req.body.mobile}`);
};
module.exports = {
    getCartByMobile: getCartByMobile,
    postCart: postCart,
    putCart: putCart,
    deleteCart: deleteCart,
};

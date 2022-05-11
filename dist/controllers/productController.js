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
const productModel_1 = __importDefault(require("../models/productModel"));
const getProductsBySupplierId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { supplier_id } = req.params;
    const result = yield productModel_1.default.getProductsBySupplierId(supplier_id);
    return res.json(result);
});
const postProductsBySupplierId = (req, res) => {
    const result = productModel_1.default.postProductsBySupplierId(req.body);
    return res.json(result);
};
const putProductsBySupplierId = (req, res) => {
    const result = productModel_1.default.putProductsBySupplierId(req.body);
    return res.json(result);
};
const deleteProductsBySupplierId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { supplierId } = req.body;
    const result = yield productModel_1.default.deleteProductsBySupplierId(supplierId);
    return res.json(result);
});
module.exports = {
    getProductsBySupplierId: getProductsBySupplierId,
    postProductsBySupplierId: postProductsBySupplierId,
    putProductsBySupplierId: putProductsBySupplierId,
    deleteProductsBySupplierId: deleteProductsBySupplierId,
};

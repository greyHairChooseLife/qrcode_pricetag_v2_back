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
const getProductsBySupplierId = (arg) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db.query(`SELECT * FROM product WHERE supplier_id=${arg}`);
    if (result == undefined) {
        return null;
    }
    else {
        return result;
    }
});
const postProductsBySupplierId = (form) => {
    for (let i = 0; i < form.length; i++) {
        const { product_code = '', name, size = '', purchased_cost, supplier_id, barcode } = form[i];
        db.query(`INSERT INTO product (product_code, name, size, registered_date, purchased_cost, supplier_id, barcode) VALUES(?, ?, ?, now(), ?, ?, ?)`, [product_code, name, size, purchased_cost, supplier_id, barcode]);
    }
    return;
};
const putProductsBySupplierId = (form) => {
    for (let i = 0; i < form.length; i++) {
        const { product_code = '', name, size = '', purchased_cost, barcode } = form[i];
        db.query(`UPDATE product SET product_code='${product_code}', name='${name}', size='${size}', registered_date=now(), purchased_cost=${purchased_cost} WHERE barcode=?`, [barcode]);
    }
    return;
};
//think about delete product logic
const deleteProductsBySupplierId = (supplierId) => __awaiter(void 0, void 0, void 0, function* () {
    db.query(`DELETE from product WHERE supplier_id=${supplierId}`);
    return;
});
module.exports = {
    getProductsBySupplierId: getProductsBySupplierId,
    postProductsBySupplierId: postProductsBySupplierId,
    putProductsBySupplierId: putProductsBySupplierId,
    deleteProductsBySupplierId: deleteProductsBySupplierId,
};

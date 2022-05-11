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
const getSuppliers = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db.query(`SELECT * FROM supplier`);
    if (result == undefined) {
        return null;
    }
    else {
        return result;
    }
});
const getSupplierById = (supplier_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db.query(`SELECT * FROM supplier WHERE id=${supplier_id}`);
    if (result == undefined) {
        return null;
    }
    else {
        return result[0];
    }
});
const postSupplier = (form) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, contact, note = '', margin_ratio = 0 } = form;
    db.query(`INSERT INTO supplier (name, address, contact, note, margin_ratio) VALUES(?, ?, ?, ?, ?)`, [name, address, contact, note, margin_ratio]);
    return;
});
const putSupplier = (form) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, address, contact, note = '', margin_ratio } = form;
    db.query(`UPDATE supplier SET name='${name}', address='${address}', contact='${contact}', note='${note}', margin_ratio='${margin_ratio}' WHERE id=${id}`);
    return;
});
const deleteSupplier = (form) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = form;
    db.query(`DELETE from supplier WHERE id=${id}`);
    return;
});
module.exports = {
    getSuppliers: getSuppliers,
    getSupplierById: getSupplierById,
    postSupplier: postSupplier,
    putSupplier: putSupplier,
    deleteSupplier: deleteSupplier,
};

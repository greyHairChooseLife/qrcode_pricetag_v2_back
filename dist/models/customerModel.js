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
const getCartByMobile = (mobile) => __awaiter(void 0, void 0, void 0, function* () {
    // 현재시간 ~ 12시간 전 까지만 불러오면 아침 9시든 저녁9시든 전날과 겹치지 않으면서 당일 장바구니에 담은 것은 모두 검색된다.
    const [result] = yield db.query(`SELECT product.*, customer.quantity FROM product JOIN customer ON product.barcode=customer.barcode WHERE customer.mobile=${mobile} AND created_date >= date_add(NOW(), interval -12 hour)`);
    for (var i = 0; i < result.length; i++) {
        result[i].margin_ratio = yield db.query(`SELECT supplier.margin_ratio FROM supplier JOIN customer ON supplier.id=${result[i].supplier_id}`);
        result[i].margin_ratio = result[i].margin_ratio[0][0].margin_ratio;
    }
    if (result == undefined) {
        return null;
    }
    else {
        return result;
    }
});
const postCart = (form) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, barcode, quantity } = form;
    const [updateResult] = yield db.query(`UPDATE customer SET quantity=${quantity} WHERE mobile=${clientId} AND barcode=${barcode} AND created_date >= date_add(NOW(), interval -12 hour)`);
    if (updateResult.changedRows > 0) {
        return updateResult;
    }
    db.query(`INSERT INTO customer (mobile, barcode, quantity, created_date) VALUES(?, ?, ?, NOW())`, [clientId, barcode, quantity]);
    return;
});
const putCart = (form) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile, barcode, quantity } = form;
    const [result] = yield db.query(`UPDATE customer SET quantity=${quantity} WHERE mobile=${mobile} AND barcode=${barcode} AND created_date >= date_add(NOW(), interval -12 hour)`);
    //	if(result == undefined){
    //		return null;
    //	}else{
    //		return result;
    //	}
    return;
});
const deleteCart = (form) => {
    const { mobile, barcode } = form;
    db.query(`DELETE FROM customer WHERE mobile=${mobile} AND barcode=${barcode} AND created_date >= date_add(NOW(), interval -12 hour)`);
    return;
};
module.exports = {
    getCartByMobile: getCartByMobile,
    postCart: postCart,
    putCart: putCart,
    deleteCart: deleteCart,
};

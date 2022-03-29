//import db from '../config/db';
//db.promise();
const db = require('../config/db').promise();

const getCartByMobile = async (mobile: string) => {
	// 현재시간 ~ 12시간 전 까지만 불러오면 아침 9시든 저녁9시든 전날과 겹치지 않으면서 당일 장바구니에 담은 것은 모두 검색된다.
	const [result] = await db.query(`SELECT product.*, customer.quantity FROM product JOIN customer ON product.barcode=customer.barcode WHERE customer.mobile=${mobile} AND created_date >= date_add(NOW(), interval -12 hour)`);

	for(var i=0; i<result.length; i++){
		result[i].margin_ratio = await db.query(`SELECT supplier.margin_ratio FROM supplier JOIN customer ON supplier.id=${result[i].supplier_id}`);
		result[i].margin_ratio = result[i].margin_ratio[0][0].margin_ratio;
	}
	if(result == undefined){
		return null;
	}else{
		return result;
	}
}

interface IpostCart {
	mobile: string,
	barcode: string,
	quantity: number,
	created_date: Date,
}

const postCart = async (form: IpostCart) => {
	const { mobile, barcode, quantity, created_date } = form;

	const [updateResult] = await db.query(`UPDATE customer SET quantity=${quantity} WHERE mobile=${mobile} AND barcode=${barcode} AND created_date >= date_add(NOW(), interval -12 hour)`);

	if(updateResult.changedRows > 0){
		return updateResult;
	} 
	db.query(`INSERT INTO customer (mobile, barcode, quantity, created_date) VALUES(?,?,?,?)`, [mobile, barcode, quantity, created_date]);
}

interface IputCart {
	mobile: string,
	barcode: string,
	quantity: number,
}

const putCart = async (form: IputCart) => {
	const { mobile, barcode, quantity } = form;

	const [result] = await db.query(`UPDATE customer SET quantity=${quantity} WHERE mobile=${mobile} AND barcode=${barcode} AND created_date >= date_add(NOW(), interval -12 hour)`);

//	if(result == undefined){
//		return null;
//	}else{
//		return result;
//	}

	return
}

interface IdeleteCart {
	mobile: string,
	barcode: string,
}

const deleteCart = (form: IdeleteCart) => {
	const { mobile, barcode } = form;

	db.query(`DELETE FROM customer WHERE mobile=${mobile} AND barcode=${barcode} AND created_date >= date_add(NOW(), interval -12 hour)`);

	return
}

export = {
	getCartByMobile: getCartByMobile,
	postCart: postCart,
	putCart: putCart,
	deleteCart: deleteCart,
}

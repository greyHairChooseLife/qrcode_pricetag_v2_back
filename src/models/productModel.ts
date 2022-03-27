//import db from '../config/db';
//db.promise();
const db = require('../config/db').promise();

interface getProductsBySupplierId {
	supplier_id: number,
}

const getProductsBySupplierId = async (arg: string) => {

	const [result] = await db.query(`SELECT * FROM product WHERE supplier_id=${arg}`);

	if(result == undefined){
		return null;
	}else{
		return result;
	}
}

interface postProductsBySupplierId {
	product_code: string,
	name: string,
	size?: string,
	registered_date: Date,
	purchased_cost: number,
	supplier_id: number,
	barcode: string,
}

const postProductsBySupplierId = async (form: postProductsBySupplierId) => {
	const { product_code, name, size = '', registered_date, purchased_cost, supplier_id, barcode } = form;

	// it doesn't work below
	//const value = Object.values(form);
	//db.query(`INSERT INTO product (product_code, name, size, registered_date, purchased_cost, supplier_id, barcode) VALUES(?, ?, ?, ?, ?, ?, ?)`, value);

	db.query(`INSERT INTO product (product_code, name, size, registered_date, purchased_cost, supplier_id, barcode) VALUES(?, ?, ?, ?, ?, ?, ?)`, [product_code, name, size, registered_date, purchased_cost, supplier_id, barcode]);

	return
}

interface updateProductsBySupplierId {
	product_code: string,
	name: string,
	size?: string,
	registered_date: Date,
	purchased_cost: number,
	supplier_id: number,
	barcode: string,
}

const putProductsBySupplierId = async (form: updateProductsBySupplierId) => {
	const { product_code, name, size ='', registered_date, purchased_cost, supplier_id, barcode } = form;

	db.query(`UPDATE product SET product_code='${product_code}', name='${name}', size='${size}', registered_date='${registered_date}', purchased_cost=${purchased_cost}, barcode='${barcode}' WHERE barcode=?`, [barcode]);

	return
}

interface deleteProductsBySupplierId {
	supplier_id: number,
}

//think about delete product logic
const deleteProductsBySupplierId = async (form: deleteProductsBySupplierId) => {
	const { supplier_id } = form;

	db.query(`DELETE from product_code WHERE id=${supplier_id}`);

	return
}

export = {
	getProductsBySupplierId: getProductsBySupplierId,
	postProductsBySupplierId: postProductsBySupplierId,
	putProductsBySupplierId: putProductsBySupplierId,
	deleteProductsBySupplierId: deleteProductsBySupplierId,
}

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

const postProductsBySupplierId = (form: postProductsBySupplierId[]) => {
	for(let i=0; i<form.length; i++){
		const { product_code='', name, size = '', purchased_cost, supplier_id, barcode } = form[i];

		db.query(`INSERT INTO product (product_code, name, size, registered_date, purchased_cost, supplier_id, barcode) VALUES(?, ?, ?, now(), ?, ?, ?)`, [product_code, name, size, purchased_cost, supplier_id, barcode]);
	}

	return
}

interface updateProductsBySupplierId {
	product_code: string,
	name: string,
	size?: string,
	purchased_cost: number,
	barcode: string,
}

const putProductsBySupplierId = (form: updateProductsBySupplierId[]) => {
	for(let i=0; i<form.length; i++){
		const { product_code='', name, size ='', purchased_cost, barcode } = form[i];

		db.query(`UPDATE product SET product_code='${product_code}', name='${name}', size='${size}', registered_date=now(), purchased_cost=${purchased_cost} WHERE barcode=?`, [barcode]);
	}

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

//import db from '../config/db';
//db.promise();
const db = require('../config/db').promise();

const getSuppliers = async () => {
	const [result] = await db.query(`SELECT * FROM supplier`);

	if(result == undefined){
		return null;
	}else{
		return result;
	}
}

const getSupplierById = async ( supplier_id: string ) => {
	const [result] = await db.query(`SELECT * FROM supplier WHERE id=${supplier_id}`);

	if(result == undefined){
		return null;
	}else{
		return result[0];
	}
}

interface postSupplier {
	name: string,
	address: string,
	contact: string,
	note?: string,
	margin_ratio?: number,
}

const postSupplier = async (form: postSupplier) => {
	const { name, address, contact, note = '', margin_ratio = 0 } = form;

	db.query(`INSERT INTO supplier (name, address, contact, note, margin_ratio) VALUES(?, ?, ?, ?, ?)`, [name, address, contact, note, margin_ratio]);

	return
}

interface updateSupplier {
	id: number,
	name: string,
	address: string,
	contact: string,
	note?: string,
	margin_ratio?: number,
}

const putSupplier = async (form: updateSupplier) => {
	const { id, name, address, contact, note = '', margin_ratio } = form;

	db.query(`UPDATE supplier SET name='${name}', address='${address}', contact='${contact}', note='${note}', margin_ratio='${margin_ratio}' WHERE id=${id}`);

	return
}

interface deleteSupplier {
	id: number,
}

const deleteSupplier = async (form: deleteSupplier) => {
	const { id } = form;

	db.query(`DELETE from supplier WHERE id=${id}`);

	return
}

export = {
	getSuppliers: getSuppliers,
	getSupplierById: getSupplierById,
	postSupplier: postSupplier,
	putSupplier: putSupplier,
	deleteSupplier: deleteSupplier,
}

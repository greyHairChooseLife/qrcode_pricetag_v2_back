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

interface postSupplier {
	name: string,
	address: string,
	contact: string,
	note?: string,
}

const postSupplier = async (form: postSupplier) => {
	const { name, address, contact, note = '' } = form;

	db.query(`INSERT INTO supplier (name, address, contact, note) VALUES(?, ?, ?, ?)`, [name, address, contact, note]);

	return
}

interface updateSupplier {
	id: number,
	name: string,
	address: string,
	contact: string,
	note?: string,
}

const putSupplier = async (form: updateSupplier) => {
	const { id, name, address, contact, note = '' } = form;

	db.query(`UPDATE supplier SET name='${name}', address='${address}', contact='${contact}', note='${note}' WHERE id=${id}`);

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
	postSupplier: postSupplier,
	putSupplier: putSupplier,
	deleteSupplier: deleteSupplier,
}

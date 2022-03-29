//import db from '../config/db';
//db.promise();
const db = require('../config/db').promise();

const getProductByBarcode = async (barcode: string) => {

	const [result] = await db.query(`SELECT product.*, supplier.margin_ratio FROM product JOIN supplier ON product.supplier_id=supplier.id WHERE barcode=?`, [barcode]);

	if(result == undefined){
		return null;
	}else{
		return result;
	}

}

export = {
	getProductByBarcode: getProductByBarcode,
}

//import db from '../config/db';
//db.promise();
const db = require('../config/db').promise();

const getCustomers = async () => {

	const [result] = await db.query(`SELECT DISTINCT mobile FROM customer WHERE created_date >= date_add(NOW(), interval -12 hour)`);

	if(result == undefined){
		return null;
	}else{
		return result;
	}
}

const getCustomerByMobile = async (mobile: string) => {

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

export = {
	getCustomers: getCustomers,
	getCustomerByMobile: getCustomerByMobile,
}

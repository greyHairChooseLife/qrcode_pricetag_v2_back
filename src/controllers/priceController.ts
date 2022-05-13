import { Request, Response} from 'express'
import priceModel from '../models/priceModel'
const { API_SERVER_HOST, PORT } = process.env;

const getProductByBarcode = async (req: Request, res: Response) => {
	const { barcode } = req.params;
	const result = await priceModel.getProductByBarcode(barcode);
	let cleanDate = result[0].registered_date.getFullYear() +'-'+ result[0].registered_date.getMonth() +'-'+ result[0].registered_date.getDate();

	const readablePrice: string = String(result[0].price).split("").reverse().reduce((prev: string[], cur, idx) => {
		if(idx !== 0 && idx % 3 === 0)
			prev.push(',');
		prev.push(cur);
		return prev;
	}, []).reverse().reduce((prev: string, cur) => {
		return prev + cur;
	}, '');

	result[0] = {
		...result[0], 
		registered_date: cleanDate, 
		price: readablePrice,
		env: {
			API_SERVER_HOST: API_SERVER_HOST,
			PORT: PORT
		}
	};

	return res.render('priceTag', {product: result[0]});
}

export = {
	getProductByBarcode: getProductByBarcode,
}

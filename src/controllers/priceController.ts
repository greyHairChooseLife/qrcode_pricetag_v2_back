import { Request, Response} from 'express'
import priceModel from '../models/priceModel'

const getProductByBarcode = async (req: Request, res: Response) => {
	const { barcode } = req.params;
	const result = await priceModel.getProductByBarcode(barcode);
	let cleanDate = result[0].registered_date.getFullYear() +'-'+ result[0].registered_date.getMonth() +'-'+ result[0].registered_date.getDate();

	result[0] = {...result[0], price: result[0].purchased_cost * (1+Number(result[0].margin_ratio)), registered_date: cleanDate}

	return res.render('priceTag', {product: result[0]});
}

export = {
	getProductByBarcode: getProductByBarcode,
}

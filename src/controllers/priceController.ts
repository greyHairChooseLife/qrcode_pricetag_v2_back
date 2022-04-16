import { Request, Response} from 'express'
import priceModel from '../models/priceModel';

const getProductByBarcode = async (req: Request, res: Response) => {
	const { barcode } = req.params;
	const result = await priceModel.getProductByBarcode(barcode);
	result[0] = {...result[0], price: result[0].purchased_cost * (1+Number(result[0].margin_ratio))}
	
	console.log(result);
	return res.render('priceTag', {product: result[0]});
}

export = {
	getProductByBarcode: getProductByBarcode,
}

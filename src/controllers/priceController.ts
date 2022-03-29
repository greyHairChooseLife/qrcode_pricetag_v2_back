import { Request, Response} from 'express'
import priceModel from '../models/priceModel';

const getProductByBarcode = async (req: Request, res: Response) => {
	const { barcode } = req.params;
	const result = await priceModel.getProductByBarcode(barcode);
	
	return res.json(result);
}

export = {
	getProductByBarcode: getProductByBarcode,
}

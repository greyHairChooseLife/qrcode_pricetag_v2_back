import { Request, Response } from 'express'
import productModel from '../models/productModel';

const getProductsBySupplierId = async (req: Request, res: Response) => {
	const {supplier_id} = req.params;

	const result = await productModel.getProductsBySupplierId(supplier_id);
	
	return res.json(result);
}

const postProductsBySupplierId = (req: Request, res: Response) => {
	const result = productModel.postProductsBySupplierId(req.body);
	
	return res.json(result);
}

const putProductsBySupplierId = (req: Request, res: Response) => {
	const result = productModel.putProductsBySupplierId(req.body);
	
	return res.json(result);
}

const deleteProductsBySupplierId = async (req: Request, res: Response) => {
	const { supplierId } = req.body;

	const result = await productModel.deleteProductsBySupplierId(supplierId);
	
	return res.json(result);
}

export = {
	getProductsBySupplierId: getProductsBySupplierId,
	postProductsBySupplierId: postProductsBySupplierId,
	putProductsBySupplierId: putProductsBySupplierId,
	deleteProductsBySupplierId: deleteProductsBySupplierId,
	
}

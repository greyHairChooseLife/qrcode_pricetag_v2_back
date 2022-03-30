import { Request, Response } from 'express'
import productModel from '../models/productModel';

const getProductsBySupplierId = async (req: Request, res: Response) => {
	const {supplier_id} = req.params;

	const result = await productModel.getProductsBySupplierId(supplier_id);
	
	return res.json(result);
}

const postProductsBySupplierId = async (req: Request, res: Response) => {
	const result = await productModel.postProductsBySupplierId(req.body);
	
	return res.json(result);
}

const putProductsBySupplierId = async (req: Request, res: Response) => {
	const { id } = req.body;

	const result = await productModel.putProductsBySupplierId(id);
	
	return res.json(result);
}

const deleteProductsBySupplierId = async (req: Request, res: Response) => {
	const { id } = req.body;

	const result = await productModel.deleteProductsBySupplierId(id);
	
	return res.json(result);
}

export = {
	getProductsBySupplierId: getProductsBySupplierId,
	postProductsBySupplierId: postProductsBySupplierId,
	putProductsBySupplierId: putProductsBySupplierId,
	deleteProductsBySupplierId: deleteProductsBySupplierId,
	
}

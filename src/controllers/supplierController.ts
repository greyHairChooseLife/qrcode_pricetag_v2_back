import { Request, Response} from 'express'
import supplierModel from '../models/supplierModel';

const getSuppliers = async (req: Request, res: Response) => {
	const result = await supplierModel.getSuppliers();
	
	return res.json(result);
}

const getSupplierById = async (req: Request, res: Response) => {
	const result = await supplierModel.getSupplierById(req.params.supplier_id);
	
	return res.json(result);
}

const postSupplier = async (req: Request, res: Response) => {
	const result = await supplierModel.postSupplier(req.body);
	
	return res.json(result);
}

const putSupplier = async (req: Request, res: Response) => {
	const result = await supplierModel.putSupplier(req.body);
	
	return res.json(result);
}

const deleteSupplier = async (req: Request, res: Response) => {
	const result = await supplierModel.deleteSupplier(req.body);
	
	return res.json(result);
}

export = {
	getSuppliers: getSuppliers,
	getSupplierById: getSupplierById,
	postSupplier: postSupplier,
	putSupplier: putSupplier,
	deleteSupplier: deleteSupplier,
	
}

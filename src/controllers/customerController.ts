import { Request, Response} from 'express'
import customerModel from '../models/customerModel';

const getCartByMobile = async (req: Request, res: Response) => {
	const result = await customerModel.getCartByMobile(req.params.mobile);
	
	return res.json(result);
}

const postCart= async (req: Request, res: Response) => {
	const result = await customerModel.postCart(req.body);
	
	return res.json(result);
}

const putCart = async (req: Request, res: Response) => {
	const result = await customerModel.putCart(req.body);
	
	return res.json(result);
}

const deleteCart = async (req: Request, res: Response) => {
	const result = await customerModel.deleteCart(req.body);
	
	return res.json(result);
}

export = {
	getCartByMobile: getCartByMobile,
	postCart: postCart,
	putCart: putCart,
	deleteCart: deleteCart,
}

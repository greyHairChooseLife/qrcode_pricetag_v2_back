import { Request, Response} from 'express'
import clerkModel from '../models/clerkModel';

const getCustomers = async (req: Request, res: Response) => {
	const result = await clerkModel.getCustomers();
	
	return res.render('clerk', {customers: result});
}

const getCustomerByMobile= async (req: Request, res: Response) => {
	const result = await clerkModel.getCustomerByMobile(req.params.mobile);
	
	return res.json(result);
}

export = {
	getCustomers: getCustomers,
	getCustomerByMobile: getCustomerByMobile,
}

import { Request, Response} from 'express'
import clerkModel from '../models/clerkModel';

const getCustomers = async (req: Request, res: Response) => {
	const result = await clerkModel.getCustomers();
	
	return res.render('clerk', {customers: result});
}

const getCustomerByMobile= async (req: Request, res: Response) => {
	let result = await clerkModel.getCustomerByMobile(req.params.mobile);
	
	return res.render('clerkByMobile', {data: result, mobile: req.params.mobile});
}

export = {
	getCustomers: getCustomers,
	getCustomerByMobile: getCustomerByMobile,
}

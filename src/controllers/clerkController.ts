import { Request, Response} from 'express'
import clerkModel from '../models/clerkModel';

const { API_SERVER_HOST, PORT } = process.env;

const getCustomers = async (req: Request, res: Response) => {
	const result = await clerkModel.getCustomers();

	const env = {
		API_SERVER_HOST: API_SERVER_HOST,
		PORT: PORT
	}
	
	return res.render('clerk', {customers: result, env: env});
}

interface ICartItem {
	id: number,
	product_code: string,
	name: string,
	size: string,
	registered_date: Date,
	purchased_cost: number,
	supplier_id: number,
	barcode: string,
	quantity: number,
	margin_ratio: string,
	price: number,
}

const getCustomerByMobile= async (req: Request, res: Response) => {
	let result: ICartItem[] = await clerkModel.getCustomerByMobile(req.params.mobile);

	const total: number = result.reduce((prev: number, cur: ICartItem) => {return prev + cur.price * cur.quantity}, 0)

	const readableTotal: string = String(total).split("").reverse().reduce((prev: string[], cur, idx) => {
		if(idx !== 0 && idx % 3 === 0)
			prev.push(',');
		prev.push(cur);
		return prev;
	}, []).reverse().reduce((prev: string, cur) => {
		return prev + cur;
	}, '');

	return res.render('clerkByMobile', {data: result, mobile: req.params.mobile, totalAmount: readableTotal});
}

export = {
	getCustomers: getCustomers,
	getCustomerByMobile: getCustomerByMobile,
}

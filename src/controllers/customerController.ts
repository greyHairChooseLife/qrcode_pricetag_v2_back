import { Request, Response } from 'express'
import customerModel from '../models/customerModel';
const { API_SERVER_HOST, PORT } = process.env;

const getCartByMobile = async (req: Request, res: Response) => {

	// generate cookie if it's needed
	const cookies = req.headers.cookie;
	let clientId;
	if(cookies !== undefined){
		const cookiesParsed = cookies.split('; ').map(ele => {
			return ele.split('=');
		});
		clientId = cookiesParsed.find(ele => {
			if(ele[0] === 'JEIL') return true;
		});
		if(clientId !== undefined){
			clientId = clientId[1];
		}
		else {
			res.cookie('JEIL', req.params.clientId, {
				maxAge: 1000*60*60*10,
			});
		}
	}else{
		res.cookie('JEIL', req.params.clientId, {
				maxAge: 1000*60*60*10,
		});
	}

	let result = await customerModel.getCartByMobile(req.params.clientId);

	const env = {
		API_SERVER_HOST: API_SERVER_HOST,
		PORT: PORT
	}
	
	return res.render('customerCart', {clientId: req.params.clientId, products: result, env: env});
}

const postCart= async (req: Request, res: Response) => {

	const { mobile, productBarcode, productCount } = req.body;

	// generate cookie if it's needed
	const cookies = req.headers.cookie;
	if(cookies !== undefined){
		const cookiesParsed = cookies.split('; ').map(ele => {
			return ele.split('=');
		});
		let found = cookiesParsed.find(ele => {
			if(ele[0] === 'JEIL') return true;
		});
		if(found === undefined){
			res.cookie('JEIL', mobile, {
				maxAge: 1000*60*60*10,
			});
		}
	}else{
		res.cookie('JEIL', mobile, {
			maxAge: 1000*60*60*10,
		});
	}

	await customerModel.postCart({
		clientId: mobile,
		barcode: productBarcode,
		quantity: productCount,
	});
	
	return res.redirect(`http://${API_SERVER_HOST}:${PORT}/customerCart/${mobile}`);
}

const putCart = async (req: Request, res: Response) => {
	const result = await customerModel.putCart(req.body);
	
	return res.redirect(`http://${API_SERVER_HOST}:${PORT}/customerCart/${req.body.mobile}`);
}

const deleteCart = (req: Request, res: Response) => {
	customerModel.deleteCart(req.body);
	
	return res.redirect(`http://${API_SERVER_HOST}:${PORT}/customerCart/${req.body.mobile}`);
}

export = {
	getCartByMobile: getCartByMobile,
	postCart: postCart,
	putCart: putCart,
	deleteCart: deleteCart,
}

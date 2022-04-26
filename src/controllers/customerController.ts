import { Request, Response } from 'express'
import customerModel from '../models/customerModel';

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
	
	return res.render('customerCart', {clientId: req.params.clientId, products: result});
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
	
	return res.redirect(`http://localhost:3002/customerCart/${mobile}`);
}

const putCart = async (req: Request, res: Response) => {
	const result = await customerModel.putCart(req.body);
	
	return res.redirect(`http://localhost:3002/customerCart/${req.body.mobile}`);
}

const deleteCart = (req: Request, res: Response) => {
	customerModel.deleteCart(req.body);
	
	return res.redirect(`http://localhost:3002/customerCart/${req.body.mobile}`);
}

export = {
	getCartByMobile: getCartByMobile,
	postCart: postCart,
	putCart: putCart,
	deleteCart: deleteCart,
}

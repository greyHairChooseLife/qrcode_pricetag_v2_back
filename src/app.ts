import express from 'express'
import env from 'dotenv';
env.config();
import cors from 'cors';

import supplierRouter from './routers/supplierRouter';
import productRouter from './routers/productRouter';
import priceRouter from './routers/priceRouter';
import customerRouter from './routers/customerRouter';
import clerkRouter from './routers/clerkRouter';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('./front'));
app.use(cors());

//app.get('/', (req, res, next) => {
//	res.send('Hello, world');
//})

app.use('/supplier', supplierRouter);
app.use('/product', productRouter);
app.use('/price', priceRouter);
app.use('/customerCart', customerRouter);
app.use('/clerk', clerkRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server running at ${process.env.PORT}`);
})

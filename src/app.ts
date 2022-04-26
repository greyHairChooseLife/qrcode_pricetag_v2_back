import express from 'express'
import env from 'dotenv';
env.config();
import cors from 'cors';
import methodOverride from 'method-override';

import supplierRouter from './routers/supplierRouter';
import productRouter from './routers/productRouter';
import priceRouter from './routers/priceRouter';
import customerRouter from './routers/customerRouter';
import clerkRouter from './routers/clerkRouter';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static('src/statics'));
app.use(cors()); 		//enble pre-flight
app.use(methodOverride('_method'));

app.use('/supplier', supplierRouter);
app.use('/product', productRouter);
app.use('/price', priceRouter);
app.use('/customerCart', customerRouter);
app.use('/clerk', clerkRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server running at ${process.env.PORT}`);
})

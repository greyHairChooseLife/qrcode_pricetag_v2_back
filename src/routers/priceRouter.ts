import express from 'express';
import priceController from '../controllers/priceController';

const router = express.Router();

router.get('/:barcode', priceController.getProductByBarcode);

export = router;


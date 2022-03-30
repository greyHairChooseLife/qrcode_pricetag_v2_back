import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/get/:supplier_id', productController.getProductsBySupplierId);
router.post('/post', productController.postProductsBySupplierId);
router.put('/put', productController.putProductsBySupplierId);
router.delete('/delete', productController.deleteProductsBySupplierId);

export = router;


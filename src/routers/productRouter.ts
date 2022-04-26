import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/:supplier_id', productController.getProductsBySupplierId);
router.post('', productController.postProductsBySupplierId);
router.put('', productController.putProductsBySupplierId);
router.delete('', productController.deleteProductsBySupplierId);

export = router;


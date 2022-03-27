import express from 'express';
import supplierController from '../controllers/supplierController';

const router = express.Router();

router.get('/get', supplierController.getSuppliers);
router.post('/post', supplierController.postSupplier);
router.put('/put', supplierController.putSupplier);
router.delete('/delete', supplierController.deleteSupplier);

export = router;


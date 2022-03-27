import express from 'express';
import supplierController from '../controllers/supplierController';

const router = express.Router();

router.get('/getSuppliers', supplierController.getSuppliers);
router.post('/postSupplier', supplierController.postSupplier);
router.put('/putSupplier', supplierController.putSupplier);
router.delete('/deleteSupplier', supplierController.deleteSupplier);

export = router;


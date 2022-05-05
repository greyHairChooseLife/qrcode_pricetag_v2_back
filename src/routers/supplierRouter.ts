import express from 'express';
import supplierController from '../controllers/supplierController';

const router = express.Router();

router.get('', supplierController.getSuppliers);
router.get('/:supplier_id', supplierController.getSupplierById);
router.post('', supplierController.postSupplier);
router.put('', supplierController.putSupplier);
router.delete('', supplierController.deleteSupplier);

export = router;


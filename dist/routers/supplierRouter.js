"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const supplierController_1 = __importDefault(require("../controllers/supplierController"));
const router = express_1.default.Router();
router.get('', supplierController_1.default.getSuppliers);
router.get('/:supplier_id', supplierController_1.default.getSupplierById);
router.post('', supplierController_1.default.postSupplier);
router.put('', supplierController_1.default.putSupplier);
router.delete('', supplierController_1.default.deleteSupplier);
module.exports = router;

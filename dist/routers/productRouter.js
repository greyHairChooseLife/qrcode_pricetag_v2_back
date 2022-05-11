"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controllers/productController"));
const router = express_1.default.Router();
router.get('/:supplier_id', productController_1.default.getProductsBySupplierId);
router.post('', productController_1.default.postProductsBySupplierId);
router.put('', productController_1.default.putProductsBySupplierId);
router.delete('', productController_1.default.deleteProductsBySupplierId);
module.exports = router;

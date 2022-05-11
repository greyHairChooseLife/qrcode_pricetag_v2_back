"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const priceController_1 = __importDefault(require("../controllers/priceController"));
const router = express_1.default.Router();
router.get('/:barcode', priceController_1.default.getProductByBarcode);
module.exports = router;

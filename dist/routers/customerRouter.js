"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const customerController_1 = __importDefault(require("../controllers/customerController"));
const router = express_1.default.Router();
router.get('/:clientId', customerController_1.default.getCartByMobile);
router.post('', customerController_1.default.postCart);
router.put('', customerController_1.default.putCart);
router.delete('', customerController_1.default.deleteCart);
module.exports = router;

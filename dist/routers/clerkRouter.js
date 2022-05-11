"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const clerkController_1 = __importDefault(require("../controllers/clerkController"));
const router = express_1.default.Router();
router.get('', clerkController_1.default.getCustomers);
router.get('/:mobile', clerkController_1.default.getCustomerByMobile);
module.exports = router;

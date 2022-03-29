import express from 'express';
import clerkController from '../controllers/clerkController';

const router = express.Router();

router.get('/get', clerkController.getCustomers);
router.get('/get/:mobile', clerkController.getCustomerByMobile);

export = router;


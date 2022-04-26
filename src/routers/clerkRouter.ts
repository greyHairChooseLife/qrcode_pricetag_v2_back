import express from 'express';
import clerkController from '../controllers/clerkController';

const router = express.Router();

router.get('', clerkController.getCustomers);
router.get('/:mobile', clerkController.getCustomerByMobile);

export = router;


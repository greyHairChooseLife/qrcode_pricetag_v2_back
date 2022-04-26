import express from 'express';
import customerController from '../controllers/customerController';

const router = express.Router();

router.get('/:clientId', customerController.getCartByMobile);
router.post('', customerController.postCart);
router.put('', customerController.putCart);
router.delete('', customerController.deleteCart);

export = router;


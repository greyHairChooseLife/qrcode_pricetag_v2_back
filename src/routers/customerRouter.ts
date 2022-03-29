import express from 'express';
import customerController from '../controllers/customerController';

const router = express.Router();

router.get('/get/:mobile', customerController.getCartByMobile);
router.post('/post', customerController.postCart);
router.put('/put', customerController.putCart);
router.delete('/delete', customerController.deleteCart);

export = router;


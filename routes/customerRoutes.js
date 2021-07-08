const express=require('express');
const customerController=require('../controllers/customerController');
const auth=require('../middlewares/auth');

const router=express.Router();

router.get('/',customerController().index);

router.get('/customer/orders',auth,customerController().customerOrders);

router.post('/orders',auth,customerController().newOrder);

router.get('/customer/orders/:id',customerController().singleOrderTracker);

module.exports=router;
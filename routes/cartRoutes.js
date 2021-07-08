const express=require('express');
const cartController=require('../controllers/cartController')

const router=express.Router();


router.get('/cart',cartController().cartItems);

router.delete('/cart',cartController().deleteCartItems);

router.post('/update-cart',cartController().updateCartItems);

module.exports=router;
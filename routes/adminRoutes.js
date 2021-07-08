const express=require('express');
const adminController=require('../controllers/adminController');
const adminAuth=require('../middlewares/adminAuth');
const router=express.Router();

router.delete('/',adminAuth,adminController().removeMenuItem);

router.get('/admin/orders',adminAuth,adminController().adminDashboard);

router.post('/admin/add-menu',adminAuth,adminController().addMenuItem);


module.exports=router;

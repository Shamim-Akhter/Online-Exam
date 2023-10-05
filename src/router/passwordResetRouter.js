const express=require('express');
const router=express.Router();
const {getResetPassword,postResetPassword,getNewResetPassword,postNewResetPassword} = require('../../controller/passwordResetController.js');

router.route('/api/password-reset').get(getResetPassword).post(postResetPassword);
router.route('/api/password-reset/:userId/:token').get(getNewResetPassword).post(postNewResetPassword); 

module.exports=router;
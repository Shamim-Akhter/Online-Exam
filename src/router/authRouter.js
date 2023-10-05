var express=require('express');
var authRouter=express.Router();
var protectRoute=require('./authHelper');
var {getRegistration,postRegistration,getHomepage,getLogin,postLogin}=require('../../controller/authController');

authRouter.route('/registration')
.get(getRegistration)
.post(postRegistration);

authRouter.route('/login')
.get(getLogin)
.post(postLogin);

authRouter.route('/home')
.get(protectRoute,getHomepage);


module.exports=authRouter;
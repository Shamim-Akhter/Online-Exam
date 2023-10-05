var express = require('express');
var userRouter=express.Router();
var protectRoute=require('./authHelper');
var jwt=require('jsonwebtoken');
var {getUser,getAllUser,deleteUser,getUpdateUser,postUpdateUser}=require('../../controller/userController');
var {logout,getExam,calculateMarks} = require('../../controller/authController');
var Register=require('../models/registers');



//user profile page
userRouter.use(protectRoute);
userRouter.route('/userProfile')
.get(getUser);

//delete user
userRouter.route('/deleteUser/:id').delete(deleteUser);

//edit or update user details
userRouter.route('/updateUser').get(getUpdateUser).post(postUpdateUser);

//admin specific function
userRouter.route('/getAllUser')
.get(async (req,res,next)=>{
    let verify=jwt.verify(req.cookies.jwtCookie,process.env.SECRET_KEY);
        let id=verify.payload;
     let user=await Register.findById(id);
     if(user.Role=='Admin')
      next();
    else
    res.json('operation not allowed');
},getAllUser);


userRouter.route('/logout')
.get(logout);

userRouter.route('/exam')
.get(getExam)
.post(calculateMarks);

module.exports=userRouter;
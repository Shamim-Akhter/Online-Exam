var express=require('express');
var Register=require('../src/models/registers');
var jwt=require('jsonwebtoken');
const multer=require('multer');
const upload=multer().single("image");
const fs=require('fs');
const getUploadImage= function(req,res){
       res.status(200).render('uploadPhoto');
}

const postUploadImage= function(req,res,next){
    upload(req,res,function(err){
        
        if (err instanceof multer.MulterError) {
            console.log("Everything fine");
            res.status(404).send(err + 'Upload failed due to multer error');
        } else if (err) {
            res.status(404).send(err + 'Upload failed due to unknown error');
        }
           next();    
    });
}

const imageInformation = async function(req,res){
    try{
        const fileInformation=req.file;
        if(fileInformation === undefined){
            res.status(400).send("Please select/choose the valid image first before uploading");
        }
        else{
            let isVerified = jwt.verify(req.cookies.jwtCookie,process.env.SECRET_KEY);  //verifying jwt
            let userId=isVerified.payload;
            const uploadedImage=  {
                data:fileInformation.buffer,
                contentType:fileInformation.mimetype
            };
            let user = await Register.findByIdAndUpdate(userId,{ProfileImage:uploadedImage});
            if(!user){
                res.status(400).send('user not found');
            }
            else{
                res.status(200).redirect('/home');
            }
            
             console.log(fileInformation);
             console.log({
            name:fileInformation.originalname,
            type:fileInformation.mimetype,
            size:fileInformation.size,
            buffer:fileInformation.buffer
        });
        }
    }
    catch(err){
        res.status(400).render('error',{error_message:err.message});
    } 
}

module.exports = {getUploadImage,postUploadImage,imageInformation};
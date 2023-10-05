const express=require('express');
const router=express.Router();
const {getUploadImage,postUploadImage,imageInformation} = require('../../controller/uploadImageController.js');


router.route('/uploadImage').get(getUploadImage).post(postUploadImage,imageInformation);


module.exports = router;
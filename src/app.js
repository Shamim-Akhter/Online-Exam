var express= require('express');
var app= express();
const path=require('path');
var view_path=path.join(__dirname ,'../views');
var static_path=path.join(__dirname ,'../public');
const dotenv=require('dotenv');
dotenv.config();
const passwordResetRouter=require('./router/passwordResetRouter.js');
var cookieParser=require('cookie-parser');
const uploadImage=require('../src/router/uploadImageRouter.js');
const {books} = require('./bookData/books.js');
require("./db/conn");
var port=process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set('views',view_path);
app.set('view engine','hbs');
var authRouter=require('./router/authRouter');
var userRouter=require('./router/userRouter');


app.get("/",function(req,res){
    res.render("index",{books:books}); 
});
app.use(passwordResetRouter);
app.use(authRouter);
app.use(userRouter);
app.use(uploadImage);

// To handle 404 page
app.use((req,res,next)=>{
    res.status(400).render('404NotFound.hbs');
});

app.listen(port,function(req,res){
    console.log("Server is listening at port no ",port);
});


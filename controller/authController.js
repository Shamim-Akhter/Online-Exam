var express=require('express');
var Register=require('../src/models/registers');
var jwt=require('jsonwebtoken');
var {mail}=require('../utility/nodemailer');
const fs=require('fs');
module.exports.getRegistration = function getRegistration(req,res){
    res.render("register"); 
}

module.exports.postRegistration = async function postRegistration(req,res){
    const defaultImageInformation = fs.readFileSync('public/image/profile.png');
    
    try{
        const specificRegister= new Register({
         FirstName:req.body.FirstName,
         LastName:req.body.LastName,
         CollegeName:req.body.CollegeName,
         Branch:req.body.Branch,
         Age:req.body.Age,
         Gender:req.body.Gender,
         Mobile:req.body.Mobile,
         EmailId:req.body.Email,
         Password:req.body.Password,
         ProfileImage:{
             data:defaultImageInformation,
             contentType:'image/png'
         }
        });
       const registered =  await specificRegister.save();
   
       mail(registered);    // to send mail post successful registration
       
       res.status(201).redirect("/");
 }
 catch(error){
     res.status(400).render('error',{error_message:error.message});
 }
}

module.exports.getLogin = function getLogin(req,res){
    res.render('login',{status:false});
}

module.exports.postLogin = async function postLogin(req,res){
    try{
        const email=req.body.email;
        const password=req.body.password;
       const useremail = await Register.findOne({EmailId:email});
       if(!useremail){
        res.status(400).render('login',{status:true});
       }
       else{
        if(useremail.Password===password)
        {
          // res.cookie('isReallyLoggedIn','true');         //making a cookie to protect /home route i.e, only authorized users can visit this page
           
           //using jwt for authentication
           let userId = useremail._id;
           let token=jwt.sign({payload:userId},process.env.SECRET_KEY);   //creating jwt
           res.cookie('jwtCookie',token);             // making a cookie(using jwt) to protect /home route i.e, only authorized users can visit this page
           res.status(302).redirect('/home');
        }
        else
        {
           res.status(400).render('login',{status:true});
        }
       }
       
      }
        catch(err){
          res.status(400).render('error',{error_message:err.message});
        };
}



module.exports.getHomepage = async function getHomepage(req,res){
    let isVerified = jwt.verify(req.cookies.jwtCookie,process.env.SECRET_KEY);  //verifying jwt
    let userId=isVerified.payload;
    let user = await Register.findById(userId);

   // console.log(user.ProfileImage.data.buffer);

    let binary = '';
    let bytes = [].slice.call(new Uint8Array(user.ProfileImage.data.buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    let ori = this.btoa(binary);
   // console.log(ori);

    res.render('home',{user:user, im:ori});

}

//set cookie
/*
routers.get('/setCookies',(req,res)=>{

    res.setHeader('Set-Cookie','isLoggedIn=true');   //set cookie without using third party library

   res.cookie('isLogged','false',{maxAge:1000*60*60*24,secure:true,httpOnly:true});          // set cookies using cookie-parser

    res.send("Cookie has been saved");
})
*/

//get cookie


/*routers.get('/getCookies',(req,res)=>{
    let savedCookies=req.cookies;
    console.log(savedCookies);
    res.json(savedCookies);
})
*/


// Logout function
module.exports.logout =  function logout(req,res){
    res.cookie('jwtCookie',' ',{maxAge:1});
    res.redirect('/login');
}

module.exports.getExam=function getExam(req,res){
    res.render('exam');
}

module.exports.calculateMarks= async function calculateMarks(req,res){
       let marks=0;
       let answer1=req.body.Q1;
       let answer2=req.body.Q2;
       let answer3=req.body.Q3;
       let answer4=req.body.Q4;
       let answer5=req.body.Q5;
       if(answer1==1)
          marks++;
       if(answer2==3)
          marks++;
       if(answer3==2)
          marks++;
       if(answer4==3)
          marks++;
       if(answer5==2)
          marks++;
         

          try{
            let verify=jwt.verify(req.cookies.jwtCookie,process.env.SECRET_KEY);
            let id=verify.payload;
         let user=await Register.findOneAndUpdate({_id:id},{MarksObtained:marks});
         res.redirect('/home');
        }
         catch(err){
            res.render('error',{error_message:err.message});
         }      
}
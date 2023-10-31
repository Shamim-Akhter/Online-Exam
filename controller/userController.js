var jwt=require('jsonwebtoken');
var Register=require('../src/models/registers');



module.exports.getAllUser=async function getAllUser(req,res){
        
     //for querying
        const {CollegeName,Gender,Branch,MarksObtained,Sort,Fields}=req.query;
        const queryObject={};
        
        if(CollegeName){
         queryObject.CollegeName={$regex:CollegeName, $options:'i'};
        }
        if(Gender){
         queryObject.Gender=Gender;
        }
        if(Branch){
         queryObject.Branch=Branch;
        }
        if(MarksObtained){
         queryObject.MarksObtained=Number(MarksObtained);
        }
       
         let data=Register.find(queryObject);
         //for sorting
         if(Sort){
            const sortList=Sort.split(',').join(' ');
            data=data.sort(sortList);
         }
         else{
            data=data.sort('FirstName');
         }


         //for select specific fields
         if(Fields){
            const selectList=Fields.split(',').join(' ');
            data=data.select(selectList);
         }
        const users= await data;
        const total=users.length;
        /*
        res.status(200).json({
         "totalUsers":total,
         "Users":users
      });
      */
     if(total>0)
     {
      res.status(200).render("simple",{users:users, listExists:true});
     }
     else{
      res.status(200).render("simple",{users:users, listExists:false});
     }
     
}

module.exports.getUser=async function getUser(req,res){
    try{
        let verify=jwt.verify(req.cookies.jwtCookie,process.env.SECRET_KEY);
        let id=verify.payload;
        let user=await Register.findById(id);
     if(user)
     {
      let binary = '';
      let bytes = [].slice.call(new Uint8Array(user.ProfileImage.data.buffer));
      
      bytes.forEach((b) => binary += String.fromCharCode(b));
      let ori = this.btoa(binary);
      
        res.status(200).render("user",{user:user,im:ori});
     }
     else
     {
        res.json({message:'User not found'});
     }
    }
     catch(err){
        res.json({
            message:err.message
        })
     }
}

// delete User
module.exports.deleteUser = async function deleteUser(req,res){
   const id = req.params.id;
   console.log(id);
  const deletedData =  await Register.findByIdAndDelete(id);
   res.end();
}

// update user details

module.exports.getUpdateUser = async function getUpdateUser(req,res){
       res.status(200).render("update");
}

module.exports.postUpdateUser = async function postUpdateUser(req,res){
   const {collegeName,branch,age} = req.body;
   try{
      let verify=jwt.verify(req.cookies.jwtCookie,process.env.SECRET_KEY);
      let id=verify.payload;
      let user=await Register.findByIdAndUpdate(id,{CollegeName:collegeName,Branch:branch,Age:age});
      if(user){
         res.status(200).redirect('/home');
      }
      else{
         res.status(400).send("User not found");
      }
   }
   catch(err){
        res.status(400).json({"Error":err.message});
   }
   
}

module.exports.getQuiz = async function getQuiz(req,res){
    const quizId = req.params.quizId;
    console.log(quizId);
    res.render('quiz',{quizId:quizId});
}
const mongoose=require('mongoose');

const studentSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    CollegeName:{
        type:String,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
   Gender:{
        type:String,
        required:true
   },
   Mobile:{
        type:String,
        required:true,
        unique:true
   },
   EmailId:{
        type:String,
        required:true,
        unique:true
   },
   Password:{
        type:String,
        required:true
   },
   Role:{
        type:String,
        enum:['Admin', 'User'],
        default:'User'
   },
   MarksObtained:{
    type:Number,
    default:0
   },
   ProfileImage:{
       data:Buffer,
       contentType:String,
   }
});

const Register= new mongoose.model("Register",studentSchema);
module.exports= Register;

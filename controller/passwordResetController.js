const Register=require('../src/models/registers.js');
const Token=require('../src/models/token.js');
const sendEmail=require('../utility/passwordResetMailer.js');
const crypto=require('crypto');

const getResetPassword = function(req,res){

res.status(200).render('password',{status:false});
};

const postResetPassword = async (req, res) => {
    try {
        
        const user = await Register.findOne({ EmailId: req.body.email });
        if (!user)
            return res.status(400).render('password',{status:true});

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `http://localhost:3000/api/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.EmailId, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.render('error',{error_message:error.message});
        console.log(error);
    }
};

const getNewResetPassword = function (req,res){
    const tok=req.params.token;
    const userId=req.params.userId;
    const links=`/api/password-reset/${userId}/${tok}`;
  const form= `<!DOCTYPE html>
  <html>
  <head>
      <title>Online Exam</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
          }
        
          .container {
              background-color: #fff;
              width: 500px;
              margin: 100px auto;
              padding: 10px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
  
          h2 {
              color: #333;
              padding: 0px;
          }
  
          label {
              display: block;
              font-weight: bold;
              margin-bottom: 5px;
              color: #555;
          }
  
  
       input[type="password"]{
          width: 90%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 3px;
          font-size: 16px;
       }
       input[type="submit"] {
              background-color: #333;
              color: #fff;
              padding: 10px 20px;
              border: none;
              border-radius: 3px;
              cursor: pointer;
              font-size: 18px;
          }
  
          input[type="submit"]:hover {
              background-color: #555;
          }
      </style>
  </head>
  <body>
       <div class="container">
      <h2>Please insert the new password of your choice</h2>
      <form action=${links} method="post">
              <label>Enter New Password</label>
              <input type="password" name="password">
              <input type="submit" value="Submit"></input>
              </form>
     </div>
  </body>
  </html>`
          res.status(200).send(form);
};

const postNewResetPassword = async (req, res) => {
    try {

        const user = await Register.findById(req.params.userId);
        if (!user) return res.status(400).send("Invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.Password = req.body.password;
        await user.save();
        await token.delete();

        res.send("Password reset sucessfully.");
    } catch (error) {
        res.render('error',{error_message:error.message});
        console.log(error);
    }
};


module.exports={getResetPassword,postResetPassword,getNewResetPassword,postNewResetPassword};
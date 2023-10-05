const nodemailer = require("nodemailer");

module.exports.mail=function mail(data){
var transporter=nodemailer.createTransport({
    
    host:'smtp.gmail.com',
    port:'587',
    secure:false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

var Ohtml=`<h1 style="text-align:center;">Welcome to Online Exam</h1> 
           <p>Congratulation your registration is successful. </p>
           <p>Here are your details - </p>
            Name: ${data.FirstName} ${data.LastName} <br>
            Email: ${data.EmailId}<br>
            Password: ${data.Password} `;

var mailOptions = {
    from: ` "Online Exam" <${process.env.EMAIL}>`,
    to: data.EmailId,
    subject: 'Registration Successful',
    html: Ohtml
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
};
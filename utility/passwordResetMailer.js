const nodemailer = require("nodemailer");
const dotenv=require('dotenv');
dotenv.config();
const sendEmail = async (email, subject, text) => {
    try {
        const transporter=nodemailer.createTransport({
    
            host:'smtp.gmail.com',
            port:'587',
            secure:false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls:{
                rejectUnauthorized:false
            }
        });
        let Ohtml=`<p>Click on below link to reset password - </p>
            link: <a href=${text}>${text}</a> `;
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: Ohtml,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;
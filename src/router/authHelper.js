  var jwt=require('jsonwebtoken');

  function protectRoute(req,res,next){
    if(req.cookies.jwtCookie)         //use of cookie so that only logged in person visit this route i.e, /home
    {
        let isVerified = jwt.verify(req.cookies.jwtCookie,process.env.SECRET_KEY);  //verifying jwt
        console.log(req.cookies.jwtCookie);
        console.log(isVerified);
        if(isVerified)
          next();
        else
          res.send('User not verified');
    }
    else 
    res.send('Not authorised user');
}

module.exports=protectRoute;
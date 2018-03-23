var {User} = require('./../models/user.js');

var authenticate = (req , res , next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then( (user) => {
    if(!user){
      return Promise.reject();
//      res.status(401).send();
    }

//    req.user = {email: user.email , id : user._id };
    req.user = user;
    req.user.email = user.email;
    req.user.id = user._id;
    req.token = token;
    next();
  }).catch((error) =>{
    res.status(401).send(error);
  });

};


module.exports = {
  authenticate : authenticate
}

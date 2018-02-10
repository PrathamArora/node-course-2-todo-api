var {User} = require('./../models/user.js');

var authenticate = (req , res , next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then( (user) => {
    if(!user){
      res.status(401).send();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((error) =>{
    res.status(401).send(error);
  });

};


module.exports = {
  authenticate : authenticate
}

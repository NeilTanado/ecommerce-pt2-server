const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {

  cekCreateUser : function(req,res,next){
    console.log('masuk create user auth', req.body);
    if(req.body.password.length < 4){
      res.status(400).json({
        message:'password harus lebih besar dari 4 digit'
      });
    }else{
      var hash = bcrypt.hashSync(req.body.password,10);
      req.body.password = hash;
      next();
    }
  },

  cekJwt : function(req,res,next){
    if(req.headers.token){
      next();
    }else{
      res.status(403).json({
        message : 'anda tidak mempunyai authorized untuk hal ini'
      });
    }
  }
};

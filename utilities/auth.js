
const config = require('../config');
const jwt = require("jsonwebtoken");

 function verifyToken(req, res, next){
  const bearerHeader =  req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
       const bearerToken = bearerHeader.split(" ")[1];
       req.token  = bearerToken;
       next();
  }else{
      res.sendStatus(403);
  }
}

function  dataToken(token)  {
  var res = {};
  jwt.verify(token, config.SecretKey, (error, authData) => {
    if(error){
      res = { status: false, error: 'Error al obtener datos del token'};
    }else{
      res = { status: true, data: authData };
    }
  });
  return res;
}

module.exports = {
  verifyToken,
  dataToken
}
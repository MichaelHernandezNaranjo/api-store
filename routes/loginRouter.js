const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();

const config = require('../config');
const auth = require('../utilities/auth');
const loginService = require('../services/loginService');

/* POST auth */
router.post('/', async function(req, res, next) {
    try {
      if(!req.body.email){
        res.status(400).json({'error':'El email es requerido'});
      }
      if(!req.body.password){
        res.status(400).json({'error':'la contraseña es requerida'});
      }
      var _res = await loginService.login(req.body);
      if(_res != null){
        if(_res.active == 0){
          res.status(400).json({'error':'Usuario inactivo'});
        }
        jwt.sign({"user":_res}, config.SecretKey, {expiresIn: '2 days'}, (err, token) => {
          res.json({
              token,
              user: {
                email:_res.email,
                userName:_res.userName
              }
          });
        });
      }else{
        res.status(404).json({'error':'usuario o/y contraseña incorrecto!'})
      }
    } catch (err) {
      res.status(500).json({'error':err.message})
    }
  });

router.post("/verifyToken", auth.verifyToken, (req , res) => {
    res.json(auth.dataToken(req.token).data);
});


module.exports = router;
const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const security = require('../utilities/security');
const config = require('../config');
const auth = require('../utilities/auth');
const userService = require('../services/userService');

/* POST register */
router.post('/', async function(req, res, next) {
    try {
      var entitie = {
        email:req.body.email,
        userName:req.body.userName,
        password:security.encriptar(req.body.password),
        active:req.body.active,
        createDate:new Date()
      };
      console.log(entitie);
      var _res = await userService.create(entitie);
      if(_res > 0){
        res.json(await userService.get(_res));
      }else{
        res.status(404).json({'error':'Error en la creación del usuario'})
      }
    } catch (err) {
      res.status(500).json({'error':err.message})
    }
  });

router.post("/verifyToken", auth.verifyToken, (req , res) => {
    res.json(auth.dataToken(req.token).data);
});


module.exports = router;
const express = require('express');
const router = express.Router();

const auth = require('../utilities/auth');
const security = require('../utilities/security');
const userService = require('../services/userService');

/* GET ALL user */
router.get('/', auth.verifyToken , async function(req, res, next) {
    try {
      res.json(await userService.getAll(req.query.page, req.query.search));
    } catch (err) {
      console.error(`Error al leer user`, err.message);
      next(err);
    }
  });

  /* GET ID user */
  router.get('/:id',auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await userService.get(req.params.id));
    } catch (err) {
      console.error(`Error al leer user`, err.message);
      next(err);
    }
  });

/* POST user */
router.post('/', auth.verifyToken, async function(req, res, next) {
    try {
      var entitie = {
        email:req.body.email,
        userName:req.body.userName,
        password:security.encriptar(req.body.password),
        active:req.body.active,
        createDate:new Date()
      };
      var userId = await userService.create(entitie);
      if(userId > 0){
        res.json(await userService.get(userId));
      }else{
        console.error(`Error al crear user`);
      }
    } catch (err) {
      console.error(`Error al crear user`, err.message);
      next(err);
    }
  });

  /* PUT user */
  router.put('/:id', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await userService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error al actulizar user`, err.message);
      next(err);
    }
  });

   /* PUT user password */
   router.put('/password:id', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await userService.updatePassword(req.params.id, security.encriptar(rreq.body.password)));
    } catch (err) {
      console.error(`Error al actulizar user`, err.message);
      next(err);
    }
  });

  /* DELETE user */
  router.delete('/:id', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await userService.remove(req.params.id));
    } catch (err) {
      console.error(`Error al borrar user`, err.message);
      next(err);
    }
  });

module.exports = router;
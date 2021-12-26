const express = require('express');
const router = express.Router();

const auth = require('../utilities/auth');
const roleService = require('../services/roleService');


/* GET ALL role */
router.get('/', auth.verifyToken , async function(req, res, next) {
    try {
      res.json(await roleService.getAll(req.query.page, req.query.search));
    } catch (err) {
      console.error(`Error al leer role`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* GET ID role */
  router.get('/:id', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await roleService.get(req.params.id));
    } catch (err) {
      console.error(`Error al leer role`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

/* POST role */
router.post('/', auth.verifyToken, async function(req, res, next) {
    try {
      var roleId = await roleService.create(req.body);
      if(roleId > 0){
        res.json(await roleService.get(roleId));
      }else{
        console.error(`Error al crear role`);
      }
    } catch (err) {
      console.error(`Error al crear role`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* PUT role */
  router.put('/:id', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await roleService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error al actulizar role`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* DELETE role */
  router.delete('/:id', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await roleService.remove(req.params.id));
    } catch (err) {
      console.error(`Error al borrar role`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

module.exports = router;
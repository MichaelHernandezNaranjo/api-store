const express = require('express');
const router = express.Router();

const auth = require('../utilities/auth');
const statusService = require('../services/statusService');

/* GET ALL status */
router.get('/:projectId', auth.verifyToken , async function(req, res, next) {
    try {
      res.json(await statusService.getAll(req.params.projectId, req.query.page, req.query.search));
    } catch (err) {
      console.error(`Error al leer status`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* GET ID status */
  router.get('/:projectId/:statusId',auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await statusService.get(req.params.projectId,req.params.statusId));
    } catch (err) {
      console.error(`Error al leer status`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

/* POST status */
router.post('/:projectId',auth.verifyToken, async function(req, res, next) {

    try {
      var dataToken =  auth.dataToken(req.token);
      if(!dataToken.status){
        res.status(401).json({'error':dataToken.error})
      }

      var entitie = {
        projectId:req.params.projectId,
        name:req.body.name,
        active:req.body.active,
        createDate:new Date(),
        createUserId: dataToken.data.user.userId
      };

      var statusId = await statusService.create(entitie);
      if(statusId > 0){
        res.json(await statusService.get(req.params.projectId,statusId));
      }else{
        console.error(`Error al crear status`);
        res.status(400).json({'message':'Error al crear status'});
      }
    } catch (err) {
      console.error(`Error al crear status`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* PUT status */
  router.put('/:projectId/:statusId', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await statusService.update(req.params.projectId, req.params.statusId, req.body));
    } catch (err) {
      console.error(`Error al actulizar status`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* DELETE status */
  router.delete('/:projectId/:statusId', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await statusService.remove(req.params.projectId, req.params.statusId));
    } catch (err) {
      console.error(`Error al borrar status`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

module.exports = router;
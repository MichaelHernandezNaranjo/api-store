const express = require('express');
const router = express.Router();

const auth = require('../utilities/auth');
const sprintService = require('../services/sprintService');

/* GET ALL sprint */
router.get('/:projectId', auth.verifyToken , async function(req, res, next) {
    try {
      res.json(await sprintService.getAll(req.params.projectId, req.query.page, req.query.search));
    } catch (err) {
      console.error(`Error al leer sprint`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* GET ID sprint */
  router.get('/:projectId/:sprintId',auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await sprintService.get(req.params.projectId,req.params.sprintId));
    } catch (err) {
      console.error(`Error al leer sprint`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

/* POST sprint */
router.post('/:projectId', auth.verifyToken, async function(req, res, next) {
    try {
      var dataToken =  auth.dataToken(req.token);
      if(!dataToken.status){
        res.status(401).json({'error':dataToken.error})
      }
      var entitie = {
        projectId:req.params.projectId,
        name:req.body.name,
        description:req.body.description,
        active:req.body.active,
        createDate:new Date(),
        createUserId: dataToken.data.user.userId
      };
      var sprintId = await sprintService.create(entitie);
      if(sprintId > 0){
        res.json(await sprintService.get(req.params.projectId,sprintId));
      }else{
        console.error(`Error al crear sprint`);
        res.status(400).json({'message':'Error al crear sprint'});
      }
    } catch (err) {
      console.error(`Error al crear sprint`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* PUT sprint */
  router.put('/:projectId/:sprintId', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await sprintService.update(req.params.projectId, req.params.sprintId, req.body));
    } catch (err) {
      console.error(`Error al actulizar sprint`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* DELETE sprint */
  router.delete('/:projectId/:sprintId', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await sprintService.remove(req.params.projectId, req.params.sprintId));
    } catch (err) {
      console.error(`Error al borrar sprint`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

module.exports = router;
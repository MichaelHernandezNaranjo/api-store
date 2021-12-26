const express = require('express');
const router = express.Router();

const auth = require('../utilities/auth');
const taskService = require('../services/taskService');

/* GET ALL task */
router.get('/:projectId', auth.verifyToken , async function(req, res, next) {
    try {
      res.json(await taskService.getAll(req.params.projectId, req.query.page, req.query.search));
    } catch (err) {
      console.error(`Error al leer task`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* GET ID task */
  router.get('/:projectId/:taskId',auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await taskService.get(req.params.projectId,req.params.taskId));
    } catch (err) {
      console.error(`Error al leer task`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

/* POST task */
router.post('/:projectId', auth.verifyToken, async function(req, res, next) {
    try {
      var dataToken =  auth.dataToken(req.token);
      if(!dataToken.status){
        res.status(401).json({'error':dataToken.error})
      }

      if(!req.params.projectId){
        res.status(400).json({'error':'El projectId es requerido'});
      }
      if(!req.body.sprintId){
        res.status(400).json({'error':'El sprintId es requerido'});
      }
      if(!req.body.name){
        res.status(400).json({'error':'El nombre es requerido'});
      }

      var entitie = {
        projectId:req.params.projectId,
        sprintId:req.body.sprintId,
        statusId:req.body.statusId | 0,
        name:req.body.name,
        description:req.body.description,
        active:req.body.active | 1,
        createDate:new Date(),
        createUserId: dataToken.data.user.userId
      };
      var taskId = await taskService.create(entitie);
      if(taskId > 0){
        res.json(await taskService.get(req.params.projectId,taskId));
      }else{
        console.error(`Error al crear task`);
        res.status(400).json({'message':'Error al crear task'});
      }
    } catch (err) {
      console.error(`Error al crear task`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* PUT task */
  router.put('/:projectId/:taskId', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await taskService.update(req.params.projectId, req.params.taskId, req.body));
    } catch (err) {
      console.error(`Error al actulizar task`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

  /* DELETE task */
  router.delete('/:projectId/:taskId', auth.verifyToken, async function(req, res, next) {
    try {
      res.json(await taskService.remove(req.params.projectId, req.params.taskId));
    } catch (err) {
      console.error(`Error al borrar task`, err.message);
      res.status(400).json({'message':err.message});
    }
  });

module.exports = router;
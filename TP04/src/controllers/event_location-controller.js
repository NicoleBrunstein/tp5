import {Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import event_locationService from './../services/event_location.js';
import AuthMiddleware from "../middlewares/auth-middleware.js";
const router = Router();
const svc    = new event_locationService();		// Instanciación del Service.

router.get('', AuthMiddleware.validateToken, async (req, res) => {
  let respuesta;
  const returnArray = await svc.getAllAsync();
  if (returnArray != null){
    respuesta = res.status(200).json(returnArray);
  } else {
    respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
});
router.get('/:id',AuthMiddleware.validateToken, async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const returnEntity = await svc.getByIdAsync(id);
    if (returnEntity != null){
        respuesta = res.status(200).json(returnEntity);
      } else {
        respuesta = res.status(500).send(`Error interno.`);
      }
      return respuesta;
});
router.post('', AuthMiddleware.validateToken, async (req, res) => {
    let response;
    let entity=req.body;
    entity.id_creator_user = req.user.id;
    const registrosAfectados = await svc.createAsync(entity);
    response = res.status(201).json(registrosAfectados);
    return response;
});
router.put('', AuthMiddleware.validateToken, async (req, res) => {
    let respuesta;
    let entity=req.body;
    entity.id_creator_user = req.user.id;
    const returnArray = await svc.updateAsync(entity);
    
      return respuesta = res.status(200).json(returnArray);
    
});
router.delete('/:id', AuthMiddleware.validateToken, async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const returnEntity = await svc.deleteByIdAsync(id);
    return respuesta = res.status(200).json(returnEntity);
});

export default router;

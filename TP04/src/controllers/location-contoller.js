import {Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import locationService from './../services/location-service.js'
const router = Router();
const svc    = new locationService();		
router.get('', async (req, res) => {
  let respuesta;
  const returnArray = await svc.getAllAsync();
  if (returnArray != null){
    respuesta = res.status(200).json(returnArray);
  } else {
    respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
});
router.get('/:id', async (req, res) => {
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

router.get('/:id/event-locations', async (req, res) => {
  let respuesta;
  let id = req.params.id;
  const returnEntity = await svc.getByLocation(id);
  if (returnEntity != null){
      respuesta = res.status(200).json(returnEntity);
    } else {
      respuesta = res.status(404).send(`not found.`);
    }
    return respuesta;
});

export default router;
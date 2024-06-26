import {Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import eventsService from './../services/events-service.js'
const router = Router();
const svc= new eventsService();		// Instanciación del Service.

/*router.get('', async (req, res) => {
  let respuesta;
  const returnArray = await svc.getAllAsync();
  if (returnArray != null){
    respuesta = res.status(200).json(returnArray);
  } else {
    respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
});
*/
router.get('', async (req, res) => {
  let respuesta;
  const name      = req.query.name;
  const category  =  req.query.category;
  const tags  =  req.query.tags;
  const startDate  =  req.query.startDate;

  req.headers.authorization
console.log("name:", name)
  const returnArray = await svc.getByAsync(name, category, tags, startDate);
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
        respuesta = res.status(404).send(`not found`);
      }
      return respuesta;
});
router.post('', async (req, res) => {
    let entity=req.body;
    const registrosAfectados = await svc.createAsync(entity);
    return res.status(200).json(registrosAfectados);
});




export default router;

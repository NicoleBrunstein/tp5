import {Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import eventsService from './../services/events-service.js'
import event_locationService from '../services/event_location.js'
const router = Router();
const EventSvc = new eventsService();
const svc = new event_locationService();
import AuthMiddleware from "../middlewares/auth-middleware.js";

router.post('', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const entity = req.body;
  console.log("CREACION DE EVENTO");
  let eventCapacity = await svc.getByIdAsync(entity.id_event_location);

  if (!entity.name || typeof entity.name !== 'string' || entity.name.length < 3) {
    return res.status(400).json({ error: "El nombre es inválido." });
  }
  if (!entity.description || typeof entity.description !== 'string' || entity.description.length < 3) {
    return res.status(400).json({ error: "La descripción es inválida." });
  }
  if (!entity.id_event_category || isNaN(entity.id_event_category)) {
    return res.status(400).json({ error: "La categoría del evento es inválida." });
  }
  if (!entity.id_event_location || isNaN(entity.id_event_location)) {
    return res.status(400).json({ error: "La ubicación del evento es inválida." });
  }
  if (!entity.start_date || isNaN(Date.parse(entity.start_date))) {
    return res.status(400).json({ error: "La fecha de inicio es inválida." });
  }
  if (entity.max_assistance > eventCapacity.max_capacity) {
    return res.status(400).json({ error: "La asistencia máxima es mayor que la capacidad máxima." });
  }
  if (entity.price < 0 || isNaN(entity.price)) {
    return res.status(400).json({ error: "El precio del evento es inválido." });
  }
  if (entity.duration_in_minutes < 0 || isNaN(entity.duration_in_minutes)) {
    return res.status(400).json({ error: "La duración del evento es inválida." });
  }
  if (typeof entity.enabled_for_enrollment !== 'boolean') {
    return res.status(400).json({ error: "El valor de enabled_for_enrollment es inválido." });
  }

  console.log(entity);
  const returnArray = await EventSvc.createAsync(entity);
  if (returnArray != null) {
    response = res.status(201).json(returnArray);
  } else {
    response = res.status(500).send('Error interno');
  }
  return response;

});

router.get('', async (req, res) => {
  let respuesta;
  const name      = req.query.name;
  const category  =  req.query.category;
  const tags  =  req.query.tags;
  const startDate  =  req.query.startDate;

  req.headers.authorization
console.log("name:", name)
  const returnArray = await EventSvc.getByAsync(name, category, tags, startDate);
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

router.put('', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const entity = req.body;

  if (!entity.name || typeof entity.name !== 'string' || entity.name.length < 3) {
    return res.status(400).json({ error: "El nombre es inválido." });
  }
  if (!entity.description || typeof entity.description !== 'string' || entity.description.length < 3) {
    return res.status(404).json({ error: "La descripción es inválida." });
  }
  if (!entity.id_event_category || isNaN(entity.id_event_category)) {
    return res.status(400).json({ error: "La categoría del evento es inválida." });
  }
  if (!entity.id_event_location || isNaN(entity.id_event_location)) {
    return res.status(400).json({ error: "La ubicación del evento es inválida." });
  }
  if (!entity.start_date || isNaN(Date.parse(entity.start_date))) {
    return res.status(400).json({ error: "La fecha de inicio es inválida." });
  }
  if (entity.price < 0 || isNaN(entity.price)) {
    return res.status(400).json({ error: "El precio del evento es inválido." });
  }
  if (entity.duration_in_minutes < 0 || isNaN(entity.duration_in_minutes)) {
    return res.status(400).json({ error: "La duración del evento es inválida." });
  }
  if (typeof entity.enabled_for_enrollment !== 'boolean') {
    return res.status(400).json({ error: "El valor de enabled_for_enrollment es inválido." });
  }

  console.log(entity);

  const returnArray = await EventSvc.updateAsync(entity);

  if (returnArray != null) {
    response = res.status(200).json(returnArray);
  } else {
    response = res.status(404).send('Evento no encontrado');
  }
  return response;

});

router.delete('/:id', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const eventToEliminate = req.params.id;

  const returnEntity = await EventSvc.deleteAsync(eventToEliminate);

  if (returnEntity.id_creator_user = req.user.id){

    if (returnEntity != null){
        const rowsAffected =await svc.deleteEvent(eventToEliminate);
        response = res.status(200).json(rowsAffected);
    }else{
        response=res.status(404).send(`not found`);
    }

}else{
    response=res.status(404).send(`not found`);
}
  return response;
});




export default router;

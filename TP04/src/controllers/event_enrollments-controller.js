import {Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import event_enrollmentsService from '../services/event_enrollments.js'
import AuthMiddleware from "../middlewares/auth-middleware.js";
import eventsService from "../services/events-service.js";
import event_locationService from "../services/event_location.js";
import event_enrollmentsRepository from "../services/event_enrollments.js";
const router = Router();
const svc    = new event_enrollmentsService();		// Instanciación del Service.
const EventSvc = new eventsService();
const EventLocationSvc = new event_locationService();
const EventEnrollmentSvc = new event_enrollmentsRepository();


router.post("/:id/enrollment", AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const entity = req.body;
  const eventId = req.params.id;

  const event = await EventSvc.getByIdAsync(eventId);
  const eventLocation  = await EventLocationSvc.getByIdAsync(event.id_event);
  const eventEnabled = await EventSvc.getAllAsync(eventId);

  console.log('event', event);

  const enrollment = {
    id_event: eventId,
    id_user: 1,
    description : entity.description || null,
    registration_date_time: new Date(),
    attended: true, 
    observations: entity.observations || null,
    rating: entity.rating || null,
  };

  console.log(enrollment);

  console.log('enabled_for_enrollment',event.enabled_for_enrollment);
  if (event.enabled_for_enrollment !== '1') {
    console.log("ERROR");
    console.log(eventEnabled[0].enabled_for_enrollment);
    return res.status(400).json({ error: "El evento no admite inscripciones." });
  }else{
    console.log("OK");
  }

  if (event.start_date <= new Date()) {
    return res.status(400).json({ error: "El evento ya ha comenzado o está ocurriendo hoy." });
  }
  if (eventLocation.max_capacity <= event.max_assistance) {
    return res.status(400).json({ error: "La capacidad máxima del evento ha sido alcanzada." });
  }

  console.log(enrollment);

  const returnArray = await EventEnrollmentSvc.createAsync(enrollment);

  if (returnArray != null) {
    response = res.status(201).json(returnArray);
  } else {
    response = res.status(404).send("ID de evento no encontrado");
  }
  return response;
});


router.post('', async (req, res) => {
    let entity=req.body;
    const registrosAfectados = await svc.createAsync(entity);
    return res.status(200).json(registrosAfectados);
});

router.delete('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const returnEntity = await svc.deleteByIdAsync(id);
    return respuesta = res.status(200).json(returnEntity);
});

router.get('/:id/enrollment', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const first_name      = req.query.first_name;
    const last_name  =  req.query.last_name;
    const username  =  req.query.username;
    const attended  =  req.query.attended;
    const rating  =  req.query.rating;
  
    const returnArray = await svc.getByLastName(id, first_name, last_name, username, attended, rating);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(404).send(`not found`);
    }
    return respuesta;
  });

  router.patch("/:id/enrollment/:num", AuthMiddleware.validateToken, async (req, res) => {
    let response;
    const entity = req.body;
    const eventId = req.params.id;
    const rating = req.params.num; 
  
    const event = await EventSvc.getByIdAsync(eventId);
  
    if (!event) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
  
    if (new Date(event.start_date) < new Date()) {
      return res.status(400).json({ error: "El evento aún no ha finalizado" });
  }
  
    if (rating < 1 || rating > 10) {
      return res.status(400).json({ error: "El rating debe estar entre 1 y 10" });
    }
  
    const enrollment = await EventEnrollmentSvc.updateAsync(eventId, entity, rating); 
  
    if (enrollment != null) {
      response = res.status(200).json(enrollment);
    } else {
      response = res.status(404).send("ID de evento no encontrado");
    }
    
    return response;
  });
  
  router.delete("/:id/enrollment", AuthMiddleware.validateToken, async (req, res) => {
    let response;
    const eventId = req.params.id;
  
    const event = await EventSvc.getByIdAsync(eventId);
  
    console.log('event', event);
  
    const returnArray = await EventEnrollmentSvc.deleteByIdAsync(eventId);
  
    if (returnArray != null || new Date(event.start_date) <= new Date()) {
      response = res.status(200).json(returnArray);
    } else {
      response = res.status(404).send("ID de evento no encontrado");
    }
    return response;
  });

export default router;



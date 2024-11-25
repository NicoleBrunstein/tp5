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
  console.log('event xxxxxxxxxxxxxxxxxxxx', event);
  const event = await EventSvc.getByIdAsync(eventId);
  const eventLocation  = await EventLocationSvc.getByIdAsync(event.id_event);
  const eventEnabled = await EventSvc.getAllAsync(eventId);

  console.log('event xxxxxxxxxxxxxxxxxxxx', event);

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

  console.log('eventLocation', eventLocation)
  console.log('event', event)
  if (event.start_date <=  new Date()) {
    return res.status(400).json({ error: "El evento ya ha comenzado o está ocurriendo hoy." });
  }
  if (eventLocation.max_capacity <= event.max_assistance) {
    return res.status(400).json({ error: "La capacidad máxima del evento ha sido alcanzada." });
  }

  console.log(enrollment);

  const returnValue = await EventEnrollmentSvc.createAsync(enrollment);

  if (returnValue != 0) {
    response = res.status(201).json(returnValue);
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
  let first_name = req.query.first_name;
  let id_event = req.params.id;
  let last_name = req.query.last_name;
  let username = req.query.username;
  let attended = req.query.attended;
  let rating = req.query.rating;

  try {
      const response = await svc.getByEventId(id_event, first_name, last_name, username, attended, rating);

      if (response !== null && response.length > 0) {
          res.status(200).json({ success: true, response });
      } else {
          res.status(404).json({ success: false, message: 'No existe un evento con ese ID' });
      }
  } catch (error) {
      console.error('Error en el manejo de la ruta:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

  router.patch("/:id/enrollment/:num", AuthMiddleware.validateToken, async (req, res) => {
    let response;
    const entity = req.body;
    const eventId = req.params.id;
    const rating = req.params.num; 
  
    const event = await EventSvc.getByIdAsync(eventId);
    if (!rating || isNaN(rating) || rating < 1 || rating > 10) {
      return res.status(400).send({ error: 'El rating tiene que ser entre el 1 y 10.' });
  }

  try {
    if (!event) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
  
    if (new Date(event.start_date) > new Date()) {
      return res.status(400).json({ error: "El evento aún no ha finalizado" });
    }else if (new Date(event.start_date) < new Date()) {
      return res.status(200).json({ response: "Gracias por comentar" });
    }
   const enrollment = await EventEnrollmentSvc.updateAsync(eventId, entity, rating); 
  
    if (enrollment != null) {
      response = res.status(200).json(enrollment);
    } else {
      response = res.status(404).send("ID de evento no encontrado");
    }
  }
catch (error) {
  console.error(error); 
  res.status(500).send({ error: 'Error interno' });
    return response;}
  });
  
  router.delete("/:id/enrollment", AuthMiddleware.validateToken, async (req, res) => {
    const enrollmentToEliminate = req.params.id;
    const userId = req.user.id;
    try {
      const evento = await eventsService.getByIdAsync(enrollmentToEliminate); 
      
      if (!evento) {
          return res.status(404).send('No existe el evento');
      }

      const userReg = await svc.isUserRegistered(evento.id, userId);
      
      if (!userReg) {
          return res.status(401).send('No estás registrado en el evento');
      }

      const now = new Date().toISOString();
      
      if (evento.start_date <= now) {
          return res.status(400).send('El evento ya pasó o es hoy');
      }
      
      if (evento.enabled_for_enrollment <= 0) {
          return res.status(400).send('El evento no se encuentra habilitado para la inscripción');
      }

      const rowsAffected = await svc.deleteAsync(enrollmentToEliminate);
      return res.status(200).json(rowsAffected);
      
  } catch (error) {
      return res.status(500).send('Error interno del servidor');
  }
  });

export default router;



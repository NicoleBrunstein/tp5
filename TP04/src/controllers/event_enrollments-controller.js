import {Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import event_enrollmentsService from '../services/event_enrollments.js'
const router = Router();
const svc    = new event_enrollmentsService();		// Instanciación del Service.
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

export default router;



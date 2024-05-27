import {Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import event_enrollmentsService from '../services/event_enrollments'
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

export default router;



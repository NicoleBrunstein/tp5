import {Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import ProvinceService from './../services/province-service.js'
const router = Router();
const svc    = new ProvinceService();		// Instanciación del Service.

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
        respuesta = res.status(404).send(`not found.`);
      }
      return respuesta;
});

router.get('/:id/locations', async (req, res) => {
  let respuesta;
  let id = req.params.id;
  const returnEntity = await svc.getByProvince(id);
  if (returnEntity != null){
      respuesta = res.status(200).json(returnEntity);
    } else {
      respuesta = res.status(404).send(`not found.`);
    }
    return respuesta;
});

router.post('', async (req, res) => {
    let entity=req.body;
    const registrosAfectados = await svc.createAsync(entity);
    const datosProvincia = req.body
    let respuesta;
    if(!datosProvincia.name ||datosProvincia.name.length < 3){
      respuesta = res.status(400).json('bad request el nombre tinene que ser mayor a 3 caracteres');

  } else if (!datosProvincia.latitude || isNaN(datosProvincia.latitude) ){
      respuesta = res.status(400).json('bad request la latitude no son numeros');

  }else if (!datosProvincia.longitude || isNaN(datosProvincia.longitude) ){
      respuesta = res.status(400).json('bad request el longitude no son numeros');
  }else{
    return res.status(200).json(registrosAfectados);
  }
});

router.put('', async (req, res) => {
  let entity=req.body;
  const registrosAfectados = await svc.createAsync(entity);
  const datosProvincia = req.body
  let respuesta;

    if(!datosProvincia.name ||datosProvincia.name.length < 3){
        respuesta = res.status(400).json('bad request el nombre tinene que ser mayor a 3 caracteres');

    } else if (!datosProvincia.latitude || isNaN(datosProvincia.latitude) ){
        respuesta = res.status(400).json('bad request la latitude no son numeros');

    }else if (!datosProvincia.longitude || isNaN(datosProvincia.longitude) ){
        respuesta = res.status(400).json('bad request el longitude no son numeros');
    }else{      
      return respuesta = res.status(200).json(registrosAfectados);
    }
});
router.delete('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const returnEntity = await svc.deleteByIdAsync(id);
    if (returnEntity != null){
      const rowsAffected = await svc.deleteByIdAsync(id);
      if(rowsAffected>0){
          respuesta = res.status(200).json(rowsAffected);
      }else{
          respuesta = res.status(404).json('no se pudo eliminar')
      }
  }else{
      respuesta=res.status(404).send(`not found`);
  }
    return respuesta;
});

export default router;

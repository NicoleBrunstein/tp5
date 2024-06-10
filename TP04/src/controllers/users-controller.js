import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import UsersService from './../services/users-service.js'
const router = Router();
const svc    = new UsersService();		// Instanciación del Service.


router.post('/login', async (req, res) => {
    let entity=req.body;
    let respuesta;
    console.log('Controller: ', entity);

    const usuario  = await svc.getByUsername(entity);
    if (usuario == null){
        respuesta = {
            "success": false,
            "message": "El email es invalido.",
            "token"  : ""
        }
    } else {
        const payload = {
            id: entity.id,
            username:entity.username
        };
        const secretKey = 'clavesecreta2006';
        const options ={
            expiresIn: '1h',
            issuer:'mi_organizacion'
        };
        const token = jwt.sign(payload,secretKey,options);
        console.log(token);

        respuesta = {
            "success": true,
            "message": "",
            "token"  : token
        }
    }
    return res.status(200).json(respuesta);
});

router.post('/register', async (req, res) => {
    let entity=req.body;

    const registrosAfectados = await svc.createAsync(entity);
    return res.status(200).json(registrosAfectados);
});
export default router;
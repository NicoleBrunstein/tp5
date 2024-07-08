import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import UsersService from './../services/users-service.js'
const router = Router();
const svc    = new UsersService();		// Instanciación del Service.


router.post('/login', async (req, res) => {
    let entity=req.body;
    let respuesta;
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const usuario  = await svc.getByUsername(entity);
    console.log(usuario);
    if (usuario == null){
        respuesta = {
            "success": false,
            "message": "El email es invalido.",
            "token"  : ""
        }
        return res.status(404).json(respuesta);
    } else {
        const payload = {
            id: usuario.id,
            username:entity.username
        };
        const secretKey = 'clavesecreta2006';
        const options ={
            expiresIn: '1h',
            issuer:'mi_organizacion'
        };
        const token = jwt.sign(payload,secretKey,options);

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
    return res.status(201).json(registrosAfectados);
});
export default router;


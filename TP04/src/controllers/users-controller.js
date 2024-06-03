import {Router} from 'express';
import {jwt} from 'jsonwebtoken';
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
        const secretkey = 'clavesecreta2006';
        const options ={
            expiresIn: '1h',
            issure:'mi_organizacion'
        }
        let miToken = jwt.sing(payload,secretkey,options);

        respuesta = {
            "success": true,
            "message": "",
            "token"  : miToken
        }
    }
    return res.status(200).json(respuesta);
});

export default router;
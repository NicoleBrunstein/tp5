import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import UsersService from './../services/users-service.js'
const router = Router();
const svc    = new UsersService();		// Instanciación del Service.


router.post('/login', async (req, res) => {
    let response;
    const userData = req.body
    console.log('controller login' , userData);
    const returnEntity = await svc.getByUsername(userData);
    console.log('controller despues del login' , returnEntity);
    if (returnEntity !=null){
        const secretKey = 'clavesecreta2006'

        const options = {
            expiresIn: '1h',
            issuer: 'ORT ' 
        };

        const token = jwt.sign(returnEntity, secretKey, options);
        
        response = res.status(200).json({
            "success": true,
            "message": "",
            "token"  : token
        });

    } else {
        response=res.status(401).send({
            "success": false,
            "message": "Usuario o clave inválida.",
            "token"  : ""
         });
    }
    return response;
})

router.post('/register', async (req, res) => {
    var validEmailRegex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const { first_name, last_name, username, password } = req.body;

    // Validar first_name y last_name
    if (!first_name || first_name.length < 3 || !last_name || last_name.length < 3) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Los campos first_name y last_name son requeridos y deben tener al menos tres caracteres.'
        });
    }

    // Validar username (email)
    if (!validEmailRegex.test(username)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'El email (username) es sintácticamente inválido.'
        });
    }

    // Validar password
    if (!password || password.length < 3) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'El campo password es requerido y debe tener al menos tres caracteres.'
        });
    }

    console.log("NACA!!")

    try {
        // Crear el usuario si todas las validaciones pasan
        const registrosAfectados = await svc.createAsync({ first_name, last_name, username, password });
        
        // Devolver respuesta exitosa con el código 201 (Created)
        console.log("llego")

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: ''
        });
    } catch (error) {
        console.error('Error en /register:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error en el servidor al intentar registrar el usuario.'
        });
    }
});
export default router;


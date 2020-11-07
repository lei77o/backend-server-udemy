/*

    ruta: api/todo/:busqueda

*/

//Implemetar el midleware para el express fileupload
const expresFileUp = require('express-fileupload');

const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, retornarImagen } = require('../controllers/uploads');

const router = Router();

router.use( expresFileUp() );

router.put('/:tipo/:id', 
        validarJWT,
        fileUpload
        );

router.get('/:tipo/:foto', 
    fileUpload,
    retornarImagen );

module.exports = Router;
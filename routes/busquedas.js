/*

    ruta: api/todo/:busqueda

*/

const { Router } = require('express');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', 
        validarJWT,
        getTodo );

router.get('/:coleecion/:tabla/:busqueda', getDocumentosColeccion, 
        validarJWT,
        getTodo );



module.exports = Router;
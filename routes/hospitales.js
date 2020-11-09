/*
    Hospitales
    Ruta: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    actualizarHospistal,
    crearHospistal,
    borrarHospital
} = require('../controllers/hospitales');

const router = Router();

router.get( '/', getHospitales );

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
        validarCampos
    ], 
    crearHospistal 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
        validarCampos
    ],
    actualizarHospistal
);

router.delete( '/:id',
    validarJWT,
    borrarHospital
);


module.exports = router;
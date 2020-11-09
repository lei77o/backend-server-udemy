/*
    Medicos
    Ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    actualizarMedico,
    crearMedico,
    borrarMedico
} = require('../controllers/medicos');

const router = Router();

router.get( '/', getMedicos );

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es requerido').not().isEmpty(),
        check('hospital', 'El hospital  id es requerido').isMongoId(),
        validarCampos
    ], 
    crearMedico 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es requerido').not().isEmpty(),
        check('hospital', 'El hospital  id es requerido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete( '/:id',
    validarJWT,
    borrarMedico
);


module.exports = router;
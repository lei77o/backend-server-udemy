
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require ('../middlewares/validar-campos');
const { validarJWT } = require ('../middlewares/validar-jwt');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require ('../controllers/usuarios');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post(
    '/',[
        check('nombre', 'Nombre obligatorio').not().isEmpty(),
        check('password' , 'Contraseña obligatorio').not().isEmpty(),
        check('email' , 'Email obligatorio').not().isEmpty(),
        validarCampos
    ],
crearUsuario
);

router.put('/:id',
    [   
        validarJWT,
        check('nombre', 'Nombre obligatorio').not().isEmpty(),
        check('email' , 'Contraseña obligatorio').not().isEmpty(),
        check('role' , 'Email obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario);

router.delete('/:id',
    validarJWT,     
    borrarUsuario);

const { router } = require('./app');

module.exports = router;
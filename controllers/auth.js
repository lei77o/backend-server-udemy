const { response } = require('express');
const { generarJWT } = require ('../helpers/jwt');

const bcrypt = require ('bcryptjs');

const Usuario = require ('../models/usuario');


const login = async(req, res = response ) => {

    const {email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne( email);

        if( !usuarioDB ){
            return res.status(400).json({
                ok:false,
                msg: 'Email no encontrado'
            });
        }

        //Verificar Password
        const validPassword = bcrypt.compareSync(  password, usuarioDB.password );
        if ( !validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Error en la password'
            })
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id ); 

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

module.exports = {
    login
}
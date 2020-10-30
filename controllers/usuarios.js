const {response } = require('express');

const { generarJWT } = require('../helpers/jwt');

const bcrypt = require ('bcryptjs');

const Usuario = require("../models/usuario");

const getUsuarios = async(req, res)=>{
    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios,
    });
}

const crearUsuario = async(req, res = response)=>{

    const {email, password } = req.body;

    try{

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail){ 
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar usuario
        await usuario.save();
    
        // Generar token JWT
        const token = await generarJWT ( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });
    
    }
    catch (error){  
        res.status(500).json({
            ok:false,
            msj: 'Error inesperado... revisar logs'
        })
    }   
}

const actualizarUsuario = async (req, res = response) => {

    //Validar token y comprobar si el usuario correo

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById ( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario id'
            })
        }

        //Actualiaciones
        const {passwoord, google, email, ...campos} = req.body;
        
        if (usuarioDB.email !== email ){
            const existeEmail = await Usuario.findOne({email});
            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese email"
                })
            }
        }

        //delete campos.password;
        //delete campos.google;

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new : true} );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try{
        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario id'
            })
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok:true,
            msg: 'Usuario eliminado'
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
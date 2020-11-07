const { response } = require('express');
const hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) =>{

    const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital','nombre img');
    
    res.json({
        ok: true,
        msg: 'getMedicos'
    })
}

const crearMedico = async (req, res = response) =>{

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body});

    try{

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB,
            msg: 'crearMedico'
        })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con un administrador'
        })
    }

}

const actualizarMedico = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}

module.exports = {
    getMedicos,
    actualizarMedico,
    crearMedico,
    borrarMedico
}
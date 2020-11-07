const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) =>{

    //Para obtener todos los hospitales
    //Populate le asigno que objeto y los campos que quiero, asociado al hospital
    const hospitales =  await Hospital.find().populate('usuario','nombre img');

    res.json({
        ok: true,
        hospitales,
        msg: 'getHospitales'
    })
}

const crearHospistal = async(req, res = response) =>{
    
    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body});

    try{

        const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            hospital: hospitalDB
        })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con un administrador'
        })
    }
    
}

const actualizarHospistal = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

const borrarHospital = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}

module.exports = {
    getHospitales,
    actualizarHospistal,
    crearHospistal,
    borrarHospital
}
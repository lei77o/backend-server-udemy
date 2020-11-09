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

const actualizarHospistal = async (req, res = response) =>{
    
    const id = req.params.id;
    const uid = req.uid;
    
    try {
        
        const hospital = await Hospital.findById( id );

        if( !hospital ){

            return res.status(404). json({
                ok: false,
                msg: 'Hospital no encontrado'
            });

        }

        const cambiosHospital= {
            ...req.boty,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true});
                
        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
   
}

const borrarHospital = (req, res = response) =>{
    
    const id = req.params.id;

    try {
        
        const hospital = await Hospital.findById( id );

        if( !hospital ){

            return res.status(404). json({
                ok: false,
                msg: 'Hospital no encontrado'
            });

        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            mg: 'Hospital eliminado'
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

module.exports = {
    getHospitales,
    actualizarHospistal,
    crearHospistal,
    borrarHospital
}
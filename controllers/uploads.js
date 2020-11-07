
const { response } = require('express');

const path = require('path');

const fs = require('fs');

//Auto generar uid
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actaulizar-imagen');

const fileUpload = (req, res = response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    //Validar tipo
    if( !tiposValidos.includes(tipo)){
        
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital'
        });

    }

    //Validacion que exista una archivo
    if(!req.files || Object.keys(req.files).length === 0 ){
        return res.status(400).json({
            ok: false,
            msg: 'No se envio un archivo'
        })
    }

    //Procesar una imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1];

    //Validar extensiones
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes( extensionArchivo )){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension valida'
        })
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }`;

    //Path para guardar el archivo
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    //Mover archivo al directorio del servidor
    file.mv( path , (err) => {
        if(err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })
        }

        //Actualizar base de datos
        actualizarImagen( tipos, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    }); 


}

const retornarImagen = (req , res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);

    // Imagen por defecto
    if( fs.existsSync (pathImg)){
        res.sendFile( pathImg );
    }
    else {
        const pathImg = path.join( __dirname, `../uploads/no-img.png`);
        res.sendFile( pathImg );
    }

}

module.exports = {

    fileUpload,
    retornarImagen

}
const express = require('express');

//crear el servidor express
const app = express();

//Rutas
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    })

});

module.exports = app;
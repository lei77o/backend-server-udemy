// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();
const cors = require('cors');

//Importar
const { dbConnection } = require('./database/config');

// Inicializar variable
const app = express();

//Configurar CORS
app.use( cors() );

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

//Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);
app.use('/api/login', require('./routes/auth'));

// Escuchar peticiones
app.listen(process.env.PORT , ()=> {

    console.log('Corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');

});
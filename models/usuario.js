var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const {Schema, model } = require('mongoose');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'

}

var usuarioSchema = new Schema({

    nombre: { type: String, required : [true, 'El nombre es necesario'] },
    email: { type: String, unique:true , required: [true, 'El correo es necesario'] },
    password: { type: String, unique:true , required: [true, 'La contraseña es necesario'] },
    img: { type: String, required: false },
    role: { type: String, required: true , default: 'USER_ROLE', enum: rolesValidos  }
    
});

usuarioSchema.plugin( uniqueValidator, {message: '{PATH} El correo debe ser unico'});

usuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = mongoose.model('Usuario', usuarioSchema);
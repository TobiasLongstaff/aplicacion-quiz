const { model, Schema } = require('mongoose')

const usuarioSchema = new Schema({
    nombre_apellido: String,
    fecha_creacion: Date,
    mail: String,
    password: String,
})

const Usuario = model('Usuario', usuarioSchema) 

module.exports = Usuario
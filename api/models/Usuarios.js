const { model, Schema } = require('mongoose')

const usuarioSchema = new Schema(
{
    fecha_creacion: Date,
    nombre_apellido: String,
    mail: String,
    passwordHash: String,
    cuestionarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Cuestionario'
    }]
})

usuarioSchema.set('toJSON', 
{  
    transform: (document, returnedObject) =>
    {  
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.passwordHash
    }
})

const Usuario = model('Usuario', usuarioSchema) 

module.exports = Usuario
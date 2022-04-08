const { model, Schema } = require('mongoose')

const usuarioSchema = new Schema({
    nombre_apellido: String,
    fecha_creacion: Date,
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
const { model, Schema } = require('mongoose')

const respuestaSchema = new Schema(
{
    fecha_creacion: Date,
    respuestas:[
    {
        res_id: Number,
        correcta: String,
        respuesta: String,
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    cuestionario: {
        type: Schema.Types.ObjectId,
        ref: 'Cuestionario'
    }
})

respuestaSchema.set('toJSON', 
{  
    transform: (document, returnedObject) =>
    {  
        returnedObject.id = returnedObject._id
        delete returnedObject.__v
        delete returnedObject._id
    }
})

const Respuesta = model('Respuesta', respuestaSchema)

module.exports = Respuesta
const { model, Schema } = require('mongoose')

const cuestionarioSchema = new Schema({
    titulo: String,
    fecha_creacion: Date,
    descripcion: String,
    preguntas: 
    [{
        pre_id: Number,
        pregunta: String, 
        correcta: String,
        incorrectas: 
        [
            { 
                res_in: Number,
                incorrecta: String 
            }
        ]
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    respuestas: 
    [{
        type: Schema.Types.ObjectId,
        ref: 'Respuesta'
    }]
})

cuestionarioSchema.set('toJSON', 
{  
    transform: (document, returnedObject) =>
    {  
        returnedObject.id = returnedObject._id
        delete returnedObject.__v
        delete returnedObject._id
    }
})

const Cuestionario = model('Cuestionario', cuestionarioSchema) 

module.exports = Cuestionario
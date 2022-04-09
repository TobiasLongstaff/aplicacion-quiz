const { model, Schema } = require('mongoose')

const cuestionarioSchema = new Schema({
    titulo: String,
    fecha_creacion: Date,
    descripcion: String,
    // preguntas: 
    // [{
    //     pregunta: String, 
    //     respuesta: String,
    //     incorrecta: 
    //     [
    //         {  type: String }
    //     ] 
    // }]
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

cuestionarioSchema.set('toJSON', 
{  
    transform: (document, returnedObject) =>
    {  
        returnedObject.id = returnedObject._id
        delete returnedObject.__v
    }
})

const Cuestionario = model('Cuestionario', cuestionarioSchema) 

module.exports = Cuestionario
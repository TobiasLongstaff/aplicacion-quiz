require('./mongoose')
const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')
const app = express()
const Usuario = require('./models/Usuarios')
const Cuestionario = require('./models/Cuestionarios')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.json())
app.use(logger)

app.post('/api/registro', async (request, response) => 
{
    const usuario = request.body

    if(!usuario.mail || !usuario.password)
    {
        return response.status(400).json(
        {
            error: 'Requiere mail y contraseña'
        })
    }
    else
    {
        if(usuario.password === usuario.password_con)
        {
            const passwordHash = await bcrypt.hash(usuario.password, 10)
            const newUsuario = new Usuario({
                nombre: usuario.nombre,
                fecha_creacion: new Date(), 
                mail: usuario.mail,
                passwordHash: passwordHash
            })
    
            const savedUser = await newUsuario.save()
            response.json(savedUser)
        }
        else
        {
            return response.json(
            {
                error: 'contraseñas distintas'
            })
        }
    }
})

app.get('/api/cuestionarios', async (request, response) => 
{
    const cuestionarios = await Cuestionario.find({})
    response.json(cuestionarios)
})

app.post('/api/cuestionarios', (request, response) =>
{
    const cuestionario = request.body

    const newCuestionario = new Cuestionario({
        titulo: cuestionario.titulo,
        fecha_creacion: new Date(), 
        descripcion: cuestionario.descripcion,
        preguntas: cuestionario.preguntas
    })

    newCuestionario.save().then( savedCuestionario =>
    {
        response.json(savedCuestionario)
    })
})

const PORT = 3001
app.listen(PORT, () =>
{
    console.log('server on port '+PORT)
});

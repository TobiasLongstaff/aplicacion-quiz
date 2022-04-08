require('./mongoose')
const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')
const app = express()
const Usuario = require('./models/Usuarios')

app.use(cors())
app.use(express.json())
app.use(logger)

app.post('/api/registro', (request, response) => {
    const usuario = request.body

    if(!usuario.mail || !usuario.password)
    {
        return response.status(400).json(
        {
            error: 'Requiere mail y contraseña'
        })
    }

    if(usuario.password === usuario.password_con)
    {
        const newUsuario = new Usuario({
            nombre: usuario.nombre,
            fecha_creacion: new Date(), 
            mail: usuario.mail,
            password: usuario.password
        })

        newUsuario.save().then( savedUser =>
        {
            response.json(savedUser)
        })
    }
    else
    {
        return response.json(
        {
            error: 'contraseñas distintas'
        })
    }
})

app.get('/api/preguntas', (request, response) => {
    response.send('<h1>hola<h1>')
})

const PORT = 3001
app.listen(PORT, () =>
{
    console.log('server on port '+PORT)
});

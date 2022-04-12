require('./mongoose')
const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')
const app = express()
const Usuario = require('./models/Usuarios')
const Cuestionario = require('./models/Cuestionarios')
const Respuesta = require('./models/Respuestas')
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
                nombre_apellido: usuario.nombre_apellido,
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

app.post('/api/login', async (request, response) =>
{
    const { body } = request
    const { mail, password } = body
    const usuario = await Usuario.findOne({ mail })
    if(usuario != null)
    {
        const comparacionPassword = await bcrypt.compare(password, usuario.passwordHash)
        if(comparacionPassword != null)
        {
            return response.json(
            {
                idHash: usuario._id,
                nombre: usuario.nombre_apellido
            })
        }
        else
        {
            return response.json(
            {
                error: 'Usuario o contraseñas incorrectas'
            })
        }
    }
    else
    {
        return response.json(
        {
            error: 'Usuario o contraseñas incorrectas'
        })
    }
})

app.post('/api/usuario', async (request, response) => 
{
    const { id } = request.body
    const usuario = await Usuario.findById(id).populate('cuestionarios',
    {
        usuario: 0,
        id: 0
    })
    response.json(usuario)
})

app.get('/api/respuesta/:id', async (request, response) => 
{
    const { id } = request.params
    const respuesta = await Respuesta.findById(id)
    if(respuesta)
    {
        return response.json(respuesta)
    }
    else
    {
        return response.status(404).json(
        {
            error: 'No existe este respuesta'
        })
    }
})

app.post('/api/respuesta', async (request, response, next) => 
{
    const { body } = request
    const { cuestionarioId, usuarioId, respuestas } = body
    const usuario = await Usuario.findById(usuarioId)
    const cuestionario = await Cuestionario.findById(cuestionarioId)
    if (!cuestionarioId || !usuarioId || !respuestas) 
    {
        return response.status(400).json(
        {
            error: 'Se necesitan mas datos del cuestionario'
        })
    }

    const newRespuesta = new Respuesta({
        fecha_creacion: new Date(), 
        respuestas: respuestas,
        usuario: usuario._id,
        cuestionario: cuestionario._id,
    })

    try
    {
        const savedRespuesta = await newRespuesta.save()   
        usuario.respuestas = usuario.respuestas.concat(savedRespuesta._id) 
        await usuario.save()
        cuestionario.respuestas = cuestionario.respuestas.concat(savedRespuesta._id) 
        await cuestionario.save()
        return response.json(savedRespuesta)
    }
    catch(error)
    {
        next(error)
    }
})

app.get('/api/cuestionarios', async (request, response) => 
{
    const cuestionarios = await Cuestionario.find({})
    response.json(cuestionarios)
})

app.get('/api/cuestionarios/:id', async (request, response) => 
{
    const { id } = request.params
    const cuestionario = await Cuestionario.findById(id)
    if(cuestionario)
    {
        return response.json(cuestionario)
    }
    else
    {
        return response.status(404).json(
        {
            error: 'No existe este cuestionario'
        })
    }
})

app.post('/api/cuestionarios', async (request, response, next) =>
{
    const { body } = request
    const { titulo, descripcion, usuarioId, preguntas } = body

    const usuario = await Usuario.findById(usuarioId)
    const cuestionariosTitulo = await Cuestionario.findOne({ titulo })

    if (!titulo || !descripcion || !usuarioId || !preguntas)
    {
        return response.status(400).json(
        {
            error: 'Se necesitan mas datos del cuestionario'
        })
    }

    if(cuestionariosTitulo)
    {
        return response.status(400).json(
        {
            error: 'Ya existe un cuestionario con ese titulo'
        })   
    }

    const newCuestionario = new Cuestionario({
        titulo: titulo,
        fecha_creacion: new Date(), 
        descripcion: descripcion,
        preguntas: preguntas,
        usuario: usuario._id
    })

    try
    {
        const savedCuestionario = await newCuestionario.save()   
        usuario.cuestionarios = usuario.cuestionarios.concat(savedCuestionario._id) 
        await usuario.save()
        return response.json(savedCuestionario)
    }
    catch(error)
    {
        next(error)
    }
})

app.delete('/api/cuestionarios/:id', async (request, response) => 
{
    const { id } = request.params
    const res = await Cuestionario.findByIdAndDelete(id)
    if(res != null)
    {
        return response.json({ mensaje: 'eliminado' })
    }
    else
    {
        return response.status(404).json(
        {
            error: 'No existe este cuestionario'
        })
    }
})

app.put('/api/cuestionarios/:id', (request, response) => 
{
    const { id } = request.params
    const cuestionario = request.body

    const newCuestionario = 
    {
        titulo: cuestionario.titulo,
        fecha_creacion: new Date(),
        descripcion: cuestionario.descripcion,
        preguntas: cuestionario.preguntas,
    }

    Cuestionario.findByIdAndUpdate(id, newCuestionario, { new: true })
    .then(resultado => 
    {
        response.json(resultado)
    })
})

app.use((error, request, response, next) => 
{
    console.log(error)
    response.status(500).end()
})

const PORT = 3001
app.listen(PORT, () =>
{
    console.log('server on port '+PORT)
});

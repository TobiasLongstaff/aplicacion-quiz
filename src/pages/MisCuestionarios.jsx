import React, { useState, useEffect, useRef } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import url from '../services/Settings'
import { UilTextFields, UilAlignLeft, UilQuestionCircle, UilCheckCircle, UilTimesCircle, UilEditAlt, UilTrash } from '@iconscout/react-unicons'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'

const cookies = new Cookies


const MisCuestionarios = () =>
{
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ form, setForm ] = useState({ usuarioId: cookies.get('hashSession'), titulo: '', descripcion: '', preguntas: [] })
    const [ editar, setEditar ] = useState(false)
    const [ cantPre, setCantPre ] = useState(
    [
        {
            pre_id: 1,
            pregunta: '',
            correcta: '',
            incorrectas:     
            [{
                res_in: 1,
                incorrecta: ''
            }]
        }
    ])
    const [ btnForm, setBtnForm ] = useState('var(--principal)')

    useEffect(() =>
    {
        console.log(cantPre)
    },[cantPre])

    useEffect(() =>
    {
        console.log(form)
        if(form.preguntas.length !== 0 ) // solucionar que se repite al cargar los datos
        {
            if(editar === true)
            {
                EditarCuestionario()
            }
            else
            {
                crearCuestionario()
            }
        }
    },[form])

    useEffect(() =>
    {
        obtenerCuestionarios()
    },[])

    const obtenerCuestionarios = async () =>
    {
        const idUsuario = { id: cookies.get('hashSession')}
        try 
        {
            let config =
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(idUsuario)
            }
            let res = await fetch(url+'usuario', config)
            let data = await res.json()
            if(typeof data !== 'undefined')
            {
                setData(data)
                setLoading(false)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const agregarPregunta = () =>
    {
        if(cantPre.length == 10)
        {
            Swal.fire(
                'El maximo de preguntas es de 10',
                '',
                'warning'
            )
        }
        else
        {
            setCantPre(
            [
                ...cantPre,
                { 
                    pre_id: cantPre[cantPre.length-1].pre_id + 1,
                    pregunta: '',
                    correcta: '',
                    incorrectas:             
                    [{
                        res_in: 1,
                        incorrecta: ''
                    }]
                },
            ])
        }
    }

    const agregarRespuestaIncorrecta = (id) =>
    {
        const cantRespuesta = [...cantPre]
        let elementIndex = cantRespuesta.findIndex((obj => obj.pre_id == id))
        if(cantRespuesta[elementIndex].incorrectas.length == 10)
        {
            Swal.fire(
                'El maximo de respuestas incorrectas es de 10',
                '',
                'warning'
            )
        }
        else
        {
            let idUltimaRestpuesta = cantRespuesta[elementIndex].incorrectas.length - 1
            cantRespuesta[elementIndex].incorrectas.push({ res_in: idUltimaRestpuesta + 2, incorrecta: ''})
            setCantPre(cantRespuesta)
        }
    }

    const handelChangeIncorrecta = e =>
    {
        const cantRespuesta = [...cantPre]
        const ArrayIds = e.target.name.split('-')
        let elementIndex = cantRespuesta.findIndex((obj => obj.pre_id == ArrayIds[0]))
        let Respuesta = cantRespuesta[elementIndex]
        let elementIncorect = Respuesta.incorrectas.findIndex((obj => obj.res_in == ArrayIds[1]))
        
        Respuesta.incorrectas[elementIncorect].incorrecta = e.target.value
        setCantPre(cantRespuesta)
    }

    const handelChangePregunta = e =>
    {
        const cantPregunta = [...cantPre]
        const namePregunta = e.target.name.split('-')
        if(namePregunta[0] == 'pregunta')
        {
            let elementIndex = cantPregunta.findIndex((obj => obj.pre_id == namePregunta[1]))
            cantPregunta[elementIndex].pregunta = e.target.value
        }
        else
        {
            let elementIndex = cantPregunta.findIndex((obj => obj.pre_id == namePregunta[1]))
            cantPregunta[elementIndex].correcta = e.target.value
        }
        setCantPre(cantPregunta)
    }

    const handelSubmit = e =>
    {
        e.preventDefault()

        if(cantPre.length < 2)
        {
            Swal.fire(
                'El minimo es de dos preguntas',
                '',
                'warning'
            )
        }
        else
        {
            setForm(
            {
                ...form,
                preguntas: cantPre
            })
        }
    }

    const crearCuestionario = async () =>
    {
        try 
        {
            let config =
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            let res = await fetch(url+'cuestionarios', config)
            let infoPost = await res.json()
            console.log(infoPost)
            if(infoPost.id != null)
            {
                Swal.fire(
                    'Cuestionario publicado correctamente!',
                    '',
                    'success'
                )
                setEditar(false)
                setBtnForm('var(--principal)')
                setCantPre(
                [
                    {
                        pre_id: 1,
                        pregunta: '',
                        correcta: '',
                        incorrectas:     
                        [{
                            res_in: 1,
                            incorrecta: ''
                        }]
                    }
                ])
                setForm({ usuarioId: cookies.get('hashSession'), titulo: '', descripcion: '', preguntas: [] })
                obtenerCuestionarios()             
            }
            else
            {
                Swal.fire(
                    'error',
                    infoPost.error,
                    'error'
                )
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const EditarCuestionario = async () =>
    {
        try 
        {
            let config =
            {
                method: 'PUT',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            let res = await fetch(url+'cuestionarios/'+form.id, config)
            let infoPost = await res.json()
            console.log(infoPost)
            if(infoPost.id != null)
            {
                Swal.fire(
                    'Cuestionario actualizado correctamente!',
                    '',
                    'success'
                )
                setEditar(false)
                setBtnForm('var(--principal)')
                setCantPre(
                [
                    {
                        pre_id: 1,
                        pregunta: '',
                        correcta: '',
                        incorrectas:     
                        [{
                            res_in: 1,
                            incorrecta: ''
                        }]
                    }
                ])
                setForm({ usuarioId: cookies.get('hashSession'), titulo: '', descripcion: '', preguntas: [] })
                obtenerCuestionarios()        
            }
            else
            {
                Swal.fire(
                    'error',
                    infoPost.error,
                    'error'
                )
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const handelEliminar = (id) =>
    {
        Swal.fire(
        {
            title: '¿Eliminar Cuestionario?',
            text: "¿Estás seguro que queres eliminar este cuestionario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#de1c47',
            cancelButtonColor: '#4255d4',
            confirmButtonText: 'Eliminar'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                EliminarCuestionario(id)
            }
        })
    }

    const EliminarCuestionario = async (id) =>
    {
        try 
        {
            let config =
            {
                method: 'DELETE',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            let res = await fetch(url+'cuestionarios/'+id, config)
            let infoPost = await res.json()
            console.log(infoPost)
            if(infoPost.mensaje == 'eliminado')
            {
                Swal.fire(
                    'Cuestionario eliminado correctamente!',
                    '',
                    'success'
                )

                obtenerCuestionarios()             
            }
            else
            {
                Swal.fire(
                    'error',
                    infoPost.error,
                    'error'
                )
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const handelEditar = async (id) =>
    {
        setEditar(true)
        setBtnForm('var(--verde)')
        try
        {
            let res = await fetch(url+'cuestionarios/'+id)
            let data = await res.json()
            if(typeof data !== 'undefined')
            {
                setForm(data)
                setCantPre(data.preguntas)
                setLoading(false)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return(
        <article>
            <Navigation titulo="Mis Cuestionarios" volver="/cuestionarios"/>
            <main className="container-mis-cuestionarios">
                <div className="container-mis-cards">
                    {(() => {
                        if(loading)
                            return(
                                <div className="loader">Loading...</div>
                            )
                        return(
                            data.cuestionarios.map((fila) =>
                            (
                                <div className="cards">
                                    <div className="container-btn">
                                        <button type="button" className="btn-editar" onClick={()=> handelEditar(fila.id)}><UilEditAlt size="20"/></button>
                                        <button type="button" className="btn-eliminar" onClick={()=> handelEliminar(fila.id)}><UilTrash size="20"/></button>
                                    </div>
                                    <h1>{fila.titulo}</h1>
                                    <p>{fila.descripcion}</p>
                                    <label>{fila.fecha_creacion}</label>
                                </div>
                            ))                                    
                        )
                    })()}
                </div>
                <div className="container-crear-cuestionario">
                    <form className="form-general" onSubmit={handelSubmit}>
                        <h1>Cuestionario</h1>
                        <main className="container-textbox">
                            <div className="form-group">
                                <input type="text" value={form.titulo} name="titulo" className="form-style" placeholder="Titulo del cuestionario" onChange={handelChange} required />
                                <UilTextFields size="25" className="input-icon"/>
                            </div>
                            <div className="form-group">
                                <input type="text" value={form.descripcion} name="descripcion" className="form-style" placeholder="Descripcion" onChange={handelChange} required />
                                <UilAlignLeft  size="25" className="input-icon"/>
                            </div>
                            {cantPre.map((filaPre) =>
                            (
                                <div className="container-pregunta">
                                    <label>Pregunta {filaPre.pre_id}</label>
                                    <div className="container-info-pregunta">
                                        <div className="form-group">
                                            <input type="text" value={filaPre.pregunta} name={'pregunta-'+filaPre.pre_id} className="form-style" placeholder="Pregunta" onChange={handelChangePregunta} required />
                                            <UilQuestionCircle size="25" className="input-icon"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" value={filaPre.correcta} name={'correcta-'+filaPre.pre_id} className="form-style" placeholder="Respuesta correcta" onChange={handelChangePregunta} required />
                                            <UilCheckCircle size="25" className="input-icon"/>
                                        </div>
                                        {filaPre.incorrectas.map((fila) =>
                                        (
                                            <div className="form-group">
                                                <input type="text" value={fila.incorrecta} name={filaPre.pre_id+'-'+fila.res_in} className="form-style" placeholder={'Restuesta incorrecta '+fila.res_in} onChange={handelChangeIncorrecta} />
                                                <UilTimesCircle size="25" className="input-icon"/>
                                            </div>
                                        ))} 
                                        <button type="button" onClick={()=>agregarRespuestaIncorrecta(filaPre.pre_id)} className="btn-general btn-secundario">Agregar Respuesta Incorrecta</button>
                                    </div>
                                </div>
                            ))}
                            <div className="container-btn">
                                <button type="button" className="btn-general btn-secundario" onClick={()=>agregarPregunta()}>Agregar Nueva Pregunta</button>
                                <button type="submit" style={{ background: btnForm}} className="btn-general">Publicar Cuestionario</button>
                            </div>
                        </main>
                    </form>
                </div>
            </main>
        </article>
    )
}

export default MisCuestionarios
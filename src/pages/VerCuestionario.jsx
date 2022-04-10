import React, { useState ,useEffect } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { UilQuestionCircle } from '@iconscout/react-unicons'
import { useParams, useNavigate } from 'react-router-dom'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'

const cookie = new Cookies

const VerCuestionario = () =>
{
    let navigate = useNavigate()
    let { id } = useParams()
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ form, setForm ] = useState(
    {
        cuestionarioId: id,
        usuarioId: cookie.get('hashSession'),
        respuestas:[]
    })

    useEffect(() =>
    {
        if(cookie.get('hashSession') != null)
        {
            obtenerInfoCuestionario(id)
        }
        else
        {
            navigate('/')
        }
    },[])

    const obtenerInfoCuestionario = async (id) =>
    {
        try
        {
            let res = await fetch(url+'cuestionarios/'+id)
            let data = await res.json()
            if(typeof data !== 'undefined')
            {
                setData(data)
                setLoading(false)
                data.preguntas.map( fila => form.respuestas.push({ res_id: fila.pre_id, correcta: false, respuesta: ''}))
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const handelSubmit = async e =>
    {
        e.preventDefault()
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
            let res = await fetch(url+'respuesta', config)
            let infoPost = await res.json()
            if(infoPost.id != null)
            {
                navigate('/cuestionarios')
                Swal.fire(
                    'Felicidades completaste el cuestionario!',
                    'Gracias por participar',
                    'success'
                )
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

    const handelChange = e =>
    {
        const name = e.target.name.split('-')
        let elementIndex = form.respuestas.findIndex((obj => obj.res_id == name[1]))
        form.respuestas[elementIndex].respuesta = e.target.value

        let elementIndexPre = data.preguntas.findIndex((obj => obj.pre_id == name[1]))
        let RespuestaCorrecta = data.preguntas[elementIndexPre].correcta

        if(RespuestaCorrecta == e.target.value)
        {
            form.respuestas[elementIndex].correcta = true
        }
        else
        {
            form.respuestas[elementIndex].correcta = false
        }
    }

    if(!loading)
        return(
            <article>
                <Navigation titulo={data.titulo} volver="/cuestionarios"/>
                <main className="container-cuestionario">
                    <form className="form-general" onSubmit={handelSubmit}>
                        <h1>{data.titulo}</h1>
                        <label>{data.descripcion}</label>
                        <main className="container-textbox">
                            {data.preguntas.map((pregunta) =>
                            (
                                <div key={pregunta.pre_id} className="container-pregunta">
                                    <label>{'Pregunta '+pregunta.pre_id}</label>
                                    <label>{pregunta.pregunta}</label>
                                    <label>{pregunta.descripcion}</label>
                                    <div className="form-group">
                                        <select name={'respuesta-'+pregunta.pre_id} className="form-style" onChange={handelChange} required >
                                            <option selected disabled>Seleccionar respuesta</option>
                                            <option value={pregunta.correcta}>{pregunta.correcta}</option>
                                            {pregunta.incorrectas.map((incorrecta) =>
                                            (
                                                <option key={incorrecta.res_in} value={incorrecta.incorrecta}>{incorrecta.incorrecta}</option>
                                            ))}
                                        </select>
                                        <UilQuestionCircle size="25" className="input-icon"/>
                                    </div>
                                </div>
                            ))}
                        </main>
                        <div className="container-btn">
                            <button type="submit" className="btn-general">Finalizar Cuestionario</button>
                        </div>
                    </form>
                </main>
            </article>
        )
    return(
        <div className="loader">Loading...</div>
    )
}

export default VerCuestionario
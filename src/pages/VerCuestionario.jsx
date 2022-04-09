import React, { useState ,useEffect } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { UilQuestionCircle } from '@iconscout/react-unicons'
import { useParams } from 'react-router-dom'
import url from '../services/Settings'
import Cookies from 'universal-cookie'

const cookies = new Cookies

const VerCuestionario = () =>
{
    let { id } = useParams()
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ form, setForm ] = useState(
    {
        id: id,
        usuarioId: cookies.get('hashSession'),
        respuestas:[]
    })

    useEffect(() =>
    {
        obtenerInfoCuestionario(id)
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
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const handelSubmit = e =>
    {
        e.preventDefault()
    }

    const handelChange = e =>
    {
        // setForm(
        // {
        //     ...form,
        //     [e.target.name]: e.target.value
        // })
    }

    if(!loading)
        return(
            <article>
                <Navigation titulo={data.titulo} volver="/cuestionarios"/>
                <main className="container-crear-cuestionario">
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
                                        <select name={'pregunta-'+pregunta.pre_id} className="form-style" placeholder="Pregunta" onChange={handelChange} required >
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
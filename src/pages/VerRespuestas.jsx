import React, {useState, useEffect} from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import url from '../services/Settings'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookie = new Cookies

const VerRespuestas = () =>
{
    let navigate = useNavigate()
    const [ data, setData ] = useState([])
    const [ dataRes, setDataRes ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ loadingRes, setLoadingRes ] = useState(true)
    const { id, idres } = useParams()

    useEffect(() =>
    {
        if(cookie.get('hashSession') != null)
        {
            obtenerInfoCuestionario(id)
            obtenerRespuestas(idres)
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
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerRespuestas = async (id) =>
    {
        try
        {
            let res = await fetch(url+'respuesta/'+id)
            let dataRes = await res.json()
            if(typeof dataRes !== 'undefined')
            {
                setDataRes(dataRes)
                setLoadingRes(false)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    if(!loading)
        return(
            <article>
                <Navigation titulo="Resultados" volver="/cuestionarios-contestados"/>
                <main className="container-cuestionario">
                    <div className="form-general">
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
                                        <select className="form-style" size={pregunta.incorrectas.length+1}>
                                            <option className="op-respuesta-correcta">{pregunta.correcta}</option>
                                            {pregunta.incorrectas.map((incorrecta) =>
                                            (
                                                <option key={incorrecta.res_in} value={incorrecta.incorrecta}>{incorrecta.incorrecta}</option>
                                            ))}
                                        </select>
                                        {(() => {
                                            if(loadingRes)
                                            {
                                                return(
                                                    <div className="loader">Loading...</div>
                                                )
                                            }
                                            else
                                            {
                                                console.log(dataRes.respuestas[pregunta.pre_id - 1].correcta)
                                                if(dataRes.respuestas[pregunta.pre_id - 1].correcta == true)
                                                {
                                                    return(
                                                        <label>Respuesta Correcta</label>
                                                    )
                                                }
                                                else
                                                {
                                                    return(
                                                        <label>Respuesta Incorrecta</label> 
                                                    )
                                                }
                                            }
                                        })()}
                                    </div>
                                </div>
                            ))}
                        </main>
                    </div>
                </main>
            </article>
        )
    return(
        <div className="loader">Loading...</div>
    )
}

export default VerRespuestas
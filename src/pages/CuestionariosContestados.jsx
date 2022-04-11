import React, { useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import Navigation from '../components/Navegacion/Navegacion'
import url from '../services/Settings'
import Cookies from 'universal-cookie'
import { motion } from 'framer-motion'

const cookie = new Cookies

const CuestionariosContestados = () =>
{
    let navigate = useNavigate()
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() =>
    {
        if(cookie.get('hashSession') != null)
        {
            obtenerCuestionarios()
        }
        else
        {
            navigate('/')
        }
    },[])

    const obtenerCuestionarios = async () =>
    {
        try 
        {
            let res = await fetch(url+'cuestionarios')
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
    
    if(!loading)
        return(
            <article>
                <Navigation titulo="Cuestionarios Contestados" volver="/cuestionarios"/>
                <main className="container-cards">
                    {data.length == 0 ?
                        <label>No has contestado ningún cuestionario</label> : (
                    data.filter(fila => 
                    fila.respuestas.length != 0
                    ).map((fila) =>
                    (
                        <Link key={fila.id} to={'/ver-respuestas/'+fila.id+'/'+fila.respuestas}>
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }} 
                                className="cards">
                                <h1>{fila.titulo}</h1>
                                <p>{fila.descripcion}</p>
                                <label>{fila.fecha_creacion}</label>
                            </motion.div>
                        </Link>
                    )))}                                   
                </main>
            </article>
        )
    return(
        <div className="loader">Loading...</div>
    )
}

export default CuestionariosContestados
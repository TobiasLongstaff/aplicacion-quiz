import React,{ useEffect, useState } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/cuestionarios.css'
import { Link } from 'react-router-dom'
import url from '../services/Settings'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { motion } from 'framer-motion'

const cookie = new Cookies

const Cuestionarios = () =>
{
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(false)
    let navigate = useNavigate()

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

    return(
        <article>
            <Navigation titulo="Cuestionarios" refresh={true} childClick={()=>obtenerCuestionarios()}/>
            <main className="container-cards">
                {(() => {
                    if(loading)
                        return(
                            <div className="loader">Loading...</div>
                        )
                    else if(data.length == 0)
                        return(
                            <label>No se ha creado ningún cuestionario</label>
                        )
                    return(
                        data.map((fila) =>
                        (
                            <Link key={fila.id} to={'/ver-cuestionario/'+fila.id}>
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }} 
                                    className="cards">
                                    <h1>{fila.titulo}</h1>
                                    <p>{fila.descripcion}</p>
                                    <label>{fila.fecha_creacion}</label>
                                </motion.div>
                            </Link>
                        ))                                    
                    )
                })()}
            </main>
        </article>
    )
}

export default Cuestionarios